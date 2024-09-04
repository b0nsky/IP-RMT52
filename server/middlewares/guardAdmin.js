function guardAdmin(req, res, next) {
    if(req.user.role !== "Admin") {
        next({ name: "Forbidden", message: "You are not authorized"})
        return
    }
    next()
}

module.exports = { guardAdmin }