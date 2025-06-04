'use client'

import { PlateReadOnlyEditor } from './editor/plate-read-only-editor';


export const PlateEditorReadOnly = ({
    children,
}: {
    children: string;
}) => {

    return (
        <div
            data-registry="plate"
            className="max-w-3xl mx-auto flex flex-col gap-4 h-screen w-full"
        >
            <PlateReadOnlyEditor>{children}</PlateReadOnlyEditor>
        </div>
    );
};