import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Navbar, Hero, Contact, StarsCanvas } from './components';
import { BouncingBall, HandAnimation } from './components/loaders';
import { INTRO_SECTION_QUERY } from './graphql';

const About = React.lazy(() => import('./components/About'));
const Experience = React.lazy(() => import('./components/Experience'));
const Tech = React.lazy(() => import('./components/Tech'));
const Works = React.lazy(() => import('./components/Works'));
const Feedbacks = React.lazy(() => import('./components/Feedbacks'));

interface IntroSection {
  headerTitle: string;
  heroTitle: string;
  heroImage: {
    url: string;
  };
  tagline: string;
}

const App = () => {
  const { loading, error, data } = useQuery(INTRO_SECTION_QUERY, {
    variables: { id: 'clrm7gz9sbiof0blcip6ppapy' },
  });
  const [intro, setIntro] = useState<IntroSection>();

  // TODO: Add some error handling.
  useEffect(() => {
    if (!loading && error === undefined) {
      setIntro(data.introSection);
    }
  }, [loading, error]);
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar headerTitle={intro?.headerTitle || ''} />
          <Hero
            heroTitle={intro?.heroTitle || ''}
            tagline={intro?.tagline || ''}
          />
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
