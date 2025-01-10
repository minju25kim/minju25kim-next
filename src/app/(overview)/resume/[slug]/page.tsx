import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJsonBySlug, getAllJsonsDirectory } from "@/lib/api";

type Params = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
    const params = await props.params;
    const json = getJsonBySlug("kor", params.slug);
    if (!json) {
        return notFound();
    }

    //   const title = `${post.title}`;

    return {
        title: 'replace title',
        // openGraph: {
        //   title,
        //   images: [post.ogImage.url],
        // },
    };
}

export async function generateStaticParams() {
    const jsons = getAllJsonsDirectory("kor");
    console.log(jsons)
    return jsons.map((json) => ({
        slug: json.slug,
    }));
}

async function Page(props: Params) {
    const params = await props.params;
    const json = getJsonBySlug("kor", params.slug);

    if (!json) {
        return notFound();
    }
    return (
        <div>
            {JSON.parse(json.fileContents).version}
        </div>
    );
}

export default Page;