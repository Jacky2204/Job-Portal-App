import express from 'express';
import { createJob, getJobs, getJob, updateJob, deleteJob } from '../controllers/JobController.js';
import  Auth  from '../Middlewares/Auth.js';

const router = express.Router();

router.route('/')
    .get(getJobs)
    .post(Auth, createJob);

router.route('/:id')
    .get(getJob)
    .put(Auth, updateJob) 
    .delete(Auth, deleteJob);

export default router;
