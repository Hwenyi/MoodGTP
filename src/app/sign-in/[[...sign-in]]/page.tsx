import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInpage = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center bg-black text-white">
            <div className="px-4 my-8">
                <span className="text-6xl">MoodGPT</span>
            </div>
            <p className="text-2xl text-white/60 mb-8">
                Welcome back to your mood tracking journey
            </p>
            <div className="w-full max-w-[600px] mx-auto px-6">
                <SignIn appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-white/90 backdrop-blur-sm rounded-lg shadow-xl",
                        headerTitle: "text-2xl text-black",
                        formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                        formFieldInput: "bg-white border-black/20 text-black",
                        formFieldLabel: "text-black/60",
                        footerActionLink: "text-blue-600",
                        dividerLine: "bg-black/20",
                        dividerText: "text-black/60"
                    }
                }}/>
            </div>
        </div>
    )
}

export default SignInpage