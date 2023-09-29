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

export function AuthProvider({ children }) {
  useEffect(() => {
    console.log("LAUNCHED!");

    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        // check if token is valid for some time (we don't want the token to be rejected while the user is using the app!)
        const expirationTimestamp = parseJwt(token).exp * 1000; // Convert to milliseconds
        const offsetInMilliseconds = 0; // 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
        const currentTimestamp = Date.now();

        if (currentTimestamp + offsetInMilliseconds > expirationTimestamp) {
          // no - get user to login again
          setIsLoggedIn(false);
        } else {
          // yes
          setIsLoggedIn(true);
        }
      }
      else {
        // Otherwise if no token
        setIsLoggedIn(false); 
      }
    });
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
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
