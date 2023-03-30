import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Navbar, Hero, Contact, StarsCanvas } from './components';
import { BouncingBall, HandAnimation } from './components/loaders';

const About = React.lazy(() => import('./components/About'));
const Experience = React.lazy(() => import('./components/Experience'));
const Tech = React.lazy(() => import('./components/Tech'));
const Works = React.lazy(() => import('./components/Works'));
const Feedbacks = React.lazy(() => import('./components/Feedbacks'));

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <Suspense fallback={<BouncingBall />}>
          <About />
        </Suspense>
        <Suspense fallback={<HandAnimation />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<BouncingBall />}>
          <Tech />
        </Suspense>
        <Suspense fallback={<HandAnimation />}>
          <Works />
        </Suspense>
        <Suspense fallback={<BouncingBall />}>
          <Feedbacks />
        </Suspense>
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
