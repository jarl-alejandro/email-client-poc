import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/login')({
    component: Login,
})

function Login() {
    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/',
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center w-full">
            <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Sign In</h1>
                    <p className="text-gray-500">Enter your information to create an account</p>
                </div>
                <div className="space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}
