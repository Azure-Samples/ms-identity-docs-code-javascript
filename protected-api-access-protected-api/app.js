/*
 This application demonstrates how to issue a call to a protected API
 using the On-behalf-of flow.  A request will be issued to the
 Microsoft Graph /me endpoint on behalf of the authenticated user.
*/

// Microsoft Authentication Library (MSAL) for Node.Js
const msal = require('@azure/msal-node')

// Node.Js Express Framework
const express = require('express')

// Used to make the HTTP GET request to the Graph API
const https = require('https')

// Used to verify authentication tokens
const jsonwebtoken = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa')

// The port the express server will listen on
const SERVER_PORT = 8080

// 'Directory (tenant) ID' in Azure portal
const tenant = ''

const config = {
  auth: {
    
    // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    clientId: '',
    
    // Client secret 'Value' (not the ID) from 'Client secrets' in app registration in Azure portal
    clientSecret: '',

    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    authority: `https://login.microsoftonline.com/${tenant}`
  }
}

// Initialize MSAL configuration with above values
const cca = new msal.ConfidentialClientApplication(config)

const app = express()


// The signing keys are located on the specified JWKS (JSON Web Key Set) endpoint.
// Required for token validation.
const jwksClient = jwksRsa({
  jwksUri: `https://login.microsoftonline.com/${tenant}/discovery/v2.0/keys`
})


const validateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {

    // Extract the authorization token from the header
    const token = authHeader.split(' ')[1]

    // Each token has a target audience and issuer
    const validationOptions = {
      audience: config.auth.clientId,
      issuer: config.auth.authority + '/v2.0'
    }

    // Attempt to verify the token. If validation fails, return an HTTP 401 error.
    jsonwebtoken.verify(token, getSigningKeys, validationOptions, (err, payload) => {
      if (err) {
        console.log(err)
        return res.sendStatus(401)
      }
      next()
    })
  }
}

const getSigningKeys = (header, callback) => {
  jwksClient.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey
    callback(null, signingKey)
  })
}

// This portion responds to the user when the /me endpoint is requested
app.get('/me', validateJwt, (req, res) => {

  // Get the authorization header
  const authHeader = req.headers.authorization

  // Prepare configuration for the On-behalf-of request
  const oboRequest = {
    oboAssertion: authHeader.split(' ')[1],
    scopes: ['user.read']
  }

  // Request a Graph API token On-behalf-of the user, using the token provided by the user when they accessed this API's /me endpoint
  cca.acquireTokenOnBehalfOf(oboRequest).then((response) => {

    // Configure HTTP settings for the GET resquest, with the authorization bearer token in the header.
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${response.accessToken}` }
    }

    // Collect the output from the HTTP GET request and send it back to the requesting API
    const callback = function (graphResponse) {
      graphResponse.on('data', function (chunk) {
        res.send(chunk)
      })
    }

    // Make the request against the Graph API
    https.request('https://graph.microsoft.com/v1.0/me', options, callback).end()
  })
})

// Allow our app to be open to receiving connections
app.listen(SERVER_PORT, () => console.log(`\nListening here:\nhttp://localhost:${SERVER_PORT}/me`))
