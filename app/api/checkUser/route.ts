import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connect from '@/lib/db/connect';
import User from '@/lib/db/Schema/UserSchema';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    const credentials =await req.json();
    try{
     await connect() // Ensure the database connection is established
            if (!credentials?.email || !credentials?.password) {
              throw new Error("Email and password are required")
            }
    
            const user = await User.findOne({ email: credentials.email })
            if (!user) {
              throw new Error("No user found with the given email")
            }
            const isValidPassword = await bcrypt.compare(credentials.password as string, user.password)
            if (!isValidPassword) {
              throw new Error("Invalid password")
            }
            // If the user exists and the password is valid, return user data
            return NextResponse.json({
                id: user._id,
                userName: user.userName,
                email: user.email,
                createdAt: user.createdAt,
            }, { status: 200 });
    }
    catch (error) {
        console.error('Error checking user:', error);
        return NextResponse.json({ error: 'User check failed' }, { status: 500 });
    }
}