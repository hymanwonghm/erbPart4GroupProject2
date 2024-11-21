const dbConfigs = require('../knexfile')
const knex = require('knex')(dbConfigs)

const indexController = async (req, res) => {
    const courseInfo = await knex('courses').select('*').orderBy('id')
    res.render('index', {data: courseInfo})
}

const loginController = (req, res) => {
    res.render('login', {})
}

const logoutController = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next()
        }else {
            res.redirect('/')
        }
    })
}

// POST: /add
const addController = async (req, res) => {

    const requestedcourse = req.body.id
    try{
    const issued = await knex('courses').insert({...req.body, status: 'Available'})
    const bookData = await knex('courses').select('*').orderBy('id')
    res.render('index', {data: bookData})

}catch(error){
    res.status(500).json({error: 'Fail to add'})
}
}

const avaController = async(req,res)=>{
    const requestedcourse = req.body.id
    console.log(requestedcourse)
    try{
    const available = await knex('courses').where({id: requestedcourse})
                                        .update({status: 'Available'})
    const courseData = await knex('courses').select('*').orderBy('id')
    res.render('index', {data: courseData})
}catch(error){
    res.status(500).json({error: 'Fail to change'})
}
}

const unavailableController= async(req,res)=>{
    const requestedcourse = req.body.id
    console.log(requestedcourse)
    try{
    const unavailable = await knex('courses').where({id: requestedcourse})
                                        .update({status: 'Unavailable'})
    const courseData = await knex('courses').select('*').orderBy('id')
    res.render('index', {data: courseData})
}catch(err){
    res.status(500).json({error: 'Fail to unavailable'})
}
}


const deleteController= async(req,res)=>{
    const requestedcourse = req.body.id
    console.log(requestedcourse)
    try{
    const unavailable = await knex('courses').where({id: requestedcourse})
                                        .del()
    const courseData = await knex('courses').select('*').orderBy('id')
    res.render('index', {data: courseData})
}catch(err){
    res.json()
}
}

module.exports = { indexController, loginController, logoutController, addController,avaController,unavailableController,deleteController}