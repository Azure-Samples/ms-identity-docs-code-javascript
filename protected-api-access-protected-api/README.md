<!-- Keeping yaml frontmatter commented out for now
---
# Metadata required by https://docs.microsoft.com/samples/browse/
# Metadata properties: https://review.docs.microsoft.com/help/contribute/samples/process/onboarding?branch=main#add-metadata-to-readme
languages:
- Node.Js
page_type: sample
name: "Node.Js application that makes a request to the Graph API from a protected API on behalf of a user"
description: "This sample Node.Js application shows a confidential client application which calls a protected API which make a request to Microsoft Graph using the on-behalf-of flow."
products:
- azure
- azure-active-directory
- ms-graph
urlFragment: ms-identity-docs-code-api-nodejs
---
-->

# Node.js | web app | user sign-in, access control (protected routes), protected web API access (Microsoft Graph) | Microsoft identity platform

<!-- Build badges here
![Build passing.](https://img.shields.io/badge/build-passing-brightgreen.svg) ![Code coverage.](https://img.shields.io/badge/coverage-100%25-brightgreen.svg) ![License.](https://img.shields.io/badge/license-MIT-green.svg)
-->

This sample Node.Js application demonstrates a confidential client application which calls a protected API which then makes a request to Microsoft Graph via the on-behalf-of flow.

![A browser screenshot on a page showing a response from Microsoft Graph](./app.png)

> :page_with_curl: This sample application backs one or more technical articles on docs.microsoft.com. <!-- TODO: Link to first tutorial in series when published. -->

## Prerequisites

- Azure Active Directory (Azure AD) tenant and the permissions or role required for managing app registrations in the tenant.
- Node.Js 16+
- An existing Web API

## Setup

### 1. Modify your existing Web API

| App registration <br/> setting    | Value for this sample app                                                    | Notes                                                                                              |
|:---------------------------------:|:-----------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| **Expose an API scope**           | api://{clientid}/user_impersonation                                          | Required value for this sample. <br/> The Node Web App registration will reference this value.     |
| **accessTokenAcceptedVersion**    | 2                                                                            | Required value for this sample.                                                                    |

### 2. Register Node Web App

Complete the steps in [Register an application with the Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app) to register the sample app.

Use these settings in your app registration.

| App registration <br/> setting    | Value for this sample app                                                    | Notes                                                                                              |
|:---------------------------------:|:-----------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| **Name**                          | `Node Web APP`                                                               | Suggested value for this sample. <br/> You can change the app name at any time.                    |
| **Supported account types**       | **Accounts in this organizational directory only (Single tenant)**           | Suggested value for this sample.                                                                   |
| **Platform type**                 | **Web**                                                                      | Required value for this sample.                                                                    |
| **Redirect URI**                  | `http://localhost:8080/redirect`                                             | Required value for this sample.                                                                    |
| **Client secret**                 | _**Value** of the client secret (not its ID)_                                | :warning: Record this value immediately! <br/> It's shown only _once_ (when you create it).        |
| **API Permissions**               | `user_impersonation`                                                         | Create a new delegated permission called user_impersonation.  Required value for this sample.      |


### 3. Modify your existing Web API

Update these settings to reference the new Web App

| App registration <br/> setting    | Value for this sample app                                                    | Notes                                                                                              |
|:---------------------------------:|:-----------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| **"knownClientApplications**      | Client ID (UUID) of the application created in step 2.                       | Required value for this sample.                                                                    |


> :information_source: **Bold text** in the tables above matches (or is similar to) a UI element in the Azure portal, while `code formatting` indicates a value you enter into a text box in the Azure portal.




### 4. Update code sample with app registration values

'tenant' - this is the Directory (tenant) ID from the Node Web APP registration
'clientId' - this is the Application (client) ID from the Node Web APP registration
'clientSecret' - this is the Client secret 'Value' from 'Client Secrets' from the Node Web APP registration

### 3. Install necessary Node.Js modules

npm i @azure/msal-node
npm i express
npm i https
npm i jsonwebtoken
npm i jwks-rsa



## Run the application

```bash
node app.js
```

## Browse to the application

Using postman or a similar app, navigate to **http://localhost:8080/me**
You will need to provide a POST request such as:

Authorization: Bearer {token}


If everything worked, the sample app should produce the JSON-formatted output of a graph /me request for your user.

![A browser screenshot showing the weclome page to the sample application.](./home.png)

## About the code

This demo shows how a confidential client application in Node.Js can call a protected web API on-behalf-of the initiating user.


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
