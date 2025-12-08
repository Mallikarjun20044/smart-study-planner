/* ============================================
   SMART STUDY PLANNER - MAIN APPLICATION
   ============================================
   
   This file contains core functionality:
   - Authentication (Login/Register)
   - LocalStorage Management
   - Navigation
   - UI Interactions
   - Data Persistence
   
   All data is stored in browser's LocalStorage (100% Frontend)
   
   ============================================ */

/**
 * Main Application Class
 */
class SmartStudyApp {
  /**
   * Initialize the application
   */
  static init() {
    console.log('📚 Smart Study Planner - Initializing...');

    // Initialize LocalStorage
    this.initializeStorage();

    // Check authentication status
    this.checkAuth();

    // Setup event listeners
    this.setupEventListeners();

    // Handle page-specific initialization
    this.initializePage();

    console.log('✅ Application initialized successfully!');
  }

  /**
   * Initialize LocalStorage with default values
   */
  static initializeStorage() {
    const defaultStorage = {
      users: JSON.parse(localStorage.getItem('users')) || [],
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
      studyPlans: JSON.parse(localStorage.getItem('studyPlans')) || {},
      subjects: JSON.parse(localStorage.getItem('subjects')) || {},
      progress: JSON.parse(localStorage.getItem('progress')) || {},
    };

    // Save back to ensure structure exists
    localStorage.setItem('users', JSON.stringify(defaultStorage.users));
    localStorage.setItem('currentUser', JSON.stringify(defaultStorage.currentUser));
    localStorage.setItem('studyPlans', JSON.stringify(defaultStorage.studyPlans));
    localStorage.setItem('subjects', JSON.stringify(defaultStorage.subjects));
    localStorage.setItem('progress', JSON.stringify(defaultStorage.progress));
  }

  /**
   * Check if user is authenticated
   */
  static checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentPage = this.getCurrentPage();

