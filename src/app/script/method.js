import path from 'path';
import { promises as fs } from 'fs';

const filePath = path.join(process.cwd(), '/data/mockData.json');
const fileDataStr = await fs.readFile(filePath, 'utf-8');
const fileData = JSON.parse(fileDataStr); // stores the whole parsed data in efficient

//console.log(fileData);

//search the id in the whole array and return the id's object
function search(id_){
    for(var x in fileData){
        const itrId = (fileData[x].id);
        if(itrId === id_){
          //console.log(fileData[x]);
          return x;
        }
    }
}

export async function create(title_, content_){
    //console.log(typeof(fileData));

    fileData.push({
        id: fileData.length + 1,
        title: title_,
        content: content_
    });

    await fs.writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf-8'); // rewrites the whole file instead of appending therefore process in efficient
    //return(console.log(fileData));
}
// reads the Id object
export function read(id_){
    //search func
    const idIndex = search(id_);
    //console.log(fileData[idIndex]);
    return(fileData[idIndex]);
}
 
export function update(id_, whatKey, whaContent){
    const workingObj = fileData[search(id_)];
    switch(whatKey){
        case "title": 
            workingObj.title = whaContent;
            break;
        case "content":
            workingObj.content = whaContent;
            break;
    }
    fs.writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
    //console.log(fileData[search(id_)]);
}

export function remove(){}