import React, { useState, useEffect } from "react";
import { Grid, Image, Divider } from "semantic-ui-react";
import "./TripPage.css";

import PageHeader from "../../components/PageHeader/PageHeader";
import AddTrip from "../../components/AddTrip/AddTrip";
import TripPics from "../../components/TripPics/TripPics";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";

import * as tripAPI from "../../utils/tripApi";
import * as likesAPI from "../../utils/likesApi";


function TripPage({ loggedUser, handleLogout }) {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function addLike(tripId) {
        try {
            const response = await likesAPI.create(tripId);
            console.log(response, "from add like");
            getTrips();
        } catch (err) {
            console.log(err, " err from server");
            setError("error adding like");
        }
    }

    async function removeLike(likeId) {
        try {
            const response = await likesAPI.removeLike(likeId);
            console.log(response, " remove like");
            getTrips();
        } catch (err) {
            console.log(err);
            setError("error removing like");
        }
    }

    async function handleAddTrip(trip) {
        try {
            setLoading(true);
            const response = await tripAPI.create(trip);
            console.log(response);
            setTrips([response.data, ...trips]);
            getTrips();
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setError("trip not created");
        }
    }

    async function handleDeleteTrip(tripId) {
        try {
            const response = await tripAPI.deleteTrip(tripId);
            console.log(response, ", delete trip");
            getTrips();
        } catch (err) {
            console.log(err);
            setError("Trip not deleting");
        }
    }

    async function getTrips() {
        try {
            const response = await tripAPI.getAll();
            setTrips([...response.data]);
            setLoading(false);
        } catch (err) {

            setLoading(false);
        }
    }

    useEffect(() => {
        getTrips();
    }, []);

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
        <Grid centered>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 1800 }}>
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Image src="https://i.imgur.com/RA6LuGS.png" size="medium" />
            </Grid.Row>
            <Grid.Row columns={3}>
                <Grid.Column style={{ maxWidth: 600 }}>
                    <AddTrip handleAddTrip={handleAddTrip} />
                </Grid.Column>
            </Grid.Row>

            {/* <Divider horizontal className="header"></Divider> */}

            <Grid.Row>
                <Image src="" size="small" circular />
            </Grid.Row>
            <Grid.Row columns={3}>
                <Grid.Column width={15} style={{ maxWidth: 450}}>
                    <TripPics
                        trips={trips}
                        numPhotosCol={1}
                        isProfile={false}
                        loading={loading}
                        addLike={addLike}
                        removeLike={removeLike}
                        deleteTrip={handleDeleteTrip}
                        loggedUser={loggedUser}
                       
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
export default TripPage;