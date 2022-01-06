<!-- Keeping yaml frontmatter commented out for now
---
# Metadata required by https://docs.microsoft.com/samples/browse/
# Metadata properties: https://review.docs.microsoft.com/help/contribute/samples/process/onboarding?branch=main#add-metadata-to-readme
languages:
- Node.Js
page_type: sample
name: "Node.Js API that protects its own endpoint"
description: "This Node.Js API protects its own endpoint using JWT scope validation."
products:
- azure
- azure-active-directory
urlFragment: ms-identity-docs-code-webapp-nodejs
---
-->

# Node.js | web API | access control (protected routes) | Microsoft identity platform

<!-- Build badges here
![Build passing.](https://img.shields.io/badge/build-passing-brightgreen.svg) ![Code coverage.](https://img.shields.io/badge/coverage-100%25-brightgreen.svg) ![License.](https://img.shields.io/badge/license-MIT-green.svg)
-->

This Node.Js sample protects its own endpoint using JWT scope validation.

```console
$ curl http://localhost:8080 -H "Authorization: Bearer {valid-access-token}"
Hello, world. You were able to access this because you provided a valid access token with the Greeting.Read scope as a claim.
```

<!-- TODO: Link to first tutorial in series when published. -->

## Prerequisites

- Azure Active Directory (Azure AD) tenant and the permissions or role required for managing app registrations in the tenant.
- Node.Js 16+

## Setup

### 1. Register your Web API

Complete the steps in [Register an application with the Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app) to register the sample app.

Use these settings in your app registration.

| App registration <br/> setting    | Value for this sample app                                                    | Notes                                                                                              |
|:---------------------------------:|:-----------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| **Name**                          | `Node Web API`                                                               | Suggested value for this sample. <br/> You can change the app name at any time.                    |
| **Supported account types**    | **Accounts in this organizational directory only (Single tenant)**   | Suggested value for this sample.                                                 |
| **Platform type**              | _None_                                                               | No redirect URI required; don't select a platform.                               |
| **Scopes defined by this API** | **Scope name**: `Greeting.Read`<br/>**Who can consent?**: **Admins and users**<br/>**Admin consent display name**: `Read API Greetings`<br/>**Admin consent description**: `Allows the user to see greetings from the API.`<br/>**User consent display name**: `Read API Greetings`<br/>**User consent description**: `Allows you to see greetings from the API.`<br/>**State**: **Enabled** | Required scope for this sample. |


> :information_source: **Bold text** in the tables above matches (or is similar to) a UI element in the Azure portal, while `code formatting` indicates a value you enter into a text box in the Azure portal.
### 4. Update code sample with app registration values

```javascript
app.use(jwt({
  secret: jwks.expressJwtSecret({

    // JWKS URI in the form of: https://login.microsoftonline.com/<tenant>/discovery/v2.0/keys
    jwksUri: ''
  }),
  
  // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
  audience: '',
  
  // Full directory URL, in the form of: https://login.microsoftonline.com/<tenant>/v2.0
  issuer: '',

  algorithms: ['RS256']
}))
```



### 3. Install package(s)

To install Node.Js libraries into your (virtual) environment:

```bash
npm install
```

## Run the application

```bash
node app.js
```

## Access the API

Open postman, curl, or similar and make an HTTP GET request to **http://localhost:8080** with an `Authorization` header of `Bearer {valid-access-token}`. If everything worked, the sample app should produce output similar to this:

```console
$ curl http://localhost:8080 -H "Authorization: Bearer {valid-access-token}"
Hello, world. You were able to access this because you provided a valid access token with the Greeting.Read scope as a claim.
```



## About the code

This Node.Js API has a single route that requires an access token. The access token will be automatically validated by MSAL. A missing or invalid (expired, wrong audience, etc) token will result in a `401` response. An otherwise valid token without the proper scopes will result in a `403` response. A valid token with a proper scope of (`Greeting.Read`) will result in a "Hello, world." message.


## Reporting problems

### Sample app not working?

If you can't get the sample working, you've checked [Stack Overflow](http://stackoverflow.com/questions/tagged/msal), and you've already searched the issues in this sample's repository, open an issue report the problem.

1. Search the [GitHub issues](../../issues) in the repository - your problem might already have been reported or have an answer.
1. Nothing similar? [Open an issue](../../issues/new) that clearly explains the problem you're having running the sample app.

### All other issues

> :warning: WARNING: Any issue in this repository _not_ limited to running one of its sample apps will be closed without being addressed.

For all other requests, see [Support and help options for developers | Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/developer-support-help-options).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
