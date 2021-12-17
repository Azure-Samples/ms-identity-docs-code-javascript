const msal = require("@azure/msal-node");
const express = require("express");
const https = require("https");
const jsonwebtoken = require("jsonwebtoken");
const jwksRsa = require("jwks-rsa");

const SERVER_PORT= 8080;

const tenant = '**TENANT_GOES_HERE**';

const config =  {
        auth:   {
                clientId: '**CLIENT_ID_GOES_HERE**',
                clientSecret: '**CLIENT_SECRET_GOES_HERE**',
                authority: `https://login.microsoftonline.com/${tenant}`
        }
};

const cca = new msal.ConfidentialClientApplication(config);

const app = express();

const validateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        const validationOptions = {
            audience: config.auth.clientId,
            issuer: config.auth.authority + '/v2.0'
        }

        jsonwebtoken.verify(token, getSigningKeys, validationOptions, (err, payload) => {
            if (err) {
                console.log(err);
                return res.sendStatus(401);
            }
           next();
        });
    }
};


const getSigningKeys = (header, callback) => {
    var client = jwksRsa({
        jwksUri: `https://login.microsoftonline.com/${tenant}/discovery/v2.0/keys`
    });

    client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}


const callGraph = (accessToken, callback) => {
    const options = {
        method: 'GET',
        headers: {'Authorization': `Bearer ${accessToken}`}
    };

    const req = https.request('https://graph.microsoft.com/v1.0/me', options, (res) => {
        res.on('data', (chunk) => {
            callback(chunk);
        });
    });
    req.end();
}


app.get('/me', validateJwt, (req, res) => {
    const authHeader = req.headers.authorization;

    const oboRequest = {
        oboAssertion: authHeader.split(' ')[1],
        scopes: ['user.read'],
    }

    cca.acquireTokenOnBehalfOf(oboRequest).then((response) => {
        callGraph(response.accessToken, (graphResponse) => {
            res.status(200).send(graphResponse);
        });
    });
});


app.listen(SERVER_PORT, () => console.log(`\nListening here:\nhttp://localhost:${SERVER_PORT}/me`));
