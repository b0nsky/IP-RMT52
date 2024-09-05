const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require('../helpers/jwt');
const { Event, Category, User } = require('../models');
const { Op } = require('sequelize');
const { OAuth2Client } = require('google-auth-library');
const gemini = require('../helpers/gemini')
const client = new OAuth2Client()
const { v2 } = require('cloudinary')

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
module.exports = class EventController {
    static async getEvents(req, res, next) {
        try {
            const events = await Event.findAll({
                include: [
                    { model: Category, as: "Category" },
                    { model: User, as: "User" }
                ]
            });
            res.status(200).json(events);
        } catch (err) {
            next(err);
        }
    }

    static async addNewEvent(req, res, next) {
        try {
            const { eventName, venue, imgUrl, price, categoryId, userId, stock } = req.body;
            const newEvent = await Event.create({
                eventName, venue, imgUrl, price, categoryId, userId, stock
            });
            res.status(201).json(newEvent);
        } catch (err) {
            next(err);
        }
    }

    static async oneEvent(req, res, next) {
        try {
            const { id } = req.params;
            const event = await Event.findByPk(id, {
                include: [
                    { model: Category, as: "Category" }, 
                    { model: User, as: "User" }
                ]
            });
            if (!event) throw { name: "NotFound", message: "Event not found" };
            res.status(200).json(event);
        } catch (err) {
            next(err);
        }
    }

    static async updateEvent(req, res, next) {
        try {
            const { id } = req.params;
            const { eventName, venue, imgUrl, price, categoryId, userId, stock } = req.body;
            const event = await Event.findByPk(id);
            if (!event) throw { name: "NotFound", message: "Event not found" };

            event.eventName = eventName;
            event.venue = venue;
            event.imgUrl = imgUrl;
            event.price = price;
            event.categoryId = categoryId;
            event.userId = userId;
            event.stock = stock;

            await event.save();
            res.status(200).json(event);
        } catch (err) {
            next(err);
        }
    }

    static async deleteEvent(req, res, next) {
        try {
            const { id } = req.params;
            const event = await Event.findByPk(id);
            if (!event) throw { name: "NotFound", message: "Event not found" };

            await event.destroy();
            res.status(200).json({ message: "Event deleted successfully" });
        } catch (err) {
            next(err);
        }
    }

    static async getCategories(req, res, next) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    static async addNewCategory(req, res, next) {
        try {
            const { name } = req.body;
            const newCategory = await Category.create({ name });
            res.status(201).json(newCategory);
        } catch (err) {
            next(err);
        }
    }

    static async updateCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const category = await Category.findByPk(id);
            if (!category) throw { name: "NotFound", message: "Category not found" };

            category.name = name;
            await category.save();
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    }

    static async newUser(req, res, next) {
        try {
            const { email, password, phoneNumber, address, role } = req.body;
            const newUser = await User.create({
                email,
                password,
                phoneNumber,
                address,
                role
            });
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                throw { name: "Unauthorized", message: "Invalid email or password" };
            }

            const isPasswordValid = comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw { name: "Unauthorized", message: "Invalid email or password" };
            }

            const token = signToken({ id: user.id, email: user.email, role: user.role });
            res.status(200).json({ access_token: token });
        } catch (err) {
            next(err);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { googleToken } = req.body
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: "365803712182-fo7h02d63notgmfutrtr8qnqh9j3hi6p.apps.googleusercontent.com",
            });
            const {email} = ticket.getPayload()

            let user = await User.findOne({ where: {email}})

            if (!user) {
                user = await User.create({
                    email,
                    password: '8Entertainment'
                },
                {
                    hooks: false,
                }
            )
        }
            const token = signToken({ id: user.id, email: user.email, role: user.role });
            res.status(200).json({ access_token: token });
        } catch (err) {
            next(err);
        }
    }


    static async pubEvents(req, res, next) {
        try {
            const events = await Event.findAll({
                where: { stock: { [Op.gt]: 0 } },
                include: [
                    { model: Category, as: "Category" }  
                ]
            });
            res.status(200).json(events);
        } catch (err) {
            next(err);
        }
    }

    static async onePubEvent(req, res, next) {
        try {
            const { id } = req.params;
            const event = await Event.findByPk(id, {
                include: [
                    { model: Category, as: "Category" }  
                ]
            });
            if (!event) throw { name: "NotFound", message: "Event not found" };
            res.status(200).json(event);
        } catch (err) {
            next(err);
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (!category) throw { name: "NotFound", message: "Category not found" };

            await category.destroy();
            res.status(200).json({ message: "Category deleted successfully" });
        } catch (err) {
            next(err);
        }
    }

    static async oneCategory (req, res, next) {
        const { id } = req.params
        try {
            const category = await Category.findByPk(id);
            if(!category) {
                throw {name: "NotFound", message : `Category id:${id} not found`}
            }
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    }

    static async buyTicket(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const event = await Event.findByPk(id);

            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            if (event.stock <= 0) {
                return res.status(400).json({ message: 'Out of stock, no tickets available' });
            }

            event.stock -= 1;

            await event.save();

            return res.status(200).json({
                message: 'Ticket purchased successfully',
                eventId: event.id,
                remainingStock: event.stock
            });
        } catch (err) {
            next(err);
        }
    }

    static async generateDescription(req, res, next) {
        try {
            const { id } = req.params;

            const event = await Event.findByPk(id);
            if (!event) {
                return res.status(404).json({ message: `Event with id ${id} not found` });
            }

            const { eventName } = event;

            const description = await gemini(eventName);

            res.status(200).json({ eventName, description });
        } catch (err) {
            console.error('Error generating description:', err);
            next(err);
        }
    }

    static async pubGenerateDescription(req, res, next) {
        try {
            const { id } = req.params;

            const event = await Event.findByPk(id);
            if (!event) {
                return res.status(404).json({ message: `Event with id ${id} not found` });
            }

            const { eventName } = event;

            const description = await gemini(eventName);

            res.status(200).json({ eventName, description });
        } catch (err) {
            console.error('Error generating description:', err);
            next(err);
        }
    }

    static async updateEventCover(req, res, next) {
        try {
            const eventId = parseInt(req.params.id)
            console.log(eventId, " testtest ");
            const event = await Event.findByPk(eventId)
            if(!event) {
                throw {name: "NotFound", message : `Event id:${eventId} not found`}
            }

            const mimeType = req.file.mimetype;
            const base64Image = req.file.buffer.toString("base64")
            const result = await v2.uploader.upload(
                `data:${mimeType};base64,${base64Image}`,
                {
                    folder: "8 Entertainment",
                    public_id: req.file.originalname,
                }
            );
            console.log(eventId," testtest ")
            await event.update({imgUrl: result.secure_url})

            res.json({ message: "Image url has been updated"})
        } catch(err) {
            console.log(err, " <<< update Cover ");
            next(err);
        }
    }
};
