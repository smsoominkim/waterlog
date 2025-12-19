import { login, signup } from './actions'

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string; error: string }>
}) {
    const searchParams = await props.searchParams
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <label className="text-md" htmlFor="fullName">
                    Full Name (for Sign Up)
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="fullName"
                    placeholder="Your Name"
                />
                <button
                    formAction={login}
                    className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
                >
                    Sign In
                </button>
                <button
                    formAction={signup}
                    className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                >
                    Sign Up
                </button>
                {(searchParams.message || searchParams.error) && (
                    <div className="text-red-500 text-sm mt-2 text-center">
                        {searchParams.message || searchParams.error}
                    </div>
                )}

            </form>
        </div>
    )
}
