// app/dashboard/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/auth"; // Assuming you're using NextAuth
import connect from "@/lib/db/connect";
import ShortUrlSchema from "@/lib/db/Schema/ShortUrlSchema";
import { format } from "date-fns";


interface ShortUrl {
  _id: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: string | Date;
  Owner: string;
  clicks?: number;
}

export default async function DashboardPage() {
  const session = await auth();
  const userEmail = session?.user?.email;
    

  if (!userEmail) {
    return <div className="text-center text-red-500 mt-10">Unauthorized. Please log in.</div>;
  }

  await connect();
  const urls = await ShortUrlSchema.find({ Owner: userEmail });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Shortened URLs</h1>

      <Card>
        <CardContent className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Clicks</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(urls as ShortUrl[]).map((url) => (
                <TableRow key={url._id}>
                  <TableCell>
                    <a
                      href={`/${url.shortUrl}`}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                    >
                      {url.shortUrl}
                    </a>
                  </TableCell>
                  <TableCell className="truncate max-w-xs">{url.originalUrl}</TableCell>
                  <TableCell>{format(new Date(url.createdAt), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{url.Owner}</TableCell>
                  <TableCell>{url.clicks || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
