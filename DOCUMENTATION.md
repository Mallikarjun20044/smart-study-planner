# 📚 Smart Study Planner - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage Guide](#usage-guide)
4. [Technical Architecture](#technical-architecture)
5. [Smart Algorithm Explained](#smart-algorithm-explained)
6. [Deployment Guide](#deployment-guide)
7. [Troubleshooting](#troubleshooting)
8. [FAQ](#faq)

---

## Introduction

Smart Study Planner is a **100% frontend web application** designed to help students:
- Plan their study schedule intelligently
- Optimize learning through spaced repetition
- Track progress with beautiful analytics
- Stay motivated with visual milestones

### Key Benefits

✅ **No Backend Setup** - Everything runs in the browser
✅ **Data Privacy** - Your data never leaves your device
✅ **Offline Ready** - Works even without internet
✅ **Fast Deployment** - Deploy to Vercel in 2 minutes
✅ **Beautiful UI** - Modern design with smooth animations
✅ **Mobile Friendly** - Responsive on all devices

---

## Installation

### Option 1: Local Development

#### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)

#### Steps

1. **Clone or Download the Repository**
   ```bash
   # Using Git
   git clone https://github.com/yourusername/smart-study-planner.git
   cd smart-study-planner
   
   # Or download ZIP and extract
   ```

2. **Start a Local Server**
   
   **Using Python:**
   ```bash
   # Python 3.x
   python -m http.server 8000
   
   # Python 2.x
   python -m SimpleHTTPServer 8000
   ```
   
   **Using Node.js:**
   ```bash
   npx http-server
   ```
   
   **Using VS Code:**
   - Install Live Server extension
   - Right-click `index.html` → "Open with Live Server"

3. **Access the Application**
   - Open browser to `http://localhost:8000`
   - Should see the landing page

### Option 2: Direct File Access

- Simply open `index.html` in your browser
- Note: Some features may have limited functionality without a server

---

## Usage Guide

### 1. Creating an Account

**First-time users:**
1. Click "Get Started" on the landing page
2. Click "Register" button
3. Fill in form:
   - **Full Name**: Your name
   - **Email**: Unique email address
   - **Password**: Min 6 characters
   - **Confirm Password**: Must match
4. Click "Create Account"
5. You'll be redirected to login page

**Demo Account (Pre-created):**
- Email: `mallikarjunbaradenal@gmail.com`
- Password: `Mallu@123`

### 2. Logging In

1. Go to login page
2. Enter email and password
3. Click "Login"
4. Redirected to dashboard on success

### 3. Creating a Study Plan

#### Step-by-Step Guide

1. **Navigate to "Create Plan"**
   - Click "Create Plan" in sidebar
   - Or dashboard button

2. **Set Exam Details**
   - **Exam Date**: Select target exam date (must be future)
   - **Daily Hours**: How many hours you can study per day (1-24)

3. **Add Subjects**
   - Click "Add Subject" button
   - For each subject:
     - **Name**: Subject name (e.g., "Mathematics", "Physics")
     - **Difficulty**: Choose one:
       - **Easy** (1x weight) - General subjects
       - **Medium** (1.5x weight) - Important subjects
       - **Hard** (2.5x weight) - Critical/difficult subjects
     - **Number of Topics**: Total topics in subject

4. **Example Configuration**
   ```
   Exam Date: 30 days from now
   Daily Hours: 4
   
   Subject 1: Mathematics
   - Difficulty: Hard (2.5x)
   - Topics: 15
   
   Subject 2: Physics
   - Difficulty: Hard (2.5x)
   - Topics: 12
   
   Subject 3: Chemistry
   - Difficulty: Medium (1.5x)
   - Topics: 10
   
   Subject 4: Biology
   - Difficulty: Easy (1x)
   - Topics: 8
   ```

5. **Generate Plan**
   - Click "Generate Smart Study Plan"
   - Algorithm processes and creates schedule
   - Redirected to dashboard

### 4. Dashboard Overview

**Statistics Cards:**
- **Total Subjects**: Number of subjects in plan
- **Completed Topics**: Topics marked as done
- **Pending Topics**: Remaining topics
- **Days Left**: Until exam date

**Overall Progress:**
- Visual progress bar
- Percentage completion
- Motivational message

**Today's Study Plan:**
- Sessions scheduled for today
- Start and end times
- Subject and topic names
- Study vs. revision indicator

**Progress Chart:**
- Subject-wise completed vs. remaining hours
- Visual comparison
- Data from your study plan

### 5. Calendar View

**Features:**
- 7-day calendar grid
- Color-coded subjects
- Study sessions displayed
- Filled slots indicate scheduled work
- Click slots to see details

**Understanding Colors:**
- Each subject has consistent color
- Makes pattern recognition easier
- Color legend provided

### 6. Progress Tracking

**Topic Checklist:**
- All subjects and topics listed
- Checkboxes for completion
- Auto-save to LocalStorage
- Real-time progress updates

**Statistics:**
- Total subjects and topics
- Days available for study
- Total and daily hours

**Achievements/Milestones:**
- 25%, 50%, 75%, 100% completion markers
- Celebrate progress
- Stay motivated

### 7. Smart Algorithm Explained

#### How Distribution Works

The algorithm distributes study hours based on:

**Weights (Multipliers):**
```
Easy Topic:    1.0x weight
Medium Topic:  1.5x weight
Hard Topic:    2.5x weight
```

**Calculation Example:**
```
Total Days: 30
Hours/Day: 4
Total Hours: 120

Subjects:
- Math (Hard, 15 topics) = 15 × 2.5 = 37.5 weight
- Physics (Hard, 12 topics) = 12 × 2.5 = 30 weight
- Chemistry (Medium, 10 topics) = 10 × 1.5 = 15 weight
- Biology (Easy, 8 topics) = 8 × 1.0 = 8 weight

Total Weight: 90.5

Allocation:
- Math: (37.5/90.5) × 120 = 49.8 hours
- Physics: (30/90.5) × 120 = 39.8 hours
- Chemistry: (15/90.5) × 120 = 19.9 hours
- Biology: (8/90.5) × 120 = 10.6 hours
```

#### Spaced Repetition Schedule

After studying a topic, revisions are scheduled:

```
Day 0:    Initial Study (2 hours)
Day 1:    1st Revision (1 hour)
Day 3:    2nd Revision (1 hour)
Day 7:    3rd Revision (0.5 hour)
Day 14:   Final Revision (0.5 hour)
```

**Why This Works:**
- Reinforces memory consolidation
- Proven by cognitive science
- Prevents forgetting
- Optimizes retention

---

## Technical Architecture

### Technology Stack

```
Frontend: HTML5 + CSS3 + Vanilla JavaScript
Storage: Browser LocalStorage
Charts: Chart.js (CDN)
Icons: FontAwesome (CDN)
Deployment: Vercel (Static Hosting)
```

### File Structure

```
├── index.html                 (Landing/Root)
├── public/
│   ├── register.html         (Auth)
│   ├── login.html           (Auth)
│   ├── dashboard.html       (Main App)
│   ├── create-plan.html     (Planning)
│   ├── calendar.html        (Schedule View)
│   ├── progress.html        (Tracking)
│   ├── css/
│   │   └── styles.css       (All styling)
│   ├── js/
│   │   ├── main.js         (App logic & DOM)
│   │   └── algorithm.js    (Study scheduler)
│   └── assets/
│       (Images/icons placeholder)
└── README.md               (Documentation)
```

### Data Flow

```
User Register/Login
↓
Create Study Plan
↓
Smart Algorithm generates schedule
↓
Save to LocalStorage
↓
Display on Dashboard
↓
User marks progress
↓
Update LocalStorage
↓
Refresh views automatically
```

### LocalStorage Schema

```javascript
// Users Table
{
  "users": [
    {
      "id": 1234567890,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "hashedPassword123",
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}

// Current Session
{
  "currentUser": {
    "id": 1234567890,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T10:00:00.000Z"
  }
}

// Study Plans
{
  "studyPlans": {
    "1234567890": {
      "subjects": [
        {
          "name": "Mathematics",
          "difficulty": "hard",
          "topicCount": 15,
          "totalHours": 50,
          "hoursPerTopic": 3.33,
          "topicsSchedule": [
            {
              "topicId": 1,
              "topicName": "Mathematics - Topic 1",
              "initialStudyDay": 0,
              "initialStudyHours": 3.33,
              "revisions": [...],
              "completed": false
            }
          ]
        }
      ],
      "weeklySchedule": [...],
      "daysAvailable": 30,
      "hoursPerDay": 4,
      "examDate": "2024-02-01",
      "totalHoursAvailable": 120,
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  }
}

// Progress Tracking
{
  "progress": {
    "1234567890": {
      "subjectIndex_topicIndex": true
    }
  }
}
```

### Key Classes

#### SmartStudyAlgorithm

```javascript
new SmartStudyAlgorithm(config)
  .generateStudyPlan(subjects, examDate, hoursPerDay)
  .allocateTimeToSubjects()
  .generateWeeklySchedule()
  .calculateProgress()
  .updateTopicProgress()
```

#### SmartStudyApp

```javascript
SmartStudyApp
  .init()                    // Initialize on page load
  .checkAuth()              // Verify user logged in
  .handleRegister()         // User registration
  .handleLogin()           // User authentication
  .handleCreatePlan()      // Plan generation
  .loadDashboardData()     // Fetch and display stats
  .updateTopicProgress()   // Mark topic complete
  .logout()                // End session
```

---

## Smart Algorithm Explained

### Algorithm Overview

The Smart Study Algorithm is the heart of the application. It uses a **weighted distribution model** with **spaced repetition** for optimal learning.

### Phase 1: Weight Calculation

Each subject gets a weight based on difficulty and topic count:

```
Weight = Difficulty Multiplier × Number of Topics

Multipliers:
- Easy: 1.0
- Medium: 1.5
- Hard: 2.5

Example:
Mathematics (Hard, 15 topics) = 15 × 2.5 = 37.5
Physics (Hard, 12 topics) = 12 × 2.5 = 30
Chemistry (Medium, 10 topics) = 10 × 1.5 = 15
Biology (Easy, 8 topics) = 8 × 1.0 = 8

Total Weight = 90.5
```

### Phase 2: Time Allocation

Total available study hours distributed proportionally:

```
Subject Hours = (Subject Weight / Total Weight) × Total Hours

Math Hours = (37.5 / 90.5) × 120 = ~49.8 hours
Physics Hours = (30 / 90.5) × 120 = ~39.8 hours
Chemistry Hours = (15 / 90.5) × 120 = ~19.9 hours
Biology Hours = (8 / 90.5) × 120 = ~10.6 hours
```

### Phase 3: Topic Scheduling

Topics distributed across available days:

```
For each subject:
1. Calculate hours per topic = Total hours / Number of topics
2. Distribute topics across days
3. Add revision sessions
```

### Phase 4: Revision Scheduling

Spaced repetition intervals applied:

```
Day 0:    Initial study (100% duration)
Day 1:    First revision (50% duration)
Day 3:    Second revision (50% duration)
Day 7:    Third revision (50% duration)
Day 14:   Final revision (50% duration)

These intervals are based on Ebbinghaus' Forgetting Curve
and help with long-term retention.
```

### Phase 5: Daily Schedule Generation

For each day, schedule is created with:

```
1. Study sessions (50-60 minutes each)
2. Breaks (15 minutes each)
3. Subject rotation
4. Revision slots
5. Color coding
6. Time slots (9 AM - 9 PM typical)
```

### Example Output

```javascript
{
  subjects: [
    {
      name: "Mathematics",
      difficulty: "hard",
      totalHours: 50,
      hoursPerTopic: 3.33,
      topicsSchedule: [
        {
          topicId: 1,
          topicName: "Mathematics - Topic 1",
          initialStudyDay: 0,
          revisions: [
            { day: 1, type: "1st Revision", duration: 1.66 },
            { day: 3, type: "2nd Revision", duration: 1.66 },
            // ... more revisions
          ]
        }
        // ... more topics
      ]
    }
    // ... more subjects
  ],
  weeklySchedule: [
    {
      weekNumber: 1,
      days: [
        {
          dayNumber: 0,
          date: "2024-01-02",
          sessions: [
            {
              startTime: "09:00",
              endTime: "10:30",
              subject: "Mathematics",
              topic: "Mathematics - Topic 1",
              duration: 1.5,
              type: "initial"
            },
            // ... more sessions
          ]
        }
        // ... more days
      ]
    }
    // ... more weeks
  ]
}
```

---

## Deployment Guide

### Deploying to Vercel

#### Method 1: GitHub Integration (Recommended)

1. **Prepare Your Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Smart Study Planner"
   git branch -M main
   git remote add origin https://github.com/yourusername/smart-study-planner.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub account
   - Click "Add New" → "Project"
   - Select your repository
   - Click "Import"

3. **Configure Project**
   - Project name: `smart-study-planner` (optional)
   - Framework: None (Static)
   - Root directory: `.` (default)
   - Build command: Empty
   - Output directory: `.`
   - Environment variables: None needed

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your live URL (e.g., `smart-study-planner.vercel.app`)

5. **Verify Deployment**
   - Open your live URL
   - Test all pages
   - Check LocalStorage functionality
   - Create test account

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy project
vercel --prod

# Follow the prompts
# Answer questions about your project
# Get live URL after deployment
```

#### Method 3: Manual Upload

1. **Prepare Files**
   - Ensure all files are in project root or `/public`
   - No build process needed

2. **Upload to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select "Clone Template"
   - Upload your project files
   - Click "Deploy"

### Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Landing page displays correctly
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Dashboard loads with no console errors
- [ ] Can create study plan
- [ ] Calendar view works
- [ ] Progress tracking updates
- [ ] Charts display correctly
- [ ] LocalStorage persists data
- [ ] Responsive on mobile
- [ ] All buttons and links work

### Custom Domain (Optional)

1. In Vercel dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Add custom domain
5. Update DNS records with your registrar
6. Wait for SSL certificate (automatic)

---

## Troubleshooting

### Common Issues

#### 1. Page Blank or Not Loading

**Problem**: Opening `index.html` directly shows blank page

**Solution**:
- Use a local server (Python, Node.js, or Live Server)
- Some features require HTTP not file:// protocol
- LocalStorage may not work with `file://` protocol

**Fix**:
```bash
# Option 1: Python server
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: VS Code Live Server extension
```

#### 2. LocalStorage Not Working

**Problem**: Data not saving between sessions

**Possible Causes**:
- Browser privacy mode (incognito)
- LocalStorage quota exceeded
- Cookie/storage disabled in browser settings
- Private/Incognito browsing

**Solution**:
- Disable incognito mode
- Clear old data: `localStorage.clear()`
- Check browser privacy settings
- Enable LocalStorage in preferences

#### 3. Login Not Working

**Problem**: Can't login even with correct credentials

**Debug Steps**:
```javascript
// Open browser console (F12)
// Check stored users
console.log(JSON.parse(localStorage.getItem('users')))

// Check current user
console.log(JSON.parse(localStorage.getItem('currentUser')))

// Try demo account
// Email: mallikarjunbaradenal@gmail.com
// Password: Mallu@123
```

#### 4. Study Plan Not Generating

**Problem**: Clicking "Generate Plan" doesn't work

**Check**:
- Exam date must be in future
- Hours per day must be 1-24
- Must have at least 1 subject
- All required fields filled

**Debug**:
```javascript
// Open console
// Check for error messages
// Verify algorithm imports correctly
```

#### 5. Charts Not Displaying

**Problem**: Progress chart appears blank

**Cause**: Chart.js CDN not loading

**Solution**:
- Check internet connection
- Clear browser cache
- Try different browser
- Check network tab in DevTools for failed requests

#### 6. Mobile Not Responsive

**Problem**: Mobile view looks broken

**Check**:
- Viewport meta tag present: `<meta name="viewport">`
- CSS media queries working
- Sidebar toggle functioning
- Font sizes readable

**Test**:
- Use Chrome DevTools responsive mode
- Test on real device
- Check all breakpoints (480px, 768px, 1200px)

#### 7. Cannot Access Pages After Login

**Problem**: Redirects to login page immediately

**Cause**: currentUser not set in LocalStorage

**Solution**:
```javascript
// Check if user is logged in
const user = JSON.parse(localStorage.getItem('currentUser'))
console.log('Current user:', user)

// If null, navigate to login
// Logout and login again
```

### Browser Console Debugging

```javascript
// Check all stored data
localStorage

// View specific data
JSON.parse(localStorage.getItem('users'))
JSON.parse(localStorage.getItem('currentUser'))
JSON.parse(localStorage.getItem('studyPlans'))

// Test algorithm
const algo = new SmartStudyAlgorithm()
console.log(algo)

// Clear all data (WARNING: destructive)
localStorage.clear()

// Check errors
// Press F12 → Console tab
// Look for red error messages
```

---

## FAQ

### General Questions

**Q: Is my data really safe?**
A: Yes! All data is stored locally in your browser's LocalStorage. It never travels to any server or external service.

**Q: Can I use this offline?**
A: Yes, once loaded, the app works offline. Charts (Chart.js) require internet, but core functionality works without it.

**Q: Can multiple users use this on the same device?**
A: Yes, by logging in/out. Each user's data is stored separately by their account. However, LocalStorage is not truly isolated between users on same browser.

**Q: How much data can I store?**
A: LocalStorage typically allows 5-10MB per domain. This is more than enough for study plans.

**Q: Can I export my study plan?**
A: Currently no, but you can take screenshots or use browser's print feature.

### Technical Questions

**Q: Will this work on old browsers?**
A: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+). Some older browsers may have issues with CSS variables or ES6 features.

**Q: Can I modify the code?**
A: Absolutely! It's open source. Modify, extend, and improve as needed.

**Q: Can I add a backend?**
A: Yes! You can extend it to sync with a backend service by modifying the save/load functions.

**Q: Is there a mobile app?**
A: Not yet, but the web app is fully responsive and works great on mobile.

**Q: Can I share a study plan with friends?**
A: Currently no, but users can take screenshots or copy-paste their schedule.

### Usage Questions

**Q: How do I reset my study plan?**
A: Create a new plan, which will overwrite the previous one. Or manually clear LocalStorage.

**Q: Can I study for multiple exams?**
A: Currently supports one active plan. You can create new plans (replacing old one) or contact developers for multi-exam support.

**Q: How accurate is the algorithm?**
A: The algorithm is based on proven learning science (spaced repetition, difficulty weighting). However, individual results vary. Adjust hours and topics as needed.

**Q: What if I miss a study session?**
A: No penalties! Just continue from where you left off. The schedule adjusts automatically.

**Q: Can I change difficulty after creating plan?**
A: No, but you can create a new plan with updated difficulties.

### Deployment Questions

**Q: How much does Vercel cost?**
A: Vercel is free for static sites! No charges for this application.

**Q: How long does deployment take?**
A: Usually 1-5 minutes from GitHub push to live site.

**Q: Will my site go down?**
A: Vercel has 99.95% uptime. Your app will be very reliable.

**Q: Can I use a custom domain?**
A: Yes, Vercel supports custom domains. Set up through DNS settings.

**Q: How do I update my live site?**
A: Push to GitHub (GitHub method) or re-deploy on Vercel. Updates are automatic with GitHub integration.

### Support

If you have questions not covered here:

1. Check the main README.md
2. Review the code comments
3. Check browser console for errors (F12)
4. Try clearing LocalStorage and cache
5. Test in different browser
6. Create an issue on GitHub

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Status**: Production Ready ✅

Happy Studying! 🎓
