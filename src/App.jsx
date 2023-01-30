import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import userService from "./utils/userService";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getUser, gets the jwt from localstorage and decodes it
  }
  return (
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
    </Routes>
  );
}

export default App;


