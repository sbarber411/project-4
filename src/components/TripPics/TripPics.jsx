import React from 'react';
import { Card, Dimmer, Segment, Image } from 'semantic-ui-react'
import TripCard from '../TripCard/TripCard';
import Loader from '../Loader/Loader';

export default function TripPics({ trips, numPhotosCol, isProfile, loading, addLike, removeLike, deleteTrip, loggedUser, formattedDate }) {
    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
            {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size="medium">Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            ) : null}
            {trips.map((trip) => {
                return (
                    <TripCard
                        trip={trip}
                        key={trip._id}
                        isProfile={isProfile}
                        addLike={addLike}
                        removeLike={removeLike}
                        loggedUser={loggedUser}
                        deleteTrip={deleteTrip}
                        formattedDate={formattedDate}
                    />
                );
            })
            .sort((a, b) => b.formattedDate - a.formattedDate)}
        </Card.Group>
    )
}