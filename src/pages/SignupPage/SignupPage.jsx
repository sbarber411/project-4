import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useState } from "react";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { useNavigate } from "react-router-dom";

import userService from "../../utils/userService";

function SignUpPage({handleSignUpOrLogin}) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault(); 

    // const formData = new FormData();
    // formData.append("photo", selectedFile);

    for (let key in state) {
      formData.append(key, state[key]);
    }

	
    console.log(formData.forEach((item) => console.log(item)));

	try {
		
		await userService.signup(formData); 

		handleSignUpOrLogin(); 

		navigate('/')

	} catch(err){
		console.log(err.message, ' this is the error in signup')
		setError('Check your terminal, there was an error signing up')
	}

  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid 
    textAlign="center" 
    style={{ height: "100vh", width: "100vw" }} 
    verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as="h2" color="orange" textAlign="center">
          <Image style={{ width: 900, height: 200 }} src="https://i.imgur.com/bmvBJ82.png" /> 
          <h2>Sign Up</h2>
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
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
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
           <Button color= "orange" type="submit" className="btn">
              Signup
            </Button>
    
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default SignUpPage;
