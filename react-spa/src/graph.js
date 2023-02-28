// <ms_doc_ref_import_config>

import { graphConfig } from "./authConfig";

// </ms_doc_ref_import_config>

// <ms_doc_ref_call_graph_api>
/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
// </ms_doc_ref_call_graph_api>
