import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { signInWithGithub } from './actions';

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/composer');
  }

  return (
    <form className="flex flex-col items-center justify-center h-screen">
      <button className="bg-blue-500 text-white p-2 rounded-md" formAction={signInWithGithub}>
        Log in with Github
      </button>
    </form>
  );
}