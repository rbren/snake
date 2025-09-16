import './About.css'

function About() {
  return (
    <div className="about">
      <div className="container">
        <section className="about-hero">
          <h1>About Snake Game</h1>
          <p>A classic arcade game reimagined with modern web technologies</p>
        </section>

        <section className="about-content">
          <div className="about-grid">
            <div className="about-text">
              <h2>The Classic Game</h2>
              <p>
                Snake is a timeless arcade game where you control a growing snake to eat food 
                while avoiding collisions with walls and your own tail. The challenge increases 
                as your snake grows longer with each piece of food consumed.
              </p>
              <p>
                This modern implementation features smooth gameplay, responsive controls, 
                score tracking, and high score persistence. Built with React and Canvas API 
                for optimal performance and visual appeal.
              </p>
              <h3>How to Play</h3>
              <ul>
                <li>🎮 Use arrow keys to control the snake</li>
                <li>🍎 Eat red food to grow and increase your score</li>
                <li>⚠️ Avoid hitting walls or your own tail</li>
                <li>⏸️ Press SPACE to pause/unpause</li>
                <li>🔄 Press ENTER to restart after game over</li>
              </ul>
            </div>
            <div className="about-image">
              <div className="placeholder-image">
                <span>🐍</span>
              </div>
            </div>
          </div>
        </section>

        <section className="tech-stack">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>React 19</h3>
              <p>Modern React with hooks for game state management</p>
            </div>
            <div className="tech-item">
              <h3>HTML5 Canvas</h3>
              <p>High-performance 2D rendering for smooth gameplay</p>
            </div>
            <div className="tech-item">
              <h3>Flask Backend</h3>
              <p>Python API for high score persistence and game data</p>
            </div>
            <div className="tech-item">
              <h3>Tailwind CSS</h3>
              <p>Utility-first CSS framework for responsive design</p>
            </div>
            <div className="tech-item">
              <h3>Local Storage</h3>
              <p>Client-side high score persistence</p>
            </div>
            <div className="tech-item">
              <h3>Vite</h3>
              <p>Lightning-fast build tool and development server</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About