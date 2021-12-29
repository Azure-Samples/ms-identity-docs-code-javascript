/*
 This application demonstrates how to issue a call to a protected API endpoint
 using the On-behalf-of flow.  This application will issue a request to
 the Microsoft Graph /me endpoint on behalf of the authenticated user.
*/

// Microsoft Authentication Library (MSAL) for Node.Js
const msal = require('@azure/msal-node')

// Node.Js Express Framework
const express = require('express')

// Used to make HTTP GET requests to Graph
const https = require('https')

// Used to verify tokens
const jsonwebtoken = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa')

// The port the express server will listen on
const SERVER_PORT = 8080

// 'Directory (tenant) ID' in Azure portal - this value is a GUID
const tenant = ''

const config = {
  auth: {
    
    // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    clientId: '',
    
    // Client secret 'Value' (not its ID) from 'Client secrets' in app registration in Azure portal
    clientSecret: '',

    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    authority: `https://login.microsoftonline.com/${tenant}`
  }
}

// Initialize MSAL configuration with above values
const cca = new msal.ConfidentialClientApplication(config)

const app = express()

// Needed to validate tokens
const client = jwksRsa({
  jwksUri: `https://login.microsoftonline.com/${tenant}/discovery/v2.0/keys`
})

// Attempt to validate the token. If validation fails, present the user with an HTTP 401 error.
const validateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    const validationOptions = {
      audience: config.auth.clientId,
      issuer: config.auth.authority + '/v2.0'
    }

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
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

// This portion responds to the user when the /me endpoint is requested
app.get('/me', validateJwt, (req, res) => {
  const authHeader = req.headers.authorization

  const oboRequest = {
    oboAssertion: authHeader.split(' ')[1],
    scopes: ['user.read']
  }

  // Request a new token On-behalf-of the user, using the token provided by the user when they accessed the /me endpoint
  cca.acquireTokenOnBehalfOf(oboRequest).then((response) => {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${response.accessToken}` }
    }

    const callback = function (graphResponse) {
      graphResponse.on('data', function (chunk) {
        res.send(chunk)
      })
    }
    https.request('https://graph.microsoft.com/v1.0/me', options, callback).end()
  })
})

app.listen(SERVER_PORT, () => console.log(`\nListening here:\nhttp://localhost:${SERVER_PORT}/me`))
