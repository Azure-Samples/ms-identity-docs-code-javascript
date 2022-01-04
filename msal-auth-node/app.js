/*
 This application demonstrates how to include authorization
 to an API written in Node.Js 16.
*/

// Microsoft Authentication Library (MSAL) for Node.Js
const msal = require('@azure/msal-node')

// Node.Js Express Framework
const express = require('express')

// The port the express server will listen on
const SERVER_PORT = 8080

const config = {
  auth: {
    
    // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    clientId: '',
    
    // Client secret 'Value' (not the ID) from 'Client secrets' in app registration in Azure portal
    clientSecret: '',

    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    authority: ``
  }
}

// Initialize MSAL configuration with above values
const cca = new msal.ConfidentialClientApplication(config)

const app = express()

// This portion handles the request in the browser when the user requests the / endpoint
app.get('/', (req, res) => {

  const authCodeUrlParameters = {

    // The scope is the API scope we are authorizing
    scopes: [''],

    // The redirectUri is where MSAL will redirect the browser after the authorization attempt
    redirectUri: `http://localhost:${SERVER_PORT}/redirect`
  }

  // Create the URL for the authorization request then redirect to that URL
  cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
    res.redirect(response)
  })
})

// This portion handles the request in the browser when the user requests the /redirect endpoint
// This endpoint requires authorization
app.get('/redirect', (req, res) => {

  const tokenRequest = {

    // Get the value of the 'code' parameter from the query string
    code: req.query.code,

    // These are the scope(s) and redirectUri needed by our API
    scopes: [''],
    redirectUri: `http://localhost:${SERVER_PORT}/redirect`
  }

  // Attempt to validate the token request for our scope(s) and URI
  cca.acquireTokenByCode(tokenRequest).then((response) => {
    res.status(200).send('Authorized')
  }).catch((error) => {
    res.status(500).send('Unauthorized')
  })
})

app.listen(SERVER_PORT, () => console.log(`App listening on: http://localhost:${SERVER_PORT}/`))
