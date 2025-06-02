import { PlateEditorComponent } from "@/components/PlateEditorComponent";

export default function Page() {
    const initialMarkdown = '## Hello, *Plate*! **bold** _italic_ ~~underline~~';
    return (
        <>
            <PlateEditorComponent initialMarkdown={initialMarkdown} />
        </>
    );
}