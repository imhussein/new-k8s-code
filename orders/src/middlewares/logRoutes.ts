import express from "express";
import { PORT } from "../config/keys";
import "colors";

export const logRoutes = () => {
  for (let dec of express.Router().stack) {
    if (Object.keys(dec.route.methods).length) {
      console.log(
        `${Object.keys(dec.route.methods)[0].toUpperCase()} =>`.blue.bold,
        `http://localhost:${PORT}${dec.route.path}`.green.bold
      );
    }
  }
};
