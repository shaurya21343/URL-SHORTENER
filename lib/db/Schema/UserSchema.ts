import mongoose, { Schema, Document } from 'mongoose'


export interface IUser extends Document {
  userName: string
  password: string
  email: string
  createdAt: string 
}

const formatDate = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0') 
  const yy = String(date.getFullYear()).slice(-2)
  return `${dd}/${mm}/${yy}`
}

// Schema definition
const UserSchema: Schema<IUser> = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email:    { type: String, required: true },
  createdAt: {
    type: String,
    default: () => formatDate(new Date()),
  },
})

export default ( mongoose.models.User || mongoose.model<IUser>('User', UserSchema))
