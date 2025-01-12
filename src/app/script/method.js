import path from 'path';
import { promises as fs } from 'fs';

const filePath = path.join(process.cwd(), '/data/mockData.json');
const fileDataStr = await fs.readFile(filePath, 'utf-8');
const fileData = JSON.parse(fileDataStr);

//console.log(fileData);



export function create(title_, content_){
    console.log(typeof(fileData));

    fileData.push({
        id: fileData.length + 1,
        title: title_,
        content: content_
    });

    return(console.log(fileData));
}

export function read(){}

export function update(){}

export function remove(){}