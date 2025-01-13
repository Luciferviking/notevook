import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const body = await req.json();
        const { userInput } = body;

        if (!userInput || userInput.trim() === '') {
            return new Response(JSON.stringify({ message: 'Input cannot be empty!' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const filePath = path.join(process.cwd(), 'tempData', 'mockData.json');
        let data = [];

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            data = JSON.parse(fileData);
        }

        // Add the new data
        data.push({ id: Date.now(), text: userInput });

        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return new Response(JSON.stringify({ message: 'Data saved successfully!' }), {
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
