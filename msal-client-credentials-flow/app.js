/*
 This application demonstrates how to issue a call to a protected web API
 using the client credentials flow.  A request will be issued to
 Microsoft Graph using the application's own identity.
*/

// Microsoft Authentication Library (MSAL) for Node.js
const msal = require('@azure/msal-node')

// Node.js Express Framework
const express = require('express')

// Used to make the HTTP GET request to the Graph API
const https = require('https')

// MSAL configs
const msalConfig = {
  auth: {
    // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
    clientId: 'Enter_the_Application_Id_Here',

    // Client secret 'Value' (not the ID) from 'Client secrets' in app registration in the Microsoft Entra admin center
    clientSecret: 'Enter_the_Client_Secret_Value_Here',

    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    authority: 'https://login.microsoftonline.com/Enter_the_Tenant_ID_Here',

    // 'Object ID' of app registration in the Microsoft Entra admin center - this value is a GUID
    clientObjectId: 'Enter_the_Client_Object_ID_Here'
  }
}

// Initialize MSAL
const msalConfidentialClientApp = new msal.ConfidentialClientApplication(msalConfig)

// In a client credentials flow, the scope is always in the format '<resource>/.default'
const tokenRequest = {
  scopes: ['https://graph.microsoft.com/.default']
}

// Initialize Express
const app = express()

app.get('/api/application', (req, res) => {
  // Request a token for Graph as the application itself
  msalConfidentialClientApp.acquireTokenByClientCredential(tokenRequest).then((response) => {
    const options = {
      headers: { Authorization: `Bearer ${response.accessToken}` }
    }

    // MSAL Node uses an in-memory token cache by default
    // Repeated HTTP GET requests will utilize the cached token until it nears expiration, at which point a new access token will be requested.
    console.log(`\nAccess token was from cache?: ${response.fromCache}`)

    // Perform an HTTP GET request against the Graph endpoint with the access token as authorization
    https.get('https://graph.microsoft.com/v1.0/applications/' + msalConfig.auth.clientObjectId, options, (graphResponse) => {
      let graphData = ''

      // Collect the response data from Microsoft Graph
      graphResponse.on('data', function (chunk) {
        graphData += chunk
      })

      // Deliver the data collected from Microsoft Graph
      graphResponse.on('end', function () {
        res.send(graphData)
      })
    }).end()
  })
})

app.listen(8080, () => console.log('\nListening here:\nhttp://localhost:8080/'))
