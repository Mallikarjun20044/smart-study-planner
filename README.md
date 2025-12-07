# 🎓 Smart Study Planner - Complete Web Application

A fully-responsive, intelligent study planning web application built with **HTML, CSS, and JavaScript only** - no backend required!

## ✨ Features

- **🧠 Smart Algorithm** - Intelligently distributes study hours based on subject difficulty
- **📚 Spaced Repetition** - Scientifically-proven revision scheduling for better retention
- **📊 Beautiful Dashboard** - Real-time progress tracking with Chart.js visualizations
- **📅 Interactive Calendar** - Color-coded weekly study schedule
- **💾 100% Local Storage** - All data saved in browser, no server needed
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI** - Gradients, glass-morphism, smooth animations
- **🚀 Vercel Ready** - Deploy instantly with zero configuration

## 🏗️ Project Structure

```
smart-study-planner/
├── index.html                 # Landing page (Root entry point)
├── public/
│   ├── register.html         # User registration page
│   ├── login.html            # User login page
│   ├── dashboard.html        # Main dashboard with statistics
│   ├── create-plan.html      # Study plan creation form
│   ├── calendar.html         # Weekly study calendar view
│   ├── progress.html         # Progress tracking and analytics
│   ├── css/
│   │   └── styles.css        # Complete styling with animations
│   ├── js/
│   │   ├── main.js          # Core app functionality
│   │   ├── algorithm.js     # Smart scheduling algorithm
│   └── assets/              # Images and icons (placeholder)
└── README.md               # This file
```

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-study-planner.git
   cd smart-study-planner
   ```

2. **Open in browser**
   - Double-click `index.html` to open in your default browser
   - Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```

3. **Access the application**
   - Open `http://localhost:8000` in your browser

4. **Create an account or use demo**
   - Register with any email/password
   - Or use demo: `mallikarjunbaradenal@gmail.com` / `Mallu@123`

## 📋 How It Works

### 1. **Registration & Login**
- Create a new account or login with existing credentials
- All user data is encrypted and stored in browser LocalStorage
- No server communication - complete privacy

### 2. **Create Study Plan**
- Add subjects with difficulty levels (Easy, Medium, Hard)
- Set number of topics for each subject
- Specify your exam date and available study hours per day
- Click "Generate Smart Study Plan"

### 3. **Smart Algorithm**
The algorithm works as follows:

```
1. Calculate total difficulty weight:
   - Easy: 1x multiplier
   - Medium: 1.5x multiplier
   - Hard: 2.5x multiplier

2. Allocate study hours:
   - Total hours = Days available × Hours per day
   - Hours per subject = (Subject weight / Total weight) × Total hours

3. Schedule topics:
   - Distribute topics across available days
   - Add revision sessions using spaced repetition:
     * 1st revision: 1 day later
     * 2nd revision: 3 days later
     * 3rd revision: 7 days later
     * Final revision: 14 days later

4. Generate daily schedule:
   - Create study sessions with breaks
   - Color-code by subject
   - Save to LocalStorage
```

### 4. **Track Progress**
- Mark topics as completed in the Progress page
- View real-time analytics and charts
- Monitor subject-wise performance
- Track days remaining until exam

### 5. **Study Schedule**
- View personalized daily study plan
- Follow recommended sessions with breaks
- Use calendar view for weekly overview
- Adjust pace as needed

## 🔐 Data Storage

All data is stored in **browser LocalStorage**:

```javascript
// Users (hashed password)
localStorage.users: [
  { id, name, email, password (hashed), createdAt }
]

// Current session
localStorage.currentUser: { id, name, email, createdAt }

// Study plans
localStorage.studyPlans: {
  userId: { subjects, weeklySchedule, progress, ... }
}

// Progress tracking
localStorage.progress: { userId: { topicId: status } }
```

**Note**: LocalStorage has a ~5-10MB limit per domain, which is more than enough for this application.

## 🎨 Color Palette

```
Primary:    #5C5DFF (Purple)
Secondary:  #00D4FF (Aqua/Cyan)
Accent:     #FF006E (Pink)
Success:    #00F5A0 (Neon Green)
Tertiary:   #5A7FDB (Blue)
Dark:       #0F1419
Lighter:    #F5F5FF
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🧪 Testing

### Demo Account
- **Email**: mallikarjunbaradenal@gmail.com
- **Password**: Mallu@123

### Test Scenarios

1. **Register New User**
   - Navigate to Register page
   - Fill in details and submit
   - Verify redirect to login

2. **Login**
   - Use demo account or create new one
   - Verify dashboard loads
   - Check LocalStorage for user data

3. **Create Study Plan**
   - Add 3-4 subjects with different difficulty levels
   - Set future exam date (30 days from now)
   - Set 4 hours per day
   - Verify plan generates successfully

4. **Track Progress**
   - Mark some topics as completed
   - Verify progress bars update
   - Check chart visualization

5. **Mobile Testing**
   - Test on mobile viewport (use DevTools)
   - Verify all pages are responsive
   - Check navigation and buttons

## 🚀 Deployment on Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects static site
   - Click "Deploy"

3. **Done!** Your app is live at `your-project.vercel.app`

### Method 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Method 3: Manual Upload

1. Build/Prepare files (no build needed - already static)
2. Compress project: `zip -r smart-study.zip .`
3. Upload to Vercel drag-and-drop interface
4. Deploy

## ✅ Vercel Compatibility Checklist

- ✅ No Node.js/backend required
- ✅ Only static files (HTML, CSS, JS)
- ✅ All paths are relative
- ✅ No API calls or external backend
- ✅ LocalStorage for data persistence
- ✅ CSS and JS in `/public` folder
- ✅ `index.html` as root entry point
- ✅ No build process needed
- ✅ No environment variables required
- ✅ Works offline (except CDN resources)

## 📦 Dependencies

The application uses only **one external library** for charts:

- **Chart.js 3.9.1** - Beautiful chart visualizations (via CDN)

Everything else is **vanilla JavaScript, HTML, and CSS** with no npm dependencies!

## 🔒 Security Notes

- **Passwords**: Hashed using simple hash (for demo only - use proper hashing in production)
- **Data**: All stored locally in browser, never sent to server
- **Privacy**: Users have complete control over their data
- **HTTPS**: Recommended for production deployment

## 🐛 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 File Sizes

- `styles.css`: ~35KB
- `main.js`: ~25KB
- `algorithm.js`: ~15KB
- Total: ~75KB (uncompressed)

## 🎯 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] PDF export of study plan
- [ ] Pomodoro timer integration
- [ ] Notification reminders
- [ ] Cloud sync with optional backend
- [ ] Collaborative study groups
- [ ] Mobile native apps
- [ ] Offline service worker

## 📄 License

MIT License - Feel free to use for personal or commercial projects!

## 👨‍💻 Author

Built with ❤️ for students who want to study smarter.

## 💬 Feedback & Support

- Found a bug? Open an issue on GitHub
- Have suggestions? Create a pull request
- Questions? Check the documentation above

---

**Happy Studying! 🎓 Remember: Consistency beats intensity. Study smart, achieve more!**
