import argon2 from "argon2";
import { Document, Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";

import { DocumentResult, colUser, urlSaferRegex } from "../utils";

// ---------------------------------------------
/**
 * Roles interface
 * @admin = "Do everything"
 * @editor = "Limited access. Not implemented."
 * @user = "Site user. Not implemented."
 */
interface IUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  hash: string;
  role?: "admin" | "editor" | "user";
  setPassword: (password: string) => Promise<void>;
  validatePassword: (password: string) => Promise<boolean>;
}
export interface IUserModel extends IUser, Document, DocumentResult<IUserModel> {}

// ---------------------------------------------
const userSchema = new Schema<IUserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 40,
      validate: {
        validator: (v: string) => urlSaferRegex.test(v),
        message: "Username must be alphanumeric and cannot contain spaces. Allowed characters: a-z, A-Z, 0-9, _, -",
      },
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      validate: {
        validator: (v: string) => isEmail(v),
        message: "Invalid email address provided",
      },
    },
    hash: String,
  },
  { collection: colUser, timestamps: true } // timestamps add createdAt and updatedAt fields automatically
);

userSchema.methods.setPassword = async function (password: string) {
  this.hash = await argon2.hash(password);
};

userSchema.methods.validatePassword = async function (password: string) {
  return await argon2.verify(this.hash, password);
};

export const userModel = model<IUserModel>(colUser, userSchema);
