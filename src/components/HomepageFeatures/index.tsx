import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type MissionItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: MissionItem[] = [
  {
    title: 'Empowering Tomorrow\'s Innovators',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Cultivating critical thinking and problem-solving abilities that extend far beyond traditional classroom boundaries.
      </>
    ),
  },
  {
    title: 'Mentorship & Vision',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Shaping futures through meaningful dialogue, real-world insights, and proven pathways to success.
      </>
    ),
  },
  {
    title: 'Learning Excellence',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Fostering a passion for lifelong learning and unlocking each student's unique potential through engaging education.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: MissionItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageMission(): ReactNode {
  return (
    <section className={clsx(styles.features, 'section-alt')}>
      <div className="container">
        <h2 className="text--center">Our Mission</h2>
        <div className={clsx(styles.row, 'row')}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
