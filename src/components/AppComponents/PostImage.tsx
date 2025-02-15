import Image from "next/image";

export function PostImage({ coverImage }: { coverImage: string }) {
    return (
        <Image src={coverImage} alt="cover image" width={1000} height={1000} />
    )
}

export default PostImage