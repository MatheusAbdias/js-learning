const { response } = require("express")
const { Router } = require("express")
const express = require("express")
const req = require("express/lib/request")
const router = express.Router()

router.use(logger)

router.get("/", (request, response) => {
    console.log(request.query.name)
    response.send("User List")
})

router.get("/new", (request, response) => {
    response.render("users/new")
})

router.post("/", (request, response) => {
    const isValid = true
    if (isValid) {
        users.push({ firstName: request.body.firstName })
        response.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("Error")
        response.render("users/new", { firstName: request.body.firstName })
    }

    console.log(request.body.firstName)
    response.send("Hi")
})

router.route("/:id").get((request, response) => {
    console.log(request.user)
    response.send(`Get User with ID ${request.params.id}`)
}).put((request, response) => {
    request.params.id
    response.send(`Update User with ID ${request.params.id}`)
}).delete((request, response) => {
    request.params.id
    response.send(`Delete User with ID ${request.params.id}`)
})

const users = [{ name: "mat" }, { name: "felip" }]
//middlewares
router.param("id", (request, response, next, id) => {
    request.user = users[id]
    next()
})

function logger(request, response, next) {
    console.log(request.originalUrl)
    next()
}


module.exports = router