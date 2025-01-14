import fs from 'fs';
import path from 'path';
// import { refreshData } from "../../script/method";

export async function POST(req) {
    try {
        const body = await req.json();
        const { slug , userInput , whichKey} = body;

        if (!userInput || userInput.trim() === '') {
            return new Response(JSON.stringify({ message: 'Input cannot be empty!' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const filePath = path.join(process.cwd(), 'data', 'mockData.json');
        let data = [];

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            data = JSON.parse(fileData);
        }

        // Add the new data
        // data.push({ id: Date.now(), text: userInput });

        // change the data content
        console.log("below it is");
        console.log(slug);
        

        function changeData(whatSlug, whatUserInput , whatWhichKey){
            // a: title b:content c: paragraph
            const workObj = data[whatSlug];
            switch(whatWhichKey){
                case "a":
                    workObj.title = whatUserInput;
                    break;
                case "b":
                    workObj.content = whatUserInput;
                    break;
                case "c":
                    workObj.paragraph = whatUserInput;        
                    break;
            }
            // refreshData();
        }

        changeData(slug, userInput , whichKey);

        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return new Response(JSON.stringify({ message: '' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('File operation failed:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET() {
    const filePath = path.join(process.cwd(), 'data', 'mockData.json');
    let data = [];
  
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileData);
    }
  
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  