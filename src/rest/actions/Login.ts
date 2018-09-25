import { InstanceData } from "../spec";
import getSecurityData from "./GetSecurityData";
import { LOGIN_ROUTE, superagent, FAKE_HEADERS } from "../Constants";
import { CookieAccessInfo } from "cookiejar";
import { CookieStore } from "../../stores/CookieStore";

/**
 * Initiates an authenticated session with Edsby.
 * 
 * @param instanceData the Edsby instance data
 * @param username the Edsby username
 * @param password the Edsby password
 */
export default async function login(instanceData: InstanceData, username: string, password: string): Promise<{[key: string]: string | number}> {
    const securityData = await getSecurityData(instanceData);

    const body = {
        ...securityData,
        crypttype: "Plaintext",
        "login-userid": username,
        "login-password": password,
        "login-host": instanceData.host,
        remember: 1
    };

    const query = {
        xds: "loginform",
        editable: true
    };

    const HEADER_OVERRIDES = {Referer: `https://${instanceData.host}/p/BasePublic/${instanceData.nid}`};

    const response = await superagent.post(LOGIN_ROUTE(instanceData))
                        .type('form')
                        .query(query)
                        .set({...FAKE_HEADERS(instanceData), ...HEADER_OVERRIDES})
                        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
                        .send(body);

    return JSON.parse((await response).text);
}