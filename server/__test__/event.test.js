const request = require('supertest');
const app = require('../app');
const { Event, Category } = require('../models');
const sequelize = require('../models').sequelize;

describe("Event Endpoints", () => {

    let adminToken;

    beforeAll(async () => {
        const adminResponse = await request(app)
            .post('/login')
            .send({ email: 'dhikadoms@gmail.com', password: 'dhikadoms' });

        adminToken = adminResponse.body.access_token;
    });

    beforeEach(async () => {
        await Event.destroy({ where: {}, truncate: true, cascade: true });
        await Category.destroy({ where: {}, truncate: true, cascade: true });

        const category = await Category.create({ name: 'Jazz' });
        await Event.create({
            eventName: 'Java Jazz',
            venue: 'Jakarta',
            imgUrl: 'https://awsimages.detik.net.id/community/media/visual/2022/04/06/java-jazz-festival-2022_43.jpeg?w=1200',
            price: 500000,
            stock: 100,
            categoryId: category.id,
            userId: 1,
        });
    });

    afterAll(async () => {
        await sequelize.close(); 
    });

    it("should return a list of events", async () => {
        const response = await request(app)
            .get('/pub/events')
            .expect(200);

        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty("eventName", "Java Jazz");
    });

    it("should update event cover image", async () => {
        const event = await Event.findOne(); 

        const response = await request(app)
            .patch(`/events/${event.id}/imgUrl`)
            .set("Authorization", `Bearer ${adminToken}`)
            .attach("imgUrl", Buffer.from("image content"), "newimage.jpg")
            .expect(200);

        expect(response.body.message).toBe("Image url has been updated");
    });

});
