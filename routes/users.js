const express=require('express')
const router=express.Router()     
const passport=require('passport')

const usersController=require("../controllers/users_controller")

// The profile page is only accessible when the user is authenticated 
router.get("/profile/:id",passport.checkAuthentication,usersController.profile) //this works when the url is /users/profile

router.get("/sign-up",usersController.signUp)
router.get("/sign-in",usersController.signIn)
router.post('/create',usersController.create)

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}       // passport.authenticate is the inbuilt 
),usersController.createSession)             // if password.authenticate is successfull

router.get("/sign-out",usersController.destroySession)

router.post('/update/:id',passport.checkAuthentication,usersController.update)

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession)
module.exports=router