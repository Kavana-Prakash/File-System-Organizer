const helperModule = require("./Instructions/helper");
const organizeModule = require("./Instructions/organize");
const treeModule = require("./Instructions/tree");
let cmdlineInput = process.argv.slice(2);

//[node FileOrganize.js instruction folderpath]

let instruction = cmdlineInput[0];

switch (instruction) {
  case "tree":
    treeModule.treeKey(cmdlineInput[1]);
    break;
  case "organize":
    organizeModule.organizeKey(cmdlineInput[1]);
    break;
  case "help":
    helperModule.helperKey();
    break;

  default:
    console.log("PLEASE ENTER A VALID Command");
    break;
}