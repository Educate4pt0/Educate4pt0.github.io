import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type TeamMemberItem = {
  name: string;
  Img: React.ComponentType<React.ComponentProps<'image'>>;
  position: string;
  blurb: ReactNode;
};

const FeatureList: TeamMemberItem[] = [
  {
    name: 'Thomas Kirby',
    Img: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    position: 'CEO',
    blurb: (
      <>
        Head honcho, the man with the plan. Completing his MEng in Mechatronics - so you know it's guud.
      </>
    ),
  },
  {
    name: 'Dylan Kirby',
    Img: require('@site/static/img/undraw_docusaurus_react.svg').default,
    position: 'CTO',
    blurb: (<>
      A full-time full-stack Software Developer, he's the person behind the tech, if it runs, it's because of him, if it doesn't it's someone else's fault.
    </>),
  },
  {
    name: 'Teagan Minkley',
    Img: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    position: 'Course Curator & Reviewer',
    blurb: (<>
      Studing for her BSc (Hons) in Applied Mathematics, she double checks our content for quality and accuracy.
    </>),
  },
  {
    name: 'Example',
    Img: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    position: 'Lorem Ipsum',
    blurb: (<>
      A really cool blurb that I put a lot of effort into writing.
    </>),
  },
  {
    name: 'Example',
    Img: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    position: 'Lorem Ipsum',
    blurb: (<>
      A really cool blurb that I put a lot of effort into writing.
    </>),
  },
];

function Member({ name, Img, position, blurb }: TeamMemberItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Img className={styles.memberImg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{name}</Heading>
        <Heading as="h4">{position}</Heading>
        <p>{blurb}</p>
      </div>
    </div>
  );
}

export default function HomepageTeam(): ReactNode {
  return (
    <section className={clsx(styles.members, 'section-alt')}>
      <div className="container">
        <h2 className="text--center">Meet the Team</h2>
        <div className={clsx(styles.row, 'row')}>
          {FeatureList.map((props, idx) => (
            <Member key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
