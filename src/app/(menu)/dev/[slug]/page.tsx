import DevPostClient from './DevPostClient';

export default async function DevPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params
  return <DevPostClient category="dev" slug={slug} />;
}
