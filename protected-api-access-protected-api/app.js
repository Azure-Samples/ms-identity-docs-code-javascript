/*
 This application demonstrates how to issue a call to a protected API
 using the On-behalf-of flow.  A request will be issued to the
 Microsoft Graph /me endpoint on behalf of the authenticated user.
*/

// Microsoft Authentication Library (MSAL) for Node.js
const msal = require('@azure/msal-node')

// Node.js Express Framework
const express = require('express')

// Used to validate authentication tokens
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')

// Used to make the HTTP GET request to the Graph API
const https = require('https')

// MSAL configs
const config = {
  auth: {
    // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    clientId: '',
   
    // Client secret 'Value' (not the ID) from 'Client secrets' in app registration in Azure portal
    clientSecret: '',
   
    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    authority: ''
  }
}


// Initialize MSAL
const msalConfidentialClientApp = new msal.ConfidentialClientApplication(config)

const app = express()

// Validate the token from the user
app.use(jwt({
  secret: jwks.expressJwtSecret({
    // Full URL, in the form of: https://login.microsoftonline.com/<tenant>/discovery/v2.0/keys
    jwksUri: ''
  }),
 
  // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
  audience: config.auth.clientId,
 
  // Full URL, in the form of: https://login.microsoftonline.com/<tenant>/v2.0
  issuer: config.auth.authority + '/v2.0',
 
  // Algorithm for MSAL tokens is R256
  algorithms: ['RS256']
}))

// Proceed to the /me endpoint if the user's token has 'user_impersonation' scope
app.get('/me', jwtAuthz(['user_impersonation'], { customScopeKey: 'scp' }), (req, res) => {
  // Get the user's token
  const authHeader = req.headers.authorization

  const oboRequest = {
    oboAssertion: authHeader.split(' ')[1],
    scopes: ['user.read']
  }

  // Send the user's token to Graph, to receive a token for Graph on-behalf-of the user
  msalConfidentialClientApp.acquireTokenOnBehalfOf(oboRequest).then((response) => {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${response.accessToken}` }
    }

    const callback = function (graphResponse) {
      graphResponse.on('data', function (chunk) {
        res.send(chunk)
      })
    }

    // Perform an HTTP GET request against the Graph endpoint with the token issued by Graph on-behalf-of the user
    https.request('https://graph.microsoft.com/v1.0/me', options, callback).end()
  })
})

app.listen(8080, () => console.log('\nListening here:\nhttp://localhost:8080'))
