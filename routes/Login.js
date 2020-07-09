const router = require('express').Router();
const mongoose = require('mongoose')
require("../models/sche");
const usermodel =mongoose.model('User');
const notemodel = mongoose.model('NOTES');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const requireLogin = require('../middleware/requireLogin')




//LOGIN ROUTES
router.post('/login',async(req,res)=>{

    var check = usermodel.findOne({email:req.body.email})
    check.exec((err,data)=>{
        if(err) throw err;
        
        if(bcrypt.compareSync(req.body.password,data.password)){
            const token = jwt.sign({_id:data._id},process.env.SECRET);
            res.header("TOKEN",token).send(token)

        }
        else res.send("error");
    })
});
    
//REGISTER
router.post('/register',(req,res,next)=>{
    var check = usermodel.findOne({email:req.body.email})
    check.exec((err,data)=>{
        if (data) res.send("email exists")
        else{
            pass = bcrypt.hashSync(req.body.password,10)
            const newuser = new usermodel({
                name:req.body.name,
                email:req.body.email,
                password:pass
            })
            newuser.save()
            .then(result => res.json({"user saved":result}))
            .catch(err => console.log(err))
        }
    })
})

// TO GET ALL DATA
router.get('/getNotes',requireLogin,(req,res,)=>{

    notemodel.find({postedBy:req.user._id})
    .then(data =>{
        console.log(data)
        res.json({"data":data})
    })
    .catch(err => {
        res.status(400).send(err)
    })
    
    })
    
    
    
    // TO GET NOTE BY IDs
    router.get('/getNote/:id',requireLogin,(req,res,)=>{
    
    notemodel.findOne({_id:req.params.id})
    .then(result =>{
        console.log(result)
        res.json(result)
    })
    .catch(err => {
        res.status(400).send(err)
    })
    
    })
    
    //ADDING OF NEW DATA
    router.post('/newNotes',requireLogin,(req,res)=>{
        console.log(req.body)
    const newNote = req.body.note;
     const newnote = new notemodel({title:req.body.title,note:newNote,postedBy:req.user})
     newnote.save()
     .then(data =>{
         console.log("saved")
        res.json([{"status":"success"},{"note" : data.note}])
    })
    .catch(err => {
        res.status(400).send(err)
    })
       
    });
    
    
    //DELETE A NOTE
    
    router.delete('/deleteNotes/:id',requireLogin, (req, res) => {
        notemodel.findOne({ _id: req.params.id })
            .then(data => {
                data.remove()
                res.status(200).json([{"status":"success"},{"deleted" : data}]);
            })
            .catch(err => {
                res.status(400).send(err)
            })
    })
    
    
    
    //EDITTING
    
    router.put('/editNotes/:id',requireLogin, (req, res) => {
    
        var Id = req.params.id;
        var editnote = { $set: { note: req.body.note } };
        
    
        notemodel.findByIdAndUpdate({ _id: Id }, editnote)
            .then(data => {
                res.status(200).json([{"status":"success"},{"edited" : data}])
            })
            .catch(err => { 
                res.status(400).send(err) 
            })
    })
    



module.exports=router;