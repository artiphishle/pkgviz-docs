import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'From source to structure',
    description: (
      <>
        Detect the project language, parse imports and packages, classify dependencies, and turn
        source structure into a graph you can reason about.
      </>
    ),
  },
  {
    title: 'Evidence, not just red lines',
    description: (
      <>
        Cyclic dependencies retain the files and imports that create each cycle edge, so findings
        can be traced back to concrete source evidence.
      </>
    ),
  },
  {
    title: 'Human and machine readable',
    description: (
      <>
        Explore the graph interactively or export an audit for reviews, automation, CI integrations,
        and tooling that should not depend on the UI.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map(feature => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
