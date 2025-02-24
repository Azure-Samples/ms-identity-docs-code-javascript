/*
 This application demonstrates how to issue a call to a protected API
 using the on-behalf-of OAuth2 flow.  A request will be issued to the
 Microsoft Graph /me endpoint on behalf of the authenticated user.
*/

// Microsoft Authentication Library (MSAL) for Node.js
const msal = require('@azure/msal-node')

// Node.js Express Framework
const express = require('express')

// Used to validate JWT access tokens
const {expressjwt: jwt } = require("express-jwt");
const jwks = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')

// Used to make the HTTP GET request to the Graph API
const https = require('https')

// MSAL configs
const config = {
  auth: {
    // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
    clientId: 'Enter_the_Application_Id_Here',
   
    // Client secret 'Value' (not the ID) from 'Client secrets' in app registration in Microsoft Entra admin center
    clientSecret: 'Enter_the_Client_Secret_Value_Here',
   
    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    authority: 'https://login.microsoftonline.com/Enter_the_Tenant_ID_Here'
  }
}


// Initialize MSAL
const msalConfidentialClientApp = new msal.ConfidentialClientApplication(config)

// Initialize Express
const app = express()

// Add Express middleware to validate JWT access tokens
app.use(jwt({
  secret: jwks.expressJwtSecret({
    jwksUri: config.auth.authority + '/discovery/v2.0/keys'
  }),
  audience: config.auth.clientId,
  issuer: config.auth.authority + '/v2.0',
  algorithms: ['RS256']
}))

// Allow access to the /me endpoint if the provided JWT access token has
// the 'user_impersonation' scope.
app.get('/me', jwtAuthz(['user_impersonation'], { customScopeKey: 'scp', customUserKey: 'auth' }), (req, res) => {
  // Get the user's access token for *this* web API
  const authHeader = req.headers.authorization

  // Required for the on-behalf-of request (access token and scope(s)) to the downstream web API (Microsoft Graph, in this case)
  const oboRequest = {
    oboAssertion: authHeader.split(' ')[1],
    scopes: ['user.read']
  }

  // Obtain an access token for Graph on-behalf-of the user.
  // This access token comes from MSAL Node which maintains an in-memory token cache by default.
  msalConfidentialClientApp.acquireTokenOnBehalfOf(oboRequest).then((response) => {
    const options = {
      headers: { Authorization: `Bearer ${response.accessToken}` }
    }

    // Perform an HTTP GET request against the Graph endpoint with the access token issued by
    // Azure AD on behalf of the user.
    https.get('https://graph.microsoft.com/v1.0/me', options, (graphResponse) => {
       // Upon receiving the response from Microsoft Graph, deliver the output
       graphResponse.on('data', function (chunk) {
          res.send(chunk)
       })
    }).end()
  })
})

app.listen(8080, () => console.log('\nListening here:\nhttp://localhost:8080'))
