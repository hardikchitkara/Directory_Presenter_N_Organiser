let fs=require("fs");
let path=require("path");

let types = {
    media: ["mp4", "mkv"],
   // archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    //documents: ['docx', 'doc', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    pdf:['pdf'],
    txt:['txt'],
    xls:['xls'],
    word:['docx'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function isFileOrNot(src)
{
    return fs.lstatSync(src).isFile();
}
function readContent(src)
{
    return fs.readdirSync(src);
}
function copyfile(src,desFolder)
{
    if(fs.existsSync(desFolder)==false)
    {
        fs.mkdirSync(desFolder);
    }
    let fileName=path.basename(src);
    fs.copyFileSync(src,path.join(desFolder,fileName));
}
function getdestName(src)
{
    let extension=src.split(".").pop();
    for(let key in types)
    {
        for(let i=0;i<types[key].length;i++)
        {
            if(extension==types[key][i])
            {
                return key;
            }
        }
    }
    return "others";
}
function organize(src,dest)
{
    let isFile=isFileOrNot(src);
    if(isFile==true)
    {
        let folderName=getdestName(src);
        console.log(folderName);
        copyfile(src,path.join(dest,folderName));
    }
    else{
        let fdirnames=readContent(src);
        for(let i=0;i<fdirnames.length;i++)
        {
            let child=fdirnames[i];
            let dirNamepath=path.join(src,child);
            organize(dirNamepath,dest);
        }
    }
}

function organizefn(src)
{
    let destFolderPath=path.join(src,"organized_files");
    console.log(destFolderPath);
    if(fs.existsSync(destFolderPath)==false)
    {
        fs.mkdirSync(destFolderPath);
    }
    organize(src,destFolderPath);
    
}
module.exports={
    fn:organizefn
}
