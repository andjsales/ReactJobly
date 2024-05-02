import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly application */
function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  // MARK: useEffect()
  useEffect(() => {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          const { username } = jwt.decode(token);
          JoblyApi.token = token;
          const currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);


  // MARK: logout()
  /** Handles site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }


  // MARK: signup(signupData)
  /** Handles site-wide signup */
  async function signup(signupData) {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token); // Set token for future authenticated requests
      return { success: true };
    } catch (errors) {
      console.error("Signup failed", errors);
      return { success: false, errors };
    }
  }


  // MARK: login(loginData)
  /** Handles site-wide login */
  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Checks if a job has been applied for */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={ { currentUser, setCurrentUser, hasAppliedToJob, applyToJob } }
      >
        <div className="App">
          <Navigation logout={ logout } />
          <Routes login={ login } signup={ signup } />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
