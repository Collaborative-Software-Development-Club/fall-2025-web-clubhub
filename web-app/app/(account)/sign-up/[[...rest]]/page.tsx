import { ClerkProvider, SignUp } from '@clerk/nextjs';
import '@/app/globals.css'

export default function SignUpPage() {

    return <ClerkProvider appearance={{
        cssLayerName: 'clerk'
    }}
    >
            <div className='flex justify-center p-5'>
                <SignUp appearance={{
                    elements: {    
                        formButtonPrimary: 'bg-red-500 hover:bg-red-700'
                    }
                }}/>
            </div>
        </ClerkProvider>
}