import { InstanceData, BaseClass, GradeMap, Grading, BootstrapUser, APIResponse } from "../spec";
import { superagent, NODE, FAKE_HEADERS } from "../Constants";

export interface AuthenticatedBootstrapResponse {
    nid: number;
    lib: string;
    _formkey: string;
    _formname: string;
    uuid: string;
    version: number;
    rights: number;
    perm: {
        roles: string[];
    }
    data: {
        nid: number;
        nodetype: number;
        nodesubtype: number;
        WebSockServerActive: number;
        roles: string[];
        isaroles: string[];
        user: BootstrapUser;
    }
}

export default async function getBootstrapUser(instanceData: InstanceData): Promise<BootstrapUser> {
    const HEADER_OVERRIDES = {Referer: `https://${instanceData.host}/p/BasePublic/`};

    const response = await superagent.get(NODE(instanceData))
                                .query({
                                    xds: "bootstrap"
                                })
                                .set({...FAKE_HEADERS(instanceData), ...HEADER_OVERRIDES});

    const apiResponse: APIResponse<[AuthenticatedBootstrapResponse]> = JSON.parse(response.text);

    return apiResponse.slices[0].data.user;
}