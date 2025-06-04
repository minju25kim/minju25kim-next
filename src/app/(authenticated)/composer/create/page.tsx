import { PlateEditorComponent } from "@/components/PlateEditorComponent";

export default function Page() {
    const initialMarkdown = '## Hello, *Plate*! **bold** _italic_ ~~underline~~';
    return (
        <div className="pt-16">
            <PlateEditorComponent initialMarkdown={initialMarkdown} />
        </div>
    );
}