/*
 This application demonstrates how to include
 authorization for an API endpoint in Node.Js 16.
*/

// Node.Js Express Framework
const express = require('express')

// Libraries used to validate authentication tokens
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')

const app = express()

app.use(jwt({
   secret: jwks.expressJwtSecret({
   
   // Full URL, in the form of: https://login.microsoftonline.com/<tenant>/discovery/v2.0/keys
   jwksUri: ''
  }),
 
  // 'Application (client) ID' of app registration in the Azure portal - this value is a GUID
  audience: '',
 
  // Full URL, in the form of: https://login.microsoftonline.com/<tenant>/v2.0
  issuer: '',
 
  // Encryption algorithm
  algorithms: ['RS256']
}))

// Verify the token is valid and contains 'Greeting.Read' for the scope to access the / endpoint
app.get('/', jwtAuthz(['Greeting.Read'], { customScopeKey: 'scp' }), (req, res) => {
  res.send('Hello, world. You were able to access this because you provided a valid access token with the Greeting.Read scope as a claim.')
})

app.listen(8080, () => console.log('\nListening here:\nhttp://localhost:8080'))
