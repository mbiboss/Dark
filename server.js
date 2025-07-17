const express = require('express');
const cors = require('cors');
const path = require('path');
const { storage } = require('./server/storage.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API Routes
// Contact endpoints
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const contact = await storage.createContact({
      name,
      email,
      subject,
      message
    });
    
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Project endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await storage.getProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/projects/featured', async (req, res) => {
  try {
    const projects = await storage.getFeaturedProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, category, image_url, project_url, github_url, is_featured } = req.body;
    
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Title, description, and category are required' });
    }
    
    const project = await storage.createProject({
      title,
      description,
      category,
      image_url,
      project_url,
      github_url,
      is_featured: is_featured || false
    });
    
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Theme endpoints
app.post('/api/theme', async (req, res) => {
  try {
    const { theme } = req.body;
    
    if (!theme || (theme !== 'dark' && theme !== 'light')) {
      return res.status(400).json({ error: 'Theme must be "dark" or "light"' });
    }
    
    const themeSetting = await storage.saveTheme(theme);
    res.json(themeSetting);
  } catch (error) {
    console.error('Error saving theme:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/theme', async (req, res) => {
  try {
    const theme = await storage.getTheme();
    res.json({ theme });
  } catch (error) {
    console.error('Error fetching theme:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running on port ${PORT}`);
});