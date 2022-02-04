<!-- Keeping yaml frontmatter commented out for now
---
# Metadata required by https://docs.microsoft.com/samples/browse/
# Metadata properties: https://review.docs.microsoft.com/help/contribute/samples/process/onboarding?branch=main#add-metadata-to-readme
languages:
- Node.js
page_type: sample
name: "Node.js application that makes a request to the Graph API as itself"
description: "This sample Node.js application demonstrates how to issue a call to a protected API using the client credentials flow.  A request will be issued to Microsoft Graph using the application's own identity."
products:
- azure
- azure-active-directory
- ms-graph
urlFragment: ms-identity-docs-code-api-ccf-nodejs
---
-->

# Node.js | web API | access control, protected web API access (Microsoft Graph) | Microsoft identity platform

<!-- Build badges here
![Build passing.](https://img.shields.io/badge/build-passing-brightgreen.svg) ![Code coverage.](https://img.shields.io/badge/coverage-100%25-brightgreen.svg) ![License.](https://img.shields.io/badge/license-MIT-green.svg)
-->

This sample Node.js application demonstrates how to issue a call to a protected API using the client credentials flow.  A request will be issued to Microsoft Graph using the application's own identity.
```console
$ node app.js
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
  "id": "e3a49d8b-d849-48eb-9947-37c1f9589812"
}

```
## Prerequisites

- Azure Active Directory (Azure AD) tenant and the permissions or role required for managing app registrations in the tenant.
- Node.js 16+

## Setup

### 1. Register the app

First, complete the steps in [Configure an application to expose a web API](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-expose-web-apis) to register the sample API and expose its scopes.

Use these settings in your app registration.

| App registration <br/> setting    | Value for this sample app                                                    | Notes                                                                                              |
|:---------------------------------:|:-----------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| **Name**                          | `Node Web API`                                                               | Suggested value for this sample. <br/> You can change the app name at any time.                    |
| **Supported account types**       | **Accounts in this organizational directory only (Single tenant)**           | Suggested value for this sample.                                                                   |
| **Platform type**                 | _None_                                                                       | No redirect URI required; don't select a platform.                                                                    |
| **Client secret**                 | _**Value** of the client secret (not its ID)_                                | :warning: Record this value immediately! <br/> It's shown only _once_ (when you create it).        |
| **API Permissions**               | `User.Read.All`                                                              | Add an Application Permission for Microsoft Graph. Grant admin consent. Required value for this sample.      |

> :information_source: **Bold text** in the tables above matches (or is similar to) a UI element in the Azure portal, while `code formatting` indicates a value you enter into a text box in the Azure portal.

### 2. Update code sample with app registration values

```javascript
auth: {
  // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
  clientId: '',

  // Client secret 'Value' (not the ID) from 'Client secrets' in app registration in Azure portal
  clientSecret: '',

  // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
  authority: ''
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

If everything worked, the sample you should receive a response from the API similar to this:

```console
$ node app.js
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
  "id": "e3a49d8b-d849-48eb-9947-37c1f9589812"
}
```

## About the code

This Node.js application uses the Microsoft Authentication Library (MSAL) to acquire a token for Graph as the application iteslf.  The application must be configured in Azure Active Directory to allow the application to request access tokens as itself.  The 'https' library is used to issue the request to Graph and collect the response.

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
