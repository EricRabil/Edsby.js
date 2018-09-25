import readline from "readline-sync";

import getInstanceData from "./rest/actions/GetInstanceData";
import login from "./rest/actions/Login";
import getBootstrapUser from "./rest/actions/Bootstrap";
import { InstanceData } from "./rest/spec";
import { saveCookies } from "./rest/util";
import { setInstanceData } from "./Constants";

let edsbyInstanceData: InstanceData;

getInstanceData("https://sdhc.edsby.com").then(instanceData => {
    const username = readline.question("What's your Edsby username?\n");
    const password = readline.question("What's your Edsby password?\n");
    edsbyInstanceData = instanceData;
    setInstanceData(instanceData);
    return {instanceData, username, password};
}).then(({instanceData, username, password}) => login(instanceData, username, password))
.then(body => {
    if (body.error) {
        console.error(body);
        process.exit(body.error as number);
    }
    console.log("Connected.");
    console.log(`Your name: ${body.slices[0].data.name}`);
    saveCookies();
    return getBootstrapUser(edsbyInstanceData);
}).then(user => {
    console.log(user);
});