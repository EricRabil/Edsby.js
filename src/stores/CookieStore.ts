import { Store } from "./Store";
import { Cookie } from "cookiejar";

export class _CookieStore extends Store {
    public cookies: Cookie[] | null;

    public constructor() {
        super("cookies", ["cookies"]);
    }
}

export const CookieStore = Store.proxy(new _CookieStore);