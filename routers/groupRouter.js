import { Router } from "express";
import { addMemberToGroup, createGroups, getAllGroups } from "../controllers/groupController.js";
import authMiddleware from "../middlewares/authMiddlewares.js"

const router = Router();

router.post('/',createGroups);
router.get('/',getAllGroups);
router.post('/:id',addMemberToGroup);

export default router