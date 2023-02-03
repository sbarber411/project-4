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
                : "https://i.imgur.com/GWaScfG.png"
            } `}
            avatar
            size="medium"
          />
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ maxWidth: 600 }}>
            <Segment vertical>
                <h2>{user.username}</h2>
                <p className="arial">
                    traveloSOPHY <strong>{tripsNumber}</strong>
                </p>
            </Segment>
                </Grid.Column>
        </Grid.Row>
    </Grid>
    );
}

export default Profile;