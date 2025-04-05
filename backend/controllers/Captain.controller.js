const CaptainModel = require('../models/Captain.model');
const { validationResult } = require('express-validator');

const captainService = require('../services/captain.services');
const BlacklistModel = require('../models/blacklistToken.model');




module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullName, vehicle } = req.body; 

    const iscaptainExist = await CaptainModel.findOne({ email });

    if (iscaptainExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashedPassword = await CaptainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        color: vehicle.color


    });

    const token = captain.generateToken();

    res.status(201).json({ token, captain }); 
}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const captain = await CaptainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await captain.comparePassword(password);

    if (!isValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}


module.exports.logoutCaptain = async (req, res) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    // if (!token) {
    //     return res.status(400).json({ message: 'Invalid token' });
    // }

    await BlacklistModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });

}

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain });
}