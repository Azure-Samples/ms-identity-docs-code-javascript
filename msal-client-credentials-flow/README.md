---
# Metadata required by https://learn.microsoft.com/samples/browse/
# Metadata properties: https://review.learn.microsoft.com/help/contribute/samples/process/onboarding?branch=main#add-metadata-to-readme
languages:
- nodejs
page_type: sample
name: Node.js API that makes a request to the Graph API as itself
description: This sample Node.js API demonstrates how to issue a call to a protected API using the client credentials flow.  A request will be issued to Microsoft Graph using the application's own identity.
products:
- azure
- azure-active-directory
- ms-graph
- microsoft-identity-platform
urlFragment: ms-identity-docs-code-webapi-nodejs-client-credentials-flow
---

# Node.js | Web API | Web API that accesses a protected web API (Microsoft Graph) | Microsoft identity platform

<!-- Build badges here
![Build passing.](https://img.shields.io/badge/build-passing-brightgreen.svg) ![Code coverage.](https://img.shields.io/badge/coverage-100%25-brightgreen.svg) ![License.](https://img.shields.io/badge/license-MIT-green.svg)
-->

This Node.js web API issues a call to a protected web API (Microsoft Graph) by using the OAuth 2.0 client credentials flow. The request to the Microsoft Graph endpoint is issued using the Node.js web API's own identity.

```console
$ curl http://localhost:8080/api/application
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#applications/$entity",
  "id": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
  "deletedDateTime": null,
  "appId": "00001111-aaaa-2222-bbbb-3333cccc4444",
  "applicationTemplateId": null,
  "disabledByMicrosoftStatus": null,
  "createdDateTime": "2021-12-17T16:45:43Z",
  "displayName": "Node Web API",
  "description": null,
  "groupMembershipClaims": null,
  "identifierUris": [],
  "isDeviceOnlyAuthSupported": null,
  "isFallbackPublicClient": true,
  "notes": null,
  "publisherDomain": "contoso.onmicrosoft.com",
  "serviceManagementReference": null,
  "signInAudience": "AzureADMyOrg",
  "tags": [],
  "tokenEncryptionKeyId": null,
  "defaultRedirectUri": null,
  "certification": null,
  "optionalClaims": null
  ...
}
```
## Prerequisites

- A Microsoft Entra tenant and the permissions or role required for managing app registrations in the tenant.
- Node.js 16+

## Setup

### 1. Register the app

First, complete the steps in [Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/azure/active-directory/develop/quickstart-register-app) to register the web API.

Use these settings in your app registration.

| App registration <br/> setting    | Value for this sample app                                                    | Notes                                                                                              |
|---------------------------------:|:-----------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| **Name**                          | `Node Web API`                                                               | Suggested value for this sample. <br/> You can change the app name at any time.                    |
| **Supported account types**       | **Accounts in this organizational directory only (Single tenant)**           | Suggested value for this sample.                                                                   |
| **Platform type**                 | _None_                                                                       | No redirect URI required; don't select a platform.                                                                    |
| **Client secret**                 | _**Value** of the client secret (not its ID)_                                | :warning: Record this value immediately! <br/> It's shown only _once_ (when you create it).        |

> :information_source: **Bold text** in the tables above matches (or is similar to) a UI element in the Microsoft Entra admin center, while `code formatting` indicates a value you enter into a text box in the Microsoft Entra admin center.

### 2. Update code sample with app registration values

In [_app.js_](app.js), update the Microsoft Entra property values with those from your [app's registration in the Microsoft Entra admin center](https://learn.microsoft.com/azure/active-directory/develop/quickstart-configure-app-expose-web-apis).

```javascript
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
```

### 3. Install package(s)

Install the required Node.js, Express, and MSAL packages:

```bash
npm install
```

## Run the application

```bash
node app.js
```

If everything worked, you should receive a response from the downstream web API (Microsoft Graph, in this case) similar to this:

```console
$ curl http://localhost:8080/api/application
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#applications/$entity",
  "id": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
  "deletedDateTime": null,
  "appId": "00001111-aaaa-2222-bbbb-3333cccc4444",
  "applicationTemplateId": null,
  "disabledByMicrosoftStatus": null,
  "createdDateTime": "2021-12-17T16:45:43Z",
  "displayName": "Node Web API",
  "description": null,
  "groupMembershipClaims": null,
  "identifierUris": [],
  "isDeviceOnlyAuthSupported": null,
  "isFallbackPublicClient": true,
  "notes": null,
  "publisherDomain": "contoso.onmicrosoft.com",
  "serviceManagementReference": null,
  "signInAudience": "AzureADMyOrg",
  "tags": [],
  "tokenEncryptionKeyId": null,
  "defaultRedirectUri": null,
  "certification": null,
  "optionalClaims": null
  ...
}
```

## About the code

This Node.js web API has a single route (_/api/application_) that supports anonymous access.  When the anonymous route is called, the API requests its own application object from Microsoft Graph.

This web API uses the following:

- [Microsoft Authentication Library for Node.js (MSAL Node)](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node) - Used by this web API to get an access token for Microsoft Graph. This API uses MSAL to execute the OAuth 2.0 client credentials grant flow to get the access token so it can use its own identity in its requests to the Microsoft Graph API.
- [Express](https://expressjs.com/) (Node.js web framework) - Minimizes the amount of code required to build the web API and route the requests made to it by client applications.
- [`https`](https://nodejs.org/api/https.html) (Node.js module) - For issuing "raw" HTTP `GET` requests to Microsoft Graph and handling the responses to those `GET` requests.

## Reporting problems

### Sample app not working?

If you can't get the sample working, you've checked [Stack Overflow](http://stackoverflow.com/questions/tagged/msal), and you've already searched the issues in this sample's repository, open an issue report the problem.

1. Search the [GitHub issues](../../issues) in the repository - your problem might already have been reported or have an answer.
1. Nothing similar? [Open an issue](../../issues/new) that clearly explains the problem you're having running the sample app.

### All other issues

> :warning: WARNING: Any issue in this repository _not_ limited to running one of its sample apps will be closed without being addressed.

For all other requests, see [Support and help options for developers | Microsoft identity platform](https://learn.microsoft.com/azure/active-directory/develop/developer-support-help-options).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
