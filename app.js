// Importing modules
const express = require('express')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const { router } = require('./routers')
const { logging } = require('./middleware/logging')
const LocalStrategy = require('passport-local').Strategy
const dbConfigs = require('./knexfile')
const knex = require('knex')(dbConfigs)

// Define Express App
const app = express()
const port = 3000

// Setting views and static
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'static')))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Passport.js
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
  }))
app.use(passport.initialize())
app.use(passport.session())

authUser = async (username, password, done) => {
    console.log(`Value of "User" in authUser function ----> ${username}`)         
    console.log(`Value of "Password" in authUser function ----> ${password}`) 

// Use the "user" and "password" to search the DB and match user/password to authenticate the user
// 1. If the user not found, done (null, false)
// 2. If the password does not match, done (null, false)
// 3. If user found and password match, done (null, user)
    
    
console.log(username, password)
    let authenticated_user = await knex('users').select(['id','username', 'password'])
    const user = authenticated_user.find(authenticated_user => authenticated_user.username === username)
    const Apassword = authenticated_user.find(authenticated_user => authenticated_user.password === password)
    console.log(user)
    if(!user){return done (null, false)}
    if(!Apassword){return done (null, false)}
    return done (null, user ) 
}

passport.use(new LocalStrategy (authUser))

passport.serializeUser( (user, done) => { 
    console.log(`-------- Serialize User`)
    console.log(user)     

    done(null, user.id)
  

} )

passport.deserializeUser((id, done) => {
    console.log("--------- Deserialize Id")
    console.log(id)

    done (null, {id: id} ) 
} )

app.use(logging)
app.use('/', router)

app.post ("/login/password", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
}))


// Starting Express App server
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})