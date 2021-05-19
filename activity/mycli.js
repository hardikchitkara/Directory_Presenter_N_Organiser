#! /usr/bin/env node
let viewfile=require("./commands/view.js");
let organizefile=require("./commands/organize.js");
let helpfile=require("./commands/help.js");
let input=process.argv.slice(2);
//node mycli.js [view,dirNmae,tree]
let command=input[0];
//path
switch (command) {
    case "view":
        viewfile.fn(input[1],input[2]);
        break;
    case "organize":
        organizefile.fn(input[1]);
        break;
    case "help":
        helpfile.fn();
        break;
    default:
        break;
}
//view
//organize
//help