export const ApiLog = async (req, res, next) => {
  const log = `[${new Date()}] ${req.method} ${req.url}`;
  console.log(log)
  next();
}

export const ErrorLog = async (err, req, res) => {
  console.error(err);
  res.status(500).send({ errorname: err.name, message: err.message});
}