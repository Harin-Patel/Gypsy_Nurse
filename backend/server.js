const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// In-memory database (replace with real database in production)
const users = [];
const jobs = [
  {
    id: '1',
    title: 'Travel ER (Emergency Room) RN (Registered Nurse)',
    location: 'Sioux Falls',
    state: 'South Dakota',
    city: 'Sioux Falls',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$58',
    postedDate: 'Nov 7, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    facility: 'Facility information not available',
    tags: ['Day Shift', 'Emergency Room', 'Registered Nurse', '13 Weeks'],
    specialty: 'Emergency Room',
    certification: 'Registered Nurse',
    duration: '13 weeks',
    featured: true
  },
  {
    id: '2',
    title: 'Emergency Room Job in Greenbrae, CA',
    location: 'Greenbrae',
    state: 'California',
    city: 'Greenbrae',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$68',
    postedDate: 'Nov 6, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    facility: 'Facility information not available',
    tags: ['Day Shift', 'Emergency Room', 'Registered Nurse', '13 Weeks'],
    specialty: 'Emergency Room',
    certification: 'Registered Nurse',
    duration: '13 weeks',
    featured: true
  },
  {
    id: '3',
    title: 'Strike',
    location: 'Merrill',
    state: 'New Mexico',
    city: 'Merrill',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$48',
    postedDate: 'Oct 11, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    facility: 'Aspirus Merrill',
    tags: ['Strike', 'Clinical Lab Scientist', '8 Weeks'],
    specialty: 'Clinical Lab Scientist',
    certification: 'Clinical Lab Scientist',
    duration: '8 weeks',
    featured: false
  },
  {
    id: '4',
    title: 'ICU Travel Nurse - Phoenix, AZ',
    location: 'Phoenix',
    state: 'Arizona',
    city: 'Phoenix',
    shift: 'Night Shift',
    shiftHours: '12 Hours',
    salary: '$65',
    postedDate: 'Nov 10, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    facility: 'Banner Health System',
    tags: ['Night Shift', 'ICU', 'Registered Nurse', '13 Weeks'],
    specialty: 'ICU',
    certification: 'Registered Nurse',
    duration: '13 weeks',
    featured: true
  }
];

