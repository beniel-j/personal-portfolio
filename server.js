const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const { GoogleGenerativeAI } = require("@google/generative-ai"); 
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/", router);

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server Running on port ${PORT}`);
  console.log(`📧 Email User: ${process.env.EMAIL_USER}`);
});

// Nodemailer transporter configuration
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

// Verify email configuration
contactEmail.verify((error) => {
  if (error) {
    console.log("❌ Error connecting to email service:", error);
  } else {
    console.log("✅ Ready to Send Emails - Everything is working!");
  }
});

// PREMIUM STYLED CONTACT FORM ROUTE
router.post("/contact", (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ 
      code: 400, 
      status: "Missing required fields" 
    });
  }

  const name = `${firstName} ${lastName}`;
  const currentDate = new Date().toLocaleString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const mail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `🚀 New Portfolio Contact from ${name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Contact</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
          <tr>
            <td align="center">
              
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); overflow: hidden; max-width: 100%;">
                
                <tr>
                  <td style="background: linear-gradient(135deg, #AA367C 0%, #4A2FBD 100%); padding: 40px 30px; text-align: center;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <div style="background: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; backdrop-filter: blur(10px); border: 3px solid rgba(255, 255, 255, 0.3);">
                            <span style="font-size: 40px;">📬</span>
                          </div>
                          <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">
                            New Contact Received!
                          </h1>
                          <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 400;">
                            Someone wants to connect with you 🎉
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; padding: 20px; border-left: 5px solid #AA367C;">
                            <tr>
                              <td>
                                <p style="margin: 0 0 5px 0; color: #AA367C; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                                  👤 Full Name
                                </p>
                                <p style="margin: 0; color: #2d3748; font-size: 20px; font-weight: 600;">
                                  ${name}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td>
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="48%" style="padding-bottom: 20px;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); border-radius: 12px; padding: 18px; border-left: 5px solid #4A2FBD; height: 100%;">
                                  <tr>
                                    <td>
                                      <p style="margin: 0 0 5px 0; color: #4A2FBD; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                                        📧 Email
                                      </p>
                                      <p style="margin: 0; color: #2d3748; font-size: 14px; font-weight: 600; word-break: break-word;">
                                        <a href="mailto:${email}" style="color: #4A2FBD; text-decoration: none;">
                                          ${email}
                                        </a>
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              
                              <td width="4%"></td>
                              
                              <td width="48%" style="padding-bottom: 20px;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); border-radius: 12px; padding: 18px; border-left: 5px solid #AA367C; height: 100%;">
                                  <tr>
                                    <td>
                                      <p style="margin: 0 0 5px 0; color: #AA367C; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                                        📱 Phone
                                      </p>
                                      <p style="margin: 0; color: #2d3748; font-size: 14px; font-weight: 600;">
                                        ${phone || 'Not Provided'}
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td>
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%); border-radius: 12px; padding: 25px; border-left: 5px solid #4A2FBD;">
                            <tr>
                              <td>
                                <p style="margin: 0 0 12px 0; color: #4A2FBD; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                                  💬 Message
                                </p>
                                <p style="margin: 0; color: #2d3748; font-size: 16px; line-height: 1.7; font-weight: 400; white-space: pre-wrap;">
                                  ${message}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td align="center" style="padding-top: 30px;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="border-radius: 30px; background: linear-gradient(135deg, #AA367C 0%, #4A2FBD 100%); box-shadow: 0 10px 30px rgba(74, 47, 189, 0.4);">
                                <a href="mailto:${email}" style="display: inline-block; padding: 16px 40px; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: 700; letter-spacing: 0.5px;">
                                  Reply to ${firstName} ↗
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                    </table>
                    
                  </td>
                </tr>
                
                <tr>
                  <td style="background: #f7fafc; padding: 25px 30px; border-top: 2px solid #e2e8f0;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <p style="margin: 0 0 8px 0; color: #718096; font-size: 13px; font-weight: 500;">
                            📅 Received on
                          </p>
                          <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: 600;">
                            ${currentDate}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td style="background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%); padding: 30px; text-align: center;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto 20px auto;">
                            <tr>
                              <td style="padding: 0 10px;">
                                <a href="https://www.linkedin.com/in/beniel-j-049b26298" style="text-decoration: none;">
                                  <div style="width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);">
                                    <span style="font-size: 20px;">💼</span>
                                  </div>
                                </a>
                              </td>
                              <td style="padding: 0 10px;">
                                <a href="https://github.com/beniel-j" style="text-decoration: none;">
                                  <div style="width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);">
                                    <span style="font-size: 20px;">💻</span>
                                  </div>
                                </a>
                              </td>
                              <td style="padding: 0 10px;">
                                <a href="https://www.skillrack.com/faces/resume.xhtml?id=526276&key=8084eac1b57c7b316735231fb7299a1d1745371b" style="text-decoration: none;">
                                  <div style="width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);">
                                    <span style="font-size: 20px;">🎯</span>
                                  </div>
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 0 0 10px 0; color: rgba(255, 255, 255, 0.9); font-size: 18px; font-weight: 700;">
                            Beniel J
                          </p>
                          <p style="margin: 0 0 5px 0; color: rgba(255, 255, 255, 0.7); font-size: 14px; font-weight: 500;">
                            Full-Stack Developer | MERN Stack Developer
                          </p>
                          <p style="margin: 0; color: rgba(255, 255, 255, 0.5); font-size: 13px;">
                            Portfolio Contact System
                          </p>
                          
                          <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #AA367C 0%, #4A2FBD 100%); border-radius: 3px; margin: 20px auto;"></div>
                          
                          <p style="margin: 0; color: rgba(255, 255, 255, 0.4); font-size: 11px; line-height: 1.6;">
                            This email was automatically generated from your portfolio website<br>
                            © 2025 Beniel J. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
              </table>
              
            </td>
          </tr>
        </table>
        
      </body>
      </html>
    `,
  };
  
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.log("❌ Error sending email:", error);
      res.status(500).json({ 
        code: 500, 
        status: "Error sending message" 
      });
    } else {
      console.log("✅ Email sent successfully to:", process.env.EMAIL_USER);
      res.json({ 
        code: 200, 
        status: "Message Sent Successfully!" 
      });
    }
  });
});

// Test endpoint
router.get("/test", async (req, res) => {
  try {
    await contactEmail.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "✅ Test Email - Portfolio Backend",
      text: "If you see this email, your backend is working perfectly! 🎉"
    });
    res.json({ 
      success: true, 
      message: "Test email sent! Check your inbox at " + process.env.EMAIL_USER 
    });
  } catch (error) {
    res.json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Health check
router.get("/", (req, res) => {
  res.json({ 
    status: "Server is running", 
    timestamp: new Date() 
  });
});

// Newsletter subscription endpoint
router.post("/subscribe", (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes("@")) {
    return res.status(400).json({ 
      code: 400, 
      status: "Please enter a valid email" 
    });
  }

  const currentDate = new Date().toLocaleString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const mail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `📧 New Newsletter Subscriber!`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter Subscription</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; margin: 0 auto;">
          <tr>
            <td align="center">
              
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); overflow: hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
                    <div style="background: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255, 255, 255, 0.3);">
                      <span style="font-size: 40px;">📧</span>
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                      New Subscriber! 🎉
                    </h1>
                    <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 15px;">
                      Someone joined your newsletter
                    </p>
                  </td>
                </tr>
                
                <!-- Email -->
                <tr>
                  <td style="padding: 40px 30px; text-align: center;">
                    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 25px; border-left: 5px solid #10b981;">
                      <p style="margin: 0 0 8px 0; color: #059669; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                        📬 SUBSCRIBER EMAIL
                      </p>
                      <p style="margin: 0; color: #1e40af; font-size: 20px; font-weight: 600; word-break: break-all;">
                        ${email}
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Timestamp -->
                <tr>
                  <td style="background: #f7fafc; padding: 25px 30px; border-top: 2px solid #e2e8f0; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #718096; font-size: 13px; font-weight: 500;">
                      📅 Subscribed on
                    </p>
                    <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: 600;">
                      ${currentDate}
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%); padding: 25px; text-align: center;">
                    <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 700;">
                      Beniel J - Portfolio
                    </p>
                    <p style="margin: 5px 0 0 0; color: rgba(255, 255, 255, 0.5); font-size: 12px;">
                      Newsletter Subscription Alert
                    </p>
                  </td>
                </tr>
                
              </table>
              
            </td>
          </tr>
        </table>
        
      </body>
      </html>
    `,
  };
  
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.log("❌ Newsletter subscription error:", error);
      res.status(500).json({ 
        code: 500, 
        status: "Subscription failed. Please try again." 
      });
    } else {
      console.log("✅ New newsletter subscriber:", email);
      res.json({ 
        code: 200, 
        status: "Successfully subscribed! Thank you! 🎉" 
      });
    }
  });
});

