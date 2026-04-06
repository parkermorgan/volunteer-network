import { Router } from 'express';
import { Project } from '../models/Project.js'; 

const router = Router();

// 1. CREATE: Post a new volunteer project
router.post('/', async (req, res) => {
  try {
    const { title, description, requiredSkills, location } = req.body;
    
    const newProject = new Project({
      title,
      description,
      requiredSkills,
      location,
      status: 'Open'
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
});

// 2. READ: Get all volunteer projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// 3. UPDATE: Modify an existing project by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, requiredSkills, location, status } = req.body;
    
    // Find project by ID and update it with new data
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, requiredSkills, location, status },
      { new: true, runValidators: true } // Returns the newly updated object
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
});

// 4. DELETE: Remove a project by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
});

export default router;