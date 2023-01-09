const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
//{ name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, 
//collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 10,
        trim : true
    },
    collegeId: {
        type: objectId,
        ref: "college"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("intern", internSchema);