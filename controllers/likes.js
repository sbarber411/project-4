import Trip from '../models/trip.js'

module.exports = {
    create,
    deleteLike
}

async function create(req, res) {
    try {
        console.log(req.params,'<-this is from the create function');
        const trip = await Trip.findById(req.params.id);
        trip.likes.push({ username: req.user.username, userId: req.user._id });
        await trip.save()// save it
        res.status(201).json({ data: 'like added' })
    } catch (err) {
        res.status(400).json({ error: err })
    }

}

async function deleteLike(req, res) {
    try {
        console.log(req.params,'<-this is from the deleteLike function');
        const trip = await Trip.findOne({ 'likes._id': req.params.id, 'likes.username': req.user.username });
        trip.likes.remove(req.params.id) 
       
        await trip.save() 
        res.json({ data: 'like removed' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}