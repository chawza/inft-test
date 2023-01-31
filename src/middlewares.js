import { ClientError } from "./model.js";

export const ApiLog = async (req, res, next) => {
  const log = `[${new Date()}] ${req.method} ${req.url}`;
  console.log(log)
  next();
}

export const ErrorLog = async (err, req, res, next) => {
  let status = 500;
  console.error(err)
  if (err instanceof ClientError) {
    status = err.status;
  }
  res.status(status).send({ errorname: err.name, message: err.message});
}