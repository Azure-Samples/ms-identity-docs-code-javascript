/*
 This Azure Function responds at GET /api/greeting.
 
 Authentication and authorization are performed by Azure Functions (sometimes called "Easy Auth").
 This function decodes the JSON web token to verify the required scope is included.
*/

// This module decodes JSON web tokens
const jwt = require("jsonwebtoken");

module.exports = async function (context, req) {
  try {
    // Decode the JSON web token which is passed in via the Authorization header
    const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);

    // If the scope includes 'Greeting.Read', then accept the request with a greeting message and default 200 status code
    // Otherwise reject the request with a failure message and 403 status code
    context.res =
      decodedToken.scp.split(" ").indexOf("Greeting.Read") > -1
        ? {
            body: "Hello, world. You were able to access this because you provided a valid access token with the Greeting.Read scope as a claim.",
          }
        : { body: "Missing required scope.", status: 403 };
  } catch (error) {
    context.res = { body: "Invalid token.", status: 403 };
  }
};
