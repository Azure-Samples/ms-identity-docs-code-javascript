
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// <ms_docref_import_modules>
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
// </ms_docref_import_modules>

// <ms_docref_configure_msal>
const configuration: Configuration = {
  auth: {
      clientId: "",
      // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
      authority: "",
      // Must be the same redirectUri as what was provided in your AD app registration.
      redirectUri: ""
  }
};

const clientInstance = new PublicClientApplication(configuration);
// </ms_docref_configure_msal>

// <ms_docref_get_graph_token>
const getGraphToken =  async (msalInstance, accounts) => {
  const tokenRequest = {
    scopes: ["User.Read", "openid", "profile"],
    account: accounts
  }
  
  try{
    const {accessToken} = await msalInstance.acquireTokenSilent(tokenRequest);
    return accessToken;
  } catch (e) {
    const {accessToken} = await msalInstance.acquireTokenPopup(tokenRequest);
    return accessToken;
  }
  
}
// </ms_docref_get_graph_token>

// <ms_docref_make_graph_call>
const MICROSOFT_GRAPH_URL = "https://graph.microsoft.com/v1.0"

const fetchUserDetails = async (msalInstance, accounts, setUserDetails) => {
  const bearer = `Bearer ${await getGraphToken(msalInstance, accounts)}`;
  const response = await fetch(`${MICROSOFT_GRAPH_URL}/me`, { 
    method: 'get', 
    headers: new Headers({
      'Authorization': bearer
    })
  }).then(res => res.json());

  setUserDetails(response)
}
// </ms_docref_make_graph_call>

const PageContent = () => {

  const [userDetails, setUserDetails] = useState({});

  // <ms_docref_use_msal_context>
  const { instance, accounts } = useMsal();
  // </ms_docref_use_msal_context>

  const {name} = accounts[0]||{};

  // <ms_docref_check_logged_in_state>
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? (
    <div>
    <p><a href="http://localhost:3000/">Home</a> | <button onClick={() => instance.logout()}>Logout</button></p>
    <p>You are logged in. Welcome {name}.</p>

    <p><button onClick={() => fetchUserDetails(instance, accounts, setUserDetails)}>Fetch User Details from Graph</button></p>

      {userDetails.displayName ? (
        <div>
          <p><strong>Business Phones:</strong> {userDetails.businessPhones}</p>
          <p><strong>Display Name:</strong> {userDetails.displayName}</p>
          <p><strong>Given Name:</strong> {userDetails.givenName}</p>
          <p><strong>Job Title:</strong> {userDetails.jobTitle}</p>
          <p><strong>Mail:</strong> {userDetails.mail}</p>
          <p><strong>Mobile Phone:</strong> {userDetails.mobilePhone}</p>
          <p><strong>Office Location:</strong> {userDetails.officeLocation}</p>
          <p><strong>Preferred Language:</strong> {userDetails.preferredLanguage}</p>
          <p><strong>Surname:</strong> {userDetails.surname}</p>
          <p><strong>User Principal Name:</strong> {userDetails.userPrincipalName}</p>
          <p><strong>Profile Id:</strong> {userDetails.id}</p>
          <br /><br />
        </div>
        ): ""}

    </div>
    ):
    (

      // <ms_docref_add_login_button>
      <div>
        <p><a href="http://localhost:3000/">Home</a> | <button onClick={() => instance.loginPopup()}>Login</button></p>
        </div>
      // </ms_docref_add_login_button>

      );
  // </ms_docref_check_logged_in_state>

}

// <ms_docref_use_msal_provider>
ReactDOM.render(
  <React.StrictMode>

    <MsalProvider instance={clientInstance}>
      <PageContent />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
// </ms_docref_use_msal_provider>