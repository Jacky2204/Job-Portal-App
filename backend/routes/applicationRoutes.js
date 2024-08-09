import express from 'express';
import { applyForJob, getApplications, getApplication, updateApplication, deleteApplication } from '../controllers/ApplicationController.js';
import Auth from '../Middlewares/Auth.js';

const router = express.Router();

router.route('/')
    .get(Auth, getApplications)
    .post(Auth, applyForJob);

router.route('/:id')
    .get(Auth, getApplication)
    .put(Auth, updateApplication)
    .delete(Auth, deleteApplication);

export default router;
