import readline from "readline-sync";

import getInstanceData from "./rest/actions/GetInstanceData";
import login from "./rest/actions/Login";

getInstanceData("https://sdhc.edsby.com").then(instanceData => {
    const username = readline.question("What's your Edsby username?\n");
    const password = readline.question("What's your Edsby password?\n");
    login(instanceData, username, password).then(res => {
        console.log(res);
    });
});