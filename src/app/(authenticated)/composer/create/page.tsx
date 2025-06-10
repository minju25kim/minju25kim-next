import { PlateEditorCreate } from "@/components/PlateEditorCreate";

export default function Page() {
    // const initialMarkdown = '## Hello, *Plate*! **bold** _italic_ ~~underline~~';
    return (
        <div className="pt-16">
            <PlateEditorCreate />
        </div>
    );
}