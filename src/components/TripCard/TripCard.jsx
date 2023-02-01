import React, { useState } from 'react';
import { Card, Icon, Image, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function TripCard({ trip, isProfile, addLike, removeLike, deleteTrip, loggedUser }) {
    const [open, setOpen] = useState(false);
    const date = new Date(trip.createdAt);
    const formattedDate = date.toLocaleString();

    const likedIndex = trip.likes.findIndex(
        (like) => like.username === loggedUser.username
    );
    const likeColor = likedIndex > -1 ? "red" : "grey";
    const clickHandler =
        likedIndex > -1
            ? () => removeLike(trip.likes[likedIndex]._id) 
            : () => addLike(trip._id);  

    return (
        <Card key={trip._id} raised>
            {isProfile ? (
    
                <Card.Content>
                    <img src= {trip.photoUrl} />
                    <Card.Description as="h5">{trip.category} <Icon name={"point"} />{trip.location}</Card.Description>
                </Card.Content>
            ) : (
                <Card.Content>
                    <Card.Header>
                        <Link to={`/${trip.user.username}`}>
                            {trip.user.username}
                        </Link>
                    </Card.Header>
                    <img src= {trip.photoUrl} />
                    <Card.Description as="h5">{trip.category} <Icon name={"point"} />{trip.location}</Card.Description>
                </Card.Content>
            )}









        </Card>
    );
}
export default TripCard;