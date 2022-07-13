import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import { UserExistsError } from "../errors/user-exists-error";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";

export const signUpController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({
      email,
    });
    if (isUserExist) {
      throw new UserExistsError();
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const newUser = User.buildUser({
      email,
      avatar,
      password: hashedPassword,
    });
    await newUser.save();
    const jwtToken = jwt.sign(
      {
        email,
        id: newUser._id,
        avatar,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    req.session = {
      token: jwtToken,
    };
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User Successfully Registered",
      data: {
        token: jwtToken,
        createdUser: {
          email,
          avatar,
          id: newUser._id,
        },
      },
    });
  }
);
