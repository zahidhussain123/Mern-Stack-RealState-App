import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider 
    domain="dev-nrdya46540hut0v8.us.auth0.com"
    clientId="5snqH4SvWuF14H2KjJsP6VqBDkyOrKnH"
    authorizationParams={{
      redirect_uri: "https://mern-stack-real-state-app-client.vercel.app"
    }}
    audience="http://localhost:5000"
    scope="openid profile email"
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
