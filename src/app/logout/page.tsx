import { signOut } from './actions'

export default function Page() {
  return (
    <form className="flex flex-col items-center justify-center h-screen">
      <button className="bg-blue-500 text-white p-2 rounded-md" formAction={signOut}>
        Log Out
      </button>
    </form>
  ) 
}