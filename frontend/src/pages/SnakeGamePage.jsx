
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SnakeGame from '../components/SnakeGame';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const SnakeGamePage = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SnakeGameLayout
  snake={snake}
  food={food}
  direction={direction}
  setDirection={setDirection}
  gameOver={gameOver}
  score={score}
/>} />
<Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default SnakeGamePage;
