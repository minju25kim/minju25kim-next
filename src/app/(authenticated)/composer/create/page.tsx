import { PlateEditorCreate } from "@/components/PlateEditorCreate";
import { Value } from "@udecode/plate";

const initialValue: Value = [
    { type: 'h3', children: [{ text: 'Title' }] },
    { type: 'blockquote', children: [{ text: 'This is a quote.' }] },
    {
        type: 'p',
        children: [
            { text: 'With some ' },
            { text: 'bold', bold: true },
            { text: ' text for emphasis!' },
        ],
    },
];

export default function Page() {

    return (
        <div className="max-w-3xl mx-auto my-12 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Create Contents</h1>
            <PlateEditorCreate initialValue={initialValue} />
        </div>
    );
}