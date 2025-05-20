import { signOut } from '@/app/logout/actions';
import { createClient } from '@/utils/supabase/server';

export default async function ComposerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const username =
    user?.user_metadata?.user_name ||
    user?.user_metadata?.name ||
    user?.email ||
    null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">
        {username ? `hello ${username}` : 'hello!'}
      </h1>
      <p>Only visible to authenticated users.</p>
      <form className='flex flex-col items-center justify-center gap-4 absolute top-0 right-0'>
        <button className="bg-blue-500 text-white p-2 rounded-md" formAction={signOut}>
          Log Out
        </button>
      </form>
    </div>
  );
}
