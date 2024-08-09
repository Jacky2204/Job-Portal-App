import Application from "../Model/ApplicationSchema.js";

const applyForJob = async (req, res) => {
  try {
    const application = new Application({
      ...req.body,
      applicant: req.user.id,
    });
    await application.save();
    res.status(201).json({ message: "Applied successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job", "title company location");
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "job",
      "title company location"
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application updated successfully", application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  applyForJob,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
};
