import { superagent, HOST } from "../Constants";
import { InstanceData } from "../spec";

export default async function initialize(instanceData: InstanceData) {
    await superagent.get(HOST(instanceData));
}