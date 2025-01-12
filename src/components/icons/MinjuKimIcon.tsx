import Image from "next/image";

export const MinjuKimIcon = () => {
    return (
        <Image src={"/profile.png"} alt={"profile icon"} width={30} height={30} className="border border-black rounded-full"/>
    );
};