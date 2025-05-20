import { signInWithGithub } from './actions'

export default function Page() {
  return (
    <form className="flex flex-col items-center justify-center h-screen">
      <button className="bg-blue-500 text-white p-2 rounded-md" formAction={signInWithGithub}>
        Log in with Github
      </button>
    </form>
  )
}