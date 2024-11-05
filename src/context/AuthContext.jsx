import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Loaded authUser from localStorage:", storedUser);
      return storedUser || null;
    } catch (error) {
      console.error("Error parsing localStorage item 'user':", error);
      return null;
    }
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  // Function to validate the stored token by verifying with the backend
  function validate() {
    if (!authUser || !authUser.authToken) {
      console.log("No user or token found");
      setLoggedInUser(null);
      return;
    }

    console.log("Validating token for user", authUser);

    axios
      .get("http://localhost:5005/auth/verify", {
        headers: { Authorization: `Bearer ${authUser.authToken}` },
      })
      .then((res) => {
        console.log("VERIFIED USER", res);
        setLoggedInUser(res.data); // Save the verified user info
      })
      .catch((error) => {
        console.error("Token verification failed:", error);
        setLoggedInUser(null); // Clear the logged-in user if verification fails
      });
  }

  // useEffect to run validation and handle localStorage updates
  useEffect(() => {
    if (authUser) {
      validate(); // Validate token if authUser exists
      localStorage.setItem("user", JSON.stringify(authUser)); // Update localStorage with new user
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage if authUser is null
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loggedInUser, validate }}>
      {children}
    </AuthContext.Provider>
  );
};
