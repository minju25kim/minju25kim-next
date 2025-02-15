import Image from "next/image";

export function PostImage({ coverImage }: { coverImage: string }) {
    return (
        <div className="flex justify-center">
            <Image src={coverImage} alt="cover image" width={500} height={500} priority />
        </div>
    )
}

export default PostImage