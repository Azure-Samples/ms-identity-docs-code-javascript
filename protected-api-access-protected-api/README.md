---
# Metadata required by https://docs.microsoft.com/samples/browse/
# Metadata properties: https://review.docs.microsoft.com/help/contribute/samples/process/onboarding?branch=main#add-metadata-to-readme
languages:
- nodejs
page_type: sample
name: Node.js application that makes a request to the Graph API from a protected API on behalf of a user
description: This sample Node.js application shows a confidential client application which calls a protected API which make a request to Microsoft Graph using the on-behalf-of flow.
products:
- azure
- azure-active-directory
- ms-graph
- microsoft-identity-platform
urlFragment: ms-identity-docs-code-api-obo-nodejs
---

<!-- SAMPLE ID: DOCS-CODE-015-->
# Node.js | web API | access control (protected routes), protected web API access (Microsoft Graph) | Microsoft identity platform

<!-- Build badges here
![Build passing.](https://img.shields.io/badge/build-passing-brightgreen.svg) ![Code coverage.](https://img.shields.io/badge/coverage-100%25-brightgreen.svg) ![License.](https://img.shields.io/badge/license-MIT-green.svg)
-->

This demo shows how a confidential client application in Node.js can call a protected web API on-behalf-of the initiating user.

```console
$ curl http://localhost:8080/me -H "Authorization: Bearer {valid-access-token}"
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
  "businessPhones": ["+1 (999) 5551001"],
  "displayName": "Contoso Employee",
  "givenName": "Contoso",
  "jobTitle": "Worker",
  "mail": "cemployee@contoso.com",
  "mobilePhone": "1 999-555-1001",
  "officeLocation": "Contoso Plaza/F30",
  "preferredLanguage": null,
  "surname": "Employee",
  "userPrincipalName": "contoso_employee@contoso.com",
  "id": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee"
}

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
| **Supported account types**       | **Accounts in this organizational directory only (Single tenant)**           | Suggested value for this sample.                                                                   |
| **Platform type**                 | _None_                                                                      | No redirect URI required; don't select a platform.                                                                    |
| **Client secret**                 | _**Value** of the client secret (not its ID)_                                | :warning: Record this value immediately! <br/> It's shown only _once_ (when you create it).        |
| Scopes defined by this API        | Scope name: `user_impersonation`<br/>Who can consent?: Admins and users<br/>Admin consent display name: `User Impersonation`<br/>Admin consent description: `Allows the application to perform an action on behalf of the user.`<br/>User consent display name: `User Impersonation`<br/>User consent description: `Allows the application to perform an action on behalf of the user.`<br/>State: Enabled                                                          | Required scope for this sample.      |

> :information_source: **Bold text** in the tables above matches (or is similar to) a UI element in the Microsoft Entra admin center, while `code formatting` indicates a value you enter into a text box in the Microsoft Entra admin center.

### 2. Update code sample with app registration values

```javascript
auth: {
  // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
  clientId: 'Enter_the_Application_Id_Here',
   
  // Client secret 'Value' (not the ID) from 'Client secrets' in app registration in Microsoft Entra admin center
  clientSecret: 'Enter_the_Client_Secret_Value_Here',
   
  // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
  authority: 'https://login.microsoftonline.com/Enter_the_Tenant_ID_Here'
}
```



### 3. Install package(s)

To install Node.js and MSAL libraries:

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
$ curl http://localhost:8080/me -H "Authorization: Bearer {VALID-ACCESS-TOKEN}"
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
  "businessPhones": ["+1 (999) 5551001"],
  "displayName": "Contoso Employee",
  "givenName": "Contoso",
  "jobTitle": "Worker",
  "mail": "cemployee@contoso.com",
  "mobilePhone": "1 999-555-1001",
  "officeLocation": "Contoso Plaza/F30",
  "preferredLanguage": null,
  "surname": "Employee",
  "userPrincipalName": "contoso_employee@contoso.com",
  "id": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee"
}
```

### Generating a valid access token

Follow the instructions in [Gaining consent for the middle-tier application](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow#gaining-consent-for-the-middle-tier-application), including setting the API's app registration manifest value of **knownClientApplications**.

## About the code

This Node.js application uses the Express web framework. The app has a single route that requires an access token. The access token will be automatically validated by MSAL:
- A missing or invalid (expired, wrong audience, etc) token will result in a `401` response.
- An otherwise valid token without the proper scope will result in a `403` response.
- A valid token with the proper scope of `user_impersonation` will be accepted, and the token will then be exchanged in an on-behalf-of OAuth flow to call to Microsoft Graph. The results of the Microsoft Graph call are then returned as the results of the API call.

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
