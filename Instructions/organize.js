const fs = require('fs')

const path = require('path')

let types = {
       media: ["mp4", "mkv", "mp3"],
       archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
       documents: [
         "docx",
         "doc",
         "pdf",
         "xlsx",
         "xls",
         "odt",
         "ods",
         "odp",
         "odg",
         "odf",
         "txt",
         "ps",
         "tex",
       ],
       app: ["exe", "dmg", "pkg", "deb"],
       image: ["png","jpeg","jpg"]
     };
function organize(dirpath) {
        let destPath;// directory Path
        if (dirpath == undefined) {
          console.log("Please Enter a valid directory Path");
          return;
        } else {
          let doesExist = fs.existsSync(dirpath);
          if (doesExist == true) {
            destPath = path.join(dirpath, "Organized_Files");
            if (fs.existsSync(destPath) == false) {
              fs.mkdirSync(destPath);
            } else {
              //console.log("Folder Already Exists");
            }
          } else {
            console.log("Please Enter a valid Path for directory");
          }
        }
        organizeHelper(dirpath, destPath);
      }
      
      //function to categorize files
      function organizeHelper(src, dest) {
        let childNames = fs.readdirSync(src); // get list of the files and folders inside your src
        //console.log(childNames)
      
        for (let i = 0; i < childNames.length; i++) {
          let childAddress = path.join(src, childNames[i]); 
          let isFile = fs.lstatSync(childAddress).isFile(); 
          //console.log(childAddress + "  " + isFile)
      
          if (isFile == true) {
            let fileCategory = getCategory(childNames[i]); //.txt
            console.log(childNames[i] + "  belongs to  " + fileCategory);
            sendFiles(childAddress, dest, fileCategory);
          }
        }
      } 
      function getCategory(name) {
        let ext = path.extname(name);
        ext = ext.slice(1); // we will take out the extension names of the files as it will be ".txt" but requirement is "txt"
        //console.log(ext)
      
        for (let type in types) {
          let cTypeArr = types[type];//each type has list of extensions
          //console.log(cTypeArr)
      
          for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i])
              return type;
          }
        }
      
        return "others";
      }
      
      function sendFiles(srcFilePath, dest, fileCategory) {
        let catPath = path.join(dest, fileCategory); // here we are making file categories paths
      
        if (fs.existsSync(catPath) == false) {
          // if category folder not there create category folder
          fs.mkdirSync(catPath);
        }
      
        let fileName = path.basename(srcFilePath); /// we took out the names of the files
        let destFilePath = path.join(catPath, fileName); // here we created a path for the files in category folders
      
        fs.copyFileSync(srcFilePath, destFilePath); // copied files from src to dest
      
        fs.unlinkSync(srcFilePath); // delete the files from src
      
        //console.log(fileName + "is copied to " + fileCategory);
      }
 
 
      module.exports={
             organizeKey: organize
      }