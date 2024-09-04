if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require("express");
const EventController = require("./controller/EventController");
const authentication = require("./middlewares/authentication");
const { errorHandler } = require("./middlewares/errorHandler");
const { guardAdmin } = require("./middlewares/guardAdmin");

const app = express()
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('8 Events!')
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/pub/events', EventController.pubEvents)
app.get('/pub/events/:id', EventController.onePubEvent)
app.post('/login', EventController.login)
app.post('/new-user', EventController.newUser)

app.use(authentication)

app.get("/events", EventController.getEvents)
app.post("/events", guardAdmin, EventController.addNewEvent)
app.get("/events/:id", EventController.oneEvent)
app.put("/events/:id", guardAdmin, EventController.updateEvent)
app.delete("/events/:id", guardAdmin, EventController.deleteEvent)
app.get("/categories", EventController.getCategories)
app.post("/categories", guardAdmin, EventController.addNewCategory)
app.put("/categories/:id", guardAdmin, EventController.updateCategory)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server can be access in http://localhost:${PORT}`)
})

module.exports = app