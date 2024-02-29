import { NextFunction, Request, Response } from "express";

import { IUserModel, userModel } from "../../models/user";

export const validateLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ data: null, message: "Need to be logged in", success: false });
  }
};

export const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    const user = await userModel.findById(req.session.userId);
    if (user?.role === "admin") next();
    else res.status(403).json({ data: null, message: "Need to be an admin", success: false });
  } else {
    res.status(401).json({ data: null, message: "Need to be logged in", success: false });
  }
};

export const credentialCheck = async (usernameEmail: string, password: string) => {
  const userGet = await userModel.findOne({ $or: [{ username: usernameEmail }, { email: usernameEmail }] });
  if (!userGet) return { user: null, valid: false };
  const valid = await userGet.validatePassword(password);
  return { user: userGet, valid };
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).json({ data: null, message: "Username/email is required", success: false });
  if (!password) return res.status(400).json({ data: null, message: "Password is required", success: false });

  // check if already logged in
  if (req.session && req.session.user)
    return res.status(400).json({ data: null, message: "Already logged in", success: false });

  const { user, valid }: { user: IUserModel | null; valid: boolean } = await credentialCheck(username, password);
  if (!user) return res.status(401).json({ data: null, message: "Invalid username/email or password", success: false });
  if (!valid) return res.status(401).json({ data: null, message: "Invalid username/email or password", success: false });

  // save session
  req.session.userId = user._id;
  req.session.user = username;

  return res.status(200).json({
    data: null,
    message: "Login successful",
    success: true,
  });
};

export const logout = async (req: Request, res: Response) => {
  if (req.session)
    return req.session.destroy((err) => {
      if (err) return res.status(500).json({ data: null, message: `Error logging out. ${err}`, success: false });

      return res.status(200).json({
        data: null,
        message: "Logout successful",
        success: true,
      });
    });
  else return res.status(401).json({ data: null, message: "Not logged in", success: false });
};

export const check = async (req: Request, res: Response) => {
  if (req.session && req.session.user) {
    // get user data
    const user = await userModel.findById(req.session.userId).select("-salt -hash");
    return res.status(200).json({
      data: user,
      message: "Logged in",
      success: true,
    });
  } else {
    return res.status(401).json({ data: null, message: "Not logged in", success: false });
  }
};
