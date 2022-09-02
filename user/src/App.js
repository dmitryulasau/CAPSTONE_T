// import Home from "./views/pages/home/Home";
import Login from "./views/pages/profile/login/login";
import Profile from "./views/pages/profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/pages/home/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SignIn from "./views/pages/profile/login/SignIn";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/register" replace />}
          />

          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />

          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <SignIn />}
          />

          <Route path="/all" element={<Home />} />

          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
