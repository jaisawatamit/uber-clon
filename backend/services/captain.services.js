const CaptainModel = require('../models/Captain.model');

module.exports.createCaptain = async ({
    firstName, lastName, email, password, plate, capacity, vehicleType, color
}) => {
    if (!firstName || !email || !password || !plate || !capacity || !vehicleType || !color) {
        throw new Error('All fields are required');
    }
    const captain = CaptainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            plate,
            capacity,
            vehicleType,
            color
        }
    });
    return captain;
}




// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2UzZTFlMjAzZDU0Y2YxMjgzYzI2MWYiLCJpYXQiOjE3NDI5ODc3NDYsImV4cCI6MTc0MzA3NDE0Nn0.JZoYjcoHHP4xUeGsBAcWxOjt4yMo_YhwQW4l33G8WGs",
//     "captain": {
//       "fullName": {
//         "firstName": "test_captai_firstName",
//         "lastName": "test_captai_lastName"
//       },
//       "email": "captainn@gmail.com",
//       "password": "$2b$10$b6Hw0xnfcR7YdX5RHQaaauXuWePecBOCi/HdTj3YXEiDxMwYAX5MG",
//       "soketId": null,
//       "status": "inactive",
//       "vehicle": {
//         "color": "red",
//         "plate": "RJ 14 XY 8024",
//         "capacity": 3,
//         "vehicleType": "motorcycle"
//       },
//       "_id": "67e3e1e203d54cf1283c261f",
//       "__v": 0
//     }
//   }
