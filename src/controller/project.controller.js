import { User } from "../models/user.models.js";
import {Project} from "../models/project.models.js"
import {ProjectMember} from "../models/projectmember.modles.js"


import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { UserRolesEnum } from "../utils/constant.js";

const getProject = asyncHandler(async(req,res)=>{
    //text
})

const getProjectById = asyncHandler(async(req,res)=>{
    //text
})


const createProject = asyncHandler(async (req, res) => {
   const {name, description} = req.body

  const project = await Project.create({
    name,
    description,
    //  createdBy: new mongoose.Types.ObjectId(req.user._id),
    createdBy: req.user._id,
  });

   await ProjectMember.create({
     user: req.user._id,
     //  project: new mongoose.Types.ObjectId(project),
     project: project._id,
     role: UserRolesEnum.ADMIN,
   });

   return res
   .status(201)
   .json(
    new ApiResponse(201, project, "Project created Successfully")
   )
});

const updateProject = asyncHandler(async (req, res) => {
   const {name, description} = req.body
   const {projectId} = req.params


  const project =  await Project.findByIdAndUpdate(
    projectId,{
        name,
        description
    },
    {
        new: true
    }
   )

   if(!project){
    throw new ApiError(404, "Project not found")
   }

   return res
   .status(200)
   .json(
    new ApiResponse(200, project, "Project updated successfully")
   )
});

const deleteProject = asyncHandler(async (req, res) => {
  const {projectId} = req.params
  const project = await Project.findByIdAndDelete(projectId)
   if (!project) {
     throw new ApiError(404, "Project not found");
   }

   return res
     .status(200)
     .json(new ApiResponse(200, project, "Project delete successfully"));
});

const addMemberToProject = asyncHandler(async (req, res) => {
  //text
});

const getProjectMember = asyncHandler(async (req, res) => {
  //text
});

const updateMemberRole = asyncHandler(async (req, res) => {
  //text
});

const deleteMember = asyncHandler(async (req, res) => {
  //text
});

export {
    addMemberToProject,
    createProject,
    deleteMember,
    getProject,
    getProjectById,
    getProjectMember,
    updateMemberRole,
    deleteProject,
    updateProject,
}
