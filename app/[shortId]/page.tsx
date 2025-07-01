import { notFound } from "next/navigation";
import ShortUrlSchema from "@/lib/db/Schema/ShortUrlSchema";
import { redirect } from "next/navigation";
import  connect  from "@/lib/db/connect";

export default async function ShortIdPage({ params }: { params: { shortId: string } }) {
    await connect();
  const { shortId } = await params;

  const shortUrl = await ShortUrlSchema.findOne({ shortUrl: shortId });
  if (shortUrl) {
    shortUrl.clicks = (shortUrl.clicks || 0) + 1;  // Increment the click count
  }
  await shortUrl?.save();  // Save the updated click count

  if (!shortUrl) {
    return notFound();
  }
  if (!/^https?:\/\//i.test(shortUrl.originalUrl)) {
    shortUrl.originalUrl = 'https://' + shortUrl.originalUrl;
  }

  redirect(shortUrl.originalUrl);  // Redirect to the original URL

}