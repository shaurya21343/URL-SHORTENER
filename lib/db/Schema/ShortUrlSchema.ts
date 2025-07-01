import mongoose, { Schema, Document } from "mongoose";

export interface IShortUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  Owner: string; // Assuming this is a user ID or similar
  clicks: number; // Optional field for tracking clicks
}
const formatDate = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const yy = String(date.getFullYear()).slice(-2); // Get last two digits of year
  return `${dd}/${mm}/${yy}`;
};
// Schema definition
const ShortUrlSchema: Schema<IShortUrl> = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  createdAt: {
    type: String,
    default: () => formatDate(new Date()),
  },
  Owner: { type: String, required: true }, // Assuming this is a user ID or similar
  clicks: { type: Number, default: 0 }, // Optional field for tracking clicks
});
export default (mongoose.models.ShortUrl || mongoose.model<IShortUrl>('ShortUrl', ShortUrlSchema));