// Projects Data 
const projectsData = [
  {
    id: 1,
    title: "Lumeo - Digital Storytelling Platform",
    description: "Next-generation web app built with React.js, Node.js & MongoDB featuring multimedia story creation, mood-based exploration, gamified engagement, and dual Writer-Reader architecture",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    category: "Full-Stack",
    featured: true,
    imgUrl: "/assets/img/Projects/Lumeo.jpg"  
  },
  {
    id: 2,
    title: "IoT Enabled IV Bag Monitoring System",
    description: "Real-time patient monitoring system using IoT sensors and Blue Eye Technology for intelligent healthcare solutions",
    technologies: ["IoT", "Arduino", "Sensors", "Cloud"],
    category: "IoT",
    featured: true,
    imgUrl: "/assets/img/projects/IvBag.jpg"  
  },
  {
    id: 3,
    title: "NextChat - Real-Time Chat Application",
    description: "Full-stack chat app built with Python (Flask) featuring group/private chats, file sharing, voice messages, end-to-end AES encryption, and AI-powered quick replies",
    technologies: ["Python", "Flask", "SocketIO", "AES Encryption"],
    category: "Full-Stack",
    featured: true,
    imgUrl: "/assets/img/projects/Nextchat.png"  
  },
  {
    id: 4,
    title: "Excel Analytics Dashboard",
    description: "Real-time dashboard serving 50+ end-users, improved data accessibility by 40% and reduced load time by 30% with optimized backend queries",
    technologies: ["JavaScript", "Excel API", "Analytics"],
    category: "Data Analytics",
    featured: false,
    imgUrl: "/assets/img/projects/Excel.png"  
  },
  {
    id: 5,
    title: "Ben Basket",
    description: "E-commerce platform with responsive design, real-time features using JavaScript, API Integration and Firebase DB",
    technologies: ["JavaScript", "Firebase", "API Integration"],
    category: "Full-Stack",
    featured: false,
    imgUrl: "/assets/img/projects/BenBasket.png"  
  },
  {
    id: 6,
    title: "Connect4",
    description: "Interactive gaming platform with responsive UI/UX, built using modern web development practices",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    category: "Web Development",
    featured: false,
    imgUrl: "/assets/img/projects/Connect4.png" 
  },
  {
    id: 7,
    title: "PlanMate",
    description: "Task management and planning application with intuitive interface and real-time collaboration features",
    technologies: ["React", "Firebase", "Real-time DB"],
    category: "Productivity",
    featured: false,
    imgUrl: "/assets/img/projects/Planmate.png" 
  },
  {
    id: 8,
    title: "Blog Xplore",
    description: "Designed using Figma, improved user navigation efficiency by 30% through structured layout and intuitive design",
    technologies: ["Figma", "UI/UX", "React"],
    category: "Web Development",
    featured: false,
    imgUrl: "/assets/img/projects/BlogXplore.png" 
  },
  {
    id: 9,
    title: "Travel Blog Website",
    description: "Responsive travel blog platform built with HTML5, CSS3, and JavaScript featuring clean UI and engaging user experience",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "Web Development",
    featured: false,
    imgUrl: "/assets/img/projects/TravelBlog.png"  
  }
];


