import { Request, Response } from "express";
import { Types } from "mongoose";

import { IProjectModel, projectModel } from "../../models/project";
import { ___issue___, colProject } from "../../utils";

// GET
export const getAllProjects = async (req: Request, res: Response) => {
  const count = await projectModel.countDocuments().exec();
  const perPage = parseInt(req.query.perPage as string) || count || 15; // no perPage means get all
  const page = parseInt(req.query.page as string) - 1 || 0;
  const byPosition = req.query.byPosition === "true";

  const aggregations: any[] = [{ $match: {} }, { $sort: { createdAt: -1 } }, { $skip: perPage * page }, { $limit: perPage }];
  if (byPosition) aggregations.push({ $sort: { position: 1 } });
  else aggregations.push({ $sort: { createdAt: -1 } });

  const projects = (await projectModel.aggregate(aggregations).exec()) as IProjectModel[];

  return res.status(200).json({
    data: projects,
    page: page + 1,
    pages: Math.ceil(count / perPage),
    message: "All custom project retrieved successfully",
    success: true,
  });
};

export const getOneProject = async (req: Request, res: Response) => {
  const { _id } = req.params;

  // get a note and its users using mongoose
  const project = (await projectModel.aggregate([{ $match: { _id: new Types.ObjectId(_id) } }]).exec())[0] as IProjectModel;

  return res.status(!!project ? 200 : 422).json({
    data: project,
    message: !!project ? `Project "${_id}" retrieved successfully` : `Project "${_id}" not found`,
    success: !!project,
  });
};

// stats
export const getProjectStats = async (_req: Request, res: Response) => {
  const stats = await projectModel.db.db.command({ collStats: colProject });
  return res.status(200).json({
    data: stats,
    message: "Project stats retrieved successfully",
    success: true,
  });
};

interface ITagsCategoryCount {
  _id: string;
  count: number;
}

export const getTagsOnly = async (_req: Request, res: Response) => {
  // get distinct tags and count how many blogs each tag has
  const tagCounts = (await projectModel
    .aggregate([{ $match: {} }, { $unwind: "$tags" }, { $group: { _id: "$tags", count: { $sum: 1 } } }])
    .exec()) as ITagsCategoryCount[];
  return res.status(200).json({
    data: tagCounts,
    message: "Tags retrieved successfully",
    success: true,
  });
};

// POST
export const createProject = async (req: Request, res: Response) => {
  const project = await projectModel.create(req.body);

  return res.status(!!project ? 200 : 500).json({
    data: project,
    message: !!project ? `Project "${project._id}" created successfully` : `Fail to create project`,
    success: !!project,
  });
};

// PUT
export const updateProject = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const project = await projectModel.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

  return res.status(!!project ? 200 : 500).json({
    data: project,
    message: !!project ? `Project "${_id}" updated successfully` : `Fail to update project`,
    success: !!project,
  });
};

// DELETE
export const deleteProject = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const project = await projectModel.findByIdAndDelete(_id);

  return res.status(!!project ? 200 : 500).json({
    data: project,
    message: !!project ? `Project "${_id}" deleted successfully` : `Fail to delete project`,
    success: !!project,
  });
};
