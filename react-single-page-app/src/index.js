import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// <ms_docref_import_modules>
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
// </ms_docref_import_modules>

// <ms_docref_configure_msal>
const configuration: Configuration = {
  auth: {
      clientId: "034ff080-d093-433d-915c-4f12ae03f100"
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
    return await msalInstance.acquireTokenSilent(tokenRequest);
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
    <div>You are logged in. Welcome {name}.<br/>
      <button onClick={() => instance.logout()}>Logout</button>

      <button onClick={() => fetchUserDetails(instance, accounts, setUserDetails)}>Fetch User Details from Graph</button>

      {userDetails.displayName ? (
        <div>
          Display Name and Email
          <br/>
          <span> {userDetails.displayName} </span>
          <span> {userDetails.mail} </span>
        </div>
        ): ""}

    </div>
    ):
    (

      // <ms_docref_add_login_button>
      <div><button onClick={() => instance.loginPopup()}>Login</button> </div>
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
