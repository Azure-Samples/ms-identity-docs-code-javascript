---
# Metadata required by https://docs.microsoft.com/samples/browse/
# Metadata properties: https://review.docs.microsoft.com/help/contribute/samples/process/onboarding?branch=main#add-metadata-to-readme
languages:
- nodejs
page_type: sample
name: Node.js application that protects its endpoint
description: "This Node.js API protects its own protected endpoint using JWT scope validation."
products:
- azure
- azure-active-directory
- microsoft-identity-platform
urlFragment: ms-identity-docs-code-web-api-nodejs
---

# Node.js | web API | access control (protected routes) | Microsoft identity platform

<!-- Build badges here
![Build passing.](https://img.shields.io/badge/build-passing-brightgreen.svg) ![Code coverage.](https://img.shields.io/badge/coverage-100%25-brightgreen.svg) ![License.](https://img.shields.io/badge/license-MIT-green.svg)
-->

This Node.js API protects its own endpoint using JWT scope validation.

```console
$ curl http://localhost:8080/ -H "Authorization: Bearer {valid-access-token}"
Hello, world. You were able to access this because you provided a valid access token with the Greeting.Read scope as a claim.
```

## Prerequisites

- A Microsoft Entra tenant and the permissions or role required for managing app registrations in the tenant.
- Node.js 16+

## Setup

### 1. Register the app

First, complete the steps in [Configure an application to expose a web API](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-expose-web-apis) to register the sample API and expose its scopes.

Use these settings in your app registration.

| App registration <br/> setting    | Value for this sample app                                                    | Notes                                                                                              |
|:---------------------------------:|:-----------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| **Name**                          | `Node Web API`                                                               | Suggested value for this sample. <br/> You can change the app name at any time.                    |
| **Supported account types**    | **Accounts in this organizational directory only (Single tenant)**   | Suggested value for this sample.                                                 |
| **Platform type**              | _None_                                                               | No redirect URI required; don't select a platform.                               |
| **Scopes defined by this API** | **Scope name**: `Greeting.Read`<br/>**Who can consent?**: **Admins and users**<br/>**Admin consent display name**: `Read API Greetings`<br/>**Admin consent description**: `Allows the user to see greetings from the API.`<br/>**User consent display name**: `Read API Greetings`<br/>**User consent description**: `Allows you to see greetings from the API.`<br/>**State**: **Enabled** | Required scope for this sample. |

> :information_source: **Bold text** in the tables above matches (or is similar to) a UI element in the Microsoft Entra admin center, while `code formatting` indicates a value you enter into a text box in the Microsoft Entra admin center.

### 2. Update code sample with app registration values

```javascript
auth: {
  // 'Directory (tenant) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
    tenant: 'Enter_the_Tenant_ID_Here',

    // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
    audience: 'Enter_the_Application_Id_Here'
}
```

### 3. Install package(s)

To install Node.js libraries:

```bash
npm install
```

## Run the application

```bash
node app.js
```

## Browse to the application

Using Postman, curl, or a similar application, issue an HTTP GET request to *http://localhost:8080/me* with an `Authorization` header of `Bearer {VALID-ACCESS-TOKEN}`.

For example, if you use curl and everything worked, the sample you should receive a response from the API similar to this:

```console
$ curl http://localhost:8080/ -H "Authorization: Bearer {VALID-ACCESS-TOKEN}"
Hello, world. You were able to access this because you provided a valid access token with the Greeting.Read scope as a claim.
```

## About the code

This Node.js application uses the Express web framework. The app has a single route that requires an access token. The access token will be validated.
- A missing or invalid (expired, wrong audience, etc) token will result in a `401` response.
- An otherwise valid token without the proper scope will result in a `403` response.
- A valid token with the proper scope of `Greeting.Read` will be accepted, and the API will return a "Hello, world" message.

## Reporting problems

### Sample app not working?

If you can't get the sample working, you've checked [Stack Overflow](https://stackoverflow.com/questions/tagged/express-jwt), and you've already searched the issues in this sample's repository, open an issue report the problem.

1. Search the [GitHub issues](../../issues) in the repository - your problem might already have been reported or have an answer.
1. Nothing similar? [Open an issue](../../issues/new) that clearly explains the problem you're having running the sample app.

### All other issues

> :warning: WARNING: Any issue in this repository _not_ limited to running one of its sample apps will be closed without being addressed.

For all other requests, see [Support and help options for developers | Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/developer-support-help-options).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
