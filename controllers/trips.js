import Trip from "../models/trip.js";
import User from "../models/user.js";
import S3 from "aws-sdk/clients/s3.js";
const s3 = new S3(); // initate the S3 constructor which can talk to aws/s3 our bucket!
// import uuid to help generate random names
import { v4 as uuidv4 } from "uuid";
// since we are sharing code, when you pull you don't want to have to edit the
// the bucket name, thats why we're using an environment variable
const BUCKET_NAME = process.env.BUCKET_NAME;

export default {
    create,
    index,
    deleteTrip
};

function create(req, res) {
    console.log(req.body, req.file, req.user,'<-req.body, req.file, req.user from create log controller');
    const key = `travelosophy/trips/${uuidv4()}-${req.file.originalname}`;
    const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

    s3.upload(params, async function (err, data) {
        console.log("=======================");
        console.log(err, " err from aws");
        console.log("=======================");
        if (err) return res.status(400).json({ err: "Check Terminal error with AWS" });
        try {
            // Using our model to create a document in the trips collection in mongodb
            const trip = await Trip.create({
                category: req.body.category,
                location: req.body.location,
                title: req.body.title,
                text: req.body.text,
                user: req.user,
                photoUrl: data.Location, // < this is from aws
            });
            // respond to the client!
            res.status(201).json({ data: trip });
        } catch (err) {
            res.status(400).json({ err });
        }
    });
}

async function index(req, res) {
    try {
        // this populates the user when you find the trips
        // so you'll have access to the users information
        // when you fetch the trips
        const trips = await Trip.find({}).populate("user").exec();
        res.status(200).json({ data: trips });
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function deleteTrip(req, res) {
    try {
        await Trip.findByIdAndDelete(req.params.id);
        res.json({ data: 'trip removed' })
    } catch (err) {
        res.status(400).json({ err });
    }
}