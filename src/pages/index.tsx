import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageMission from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import HomepageTeam from '../components/HomepageTeam';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/help">
            How you can help
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFocus() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className='section-alt'>
      <div className={clsx('container text--center', styles.section)}>
        <Heading as="h2">Our Focus</Heading>
        <div>
          <p>
            Technology is rapidly advancing and the gap between employment demands and education is growing each year.
            As schools begin introducing <strong>STEAM</strong> (Science, Technology, Engineering, Arts, and Mathematics) courses into their curriculums to bridge this gap - not all schools or learners are fortunate enough to experience such opportunities.
            Therefore we aim to <em>develop</em>, <em>inspire</em>, and <em>educate</em> these young minds.
          </p>
          <p>
            We've created this platform as a comprehensive <strong>resource library for STEAM education</strong>.
            Our goal is to provide volunteers, educators, and mentors with <strong>ready-to-use tutorials</strong> and curriculum materials that can be printed out and delivered in approximately 40-minute sessions.
            Whether it's an introduction to programming in <em>Scratch</em>, learning how to create effective <em>PowerPoint presentations</em>, or exploring other STEAM concepts, we're building an accessible catalogue of engaging tutorials that require minimal preparation.
          </p>
          <p>
            As volunteers, your role is <strong>twofold</strong> - to guide learners through these carefully crafted tutorials and to inspire them through conversations about your educational experiences, career choices, and interests.
            By making quality STEAM education accessible, we aim to spark curiosity and motivate learners to pursue degrees and careers in STEAM fields, ultimately helping them achieve their full potential across all their studies.
          </p>
        </div>
      </div>
    </section>
  );
}

function HomepageGettingStarted() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className='section-alt'>
      <div className={clsx('container text--center', styles.section)}>
        <Heading as="h2">Getting Started</Heading>
        <div>
          <p>If you're interested in contributing to our mission, please visit our{' '}<Link to="/help">How You Can Help</Link>{' '}
            page to explore various ways you can get involved. Whether you're looking to volunteer, donate, or spread the word, every bit of support helps us make a difference in STEAM education.
          </p>
          <p>
            Want to use our resources? Please visit our{' '}<Link to="/docs/intro">Resources</Link>{' '}
            page to access our growing library of tutorials and curriculum materials. These resources are designed to be easy to use and implement, making it simple for educators and mentors to bring quality STEAM education to their learners.
            If you like what you see, consider contributing.
          </p>

        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}>
      <HomepageHeader />
      <main>
        <HomepageMission />
        <HomepageFocus />
        <HomepageTeam />
        <HomepageGettingStarted />
      </main>
    </Layout>
  );
}
