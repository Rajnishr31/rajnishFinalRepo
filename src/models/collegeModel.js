const mongoose = require("mongoose");
//{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`},
// logoLink: {mandatory}, isDeleted: {boolean, default: false} }
const collegeSchema = new mongoose.Schema({
    name :{
        type : String,
        required :true,
        unique : true,
        lowercase : true
    },
    fullName : {
        type:String,
        required:true,
        lowercase:true
    },
    logoLink:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
} , {timestamps:true});

module.exports = mongoose.model("college", collegeSchema);