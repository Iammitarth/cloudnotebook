const express = require('express');
const router =  express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');



// Create A User Using Post request "http://localhost:3000/api/auth/createuser" No Login Required
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })



], async (req, res) => {
    // If there are errors return bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }




    // Check wheather the email already exist with the user
    try {


    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({error : "Sorry User With this Email Already Exists"})
    }



    user = await User.create({
        name: req.body.name,
        email : req.body.email,
        password: req.body.password
      })

      res.json(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }   
      
      
})
module.exports = router