import { NextResponse} from 'next/server';
import { NextRequest } from 'next/server';
import connect from '@/lib/db/connect';
import  User  from '@/lib/db/Schema/UserSchema';
import bcrypt from 'bcryptjs';


export async function POST(req :NextRequest){
    
    

    try{
        const { userName, password, email } = await req.json();
        await connect();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }
        // Validate input
        if (!userName || !password || !email) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        
         const HashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({
            userName,
            password: HashedPassword,
            email,
            createdAt: new Date().toISOString(), // Use ISO format for consistency
        });
        await user.save();
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    }
    catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}