const skillsData = {
  technical: ["C", "Java", "HTML", "CSS", "MERN Stack", "JavaScript", "Firebase", "Git", "GitHub", "MySQL", "Python"],
  tools: ["VS Code", "Figma", "NetBeans", "Postman"],
  specializations: ["Networking", "JDBC", "API Integration", "IoT", "UI/UX Design"]
};

// API Routes - Add before contact route
router.get("/api/projects", (req, res) => {
  res.json({
    success: true,
    count: projectsData.length,
    data: projectsData
  });
});

router.get("/api/projects/:id", (req, res) => {
  const project = projectsData.find(p => p.id === parseInt(req.params.id));
  if (project) {
    res.json({ success: true, data: project });
  } else {
    res.status(404).json({ success: false, message: "Project not found" });
  }
});

router.get("/api/skills", (req, res) => {
  res.json({
    success: true,
    data: skillsData
  });
});

router.get("/api/about", (req, res) => {
  res.json({
    success: true,
    data: {
      name: "Beniel J",
      role: "Full-Stack Developer | MERN Stack Developer | UI/UX Designer",
      summary: "Dynamic Computer Science student with hands-on experience in real-world projects across web development and IoT domains. Known for combining analytical thinking with creativity to deliver innovative, user-focused solutions.",
      achievements: [
        "TOP 1% - NPTEL IoT Course (92%)",
        "1st Prize - EXCENTRA'24 (IoT Paper Presentation)",
        "Special Jury Award - AURA'25 Hackathon",
        "2nd Prize - APPATHON'25"
      ]
    }
  });
});


