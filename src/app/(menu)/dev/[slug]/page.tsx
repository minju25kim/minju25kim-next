import DevPostClient from './DevPostClient';

export default function DevPostPage({ params }: { params: { slug: string } }) {
  return <DevPostClient category="dev" slug={params.slug} />;
}