const applications = [];
const bookmarks = [];
const likedJobs = {};
const dislikedJobs = {};

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.userId = user.userId;
    next();
  });
};

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id);

    res.json({
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role = 'jobseeker' } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + ' ' + lastName)}&background=7f2860&color=fff&size=128`
    };

    users.push(newUser);

    const token = generateToken(newUser.id);

    res.status(201).json({
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          role: newUser.role
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Jobs Routes
app.get('/api/jobs', (req, res) => {
  let filteredJobs = [...jobs];
  const { search, city, state, specialty, minSalary, maxSalary, shift, featuredOnly, sortBy, limit } = req.query;

  if (search) {
    const searchLower = search.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower) ||
      job.staffingCompany.toLowerCase().includes(searchLower)
    );
  }

  if (city) {
    filteredJobs = filteredJobs.filter(job => job.city?.toLowerCase().includes(city.toLowerCase()));
  }

  if (state) {
    const states = Array.isArray(state) ? state : [state];
    filteredJobs = filteredJobs.filter(job => states.includes(job.state));
  }

  if (specialty) {
    filteredJobs = filteredJobs.filter(job => job.specialty?.toLowerCase().includes(specialty.toLowerCase()));
  }

  if (featuredOnly === 'true') {
    filteredJobs = filteredJobs.filter(job => job.featured);
  }

  const limitNum = limit ? parseInt(limit) : filteredJobs.length;
  filteredJobs = filteredJobs.slice(0, limitNum);

  res.json({
    data: {
      jobs: filteredJobs,
      total: filteredJobs.length,
      page: 1,
      limit: limitNum,
      totalPages: 1
    }
  });
});

app.get('/api/jobs/featured', (req, res) => {
  const { limit = 3 } = req.query;
  const featured = jobs.filter(job => job.featured).slice(0, parseInt(limit));
  res.json({ data: featured });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json({ data: job });
});

app.post('/api/jobs/:id/apply', authenticateToken, (req, res) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const application = {
    id: Date.now().toString(),
    jobId: req.params.id,
    userId: req.userId,
    coverLetter: req.body.coverLetter || '',
    appliedDate: new Date().toISOString(),
    status: 'pending'
  };

  applications.push(application);
  res.status(201).json({ data: application, message: 'Application submitted successfully' });
});

app.post('/api/jobs/:id/like', authenticateToken, (req, res) => {
  const userId = req.userId;
  const jobId = req.params.id;

  if (!likedJobs[userId]) {
    likedJobs[userId] = [];
  }
  if (!likedJobs[userId].includes(jobId)) {
    likedJobs[userId].push(jobId);
  }

  if (dislikedJobs[userId]?.includes(jobId)) {
    dislikedJobs[userId] = dislikedJobs[userId].filter(id => id !== jobId);
  }

  res.json({ message: 'Job liked successfully' });
});

app.post('/api/jobs/:id/dislike', authenticateToken, (req, res) => {
  const userId = req.userId;
  const jobId = req.params.id;

  if (!dislikedJobs[userId]) {
    dislikedJobs[userId] = [];
  }
  if (!dislikedJobs[userId].includes(jobId)) {
    dislikedJobs[userId].push(jobId);
  }

  if (likedJobs[userId]?.includes(jobId)) {
    likedJobs[userId] = likedJobs[userId].filter(id => id !== jobId);
  }

  res.json({ message: 'Job disliked successfully' });
});

app.post('/api/jobs/:id/bookmark', authenticateToken, (req, res) => {
  const userId = req.userId;
  const jobId = req.params.id;

  const existingBookmark = bookmarks.find(b => b.userId === userId && b.jobId === jobId);
  if (existingBookmark) {
    return res.status(400).json({ error: 'Job already bookmarked' });
  }

  const bookmark = {
    id: Date.now().toString(),
    userId,
    jobId,
    savedDate: new Date().toISOString()
  };

  bookmarks.push(bookmark);
  res.status(201).json({ data: bookmark, message: 'Job bookmarked successfully' });
});

app.delete('/api/jobs/:id/bookmark', authenticateToken, (req, res) => {
  const userId = req.userId;
  const jobId = req.params.id;

  const index = bookmarks.findIndex(b => b.userId === userId && b.jobId === jobId);
  if (index === -1) {
    return res.status(404).json({ error: 'Bookmark not found' });
  }

  bookmarks.splice(index, 1);
  res.json({ message: 'Bookmark removed successfully' });
});

app.get('/api/jobs/liked', authenticateToken, (req, res) => {
  const userId = req.userId;
  const likedJobIds = likedJobs[userId] || [];
  const likedJobsList = jobs.filter(job => likedJobIds.includes(job.id));
  res.json({ data: likedJobsList });
});

app.get('/api/jobs/disliked', authenticateToken, (req, res) => {
  const userId = req.userId;
  const dislikedJobIds = dislikedJobs[userId] || [];
  const dislikedJobsList = jobs.filter(job => dislikedJobIds.includes(job.id));
  res.json({ data: dislikedJobsList });
});

// Applications Routes
app.get('/api/applications', authenticateToken, (req, res) => {
  const userApplications = applications.filter(a => a.userId === req.userId);
  const applicationsWithJobData = userApplications.map(app => {
    const job = jobs.find(j => j.id === app.jobId);
    return {
      ...app,
      jobTitle: job?.title || 'Unknown',
      facility: job?.facility || 'Facility information not available',
      facilityAvailable: job?.facilityAvailable || false,
      jobType: job?.specialty || job?.title || 'Unknown',
      location: job ? `${job.location}, ${job.state}` : 'Unknown',
      salary: job?.salary,
      duration: job?.duration
    };
  });

  res.json({
    data: {
      applications: applicationsWithJobData,
      total: applicationsWithJobData.length,
      page: 1,
      limit: applicationsWithJobData.length,
      totalPages: 1
    }
  });
});

// Bookmarks Routes
app.get('/api/bookmarks', authenticateToken, (req, res) => {
  const userBookmarks = bookmarks.filter(b => b.userId === req.userId);
  const bookmarksWithJobData = userBookmarks.map(bookmark => {
    const job = jobs.find(j => j.id === bookmark.jobId);
    return {
      ...bookmark,
      job: job || null
    };
  }).filter(b => b.job !== null);

  res.json({
    data: {
      bookmarks: bookmarksWithJobData,
      total: bookmarksWithJobData.length
    }
  });
});

app.post('/api/bookmarks', authenticateToken, (req, res) => {
  const { jobId } = req.body;
  const userId = req.userId;

  const existingBookmark = bookmarks.find(b => b.userId === userId && b.jobId === jobId);
  if (existingBookmark) {
    return res.status(400).json({ error: 'Job already bookmarked' });
  }

  const bookmark = {
    id: Date.now().toString(),
    userId,
    jobId,
    savedDate: new Date().toISOString()
  };

  bookmarks.push(bookmark);
  res.status(201).json({ data: bookmark });
});

app.delete('/api/bookmarks/:id', authenticateToken, (req, res) => {
  const bookmark = bookmarks.find(b => b.id === req.params.id && b.userId === req.userId);
  if (!bookmark) {
    return res.status(404).json({ error: 'Bookmark not found' });
  }

  const index = bookmarks.indexOf(bookmark);
  bookmarks.splice(index, 1);
  res.json({ message: 'Bookmark removed successfully' });
});

app.delete('/api/bookmarks/job/:jobId', authenticateToken, (req, res) => {
  const userId = req.userId;
  const jobId = req.params.jobId;

  const index = bookmarks.findIndex(b => b.userId === userId && b.jobId === jobId);
  if (index === -1) {
    return res.status(404).json({ error: 'Bookmark not found' });
  }

  bookmarks.splice(index, 1);
  res.json({ message: 'Bookmark removed successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`✅ CORS enabled for http://localhost:3000`);
});

