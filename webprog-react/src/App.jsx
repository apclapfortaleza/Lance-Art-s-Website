import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Education from './components/Education';
import Portfolio from './components/Portfolio';
import Hobbies from './components/Hobbies';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Layout>
        <div className={`transition-all duration-1000 ${loading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          <Hero />
          <Education />
          <Portfolio />
          <Hobbies />
          <Gallery />
          <Guestbook />
          <Footer />
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
