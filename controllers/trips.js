import Trip from "../models/trip.js";
import User from "../models/user.js";
import S3 from "aws-sdk/clients/s3.js";
const s3 = new S3();
import { v4 as uuidv4 } from "uuid";
const BUCKET_NAME = process.env.BUCKET_NAME;

export default {
    create,
    index,
    deleteTrip
};

function create(req, res) {
    const key = `travelosophy/trips/${uuidv4()}-${req.file.originalname}`;
    const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

    s3.upload(params, async function (err, data) {
        if (err) return res.status(400).json({ err: "prob error with AWS" });
        try {
            const trip = await Trip.create({
                category: req.body.category,
                location: req.body.location,
                title: req.body.title,
                text: req.body.text,
                user: req.user,
                photoUrl: data.Location, 
            });
    
            res.status(201).json({ data: trip });
        } catch (err) {
            res.status(400).json({ err });
        }
    });
}

async function index(req, res) {
    try {
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