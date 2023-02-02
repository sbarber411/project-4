import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { 
  useNavigate, 
  Link 
} from "react-router-dom";
import { 
  Button, 
  Form, 
  Grid,
  Image,
  Message, 
  Segment 
} from "semantic-ui-react";

export default function LoginPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(state);
      props.handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", width: "100vw" }} 
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Image style={{ width: 900, height: 200 }}src= "https://i.imgur.com/bmvBJ82.png" /> 
        <div className as="h2" color="orange" style={{textAlign: "center"}}>  
          <h2 style={{ color: 'orange' }}>Welcome to traveloSOPHY!</h2>
          <h3 style={{ color: 'orang' }}>The world is my playground.</h3>
          </div>
        <div style={{ maxWidth: 450 }}>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Button
              color="orange"
              fluid
              size="large"
              type="submit"
              className="btn"
            >
              Login
            </Button>
          </Segment>
        </Form>
        </div>
        <Message>
          Would like to sightsee? <br></br><Link to="/signup">Sign Up</Link>
        </Message>
        {error ? <ErrorMessage error={error} /> : null}
      </Grid.Column>
    </Grid>
  
  );
}
