import React from 'react';
import { Link } from "react-router-dom";
import { 
    Header, 
    Segment, 
    Image, 
    Icon} from 'semantic-ui-react';

function PageHeader({ loggedUser, handleLogout }) {
    return (
        <Segment className="header" clearing color= "#ff8c00">
            <Header floated="right" >
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/">
                    <Icon name ="home"></Icon>
                </Link>
                <Link to="/login" onClick={handleLogout} style={{ color: '#ff8c00' }}>
                    Log Out
                </Link>
              
               
            </Header>
            <Header floated="left" color= "#ff8c00">
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
                <span style={{ color: '#ff8c00' }}>Seas the Day, {loggedUser.username} </span>
            </Header>
        </Segment>
    )
}







export default PageHeader;

