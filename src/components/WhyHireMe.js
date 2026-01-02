import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const WhyHireMe = () => {
  return (
    <section className="why-hire-me" id="why-hire-me">
      <Container>
        <Row className="align-items-center">
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Why Should You Hire Me?</h2>
                  <p className="why-hire-description">
                    Watch this 2-minute video to understand my passion, skills, and what makes me the perfect fit for your team!
                  </p>
                  
                  <div className="video-container">
                    {/* REPLACE THIS URL WITH YOUR YOUTUBE VIDEO */}
                    <iframe
                      width="100%"
                      height="500"
                      src="https://drive.google.com/file/d/1cKdNhnHV0GYVEV5YOfKyj9wFtmXTNYF3/view?usp=drive_link"
                      title="Why Hire Me - Beniel J"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="key-points">
                    <Row>
                      <Col md={4}>
                        <div className="point-card">
                          <h3>🚀 Fast Learner</h3>
                          <p>Completed TOP 1% NPTEL IoT certification, built 9+ rojects</p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="point-card">
                          <h3>💡 Problem Solver</h3>
                          <p>Won multiple hackathons and competitions with innovative solutions</p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="point-card">
                          <h3>🎯 Results Driven</h3>
                          <p>Improved system performance by 40% and reduced load times by 30%</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
