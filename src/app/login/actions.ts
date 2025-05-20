'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signInWithGithub() {
  const supabase = await createClient()

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://minju25kim.fly.dev';
      
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${baseUrl}/auth/callback?next=/composer`,
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