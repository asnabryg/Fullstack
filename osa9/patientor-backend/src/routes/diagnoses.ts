import express from "express";
import diganoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(diganoseService.getDiagnoses());
});

export default router;