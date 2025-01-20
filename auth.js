class Auth {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.setupEventListeners();
    this.checkAuth();
  }

  setupEventListeners() {
    // Toggle between login and signup forms
    document.getElementById('showSignup').addEventListener('click', () => {
      document.getElementById('loginForm').classList.add('hidden');
      document.getElementById('signupForm').classList.remove('hidden');
    });

    document.getElementById('showLogin').addEventListener('click', () => {
      document.getElementById('signupForm').classList.add('hidden');
      document.getElementById('loginForm').classList.remove('hidden');
    });

    // Handle login
    document.getElementById('loginBtn').addEventListener('click', () => {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      this.login(email, password);
    });

    // Handle signup
    document.getElementById('signupBtn').addEventListener('click', () => {
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      this.signup(name, email, password);
    });

    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      this.logout();
    });
  }

  signup(name, email, password) {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (this.users.some(user => user.email === email)) {
      alert('Email already exists');
      return;
    }

    const user = { name, email, password };
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.login(email, password);
  }

  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.checkAuth();
    } else {
      alert('Invalid email or password');
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.checkAuth();
  }

  checkAuth() {
    const authContainer = document.getElementById('authContainer');
    const appContainer = document.getElementById('appContainer');
    
    if (this.currentUser) {
      authContainer.classList.add('hidden');
      appContainer.classList.remove('hidden');
    } else {
      authContainer.classList.remove('hidden');
      appContainer.classList.add('hidden');
    }
  }
}

// Initialize authentication
const auth = new Auth();