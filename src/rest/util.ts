import { CookieStore } from "../stores/CookieStore";
import { superagent } from "./Constants";
import { CookieAccessInfo, Cookie } from "cookiejar";

export function saveCookies() {
    CookieStore.cookies = superagent.jar.getCookies(CookieAccessInfo.All) as Cookie[];
}

export function loadCookies() {
    if (CookieStore.cookies) {
        for (let cookie of CookieStore.cookies) {
            superagent.jar.setCookie(cookie);
        }
    }
}