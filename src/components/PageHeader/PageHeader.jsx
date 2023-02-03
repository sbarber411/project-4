import React from 'react';
import { Link } from "react-router-dom";
import { 
    Header, 
    Segment, 
    Image, 
    Icon} from 'semantic-ui-react';

function PageHeader({ loggedUser, handleLogout }) {
    return (
        <Segment className="header" clearing color= "orange">
            <Header floated="right" >
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/">
                    <Icon name ="home" color="black"></Icon>
                </Link>
                <Link to="/login" onClick={handleLogout} style={{ color: 'orange' }}>
                    Log Out
                </Link>
              
               
            </Header>
            <Header floated="left" color= "orange">
                <Link to={`/${loggedUser?.username}`}>
                    {/* <Image
                        src={
                            loggedUser?.photoUrl
                                ? loggedUser?.photoUrl
                                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                        }
                        avatar
                    ></Image> */}
                </Link>
                <span style={{ color: 'orange' , textTransform: "uppercase" }}>Seas the Day, <b>{loggedUser.username}</b> ! </span>
            </Header>
        </Segment>
    )
}







export default PageHeader;

