import { Image, Grid, Segment } from "semantic-ui-react";

function Profile({ user, tripsNumber }) {
  return (
    <Grid textAlign="center" columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Image
            src={`${
              user.photoUrl
                ? user.photoUrl
                : "https://i.imgur.com/RyAQ7j2.jpg"
               
            } `}
            avatar
            size="medium"
          />
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ maxWidth: 600 }}>
            <Segment vertical>
                <h2> {user.username}</h2>
                <p className="arial">
                    Followers: <strong>{tripsNumber}</strong>  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Following: <strong>{tripsNumber}</strong>
                </p>
            </Segment>
                </Grid.Column>
        </Grid.Row>
    </Grid>
    );
}

export default Profile;