    if (!currentUser) {
      // Redirect to login if not authenticated
      if (
        currentPage !== 'index.html' &&
        currentPage !== 'login.html' &&
        currentPage !== 'register.html'
      ) {
        window.location.href = 'login.html';
      }
    } else {
      // Redirect to dashboard if authenticated and on login/register page
      if (currentPage === 'login.html' || currentPage === 'register.html') {
        window.location.href = 'dashboard.html';
      }
    }
  }

  /**
   * Get current page name
   */
  static getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
  }

  /**
   * Setup global event listeners
   */
  static setupEventListeners() {
    // Navigation links
    document.querySelectorAll('nav a').forEach((link) => {
      link.addEventListener('click', (e) => {
        this.setActiveNav(e.target);
      });
    });

    // Sidebar links
    document.querySelectorAll('.sidebar-menu a').forEach((link) => {
      link.addEventListener('click', (e) => {
        this.setActiveNav(e.target);
      });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.logout();
      });
    }
  }

  /**
   * Initialize page-specific content
   */
  static initializePage() {
    const currentPage = this.getCurrentPage();

    switch (currentPage) {
      case 'register.html':
        this.initRegisterPage();
        break;
      case 'login.html':
        this.initLoginPage();
        break;
      case 'dashboard.html':
        this.initDashboardPage();
        break;
      case 'create-plan.html':
        this.initCreatePlanPage();
        break;
      case 'calendar.html':
        this.initCalendarPage();
        break;
      case 'progress.html':
        this.initProgressPage();
        break;
      case 'index.html':
        this.initLandingPage();
        break;
    }
  }

  /**
   * Initialize Landing Page
   */
  static initLandingPage() {
    const loginBtn = document.getElementById('loginBtn');
    const createPlanBtn = document.getElementById('createPlanBtn');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        // Landing page lives at project root; auth pages are under /public
        window.location.href = '/public/login.html';
      });
    }

    if (createPlanBtn) {
      createPlanBtn.addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          window.location.href = '/public/create-plan.html';
        } else {
          window.location.href = '/public/register.html';
        }
      });
    }
  }

  /**
   * Initialize Register Page
   */
  static initRegisterPage() {
    const form = document.getElementById('registerForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        this.handleRegister(e);
      });
    }
  }

  /**
   * Handle user registration
   */
  static handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    // Validation
    if (!name || !email || !password) {
      this.showAlert('All fields are required', 'error');
      return;
    }

    if (password.length < 6) {
      this.showAlert('Password must be at least 6 characters', 'error');
      return;
    }

    if (password !== confirmPassword) {
      this.showAlert('Passwords do not match', 'error');
      return;
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users'));
    if (users.some((user) => user.email === email)) {
      this.showAlert('Email already registered', 'error');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password: this.hashPassword(password), // Simple hash (not secure, but for demo)
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.showAlert('✅ Registration successful! Redirecting to login...', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  }

  /**
   * Initialize Login Page
   */
  static initLoginPage() {
    const form = document.getElementById('loginForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        this.handleLogin(e);
      });
    }
  }

  /**
   * Handle user login
   */
  static handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
      this.showAlert('Email and password are required', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find((u) => u.email === email);

    if (!user || user.password !== this.hashPassword(password)) {
      this.showAlert('Invalid email or password', 'error');
      return;
    }

    // Remove password before storing
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    this.showAlert('✅ Login successful!', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  }

  /**
   * Simple password hash function (for demo purposes)
   */
  static hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

  /**
   * Initialize Dashboard Page
   */
  static initDashboardPage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      // Update user name
      const userNameElement = document.getElementById('userName');
      if (userNameElement) {
        userNameElement.textContent = currentUser.name;
      }

      // Load and display study plan summary
      this.loadDashboardData();
    }
  }

  /**
   * Load dashboard data from LocalStorage
   */
  static loadDashboardData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const studyPlans = JSON.parse(localStorage.getItem('studyPlans'));
    const userPlan = studyPlans[currentUser.id];

    // Update stats
    if (userPlan) {
      const totalSubjects = userPlan.subjects.length;
      const completedTopics = userPlan.subjects.reduce((sum, subject) => {
        return sum + subject.topicsSchedule.filter((t) => t.completed).length;
      }, 0);
      const totalTopics = userPlan.subjects.reduce(
        (sum, subject) => sum + subject.topicsSchedule.length,
        0
      );
      const daysLeft = Math.max(0, userPlan.daysAvailable);
      const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

      // Update stat cards
      this.updateStatCard('totalSubjects', totalSubjects);
      this.updateStatCard('completedTopics', completedTopics);
      this.updateStatCard('pendingTopics', totalTopics - completedTopics);
      this.updateStatCard('daysLeft', daysLeft);

      // Update progress bar
      this.updateProgressBar('overallProgress', progress);

      // Load today's plan
      this.loadTodaysPlan(userPlan);

      // Render chart
      this.renderProgressChart(userPlan);
    }
  }

  /**
   * Update a stat card
   */
  static updateStatCard(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = value;
    }
  }

  /**
   * Update progress bar
   */
  static updateProgressBar(elementId, percentage) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.width = percentage + '%';
      element.textContent = percentage + '%';
    }
  }

  /**
   * Load today's study plan
   */
  static loadTodaysPlan(studyPlan) {
    const todaysPlanContainer = document.getElementById('todaysPlanContainer');
    if (!todaysPlanContainer) return;

    const algorithm = new SmartStudyAlgorithm();
    const todaysPlan = algorithm.getTodaysPlan(studyPlan);

    if (todaysPlan.length === 0) {
      todaysPlanContainer.innerHTML =
        '<p style="color: rgba(255,255,255,0.7); text-align: center;">No sessions scheduled for today. Great job! 🎉</p>';
      return;
    }

    let html = '<div class="today-sessions">';
    todaysPlan.forEach((session) => {
      html += `
        <div class="session-card" style="border-left: 4px solid ${session.color};">
          <div class="session-time">${session.startTime} - ${session.endTime}</div>
          <div class="session-subject">${session.subject}</div>
          <div class="session-topic">${session.topic}</div>
          <div class="session-type">${session.type === 'revision' ? '🔄 Revision' : '📚 Study'}</div>
        </div>
      `;
    });
    html += '</div>';
    todaysPlanContainer.innerHTML = html;
  }

  /**
   * Render progress chart using Chart.js
   */
  static renderProgressChart(studyPlan) {
    const chartContainer = document.getElementById('progressChart');
    if (!chartContainer || !window.Chart) return;

    // Prepare data
    const subjectNames = studyPlan.subjects.map((s) => s.name);
    const completedHours = studyPlan.subjects.map((subject) => {
      const completed = subject.topicsSchedule.filter((t) => t.completed).length;
      const total = subject.topicsSchedule.length;
      return total > 0 ? (completed / total) * subject.totalHours : 0;
    });
    const remainingHours = studyPlan.subjects.map((subject) => {
      const completed = subject.topicsSchedule.filter((t) => t.completed).length;
      const total = subject.topicsSchedule.length;
      return total > 0 ? subject.totalHours - (completed / total) * subject.totalHours : subject.totalHours;
    });

    const ctx = chartContainer.getContext('2d');

    if (window.progressChart) {
      window.progressChart.destroy();
    }

    window.progressChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: subjectNames,
        datasets: [
          {
            label: 'Completed Hours',
            data: completedHours,
            backgroundColor: 'rgba(0, 245, 160, 0.8)',
            borderColor: '#00F5A0',
            borderWidth: 2,
          },
          {
            label: 'Remaining Hours',
            data: remainingHours,
            backgroundColor: 'rgba(92, 93, 255, 0.8)',
            borderColor: '#5C5DFF',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
          legend: {
            labels: {
              color: '#F5F5FF',
              font: {
                size: 12,
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#F5F5FF',
            },
            grid: {
              color: 'rgba(255,255,255,0.1)',
            },
          },
          y: {
            ticks: {
              color: '#F5F5FF',
            },
            grid: {
              color: 'rgba(255,255,255,0.1)',
            },
          },
        },
      },
    });
  }

  /**
   * Initialize Create Plan Page
   */
  static initCreatePlanPage() {
    const form = document.getElementById('createPlanForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        this.handleCreatePlan(e);
      });
    }

    // Add subject button
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    if (addSubjectBtn) {
      addSubjectBtn.addEventListener('click', () => {
        this.addSubjectField();
      });
    }
  }

  /**
   * Add new subject field
   */
  static addSubjectField() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;

    const subjectCount = container.querySelectorAll('.subject-field').length + 1;
    const html = `
      <div class="subject-field card" style="margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h4>Subject ${subjectCount}</h4>
          <button type="button" class="btn btn-accent btn-small" onclick="SmartStudyApp.removeSubjectField(this)">Remove</button>
        </div>
        <div class="form-group">
          <label>Subject Name</label>
          <input type="text" class="subject-name" placeholder="e.g., Data Structures, DBMS, OS, Web Technology" required>
        </div>
        <div class="form-group">
          <label>Difficulty Level</label>
          <select class="subject-difficulty" required>
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div class="form-group">
          <label>Number of Topics</label>
          <input type="number" class="subject-topics" min="1" max="50" placeholder="10" required>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', html);
  }

  /**
   * Remove subject field
   */
  static removeSubjectField(button) {
    button.closest('.subject-field').remove();
  }

  /**
   * Handle create study plan
   */
  static handleCreatePlan(e) {
    e.preventDefault();

    const examDate = new Date(document.getElementById('examDate').value);
    const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);

    if (!examDate || examDate < new Date()) {
      this.showAlert('Please select a future exam date', 'error');
      return;
    }

    if (hoursPerDay <= 0 || hoursPerDay > 24) {
      this.showAlert('Hours per day must be between 0 and 24', 'error');
      return;
    }

    // Collect subjects
    const subjects = [];
    document.querySelectorAll('.subject-field').forEach((field) => {
      const name = field.querySelector('.subject-name').value.trim();
      const difficulty = field.querySelector('.subject-difficulty').value;
      const topicCount = parseInt(field.querySelector('.subject-topics').value);

      if (name && difficulty && topicCount) {
        subjects.push({
          name,
          difficulty,
          topicCount,
        });
      }
    });

    if (subjects.length === 0) {
      this.showAlert('Please add at least one subject', 'error');
      return;
    }

    // Generate plan using algorithm
    try {
      const algorithm = new SmartStudyAlgorithm();
      const studyPlan = algorithm.generateStudyPlan(subjects, examDate, hoursPerDay);

      // Save plan
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const studyPlans = JSON.parse(localStorage.getItem('studyPlans'));
      studyPlans[currentUser.id] = studyPlan;
      localStorage.setItem('studyPlans', JSON.stringify(studyPlans));

      this.showAlert('✅ Study plan created successfully!', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } catch (error) {
      this.showAlert('Error creating plan: ' + error.message, 'error');
    }
  }

  /**
   * Initialize Calendar Page
   */
  static initCalendarPage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const studyPlans = JSON.parse(localStorage.getItem('studyPlans'));
    const userPlan = studyPlans[currentUser.id];

    if (userPlan) {
      this.renderCalendar(userPlan);
    }
  }

  /**
   * Render calendar view
   */
  static renderCalendar(studyPlan) {
    const container = document.getElementById('calendarContainer');
    if (!container) return;

    let html = '<div class="calendar-grid">';

    // Get first week of the plan
    const firstWeek = studyPlan.weeklySchedule[0];
    if (firstWeek) {
      // Day headers
      const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      let dayIndex = 0;

      html += '<div class="calendar-header">';
      dayNames.forEach((day) => {
        html += `<div class="calendar-day">${day}</div>`;
      });
      html += '</div>';

      // Calendar grid
      firstWeek.days.forEach((day) => {
        html += `
          <div class="calendar-slot ${day.sessions.length > 0 ? 'filled' : ''}">
            <div style="font-weight: 600; color: var(--secondary); margin-bottom: 5px;">Day ${day.dayNumber + 1}</div>
            ${day.sessions
              .slice(0, 3)
              .map(
                (session) => `
              <div style="font-size: 0.8rem; margin: 3px 0; padding: 3px; background: rgba(0,212,255,0.1); border-radius: 3px; border-left: 3px solid ${session.color}">
                <strong>${session.subject}</strong><br>
                ${session.startTime}
              </div>
            `
              )
              .join('')}
            ${day.sessions.length > 3 ? '<div style="font-size: 0.75rem; color: #00F5A0;">+' + (day.sessions.length - 3) + ' more</div>' : ''}
          </div>
        `;
      });
    }

    html += '</div>';
    container.innerHTML = html;
  }

  /**
   * Initialize Progress Page
   */
  static initProgressPage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const studyPlans = JSON.parse(localStorage.getItem('studyPlans'));
    
    if (!currentUser) {
      console.error('No current user found');
      window.location.href = 'login.html';
      return;
    }
    
    if (!studyPlans || !studyPlans[currentUser.id]) {
      console.error('No study plan found for user:', currentUser.id);
      document.getElementById('progressStats').innerHTML = '<p style="text-align: center; color: #FFB800;">⚠️ No study plan created yet. <a href="create-plan.html" style="color: #00F5A0;">Create one now!</a></p>';
      return;
    }
    
    const userPlan = studyPlans[currentUser.id];
    console.log('Initializing progress page with plan:', userPlan);
    
    this.renderProgressChecklist(userPlan);
    this.renderProgressChart(userPlan);
    this.renderProgressStatistics(userPlan);
  }

  /**
   * Render progress checklist
   */
  static renderProgressChecklist(studyPlan) {
    const container = document.getElementById('progressChecklist');
    if (!container) return;

    let html = '';

    studyPlan.subjects.forEach((subject, subjectIndex) => {
      html += `
        <div class="card" style="margin-bottom: 20px;">
          <h3>${subject.name}</h3>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(subject.topicsSchedule.filter((t) => t.completed).length / subject.topicsSchedule.length) * 100}%"></div>
          </div>
          <div style="margin-bottom: 15px; color: rgba(255,255,255,0.7);">
            ${subject.topicsSchedule.filter((t) => t.completed).length} / ${subject.topicsSchedule.length} topics completed
          </div>
      `;

      subject.topicsSchedule.forEach((topic, topicIndex) => {
        html += `
          <div style="margin-bottom: 10px;">
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <input type="checkbox" 
                ${topic.completed ? 'checked' : ''} 
                onchange="SmartStudyApp.updateTopicProgress(${subjectIndex}, ${topicIndex}, this.checked)">
              <span>${topic.topicName}</span>
            </label>
          </div>
        `;
      });

      html += '</div>';
    });

    container.innerHTML = html;
  }

  /**
   * Update topic progress in LocalStorage
   */
  static updateTopicProgress(subjectIndex, topicIndex, completed) {
    console.log(`\n📝 TOPIC PROGRESS UPDATE INITIATED`);
    console.log(`  Subject: ${subjectIndex}, Topic: ${topicIndex}, Completed: ${completed}`);
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const studyPlans = JSON.parse(localStorage.getItem('studyPlans'));
    
    if (!currentUser || !studyPlans) {
      console.error('Cannot update progress: missing user or study plans');
      return;
    }
    
    const userPlan = studyPlans[currentUser.id];

    if (userPlan && userPlan.subjects[subjectIndex] && userPlan.subjects[subjectIndex].topicsSchedule[topicIndex]) {
      // Update the topic
      userPlan.subjects[subjectIndex].topicsSchedule[topicIndex].completed = completed;
      studyPlans[currentUser.id] = userPlan;
      localStorage.setItem('studyPlans', JSON.stringify(studyPlans));
      
      console.log(`✅ Topic saved to localStorage`);

      // Refresh all displays immediately
      console.log(`🔄 Refreshing all displays...`);
      this.renderProgressChecklist(userPlan);
      console.log(`  ✓ Checklist rendered`);
      this.renderProgressChart(userPlan);
      console.log(`  ✓ Chart rendered`);
      this.renderProgressStatistics(userPlan);
      console.log(`  ✓ Statistics rendered`);
      
      console.log(`✅ ALL DISPLAYS UPDATED\n`);
      
      // Try to update dashboard if function exists
      if (typeof this.loadDashboardData === 'function') {
        this.loadDashboardData();
      }
    } else {
      console.error('Invalid subject or topic index', {subjectIndex, topicIndex});
    }
  }

  /**
   * Render progress statistics
   */
  static renderProgressStatistics(studyPlan) {
    const container = document.getElementById('progressStats');
    if (!container) return;

    const algorithm = new SmartStudyAlgorithm();
    const summary = algorithm.getStudyPlanSummary(studyPlan);
    const completionPercentage = algorithm.calculateProgress(studyPlan);
    
    // Calculate completed topics
    const totalTopics = studyPlan.subjects.reduce(
      (sum, subject) => sum + subject.topicsSchedule.length,
      0
    );
    const completedTopics = studyPlan.subjects.reduce((sum, subject) => {
      return sum + subject.topicsSchedule.filter((t) => t.completed).length;
    }, 0);

    console.log(`\n📊 PROGRESS STATISTICS RENDERING`);
    console.log(`  Total Topics: ${totalTopics}`);
    console.log(`  Completed Topics: ${completedTopics}`);
    console.log(`  Completion %: ${completionPercentage}%`);

    let html = `
      <div class="dashboard-grid">
        <div class="stat-card">
          <div class="stat-number">${completionPercentage}%</div>
          <div class="stat-label">Overall Progress</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${completedTopics} / ${totalTopics}</div>
          <div class="stat-label">Topics Completed</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${summary.totalSubjects}</div>
          <div class="stat-label">Total Subjects</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${summary.totalDays}</div>
          <div class="stat-label">Days Until Exam</div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    
    console.log(`  HTML rendered to progressStats container`);
    console.log(`  Now calling updateMilestones(${completionPercentage})...`);
    
    // Update milestone highlights immediately
    this.updateMilestones(completionPercentage);
    console.log(`📊 Statistics rendering complete\n`);
  }

  /**
   * Render and update milestone cards based on progress
   */
  static updateMilestones(completionPercentage) {
    console.log('🎯 MILESTONE UPDATE TRIGGERED - Progress:', completionPercentage + '%');
    
    const container = document.getElementById('milestonesContainer');
    if (!container) {
      console.error('❌ Milestones container not found!');
      return;
    }
    
    const milestones = [
      { threshold: 25, emoji: '📚', title: '25% Complete', subtitle: 'Getting Started', rgb: '0, 212, 255' },
      { threshold: 50, emoji: '⚡', title: '50% Complete', subtitle: 'Halfway There', rgb: '92, 93, 255' },
      { threshold: 75, emoji: '🚀', title: '75% Complete', subtitle: 'In the Home Stretch', rgb: '255, 184, 0' },
      { threshold: 100, emoji: '🎉', title: '100% Complete', subtitle: 'Ready for Exam!', rgb: '0, 245, 160' }
    ];

    let achievedCount = 0;
    let milestonesHTML = '';
    
    milestones.forEach(milestone => {
      const isAchieved = completionPercentage >= milestone.threshold;
      
      if (isAchieved) {
        achievedCount++;
        // ACHIEVED MILESTONE - Bright and glowing
        milestonesHTML += `
          <div style="
            text-align: center;
            padding: 20px;
            background: rgba(${milestone.rgb}, 0.2);
            border-radius: 12px;
            transition: all 0.4s ease;
            opacity: 1;
            border: 3px solid rgba(${milestone.rgb}, 0.9);
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(${milestone.rgb}, 0.6);
          ">
            <div style="font-size: 2.5rem; margin-bottom: 10px;">${milestone.emoji}</div>
            <p style="font-size: 0.9rem; color: rgba(255, 255, 255, 1); margin: 0;">
              <strong>${milestone.title}</strong><br />
              <span style="color: rgba(255, 255, 255, 0.8); font-size: 0.85rem;">✅ ${milestone.subtitle}</span>
            </p>
          </div>
        `;
        console.log(`✅ ${milestone.threshold}% ACHIEVED!`);
      } else {
        // UNACHIEVED MILESTONE - Dimmed and locked
        milestonesHTML += `
          <div style="
            text-align: center;
            padding: 20px;
            background: rgba(${milestone.rgb}, 0.03);
            border-radius: 12px;
            transition: all 0.4s ease;
            opacity: 0.35;
            border: 2px solid rgba(255, 255, 255, 0.08);
            transform: scale(1);
            box-shadow: none;
          ">
            <div style="font-size: 2.5rem; margin-bottom: 10px; opacity: 0.5;">${milestone.emoji}</div>
            <p style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.6); margin: 0;">
              <strong>${milestone.title}</strong><br />
              <span style="color: rgba(255, 255, 255, 0.4); font-size: 0.85rem;">🔒 ${milestone.subtitle}</span>
            </p>
          </div>
        `;
        console.log(`⏳ ${milestone.threshold}% locked`);
      }
    });
    
    container.innerHTML = milestonesHTML;
    console.log(`🏆 ${achievedCount} of ${milestones.length} milestones achieved!\n`);
  }

  /**
   * Show alert message
   */
  static showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${
        type === 'success' ? 'rgba(0, 245, 160, 0.2)' : type === 'error' ? 'rgba(255, 0, 110, 0.2)' : 'rgba(92, 93, 255, 0.2)'
      };
      border-left: 4px solid ${
        type === 'success' ? '#00F5A0' : type === 'error' ? '#FF006E' : '#5C5DFF'
      };
      color: ${type === 'success' ? '#00F5A0' : type === 'error' ? '#FF006E' : '#5C5DFF'};
      border-radius: 8px;
      z-index: 9999;
      animation: slideInRight 0.3s ease-out;
      max-width: 400px;
    `;

    document.body.appendChild(alert);

    // Remove after 3 seconds
    setTimeout(() => {
      alert.style.animation = 'slideInLeft 0.3s ease-out reverse';
      setTimeout(() => alert.remove(), 300);
    }, 3000);
  }

  /**
   * Set active navigation link
   */
  static setActiveNav(element) {
    // Remove active class from all nav links
    document.querySelectorAll('nav a, .sidebar-menu a').forEach((link) => {
      link.classList.remove('active');
    });

    // Add active class to clicked link
    element.classList.add('active');
  }

  /**
   * Toggle mobile menu
   */
  static toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
  }

  /**
   * Logout user
   */
  static logout() {
    localStorage.setItem('currentUser', null);
    this.showAlert('✅ Logged out successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }

  /**
   * Format date
   */
  static formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Calculate days remaining
   */
  static daysRemaining(examDate) {
    const now = new Date();
    const exam = new Date(examDate);
    const timeDiff = exam - now;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  SmartStudyApp.init();
});
