import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useState, useEffect } from 'react';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://personal-portfolio-u4x6.onrender.com/api/projects');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data); // Images already included from backend!
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const publications = [
    {
      title: "Enhancing Patient Care Through Blue Eye Technology",
      description: "Research exploring how Blue Eye Technology enhances intelligent patient monitoring systems",
      imgUrl: "/assets/img/Projects/publication1.jpg",
    },
    {
      title: "Cybersecurity in Nuclear Power Plants",
      description: "Research publication exploring cutting-edge cybersecurity frameworks to protect critical systems in nuclear facilities",
      imgUrl: "/assets/img/Projects/publication2.jpg",
    },
    {
      title: "Ethical Hacking in Cyber Security Incident Response",
      description: "Journal publication on integrating ethical hacking strategies for swift detection and effective mitigation in cybersecurity incidents",
      imgUrl: "/assets/img/Projects/publication3.jpg",
    },
  ];

  const achievements = [
    {
      title: "🥇 1st Prize - EXCENTRA'24",
      description: "Government College of Engineering, Tirunelveli - Won 1st prize in paper presentation on 'IoT Enabled IV Bag Monitoring and Alert System'",
      imgUrl: "/assets/img/Projects/award1.jpg",
    },
    {
      title: "🥈 2nd Prize - Gyan Mitra'25",
      description: "Mepco Schlenk Engineering College - Secured 2nd prize in Paper Presentation (IoT stream)",
      imgUrl: "/assets/img/Projects/award2.jpg",
    },
    {
      title: "🏆 Special Jury Award - AURA'25",
      description: "Francis Xavier Engineering College - Won Special Jury Award at 12 Hours Internal Hackathon",
      imgUrl: "/assets/img/Projects/award3.jpg",
    },
    {
      title: "🥈 2nd Prize - APPATHON'25",
      description: "Francis Xavier Engineering College - Secured 2nd prize in APPATHON - The App Challenge Contest",
      imgUrl: "/assets/img/Projects/award2.jpg",
    },
    {
      title: "🏅 TOP 1% - NPTEL IoT Course",
      description: "Completed Introduction to IoT course with 92%, ranking in TOP 1% nationwide",
      imgUrl: "/assets/img/Projects/nptel.png",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects & Publications</h2>
                <p>A showcase of my work in web development, IoT systems, and research publications.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Publications</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Achievements</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      {loading ? (
                        <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>
                          <h3>Loading Projects...</h3>
                        </div>
                      ) : (
                        <Row>
                          {projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            )
                          })}
                        </Row>
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                        {publications.map((project, index) => {
                          return (
                            <ProjectCard
                              key={index}
                              {...project}
                            />
                          )
                        })}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Row>
                        {achievements.map((achievement, index) => {
                          return (
                            <ProjectCard
                              key={index}
                              {...achievement}
                            />
                          )
                        })}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
