import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import userService from "./utils/userService";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import TripPage from "./pages/TripPage/TripPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getUser, gets the jwt from localstorage and decodes it
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }
  if (user) {
  return (
    <Routes>
      <Route path="/" element={<TripPage loggedUser={user} handleLogout={handleLogout} />} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      <Route path="/:username" element={<ProfilePage loggedUser={user} handleLogout={handleLogout} />} />
    </Routes>
  );
}

return (
  <Routes>
    <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
    />
    <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
    />
    <Route path="/*" element={<Navigate to="/login" />} />
  </Routes>
);
}

export default App;




