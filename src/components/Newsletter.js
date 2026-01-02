import { useState } from "react";
import { Col, Row, Alert } from "react-bootstrap";

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('Submit');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || email.indexOf("@") === -1) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      
      setTimeout(() => {
        setStatus(null);
        setMessage('');
      }, 3000);
      return;
    }

    setButtonText('Subscribing...');
    
    try {
      const response = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      
      setButtonText('Submit');
      
      if (result.code === 200) {
        setStatus('success');
        setMessage('Thank you for subscribing! 🎉');
        setEmail(''); // Clear input
      } else {
        setStatus('error');
        setMessage(result.status || 'Something went wrong. Please try again.');
      }
      
      // Auto-hide message after 4 seconds
      setTimeout(() => {
        setStatus(null);
        setMessage('');
      }, 4000);
      
    } catch (error) {
      console.error('Subscription error:', error);
      setButtonText('Submit');
      setStatus('error');
      setMessage('Failed to subscribe. Please check your connection.');
      
      setTimeout(() => {
        setStatus(null);
        setMessage('');
      }, 3000);
    }
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>Subscribe to our Newsletter & Never miss latest updates</h3>
            {status && (
              <Alert 
                variant={status === 'success' ? 'success' : 'danger'}
                className="mt-3"
                style={{
                  animation: 'slideInLeft 0.5s ease',
                  borderRadius: '10px',
                  fontWeight: '500'
                }}
              >
                {message}
              </Alert>
            )}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <input 
                  value={email} 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email address" 
                  required
                />
                <button type="submit" disabled={buttonText === 'Subscribing...'}>
                  {buttonText}
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
