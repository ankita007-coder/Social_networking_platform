import { Router } from "express";
import { addMemberToGroup, createGroups, exitGroup, getAllGroups } from "../controllers/groupController.js";


const router = Router();

router.post('/',createGroups);
router.get('/',getAllGroups);
router.post('/:id',addMemberToGroup);
router.post('/exit/:id',exitGroup)

export default router