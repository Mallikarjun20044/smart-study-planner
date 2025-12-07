/* ============================================
   SMART STUDY PLANNER - INTELLIGENT ALGORITHM
   ============================================
   
   This algorithm intelligently distributes study hours based on:
   - Subject difficulty
   - Number of topics
   - Available time per day
   - Exam date
   - Spaced repetition for revision
   
   Algorithm Features:
   1. Difficulty-weighted time allocation
   2. Smart revision scheduling (Spaced Repetition)
   3. Load balancing across weeks
   4. Adaptive scheduling
   5. Break management
   
   ============================================ */

/**
 * Main Algorithm Class for generating study plans
 */
class SmartStudyAlgorithm {
  /**
   * Constructor
   * @param {Object} config - Configuration object
   */
  constructor(config = {}) {
    this.difficultyWeights = {
      easy: 1,
      medium: 1.5,
      hard: 2.5,
    };
    this.breakDuration = config.breakDuration || 15; // minutes
    this.studySessionDuration = config.studySessionDuration || 50; // minutes
  }

  /**
   * Generate a complete study plan
   * @param {Array} subjects - Array of subject objects
   * @param {Date} examDate - Target exam date
   * @param {Number} hoursPerDay - Available study hours per day
   * @returns {Object} Complete study schedule
   */
  generateStudyPlan(subjects, examDate, hoursPerDay) {
    // Validate inputs
    if (!subjects || subjects.length === 0) {
      throw new Error('At least one subject is required');
    }

    if (!(examDate instanceof Date) || isNaN(examDate)) {
      throw new Error('Valid exam date is required');
    }

    if (hoursPerDay <= 0 || hoursPerDay > 24) {
      throw new Error('Hours per day must be between 0 and 24');
    }

    // Calculate total days available
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);
    const daysAvailable = Math.ceil(
      (examDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysAvailable <= 0) {
      throw new Error('Exam date must be in the future');
    }

    // Calculate total weight
    const totalWeight = this.calculateTotalWeight(subjects);

    // Generate schedule
    const schedule = {
      subjects: this.allocateTimeToSubjects(
        subjects,
        totalWeight,
        daysAvailable,
        hoursPerDay
      ),
      weeklySchedule: [],
      daysAvailable,
      hoursPerDay,
      examDate,
      totalHoursAvailable: daysAvailable * hoursPerDay,
      createdAt: new Date(),
    };

    // Generate weekly breakdown
    schedule.weeklySchedule = this.generateWeeklySchedule(
      schedule.subjects,
      daysAvailable,
      hoursPerDay
    );

    return schedule;
  }

  /**
   * Calculate total difficulty weight across all subjects
   * @param {Array} subjects - Array of subject objects
   * @returns {Number} Total weight
   */
  calculateTotalWeight(subjects) {
    return subjects.reduce((total, subject) => {
      const weight = this.difficultyWeights[subject.difficulty] || 1;
      const topicCount = subject.topicCount || 1;
      return total + weight * topicCount;
    }, 0);
  }

  /**
   * Allocate study hours to each subject based on difficulty and topics
   * @param {Array} subjects - Array of subjects
   * @param {Number} totalWeight - Total difficulty weight
   * @param {Number} daysAvailable - Days until exam
   * @param {Number} hoursPerDay - Available study hours per day
   * @returns {Array} Subjects with allocated hours
   */
  allocateTimeToSubjects(subjects, totalWeight, daysAvailable, hoursPerDay) {
    const totalHours = daysAvailable * hoursPerDay;

    return subjects.map((subject) => {
      const weight = this.difficultyWeights[subject.difficulty] || 1;
      const topicCount = subject.topicCount || 1;
      const subjectWeight = weight * topicCount;

      // Allocate hours proportional to weight
      const allocatedHours = (subjectWeight / totalWeight) * totalHours;

      // Calculate hours per topic
      const hoursPerTopic = allocatedHours / topicCount;

      return {
        ...subject,
        totalHours: Math.round(allocatedHours),
        hoursPerTopic: Math.round(hoursPerTopic * 100) / 100,
        weight: subjectWeight,
        topicsSchedule: this.generateTopicSchedule(
          subject,
          allocatedHours,
          daysAvailable
        ),
      };
    });
  }

