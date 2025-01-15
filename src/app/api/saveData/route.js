import fs from 'fs';
import path from 'path';
// import { refreshData } from "../../script/method";

export async function POST(req) {
    try {
        const body = await req.json();
        const { slug , userContent , userPara , userTitle } = body;

        if (!userContent || userContent.trim() === '') {
            return new Response(JSON.stringify({ message: 'Input cannot be empty!' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (!userPara || userPara.trim() === '') {
            return new Response(JSON.stringify({ message: 'Input cannot be empty!' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (!userTitle || userTitle.trim() === '') {
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
        // data.push({ id: Date.now(), text: userContent });

        // change the data content
        console.log("below it is");
        console.log(slug);
        

        // function changeData(whatSlug, whatUserContent , whatWhichKey){
        //     // a: title b:content c: paragraph
        //     const workObj = data[whatSlug];
        //     switch(whatWhichKey){
        //         case "a":
        //             workObj.title = whatUserContent;
        //             break;
        //         case "b":
        //             workObj.content = whatUserContent;
        //             break;
        //         case "c":
        //             workObj.paragraph = whatUserContent;        
        //             break;
        //     }
        //     // refreshData();
        // }

        // changeData(slug, userContent , whichKey);

        function saveData(whatSlug , whatUserContent, whatUserTitle, whatUserPara){
            const workObj = data[whatSlug];
            workObj.title = whatUserTitle;
            workObj.content = whatUserContent;
            workObj.paragraph = whatUserPara;
        }

        saveData(slug, userContent , userTitle, userPara);




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

// export async function GET() {
//     const filePath = path.join(process.cwd(), 'data', 'mockData.json');
//     let data = [];
  
//     if (fs.existsSync(filePath)) {
//       const fileData = fs.readFileSync(filePath, 'utf8');
//       data = JSON.parse(fileData);
//     }
  
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
  