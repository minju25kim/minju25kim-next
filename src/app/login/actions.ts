'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signInWithGithub() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback?next=/composer`,
    },
  })

  console.log(data)

  if (data.url) {
    redirect(data.url)
  }

  if (error) {
    redirect('/error')
  }
}