  /**
   * Generate schedule for individual topics with revision
   * @param {Object} subject - Subject object
   * @param {Number} totalHours - Total hours for subject
   * @param {Number} daysAvailable - Days available
   * @returns {Array} Topic schedules with revision
   */
  generateTopicSchedule(subject, totalHours, daysAvailable) {
    const topics = [];
    const hoursPerTopic = totalHours / subject.topicCount;
    const daysBetweenRevisions = [1, 3, 7, 14]; // Spaced repetition intervals

    for (let i = 0; i < subject.topicCount; i++) {
      const startDay = Math.floor((i / subject.topicCount) * daysAvailable);
      const revisions = [];

      // Generate revision schedule
      daysBetweenRevisions.forEach((dayGap, index) => {
        const revisionDay = startDay + dayGap;
        if (revisionDay < daysAvailable) {
          revisions.push({
            day: revisionDay,
            type: ['Initial', '1st Revision', '2nd Revision', 'Final Revision'][
              index
            ],
            duration: Math.ceil(hoursPerTopic / 2), // Revisions are shorter
          });
        }
      });

      topics.push({
        topicId: i + 1,
        topicName: `${subject.name} - Topic ${i + 1}`,
        initialStudyDay: startDay,
        initialStudyHours: hoursPerTopic,
        revisions,
        completed: false,
        progress: 0,
      });
    }

    return topics;
  }

  /**
   * Generate weekly schedule with daily breakdown
   * @param {Array} subjects - Subjects with allocated hours
   * @param {Number} daysAvailable - Total days available
   * @param {Number} hoursPerDay - Hours available per day
   * @returns {Array} Weekly schedules
   */
  generateWeeklySchedule(subjects, daysAvailable, hoursPerDay) {
    const weeks = [];
    const totalWeeks = Math.ceil(daysAvailable / 7);

    for (let week = 0; week < totalWeeks; week++) {
      const weekStart = week * 7;
      const weekEnd = Math.min(weekStart + 7, daysAvailable);
      const weekDays = [];

      for (let day = weekStart; day < weekEnd; day++) {
        const daySchedule = this.generateDaySchedule(
          subjects,
          day,
          hoursPerDay
        );
        weekDays.push(daySchedule);
      }

      weeks.push({
        weekNumber: week + 1,
        startDay: weekStart,
        endDay: weekEnd,
        days: weekDays,
        totalHours: weekDays.reduce((sum, day) => sum + day.totalHours, 0),
      });
    }

    return weeks;
  }

  /**
   * Generate schedule for a specific day
   * @param {Array} subjects - Subjects array
   * @param {Number} dayNumber - Day number
   * @param {Number} hoursPerDay - Hours available
   * @returns {Object} Day schedule
   */
  generateDaySchedule(subjects, dayNumber, hoursPerDay) {
    const sessions = [];
    const studyItems = [];
    let remainingHours = hoursPerDay;
    let sessionStartHour = 9; // Start at 9 AM

    // Collect all study items for this day
    subjects.forEach((subject) => {
      // Check initial study days
      subject.topicsSchedule.forEach((topic) => {
        if (topic.initialStudyDay === dayNumber && !topic.completed) {
          studyItems.push({
            type: 'initial',
            subject: subject.name,
            topicId: topic.topicId,
            duration: topic.initialStudyHours,
            topic: topic.topicName,
          });
        }

        // Check revision days
        topic.revisions.forEach((revision) => {
          if (revision.day === dayNumber) {
            studyItems.push({
              type: 'revision',
              subject: subject.name,
              topicId: topic.topicId,
              duration: revision.duration,
              revisionType: revision.type,
              topic: topic.topicName,
            });
          }
        });
      });
    });

    // Sort by subject to group them
    studyItems.sort((a, b) => a.subject.localeCompare(b.subject));

    // Distribute study items across the day with breaks
    studyItems.forEach((item) => {
      if (remainingHours > 0) {
        const sessionHours = Math.min(
          item.duration,
          this.studySessionDuration / 60
        );
        sessions.push({
          startTime: this.minutesToTime(sessionStartHour * 60),
          endTime: this.minutesToTime(sessionStartHour * 60 + sessionHours * 60),
          subject: item.subject,
          topic: item.topic,
          duration: sessionHours,
          type: item.type,
          revisionType: item.revisionType,
          color: this.getSubjectColor(item.subject),
        });

        sessionStartHour += sessionHours + this.breakDuration / 60;
        remainingHours -= sessionHours;
      }
    });

    return {
      dayNumber,
      date: this.getDateForDay(dayNumber),
      sessions,
      totalHours: studyItems.reduce((sum, item) => sum + item.duration, 0),
      subjectsToday: [...new Set(studyItems.map((item) => item.subject))],
    };
  }

