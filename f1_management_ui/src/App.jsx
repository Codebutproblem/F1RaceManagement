import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TeamDriverManagement from './components/TeamDriverManagement ';
import SponsorManagement from './components/SponsorManagement ';
import PrizeManagement from './components/PrizeManagement';
import { Home } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">F1 Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/teams-drivers">Teams & Drivers</Nav.Link>
                <Nav.Link as={Link} to="/sponsors">Sponsors</Nav.Link>
                <Nav.Link as={Link} to="/prizes">Prizes</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams-drivers" element={<TeamDriverManagement />} />
            <Route path="/sponsors" element={<SponsorManagement />} />
            <Route path="/prizes" element={<PrizeManagement />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;