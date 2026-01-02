```markdown
# Beniel J - Interactive Portfolio

🔗 **Live Demo:** https://personal-portfolio-mu-snowy.vercel.app  
💻 **Backend API:** https://personal-portfolio-u4x6.onrender.com  

---

## ✅ Features Implemented

### Core Requirements
- Modern React frontend with smooth animations  
- Hero, About, Projects, Skills sections  
- "Why Should You Hire Me?" video presentation  
- Backend REST API (Node.js + Express)  
- Projects fetched dynamically from API  
- AI Chatbot powered by Groq API (Llama 3.3 70B)  

### Bonus Features
- AI Chatbot with personality & context awareness  
- Functional contact form with styled email notifications  
- Newsletter subscription system  
- Fully responsive design (mobile, tablet, desktop)  
- Smooth scroll animations and transitions  
- Publications & Achievements showcase  

---

## 🛠️ Tech Stack

**Frontend**
- React.js  
- React Bootstrap  
- CSS3 with custom animations  
- Animate.css  
- React Icons  

**Backend**
- Node.js  
- Express.js  
- Groq SDK (AI Integration)  
- Nodemailer (Email service)  
- CORS  

**Deployment**
- Frontend: Vercel  
- Backend: Render  
- Version Control: GitHub  

**APIs**
- Groq API (Llama 3.3 70B) for AI Chatbot  
- Custom REST API for projects  

---

## 🏃 Running Locally

### Prerequisites
- Node.js (v14 or higher)  
- npm or yarn  
- Git  

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/beniel-j/personal-portfolio.git

# Navigate to project directory
cd personal-portfolio

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app will run on `http://localhost:3000`.

### Backend Setup

```bash
# In the same project directory
# Create .env file with the following variables:

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
GROQ_API_KEY=your_groq_api_key

# Run the server
node server.js
```

The server will run on `http://localhost:5000`.

---

## 📁 Project Structure

```text
personal-portfolio/
├── public/
│   ├── assets/
│   │   └── img/
│   │       └── projects/     # Project images
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Banner.js         # Hero section
│   │   ├── NavBar.js         # Navigation
│   │   ├── Skills.js         # Skills showcase
│   │   ├── Projects.js       # Projects section
│   │   ├── Contact.js        # Contact form
│   │   ├── Newsletter.js     # Newsletter subscription
│   │   ├── ChatBot.js        # AI Chatbot
│   │   ├── WhyHireMe.js      # Video section
│   │   └── Footer.js         # Footer
│   ├── App.js                # Main app component
│   ├── App.css               # Main styles
│   └── index.js              # Entry point
├── server.js                 # Backend API server
├── package.json
└── README.md
```

---

## 🌐 API Endpoints

**Base URL:** `https://personal-portfolio-u4x6.onrender.com`

### GET `/api/projects`
Returns all projects with details.

### POST `/api/chat`
AI chatbot endpoint.  
**Body:**
```json
{
  "message": "your question",
  "chatHistory": []
}
```

### POST `/contact`
Send contact form email.  
**Body:**
```json
{
  "firstName": "",
  "lastName": "",
  "email": "",
  "phone": "",
  "message": ""
}
```

### POST `/subscribe`
Newsletter subscription.  
**Body:**
```json
{
  "email": ""
}
```

---

## 🙏 Acknowledgments

- Built as part of Interactive Portfolio Assignment  
- AI powered by Groq (Llama 3.3 70B)  
- Deployed on Vercel and Render  
- Special thanks to the open-source community  

---

⭐ If you like this project, please give it a star on GitHub!  

*Built with ❤️ by Beniel J*
```
