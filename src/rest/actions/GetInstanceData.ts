import { InstanceData } from "../spec";
import { superagent } from "../Constants";

export const OPEN_SESAME_REGEX = /openSesame\(({(?:(?:"[a-z]*":"?\w*"?),?)*})\)/g;
export const HOST_REGEX = /https:\/\/(.+\.edsby\.com)/g;

/**
 * Gets the instance metadata at the given host
 * 
 * @param url the host. make sure it is just the host. ex: https://sdhc.edsby.com
 */
export default async function getInstanceData(url: string): Promise<InstanceData | null> {
    OPEN_SESAME_REGEX.lastIndex = 0;
    HOST_REGEX.lastIndex = 0;

    const hostData = HOST_REGEX.exec(url);
    if (!hostData) return null;
    const host = hostData[1];

    const response = await superagent.get(url);
    const html = response.text;
    const openSesame = OPEN_SESAME_REGEX.exec(html);
    if (!openSesame) return null;

    return {host, ...JSON.parse(openSesame[1])};
}