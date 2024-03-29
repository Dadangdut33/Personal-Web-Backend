import { Document, Schema, model } from "mongoose";

import { colNote, colUser, urlSafeRegex } from "../utils";

interface INote {
  author: Schema.Types.ObjectId;
  title: string;
  content: string;
  editedBy?: Schema.Types.ObjectId;
  position: number;
}
export interface INoteModel extends INote, Document {}

// ---------------------------------------------
const noteSchema = new Schema<INoteModel>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => urlSafeRegex.test(v),
        message:
          "Title name must be alphanumeric or these allowed characters: underscore, hyphen, space, ', \", comma, period, and @",
      },
    },
    content: {
      type: String,
      required: true,
    },
    editedBy: {
      type: Schema.Types.ObjectId,
      ref: colUser,
      default: undefined,
    },
    position: {
      type: Number,
      default: 0,
    },
  },
  { collection: colNote, timestamps: true }
);

export const noteModel = model<INoteModel>(colNote, noteSchema);
