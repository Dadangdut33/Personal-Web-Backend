import { Schema, model, Document } from "mongoose";
import { colProject, urlSafeRegex } from "../utils";

interface linkIcon {
	url: string;
	type: string;
}
interface IProject {
	title: string;
	description: string;
	tags: string[];
	links: linkIcon[];
}
export interface IProjectModel extends IProject, Document {}

// ---------------------------------------------
const projectSchema = new Schema<IProjectModel>(
	{
		title: {
			type: String,
			required: true,
			match: urlSafeRegex,
		},
		description: {
			type: String,
			required: true,
		},
		tags: {
			type: [String],
			required: true,
		},
		links: {
			type: [
				{
					url: {
						type: String,
						required: true,
					},
					icon: {
						type: String,
						required: true,
					},
				},
			],
			required: true,
		},
	},
	{ collection: colProject, timestamps: true }
);

export const projectModel = model<IProjectModel>(colProject, projectSchema);
