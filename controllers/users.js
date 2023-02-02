import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = process.env.BUCKET_NAME
console.log(BUCKET_NAME, 'bucketname')

export default {
  signup,
  login,
  profile
};


async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const trips = await Trip.find({ user: user._id }).populate("user").exec();
    res.status(200).json({
      data: {
        user: user,
        trips: trips,
      }
    });
  } catch (err) {
    console.log(err.message, " <- profile controller");
    res.status(400).json({ error: "??" });
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}


