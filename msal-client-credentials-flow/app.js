/*
 This application demonstrates how to issue a call to a protected API
 using the client credentials flow.  A request will be issued to
 Microsoft Graph using the application's own identity.
*/

// Microsoft Authentication Library (MSAL) for Node.js
const msal = require('@azure/msal-node')

// Node.js Express Framework
const express = require('express')

// Used to make the HTTP GET request to the Graph API
const https = require('https')

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: 'c085fc22-2484-41c0-b795-2e940f51df64',
    clientSecret: 'w_m7Q~FGP6sjqoIFUvdaSvyFWu5t1_cGpA1rC',
    authority: 'https://login.microsoftonline.com/332b3d1d-3231-4ec6-b306-18f563ad0743'
  }
}

// Initialize MSAL
const msalConfidentialClientApp = new msal.ConfidentialClientApplication(msalConfig)

// In a client credentials flow, the scope is always in the format '<resource>/.default'
const tokenRequest = {
  scopes: ['https://graph.microsoft.com/.default'],
}

// Initialize Express
const app = express()

app.get('/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Request a token for Graph as the application itself
  msalConfidentialClientApp.acquireTokenByClientCredential(tokenRequest).then((response) => {
    const options = {
      headers: { Authorization: `Bearer ${response.accessToken}` }
    }

    // Perform an HTTP GET request against the Graph endpoint with the access token as authorization
    https.get('https://graph.microsoft.com/v1.0/users', options, (graphResponse) => {

      // Upon receiving the response from Microsoft Graph, deliver the output
      graphResponse.on('data', function (chunk) {
        res.send(chunk)
      })
    }).end()
  })
})

app.listen(8080, () => console.log('\nListening here:\nhttp://localhost:8080/users'))