const Groq = require("groq-sdk");

// Initialize Groq (add this after the contactEmail setup)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Chatbot endpoint - UPDATED TO USE GROQ
router.post("/api/chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: "Message is required" 
      });
    }

    // Build messages array for Groq
    const messages = [
      {
        role: "system",
        content: `You are Beniel J, a passionate Computer Science student and Full-Stack Developer. You are friendly, enthusiastic, and love talking about technology.

About Beniel:
- 3rd Year Computer Science student at Francis Xavier Engineering College
- MERN Stack Developer (MongoDB, Express, React, Node.js)
- Ranked TOP 1% in NPTEL IoT Course (92%)
- Won multiple hackathons: 1st Prize EXCENTRA'24, Special Jury Award AURA'25, 2nd Prize APPATHON'25
- Published 3 research papers on IoT healthcare, cybersecurity, and ethical hacking

Key Projects:
1. Lumeo - Digital storytelling platform with AI integration, multimedia creation, and gamified engagement
2. NextChat - Real-time chat app with end-to-end encryption, voice messages, and AI-powered replies
3. IoT IV Monitoring System - Healthcare monitoring using Blue Eye Technology (Won 1st Prize)
4. Excel Analytics Dashboard - Improved data accessibility by 40%, reduced load time by 30%
5. Ben Basket - E-commerce platform with Firebase integration
6. Blog Xplore, PlanMate, Travel Blog, Game Xplore - Various web applications

Technical Skills: JavaScript, React, Node.js, MongoDB, Python, Java, C, HTML/CSS, Firebase, Git, MySQL, IoT, JDBC, API Integration, UI/UX Design (Figma)

Instructions:
- Answer questions about Beniel's projects, skills, experience, and achievements
- Be conversational and enthusiastic
- Keep responses concise (2-3 sentences) unless detailed explanation is needed
- Use emojis occasionally to be friendly
- If asked about availability or hiring, express interest and suggest contacting via the contact form`
      }
    ];

    // Add chat history
    if (chatHistory && chatHistory.length > 0) {
      chatHistory.slice(-6).forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message
    });

    // Generate response with Groq
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile", // Fast and free!
      temperature: 0.7,
      max_tokens: 500,
    });

    const botReply = completion.choices[0].message.content;

    res.json({
      success: true,
      reply: botReply
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      error: "Sorry, I'm having trouble responding right now. Please try again!",
      details: error.message
    });
  }
});
