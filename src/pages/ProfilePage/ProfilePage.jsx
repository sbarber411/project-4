import React, { useState, useEffect, useCallback } from "react";
import { Grid,Icon } from "semantic-ui-react";
import Profile from "../../components/Profile/Profile";
import TripPics from "../../components/TripPics/TripPics";
import PageHeader from "../../components/PageHeader/PageHeader";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";
import * as likesAPI from "../../utils/likesApi";
import * as tripAPI from "../../utils/tripApi";
import { useParams } from "react-router-dom";

function ProfilePage({ loggedUser, handleLogout }) {
    const [trips, setTrips] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { username } = useParams();

    async function addLike(tripId) {
        try {
            const response = await likesAPI.create(tripId);
            console.log(response, "from add like");
            getProfile();
        } catch (err) {
            console.log(err, " err from server");
        }
    }

    async function removeLike(likeId) {
        try {
            const response = await likesAPI.removeLike(likeId);
            console.log(response, " remove like");
            getProfile();
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteTrip(tripId) {
        try {
            const response = await tripAPI.deleteTrip(tripId);
            console.log(response, " delete trip");
            getProfile();
        } catch (err) {
            console.log(err);
        }
    }

    const getProfile = useCallback(async () => {
        try {
            const response = await userService.getProfile(username);
            setLoading(false);
            setProfileUser(response.data.user);
            setTrips(response.data.trips);
            console.log(response);
        } catch (err) {
            console.log(err.message);

            setError("Profile does not exist! You are in the wrong in place");
        }
    }, [username]);

    useEffect(() => {
        console.log("not");
        getProfile();
    }, [username, getProfile]);

    if (error) {
        return (
            <>
                <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                <ErrorMessage error={error} />;
            </>
        );
    }

    if (loading) {
        return (
            <>
                <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                <Loading />
            </>
        );
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Profile user={profileUser} tripsNumber={trips.length}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>

            <span>{trips.category}<Icon name={"point"} />{trips.location}</span>

            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 1200 }}>
                    <TripPics
                        trips={trips}
                        numPhotosCol={3}
                        isProfile={true}
                        loading={loading}
                        addLike={addLike}
                        removeLike={removeLike}
                        deleteTrips={handleDeleteTrip}
                        loggedUser={loggedUser}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default ProfilePage;