import { PlateEditor } from '@/components/PlateEditor';
import type { Value } from '@udecode/plate';
import { createClient } from '@/utils/supabase/server';

const initialValue: Value = [
    {
        children: [{ text: 'Title' }],
        type: 'h3',
    },
    {
        children: [{ text: 'This is a quote.' }],
        type: 'blockquote',
    },
    {
        children: [
            { text: 'With some ' },
            { bold: true, text: 'bold' },
            { text: ' text for emphasis!' },
        ],
        type: 'p',
    },
];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const supabase = await createClient();
  
    const { data: devDataRaw } = await supabase.from('dev').select('*').eq('slug', resolvedParams.slug);
  
    // console.log(devDataRaw?.[0]?.content)


    return (
        <div className="max-w-3xl mx-auto mt-12">
            <h1 className="text-2xl font-bold mb-6">Dev Content Editor</h1>
            <p>This is the dev content editing page.</p>
            <PlateEditor initialValue={initialValue} />
        </div>
    );
}
