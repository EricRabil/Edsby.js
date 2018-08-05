import { InstanceData, APIResponse, CryptData } from "../spec";
import { NODE_META, FAKE_AGENT, superagent, FAKE_HEADERS } from "../Constants";

export interface SecurityData {
    sauthdata: string;
    _formkey: string;
}

/**
 * Gets the data necessary to perform secure actions
 * 
 * @param instanceData the Edsby instance data
 */
export default async function getSecurityData(instanceData: InstanceData): Promise<SecurityData> {
    const response = await superagent.get(NODE_META(instanceData))
                                .query({
                                    xds: "fetchcryptdata",
                                    type: "Plaintext-LeanLDAP"
                                })
                                .set(FAKE_HEADERS(instanceData));

    const apiResponse: APIResponse<[CryptData]> = response.body;
    
    return {
        sauthdata: apiResponse.slices[0].data.sauthdata,
        _formkey: apiResponse.slices[0]._formkey
    }
}