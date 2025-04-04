const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new Schema({
     fullName:{
        firstName:{
            type: String,
            required: true,
            minlength:[3, 'First name must be at least 3 characters long'],
        },
        lastName:{
            type: String,
            minlength:[3, 'Last name must be at least 3 characters long'],
        }   
     },
     email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
     },
     password:{
        type: String,
        required: true,
        select: false,
     },
     soketId:{
        type: String,
        default: null,
     },

     status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
     },
     vehicle:{

        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ],
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'auto', 'motorcycle' ],
        }

     },

     location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }


});


captainSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    
}


captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}





const CaptainModel = mongoose.model('captain', captainSchema);

module.exports = CaptainModel;