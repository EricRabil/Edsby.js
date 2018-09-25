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

export interface UniqueNID {
    nid: string;
}

export interface NodeType {
    nodetype: number;
    nodesubtype: number;
}

export interface UniqueRID {
    rid: string;
}

export interface Named {
    name: string;
    title: string;
}

export type NidNode = UniqueNID & NodeType;

export type NRIDNode = NidNode & UniqueRID;
export type NRID = UniqueNID & UniqueRID;

export interface BootstrapUser extends NidNode {
    name: string;
    FirstName: string;
    pbits: number;
    base: string;
    guid: string;
    grading: {[rid: string]: Grading};
    mapping: {[rid: string]: GradeMap};
    classes: {[rid: string]: BaseClass};
    schools: {[rid: string]: School};
}

export interface BaseClass extends NRIDNode, Named {
    code: string;
    reltype: number;
    teacherNid: number;
    studentLock: number;
    teacherName: string;
    parentsAllowed: number;
}

export interface GradeMap extends NRIDNode, Named {
    rowsJSON: string;
}

export interface Grading extends NRIDNode, Named {
    mapping: string;
    cols: string;
    noconfig?: boolean;
    formativeOnly?: boolean;
}

export interface School extends NRIDNode {
    school: string;
    AverageType: string;
    FailThreshold: number;
}

export interface BasePerson extends NRIDNode {
    name: string;
}

export interface FeedAlignment {
    profpic?: string;
    footer?: {
        date: string;
    };
    normal?: {
        body: string;
        name: {
            user: string;
        }
    };
};

export interface FeedPost extends NRIDNode {
    /**
     * post author nid
     */
    createid: number;
    left: FeedAlignment;
    right: FeedAlignment;
    /**
     * original post nid
     * for op its equal to nid
     * for comments its equal to parent nid
     */
    thread: string;
    timestamp: Date;
}

export interface Assignment extends NRID {
    totalPossible: number;
    name: string;
    thread: number;
    date: Date;
    electronicSubmission: boolean;
    graded: boolean;
    published: boolean;
    weight: number;
}

export interface Grade {
    score: number;
    assignmentNID: number;
}