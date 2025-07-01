import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { redirect } from 'next/navigation';

// Your own logic for dealing with plaintext password strings; be careful!




 
export const { handlers, signIn, signOut, auth } = NextAuth({
  
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials:Partial<Record<"email" | "password", unknown>>) => {
        const user=await fetch('http://localhost:3000/api/checkUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })
        const userData = await user.json();
        if (userData && userData.id) {
          // If no error and we have user data, return it
          return {
            _id: userData._id,
            name: userData.userName,
            email: userData.email,
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }
        
      },
    }),

  ],
  pages: {
    signIn: '/login', // Displayed when the user visits the sign-in page
    error: '/login', // Error code passed in query string as ?error=
    signOut: '/login', // Redirected after sign out
    newUser: '/', // New account creation page
  },
})