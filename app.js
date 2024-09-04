if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require("express");
const EventController = require("./controller/EventController");
const authentication = require("./middlewares/authentication");
const { errorHandler } = require("./middlewares/errorHandler");

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

app.use(authentication)

app.get("/events", EventController.getEvents)
app.post("/events", EventController.addNewEvent)
app.get("/events/:id", EventController.oneEvent)
app.put("/events/:id", EventController.updateEvent)
app.delete("/events/:id", EventController.deleteEvent)
app.get("/categories", EventController.getCategories)
app.post("/categories", EventController.addNewCategory)
app.put("/categories/:id", EventController.updateCategory)
app.post("/new-user", EventController.newUser)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server can be access in http://localhost:${PORT}`)
})

module.exports = app