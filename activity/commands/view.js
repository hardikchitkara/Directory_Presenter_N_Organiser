let fs = require("fs");
let path = require("path");

module.exports={
    fn:viewHelper
}

function isFileOrNot(src) {
    return fs.lstatSync(src).isFile();
}
function readContent(src) {
    return fs.readdirSync(src);
}
function viewTree(src,indent)
{
    let isFile=isFileOrNot(src);
    
    if(isFile==true)
    {
        console.log(indent, path.basename(src,"*"));
    }
    else{
        console.log(indent, path.basename(src));
        let fDirnames=readContent(src);
        for(let i=0;i<fDirnames.length;i++)
        {
            let child=fDirnames[i];
            let dirNamepath=path.join(src,child);
            viewTree(dirNamepath,indent+"\t");
        }
    }
}
function viewFlat(src)
{
    // how to find if given path is file or directory 
    let isFile = isFileOrNot(src);
    if (isFile == true) {
        console.log(src + "*");
    }
    else {
        // print
        console.log(src);
        // content read from os
        let fDirnames = readContent(src);
        // recursion 
        // console.log(fDirnames);
        for (let i = 0; i < fDirnames.length; i++) {
            let child = fDirnames[i];
            //    good practice??
            // let dirNamepath = src + "\\" + child;
            let dirNamepath = path.join(src, child);
            viewFlat(dirNamepath)
        }
    }
}
function viewHelper(dirName,mode)
{
    if(mode=="tree")
    {
        viewTree(dirName,"");
    }
    else if(mode=="flat")
    {
        viewFlat(dirName);
    }
    else{
        console.log("wrong mode typw help for commands");
    }
}
