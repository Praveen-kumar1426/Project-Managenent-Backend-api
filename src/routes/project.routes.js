import { Router } from "express";
import {
  addMemberToProject,
  createProject,
  deleteMember,
  getProject,
  getProjectById,
  getProjectMember,
  updateMemberRole,
  deleteProject,
  updateProject,
} from "../controller/project.controller.js";
import { validate } from "../middleware/validator.middlerware.js";
import {createProjectValidator, addMemberProjectValidator} from "../validators/index.js";
import {verifyJwt, validateProjectPermission} from '../middleware/auth.middleware.js'
import { AvailableUserRole, UserRolesEnum } from "../utils/constant.js";

const router = Router()
router.use(verifyJwt)// middleware

router
   .route("/")
   .get(getProject)
   .post(createProjectValidator(AvailableUserRole), validate, createProject)

router
  .route("/:projectId")
  .get(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]),
    getProjectById,
  )
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

router
   .route("/:projectId/members")
   .get(getProjectMember)
   .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMemberProjectValidator(),
    validate,
    addMemberToProject
   )
   

router
   .route("/:projectId/members/:userId")
   .put( validateProjectPermission([UserRolesEnum.ADMIN]),  updateMemberRole)
   .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember)
   

export default router