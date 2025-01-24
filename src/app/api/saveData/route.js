import fs from 'fs';
import path from 'path';


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

       
         const filePath = "public/data/mockData.json";
        let data = [];

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            data = JSON.parse(fileData);
        }

        // change the data content
        console.log("below it is");
        console.log(slug);
        

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
