import React, { useState } from 'react';
import { Card, Icon, Image, Modal, Button, TransitionGroup } from "semantic-ui-react";
import { Link } from "react-router-dom";

function TripCard({ trip, isProfile, addLike, removeLike, deleteTrip, loggedUser }) {
    const [open, setOpen] = useState(false);
    const date = new Date(trip.createdAt);
    const formattedDate = date.toLocaleString();

    const likedIndex = trip.likes.findIndex(
        (like) => like.username === loggedUser.username
    );
    const likeColor = likedIndex > -1 ? "orange" : "black";
    const clickHandler =
        likedIndex > -1
            ? () => removeLike(trip.likes[likedIndex]._id)
            : () => addLike(trip._id);

    return (
        <Card key={trip._id} raised>
            {isProfile ? (
                ""
            ) : (
                <Card.Content textAlign="left">
                    <Card.Header>
                        <Link to={trip.user.username}>
                        
                           <Image 
                            size="medium" 
                            avatar 
                            src={ trip.user.photoUrl
                               ? trip.user.photoUrl
                               : "https://i.imgur.com/RyAQ7j2.jpg"
                            }
                            />
                            {trip.user.username}
  
                        </Link>
                    </Card.Header>
                </Card.Content>
            )}
                    <Card.Description textAlign="center"
                        style={{ color: 'black' }} as="h4"> 
                        {trip.category}
                    </Card.Description>

                    <Card.Description textAlign="right">
                    <Icon floated="right"
                         name={"point"}
                         style={{color: "orange"}} /> 
                    {trip.location}
                    <hr></hr>
                    </Card.Description>
                    
                    <Image 
                        size= "small" 
                        src={`${trip?.photoUrl}`} 
                        wrapped ui={false} />

                <Card.Content>
                <hr></hr>
                    <Card.Description 
                        style={{ color: '#ff8c00', textAlign:"center"}} 
                        as="h5">{trip.title}
                    </Card.Description>
                    <Card.Meta 
                        style={{ color: 'black', textAlign:"center"}} 
                        as="h5">{trip.text}
                    </Card.Meta>
                </Card.Content>

                <Card.Meta 
                    style={{color:"black", textAlign: "right"}} 
                    className="quicksand">{formattedDate}
                </Card.Meta>
                <Card.Content 
                    style={{textAlign: "right"}}>
                    {loggedUser._id === trip.user._id ?
                <Modal
                    closeIcon
                    open={open}
                    trigger={
                    <Icon
                        name={"trash alternate outline"}
                        size="large"
                />}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                >  
                
            <Modal.Header 
                style={{ color: 'orange' }} >Delete Your traveloSOPHY
            </Modal.Header>
            <Modal.Content>
            <p>
                Would you like to delete your review?
            </p>
            </Modal.Content>
            <Modal.Actions>
                <Button 
                    color='red' 
                    onClick={() => setOpen(false)}>
                <Icon name='remove' /> No
                </Button>
                <Button 
                    color='green' onClick={() => deleteTrip(trip._id)}>
                <Icon 
                    name='checkmark' /> Yes
                </Button>
                </Modal.Actions>
                </Modal> : <>
                </>
                }
                <Icon style={{textAlign:"left"}}
                    name={"heart"}
                    size="large"
                    color={likeColor}
                    onClick={clickHandler}
                />
                {trip.likes.length}
            </Card.Content>
        </Card>
    );
}
export default TripCard;


