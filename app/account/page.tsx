import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '../login/actions'

export default async function AccountPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="w-full">
                <div className="py-6 font-bold bg-purple-950 text-center">
                    Using Supabase Auth in Next.js App Router
                </div>
            </div>

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <main className="flex-1 flex flex-col gap-6">
                    <h2 className="font-bold text-4xl mb-4">UserInfo</h2>
                    <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                    <div className="flex flex-col gap-2">
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>Last Sign In: {user.last_sign_in_at}</p>
                    </div>
                    <form action={signOut}>
                        <button className="bg-red-700 rounded-md px-4 py-2 text-foreground mb-2">
                            Sign Out
                        </button>
                    </form>
                </main>
            </div>
        </div>
    )
}
