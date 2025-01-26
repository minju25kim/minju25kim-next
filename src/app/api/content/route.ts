import { NextApiRequest, NextApiResponse } from 'next';
import { getAllContent, getContentById } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { query, headers } = req;

    try {
        // Check for a custom header to determine the type of request
        const requestType = headers['x-request-type'];

        switch (requestType) {
            case 'get-by-id':
                // Fetch content by ID
                if (query?.id) {
                    const content = await getContentById(query.id as string);
                    return NextResponse.json(content, { status: 200 });
                } else {
                    return res.status(400).json({ error: 'ID is required' });
                }

            // case 'get-by-category':
            //     // Fetch content by category
            //     if (query?.category) {
            //         const content = await getContentByCategory(query.category as string);
            //         return res.status(200).json(content);
            //     } else {
            //         return res.status(400).json({ error: 'Category is required' });
            //     }

            // case 'get-by-author':
            //     // Fetch content by author
            //     if (query?.author) {
            //         const content = await getContentByAuthor(query.author as string);
            //         return res.status(200).json(content);
            //     } else {
            //         return res.status(400).json({ error: 'Author is required' });
            //     }

            // case 'get-by-date':
            //     // Fetch content by date
            //     if (query?.date) {
            //         const content = await getContentByDate(query.date as string);
            //         return res.status(200).json(content);
            //     } else {
            //         return res.status(400).json({ error: 'Date is required' });
            //     }

            default:
                // Default to fetching all content
                const contents = await getAllContent();
                return NextResponse.json(contents, { status: 200 });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 });
    }
}

