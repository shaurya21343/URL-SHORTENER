import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { nanoid } from 'nanoid';
import ShortUrlSchema from '@/lib/db/Schema/ShortUrlSchema';
import connect from '@/lib/db/connect';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
    const session = await auth();
    console.log('Session:', session);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connect();
    const { originalURL } = await request.json()
   const shortURL = nanoid(6);

   const newShortUrl = new ShortUrlSchema({
       originalUrl: originalURL,
       shortUrl: shortURL,
       createdAt: new Date().toISOString(),
       Owner: session.user.email,
   })

   await newShortUrl.save()
   return NextResponse.json({ shortURL }, { status: 201 })
}