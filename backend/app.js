const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserRouter = require('./routes/user.routes')
const CaptainRouter = require('./routes/captain.routes')
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
const cookieParser = require('cookie-parser')
const app = express();
app.use(cors({ origin: "*"}));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin:admin%40123@cluster0.8atnt.mongodb.net/', { dbName: "uber-clone" }).then(
    () => {
        console.log("connected to db");
    }
).catch(
    (error) => {
        console.log("error connecting to db");
        console.log(error.message);
});

app.use('/users', UserRouter);
app.use('/captains', CaptainRouter);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);


app.listen(5000,()=>{
    console.log("server is running on port 5000");
});

