import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const isUserExists = await User.findOne({
      email,
    });

    if (!isUserExists) {
      throw new BadRequestError("User not found", "email");
    }

    const isPasswordMatching = await bcryptjs.compare(
      password,
      isUserExists.password
    );

    if (!isPasswordMatching) {
      throw new BadRequestError("Password incorrect", "password");
    }

    const jwtToken = jwt.sign(
      {
        email,
        id: isUserExists._id,
        avatar: isUserExists.avatar,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    req.session = {
      token: jwtToken,
    };

    res.status(StatusCodes.OK).json({
      success: true,
      message: "User Loggedin Successfully",
      data: {
        token: jwtToken,
      },
    });
  }
);
