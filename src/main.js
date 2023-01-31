import express from "express";
import RefferalController from "./controllers.js";
import { ApiLog, ErrorLog } from "./middlewares.js";

const { addNewReferral, editReferral, getReferral, getAllReferrals } = RefferalController; 

const PORT = 3000;
const server = express();
server.use(ApiLog)
server.use(express.json());

server.post('/api/referral', addNewReferral);
server.get('/api/referral/all', getAllReferrals);
server.get('/api/referral/:id(\\d+)', getReferral)
server.put('/api/referral/:id(\\d+)', editReferral);

server.use(ErrorLog);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})