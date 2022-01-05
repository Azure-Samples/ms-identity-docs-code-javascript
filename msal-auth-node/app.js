/*
 This application demonstrates how to include authorization
 to an API written in Node.Js 16.
*/

// Node.Js Express Framework
const express = require('express')

// Used to validate authentication tokens
const jsonwebtoken = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa')

// The port the express server will listen on
const SERVER_PORT = 8080

// 'Directory (tenant) ID' in the Azure portal
const tenant = ''

const config = {
  auth: {

    // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    clientId: '',

    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    authority: `https://login.microsoftonline.com/${tenant}`
  }
}

// Scopes required for authentication
const requiredScopes = ['user_write', 'user_read']

const app = express()

// The signing keys are located on the specified JWKS (JSON Web Key Set) endpoint
// Required for token validation
const client = jwksRsa({
  jwksUri: `https://login.microsoftonline.com/${tenant}/discovery/v2.0/keys`
})

const validateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {

    // Extract the authorization tokenfromthe header
    const token = authHeader.split(' ')[1]

    const validationOptions = {
      // The expected audience is the clientId specified in 'audience'
      audience: config.auth.clientId,
      // The expected issuer is the authority specified in 'config'
      issuer: config.auth.authority + '/v2.0'
    }

    // Verify the token - 'expiry date' and 'not before date' are verified by default
    // Per the variable validationOptions, 'audience' and 'issuer' will also be verified
    jsonwebtoken.verify(token, getSigningKeys, validationOptions, (err, payload) => {
      if (err) {
        console.log(err)
        return res.sendStatus(401)
      }

      // If the token is valid, verify the user has the correct scope(s) to access the desired endpoint
      if (!requiredScopes.every(v => payload.scp.split(' ').includes(v))) {
        console.log('User does not have required scope(s)')
        return res.sendStatus(403)
      }

      next()
    })
  }
}

// Get the public key used to sign the token
const getSigningKeys = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    callback(null, key.publicKey)
  })
}

// Endpoint which displays 'Hello world' upon successful authentication
app.get('/', validateJwt, (req, res) => {
  res.status(200).send('Hello world')
})

app.listen(SERVER_PORT, () => console.log(`\nListening here:\nhttp://localhost:${SERVER_PORT}/`))
