# ⚡ Quick Start Guide

## 30-Second Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/smart-study-planner.git
cd smart-study-planner
```

### 2. Start Local Server
```bash
python -m http.server 8000
```
Or use any local server of your choice.

### 3. Open in Browser
```
http://localhost:8000
```

### 4. Test the App
- **Demo Account**:
  - Email: `mallikarjunbaradenal@gmail.com`
  - Password: `Mallu@123`

- Or create a new account

## Deploy to Vercel in 2 Minutes

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Deploy"

### Done! 🎉
Your app is now live at `your-project.vercel.app`

## What You Get

### 📄 Pages
- Landing page with features showcase
- User registration
- User login
- Dashboard with statistics
- Study plan creation form
- Calendar view
- Progress tracking

### 🧠 Smart Features
- Intelligent algorithm for study scheduling
- Spaced repetition for better retention
- 100% LocalStorage (no backend)
- Beautiful charts with Chart.js
- Responsive design for all devices
- Glass-morphism UI with gradients

### 💾 Data
All data is stored locally:
- User accounts
- Study plans
- Progress tracking
- Subject information

## Quick Test Workflow

1. **Register**: Create new account with any email/password
2. **Create Plan**: Add subjects (Math, Physics, Chemistry)
3. **View Dashboard**: See study statistics
4. **Mark Progress**: Complete topics on progress page
5. **Check Calendar**: View weekly schedule
6. **Verify Data**: Refresh page - data persists!

## File Structure

```
├── index.html              (Landing page - START HERE)
├── public/
│   ├── register.html      (Sign up)
│   ├── login.html         (Sign in)
│   ├── dashboard.html     (Main app)
│   ├── create-plan.html   (Create schedule)
│   ├── calendar.html      (View schedule)
│   ├── progress.html      (Track progress)
│   ├── css/
│   │   └── styles.css     (All styling)
│   └── js/
│       ├── main.js        (App logic)
│       └── algorithm.js   (Smart scheduler)
├── README.md              (Full documentation)
└── DOCUMENTATION.md       (Detailed guide)
```

## Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - No dependencies!
- **LocalStorage** - Data persistence
- **Chart.js** - Beautiful charts
- **FontAwesome** - Icons

## Key Features Explained

### 🧮 Smart Algorithm
Distributes study hours based on:
- Subject difficulty (Easy/Medium/Hard)
- Number of topics
- Available time until exam
- Spaced repetition schedule

### 📊 Progress Tracking
- Real-time statistics
- Beautiful charts
- Topic checklist
- Completion percentage
- Daily/weekly views

### 💾 Local Storage
- No backend needed
- No internet required (except for CDN resources)
- Complete privacy
- Data syncs across tabs

### 📱 Responsive Design
- Desktop (1200px+)
- Tablet (768px-1199px)
- Mobile (<768px)
- All devices fully functional

## Customization

### Change Colors
Edit `/public/css/styles.css`:
```css
:root {
  --primary: #5C5DFF;      /* Purple */
  --secondary: #00D4FF;    /* Cyan */
  --accent: #FF006E;       /* Pink */
  --success: #00F5A0;      /* Green */
}
```

### Adjust Algorithm Weights
Edit `/public/js/algorithm.js`:
```javascript
this.difficultyWeights = {
  easy: 1,      // Change multiplier
  medium: 1.5,
  hard: 2.5
};
```

### Modify Revision Schedule
In `algorithm.js`, function `generateTopicSchedule()`:
```javascript
const daysBetweenRevisions = [1, 3, 7, 14]; // Edit intervals
```

## Troubleshooting

### Page shows blank
→ Use a local server, not `file://`

### LocalStorage not working
→ Disable incognito/private mode

### Charts not showing
→ Check internet connection for CDN

### Login fails
→ Use demo account or register first

### Study plan not generating
→ Fill all fields, exam date must be future

## Resources

- **Full Documentation**: See `DOCUMENTATION.md`
- **Main README**: See `README.md`
- **Algorithm Details**: Comments in `algorithm.js`
- **Styling Guide**: Comments in `styles.css`

## Next Steps

1. ✅ Set up locally (done!)
2. ✅ Test with demo account
3. ✅ Create your own account
4. ✅ Generate a study plan
5. ✅ Explore all features
6. ✅ Deploy to Vercel
7. ✅ Share with friends!

## Support

- Check documentation files
- Review code comments
- Open browser console (F12) for errors
- Clear cache if issues persist

---

**Ready to build? Let's go! 🚀**

Questions? Refer to the full documentation files included in the project.
