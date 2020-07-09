const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
        
    },
    note:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"    }

});

mongoose.model('NOTES',NoteSchema);


const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:30
    },
    email:{
        type:String,
        required:true,
        max:25,
        min:4
    },
    password:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('User',LoginSchema);