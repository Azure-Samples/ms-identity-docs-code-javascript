<!-- Keeping yaml frontmatter commented out for now
---
# Metadata required by https://docs.microsoft.com/samples/browse/
# Metadata properties: https://review.docs.microsoft.com/help/contribute/samples/process/onboarding?branch=main#add-metadata-to-readme
languages:
- Node.js
page_type: sample
name: "Node.js application that makes a request to the Graph API from a protected API on behalf of a user"
description: "This sample Node.js application shows a confidential client application which calls a protected API which make a request to Microsoft Graph using the on-behalf-of flow."
products:
- azure
- azure-active-directory
- ms-graph
urlFragment: ms-identity-docs-code-api-nodejs
---
-->

# Node.js | web API | user sign-in, access control (protected routes), protected web API access (Microsoft Graph) | Microsoft identity platform

<!-- Build badges here
![Build passing.](https://img.shields.io/badge/build-passing-brightgreen.svg) ![Code coverage.](https://img.shields.io/badge/coverage-100%25-brightgreen.svg) ![License.](https://img.shields.io/badge/license-MIT-green.svg)
-->

This sample Node.js application demonstrates a confidential client application which calls a protected API which then makes a request to Microsoft Graph via the on-behalf-of flow.

## Prerequisites

- Azure Active Directory (Azure AD) tenant and the permissions or role required for managing app registrations in the tenant.
- Node.js 16+

## Setup

### 1. Register the app

Complete the steps in [Register an application with the Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app) to register the sample app.

Use these settings in your app registration.

| App registration <br/> setting    | Value for this sample app                                                    | Notes                                                                                              |
|:---------------------------------:|:-----------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| **Name**                          | `Node Web API`                                                               | Suggested value for this sample. <br/> You can change the app name at any time.                    |
| **Supported account types**       | **Accounts in this organizational directory only (Single tenant)**           | Suggested value for this sample.                                                                   |
| **Platform type**                 | _None_                                                                      | No redirect URI required; don't select a platform.                                                                    |
| **Client secret**                 | _**Value** of the client secret (not its ID)_                                | :warning: Record this value immediately! <br/> It's shown only _once_ (when you create it).        |
| **API Permissions**               | `user_impersonation`                                                         | Create a new permission called user_impersonation.  Required value for this sample.      |


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

## Browse to the application

Using postman or a similar app, navigate to **http://localhost:8080/me**
You will need to provide an HTTP GET request such as:

Authorization: Bearer {token}


If everything worked, the sample app should produce the JSON-formatted output of a graph /me request for your user.

```console
{
  "@odata.context":"https://graph.microsoft.com/v1.0/$metadata#users/$entity",
  "businessPhones":[],
  "displayName":"Firstname Lastname",
  "givenName":"",
  "jobTitle":null,
  "mail":null,
  "mobilePhone":null,
  "officeLocation":null,
  "preferredLanguage":null,
  "surname":"Lastname",
  "userPrincipalName":"",
  "id":"00000000-0000-0000-0000-000000000000"
  }
```



## About the code

This demo shows how a confidential client application in Node.js can call a protected web API on-behalf-of the initiating user.


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