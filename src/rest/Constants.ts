import agent from "superagent";
import { InstanceData } from "./spec";

// below are template functions for generating Edsby API routes

export const HOST = (instanceData: InstanceData) => `https://${instanceData.host}.edsby.com`;
export const LOGIN_ROUTE = (instanceData: InstanceData) => `${HOST(instanceData)}/core/login/${instanceData.nid}`;
export const NODE_META = (instanceData: InstanceData) => `${HOST(instanceData)}/core/node.json/${instanceData.nid}`;

/**
 * The user-agent to send to Edsby
 */
export const FAKE_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15';

/**
 * Headers to send on every request
 * @param instanceData the Edsby instance data
 */
export const FAKE_HEADERS = (instanceData: InstanceData) => ({
    'User-Agent': FAKE_AGENT,
    Origin: `https://${instanceData.host}.edsby.com`,
    Host: `${instanceData.host}.edsby.com`,
    Accept: '*/*',
    'Accept-Language': 'en-us',
    Referer: `https://${instanceData.host}.edsby.com/`,
    dnt: 1,
    'X-Requested-With': 'XMLHttpRequest'
})

/**
 * Provides a sessioned superagent instance
 * 
 * Cookies are sent/received normally when using this version
 * of superagent. Do not directly import superagent.
 */
export const superagent = agent.agent();