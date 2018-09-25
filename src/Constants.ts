import { InstanceData } from "./rest/spec";

export const DEBUG = process.env.NODE_ENV === "development";
export var IS_NODE = false;

try {
    IS_NODE = !!global;
} finally {}

export const DEBUG_TREE: {[key: string]: any} = {};

if (DEBUG) {
    ((IS_NODE ? global : window) as any).DEBUG_TREE = DEBUG_TREE;
}

export var INSTANCE_DATA: InstanceData;

export function setInstanceData(instanceData: InstanceData) {
    INSTANCE_DATA = instanceData;
}