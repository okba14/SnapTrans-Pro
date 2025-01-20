const translations = {
  en: {
    "Login": "Login",
    "Sign up": "Sign up",
    "Create Account": "Create Account",
    "Don't have an account?": "Don't have an account?",
    "Already have an account?": "Already have an account?",
    "Logout": "Logout",
    "Take Screenshot": "Take Screenshot",
    "Start Recording": "Start Recording",
    "Stop Recording": "Stop Recording",
    "Translate": "Translate",
    "Enter text to translate...": "Enter text to translate...",
    "Email": "Email",
    "Password": "Password",
    "Full Name": "Full Name"
  },
  ar: {
    "Login": "تسجيل الدخول",
    "Sign up": "إنشاء حساب",
    "Create Account": "إنشاء حساب",
    "Don't have an account?": "ليس لديك حساب؟",
    "Already have an account?": "لديك حساب بالفعل؟",
    "Logout": "تسجيل الخروج",
    "Take Screenshot": "التقاط صورة",
    "Start Recording": "بدء التسجيل",
    "Stop Recording": "إيقاف التسجيل",
    "Translate": "ترجم",
    "Enter text to translate...": "أدخل النص للترجمة...",
    "Email": "البريد الإلكتروني",
    "Password": "كلمة المرور",
    "Full Name": "الاسم الكامل"
  }
};

function updateLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(element => {
    const key = element.getAttribute(`data-${lang}`);
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  const textareas = document.querySelectorAll('textarea[data-en-placeholder]');
  textareas.forEach(textarea => {
    textarea.placeholder = translations[lang][textarea.getAttribute(`data-${lang}-placeholder`)];
  });
}

// Initialize language selector
document.getElementById('langSelector').addEventListener('change', (e) => {
  updateLanguage(e.target.value);
});

document.getElementById('appLangSelector').addEventListener('change', (e) => {
  updateLanguage(e.target.value);
});