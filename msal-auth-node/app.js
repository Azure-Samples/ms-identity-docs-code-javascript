/*
 This application demonstrates how to issue a call to a protected API.
*/

// Node.js Express Framework
const express = require('express')

// Used to validate JWT access tokens
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')

const config = {
  auth: {
    // 'Directory (tenant) ID' of app registration in the Azure portal - this value is a GUID
    tenant: '',

    // 'Application (client) ID' of app registration in the Azure portal - this value is a GUID
    audience: ''
  }
}

// Initialize Express
const app = express()
// Add Express middleware to validate JWT access tokens
app.use(jwt({
  secret: jwks.expressJwtSecret({
    jwksUri: 'https://login.microsoftonline.com/' + config.auth.tenant + '/discovery/v2.0/keys'
  }),
  audience: config.auth.audience,
  issuer: 'https://login.microsoftonline.com/' + config.auth.tenant + '/v2.0',
  algorithms: ['RS256']
}))

// Verify the JWT access token is valid and contains 'Greeting.Read' for the scope to access the endpoint.
// Instruct jwtAuthz to pull scopes from the 'scp' claim, which is the claim used by Azure AD.
app.get('/', jwtAuthz(['Greeting.Read'], { customScopeKey: 'scp' }), (req, res) => {
  res.send('Hello, world. You were able to access this because you provided a valid access token with the Greeting.Read scope as a claim.')
})

app.listen(8080, () => console.log('\nListening here:\nhttp://localhost:8080'))
