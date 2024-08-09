import Job from '../Model/JobSchema.js';

const createJob = async (req, res) => {
    try {
        const job = new Job({ ...req.body, postedBy: req.user.id });
        await job.save();
        res.status(201).json({ message: 'Job posted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('postedBy', 'username email');
        res.json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'username email');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job updated successfully', job });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { createJob, getJobs, getJob, updateJob, deleteJob };
