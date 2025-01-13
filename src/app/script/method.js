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
        id: fileData.length,
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

export const readFull = fileData;
 
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

// can use my method i.e. [a,b,c,d] == [a.b] [c,d] == [a,b] [d] pop c == [a , b , d] join. this way the array doesn't leave a hole upon delete as array is of stack data structure.
export function remove(id_){
    fileData.splice(id_, 1);
    //console.log(fileData);

    // but this leaves hole in the id this may create issue for later id as the id is created on the basis of the array length and that may clash with each other
    // this changes the id of the objects after the removed object to -1
   
    for(let i = id_; i < fileData.length; i++){
      //  console.log(i);
        fileData[i].id = i;
    }

   fs.writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
}


