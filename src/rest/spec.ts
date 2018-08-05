export interface InstanceData {
    version: number;
    compiled: string;
    system: string;
    nid: number;
    base: string;
    uid: number;
    host: string;
}

export interface APIResponse<T = any> {
    compiled: string;
    unid: number;
    slices: T;
}

export interface CryptData {
    data: {
        nid: number;
        nodetype: number;
        nodesubtype: number;
        sauthdata: string;
    };
    nid: number;
    xds: {
        _fqname: string;
        _fields: Array<{id: string, func: string}>;
        _lang: string;
        _desc: string;
        perm: {
            nodetypes: number;
            roles: string;
            /**
             * @todo verify
             */
            rights: "R" | "RW" | "W";
        };
        _nid: number;
        _owner: string;
        id: string;
    };
    _formkey: string;
    _formname: string;
    uuid: string;
    version: number;
    rights: number;
    perm: {
        xdii: {
            fetchcryptdata: number;
        };
        roles: string[];
    }
}