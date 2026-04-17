// ============================================
//  COURSE DATA
// ============================================
const COURSES = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    category: "Programming",
    description: "Master core JavaScript concepts from variables and functions to async programming and DOM manipulation.",
    duration: "8 hours",
    lessons: 12,
    level: "Beginner",
    instructor: "Sarah Chen",
    rating: 4.8,
    students: 3241,
    color: "#F59E0B",
    icon: "⚡",
    lessonList: [
      "Introduction to JavaScript",
      "Variables & Data Types",
      "Functions & Scope",
      "Arrays & Objects",
      "DOM Manipulation",
      "Events & Listeners",
      "Fetch & Promises",
      "Async / Await",
      "Error Handling",
      "ES6+ Features",
      "Modules & Imports",
      "Final Project"
    ]
  },
  {
    id: 2,
    title: "UI/UX Design Principles",
    category: "Design",
    description: "Learn to design beautiful, user-centered interfaces using modern design systems and accessibility best practices.",
    duration: "6 hours",
    lessons: 9,
    level: "Beginner",
    instructor: "Marcus Rivera",
    rating: 4.9,
    students: 2187,
    color: "#EC4899",
    icon: "🎨",
    lessonList: [
      "Design Thinking",
      "Color Theory",
      "Typography Basics",
      "Layout & Grid",
      "Component Design",
      "Prototyping",
      "User Testing",
      "Accessibility",
      "Final Design Sprint"
    ]
  },
  {
    id: 3,
    title: "Python for Data Science",
    category: "Data Science",
    description: "Dive into data analysis with Python, pandas, numpy, and matplotlib. Build real-world data pipelines.",
    duration: "10 hours",
    lessons: 14,
    level: "Intermediate",
    instructor: "Dr. Aisha Patel",
    rating: 4.7,
    students: 4512,
    color: "#10B981",
    icon: "📊",
    lessonList: [
      "Python Refresher",
      "NumPy Basics",
      "Pandas DataFrames",
      "Data Cleaning",
      "Exploratory Analysis",
      "Matplotlib Plots",
      "Seaborn Visualizations",
      "Statistical Analysis",
      "Machine Learning Intro",
      "Scikit-learn",
      "Model Evaluation",
      "Feature Engineering",
      "Real World Dataset",
      "Capstone Project"
    ]
  },
  {
    id: 4,
    title: "React & Modern Web Dev",
    category: "Programming",
    description: "Build dynamic, scalable web apps with React, hooks, context API, and integration with REST APIs.",
    duration: "12 hours",
    lessons: 16,
    level: "Intermediate",
    instructor: "James Okafor",
    rating: 4.6,
    students: 5890,
    color: "#3B82F6",
    icon: "⚛️",
    lessonList: [
      "React Introduction",
      "JSX & Components",
      "Props & State",
      "useState Hook",
      "useEffect Hook",
      "Event Handling",
      "Lists & Keys",
      "Forms",
      "Context API",
      "useContext",
      "Custom Hooks",
      "React Router",
      "Fetching Data",
      "Error Boundaries",
      "Performance",
      "Deployment"
    ]
  },
  {
    id: 5,
    title: "Cloud Architecture Essentials",
    category: "DevOps",
    description: "Understand cloud infrastructure, AWS services, containerization with Docker, and deploying scalable apps.",
    duration: "9 hours",
    lessons: 11,
    level: "Advanced",
    instructor: "Nina Kowalski",
    rating: 4.5,
    students: 1823,
    color: "#8B5CF6",
    icon: "☁️",
    lessonList: [
      "Cloud Fundamentals",
      "AWS Core Services",
      "EC2 & Networking",
      "S3 & Storage",
      "RDS Databases",
      "Docker Basics",
      "Kubernetes Intro",
      "CI/CD Pipelines",
      "Monitoring & Logs",
      "Security Best Practices",
      "Cost Optimization"
    ]
  },
  {
    id: 6,
    title: "Machine Learning Mastery",
    category: "AI/ML",
    description: "From regression to neural networks — build and deploy ML models using Python and TensorFlow.",
    duration: "15 hours",
    lessons: 18,
    level: "Advanced",
    instructor: "Dr. Lena Park",
    rating: 4.9,
    students: 6201,
    color: "#EF4444",
    icon: "🤖",
    lessonList: [
      "ML Fundamentals",
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Random Forests",
      "Support Vector Machines",
      "K-Means Clustering",
      "Neural Network Basics",
      "TensorFlow Setup",
      "Deep Learning",
      "CNNs",
      "RNNs & LSTMs",
      "Transfer Learning",
      "NLP Basics",
      "Model Deployment",
      "MLOps",
      "Ethics in AI",
      "Capstone Project"
    ]
  }
];

// ============================================
//  LOCAL STORAGE HELPERS
// ============================================
const Storage = {
  getEnrolled() {
    return JSON.parse(localStorage.getItem('lf_enrolled') || '[]');
  },
  saveEnrolled(list) {
    localStorage.setItem('lf_enrolled', JSON.stringify(list));
  },
  getProgress() {
    return JSON.parse(localStorage.getItem('lf_progress') || '{}');
  },
  saveProgress(p) {
    localStorage.setItem('lf_progress', JSON.stringify(p));
  },
  isEnrolled(id) {
    return this.getEnrolled().includes(id);
  },
  enroll(id) {
    const list = this.getEnrolled();
    if (!list.includes(id)) { list.push(id); this.saveEnrolled(list); }
  },
  unenroll(id) {
    this.saveEnrolled(this.getEnrolled().filter(x => x !== id));
    const p = this.getProgress();
    delete p[id];
    this.saveProgress(p);
  },
  toggleLesson(courseId, lessonIndex) {
    const p = this.getProgress();
    if (!p[courseId]) p[courseId] = [];
    const i = p[courseId].indexOf(lessonIndex);
    if (i === -1) p[courseId].push(lessonIndex);
    else p[courseId].splice(i, 1);
    this.saveProgress(p);
  },
  getCompletedLessons(courseId) {
    return this.getProgress()[courseId] || [];
  },
  getPercent(courseId) {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return 0;
    return Math.round((this.getCompletedLessons(courseId).length / course.lessonList.length) * 100);
  }
};