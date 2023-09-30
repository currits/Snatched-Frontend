import React, { createContext, useContext, useState, useEffect } from 'react';

import { decode } from 'base-64'

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_ENDPOINT = require("./Constants").API_ENDPOINT;
const AuthContext = createContext();

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(decode(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Should be using a state manager for this sort of thing
export function AuthProvider({ children }) {
  const [isInitializing, setInitializing] = useState(true);

  const getJwt = async () => {
    // Attempt to retreive the token from storage
    return await AsyncStorage.getItem('token').then((token) => {
      // Note: not entirely secure. The app should securely cache the email/password in the
      // OS keychain using something like https://github.com/oblador/react-native-keychain
      // Then, when the JWT expires (usually every ~15 min), login again in the background
      // This would involve creating a wrapper for every API request made in the app to
      // check if the JWT is about to expire and grab a new one transparently.
      if (token !== null) {
        // check if token is valid
        const expirationTimestamp = parseJwt(token).exp * 1000; // Convert to milliseconds
        const currentTimestamp = Date.now();

        // 
        if (currentTimestamp > expirationTimestamp) {
          // not valid - get user to login again
          setIsLoggedIn(false);
        } else {
          // still valid
          setIsLoggedIn(true);

          return token;
        }
      }
      else {
        // Otherwise if no token
        setIsLoggedIn(false); 
      }
    });
  }

  useEffect(() => {
    getJwt().then(() => { setInitializing(false) });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  const signup = async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINT + "/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      });

      if (response.ok) {
        await login(email, password);
      } else {
        throw await response.text();
      }
    }
    catch (error) {
      throw error; // Rethrow the error to allow the caller to catch it.
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINT + "/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        return data; // You can return data if needed.
      } else {
        throw await response.text();
      }
    }
    catch (error) {
      throw error; // Rethrow the error to allow the caller to catch it.
    }
  };

  const logout = () => {
    AsyncStorage.setItem('token', "");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup, isInitializing, getJwt }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
