import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";

// Pages of the application
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Middleware checking if a user is logged in or not
import IsAnon from "./middleware/IsAnon";
import IsPrivate from "./middleware/IsPrivate";
import { AuthProviderWrapper } from "./context/AuthContext";

function App() {
  return (
    <AuthProviderWrapper>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/projects"
              element={
                <IsPrivate>
                  <ProjectPage />{" "}
                </IsPrivate>
              }
            />
            <Route
              path="/signup"
              element={
                <IsAnon>
                  <SignupPage />{" "}
                </IsAnon>
              }
            />
            <Route
              path="/login"
              element={
                <IsAnon>
                  <LoginPage />{" "}
                </IsAnon>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProviderWrapper>
  );
}

export default App;