  /**
   * Convert minutes to time string (HH:MM format)
   * @param {Number} minutes - Minutes since midnight
   * @returns {String} Time string
   */
  minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  /**
   * Get date for a given day number
   * @param {Number} dayNumber - Day number
   * @returns {String} Date string
   */
  getDateForDay(dayNumber) {
    const date = new Date();
    date.setDate(date.getDate() + dayNumber);
    return date.toISOString().split('T')[0];
  }

  /**
   * Get consistent color for a subject
   * @param {String} subject - Subject name
   * @returns {String} Color code
   */
  getSubjectColor(subject) {
    const colors = [
      '#5C5DFF',
      '#00D4FF',
      '#FF006E',
      '#00F5A0',
      '#5A7FDB',
      '#FFB800',
      '#FF4081',
      '#00BCD4',
    ];
    // Simple hash function to get consistent color
    let hash = 0;
    for (let i = 0; i < subject.length; i++) {
      hash = subject.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  /**
   * Get summary statistics for the study plan
   * @param {Object} plan - Study plan object
   * @returns {Object} Summary statistics
   */
  getStudyPlanSummary(plan) {
    const summary = {
      totalSubjects: plan.subjects.length,
      totalDays: plan.daysAvailable,
      totalHours: plan.totalHoursAvailable,
      averageHoursPerDay: Math.round(plan.hoursPerDay * 100) / 100,
      subjectBreakdown: plan.subjects.map((subject) => ({
        name: subject.name,
        totalHours: subject.totalHours,
        topics: subject.topicCount,
        difficulty: subject.difficulty,
      })),
      startDate: new Date().toISOString().split('T')[0],
      endDate: plan.examDate.toISOString().split('T')[0],
    };
    return summary;
  }

  /**
   * Calculate progress percentage
   * @param {Object} plan - Study plan
   * @returns {Number} Completion percentage
   */
  calculateProgress(plan) {
    const totalTopics = plan.subjects.reduce(
      (sum, subject) => sum + subject.topicsSchedule.length,
      0
    );
    const completedTopics = plan.subjects.reduce((sum, subject) => {
      return sum + subject.topicsSchedule.filter((t) => t.completed).length;
    }, 0);
    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  }

  /**
   * Get today's study plan
   * @param {Object} plan - Study plan
   * @returns {Array} Today's sessions
   */
  getTodaysPlan(plan) {
    const today = new Date().toISOString().split('T')[0];
    const todaysWeek = plan.weeklySchedule.find((week) => {
      return week.days.some((day) => day.date === today);
    });

    if (todaysWeek) {
      const todaysDay = todaysWeek.days.find((day) => day.date === today);
      return todaysDay ? todaysDay.sessions : [];
    }
    return [];
  }

  /**
   * Update topic progress
   * @param {Object} plan - Study plan
   * @param {Number} subjectIndex - Subject index
   * @param {Number} topicIndex - Topic index
   * @param {Boolean} completed - Completion status
   */
  updateTopicProgress(plan, subjectIndex, topicIndex, completed) {
    if (
      plan.subjects[subjectIndex] &&
      plan.subjects[subjectIndex].topicsSchedule[topicIndex]
    ) {
      plan.subjects[subjectIndex].topicsSchedule[topicIndex].completed =
        completed;
      plan.subjects[subjectIndex].topicsSchedule[topicIndex].progress = completed
        ? 100
        : 0;
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartStudyAlgorithm;
}
