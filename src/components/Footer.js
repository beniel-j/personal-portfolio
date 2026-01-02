import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from '../assets/img/github-icon.svg';
import navIcon3 from '../assets/img/coding-icon.png';


export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <MailchimpForm />
          <Col size={12} sm={6}>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/beniel-j-049b26298" target="_blank" rel="noopener noreferrer"><img src={navIcon1} alt="LinkedIn" /></a>
              <a href="https://github.com/beniel-j" target="_blank" rel="noopener noreferrer"><img src={navIcon2} alt="GitHub" /></a>
              <a href="https://www.skillrack.com/faces/resume.xhtml?id=526276&key=8084eac1b57c7b316735231fb7299a1d1745371b" target="_blank" rel="noopener noreferrer"><img src={navIcon3} alt="SkillRack" /></a>
            </div>
            <p>Copyright 2026. All Rights Reserved by Beniel J</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
