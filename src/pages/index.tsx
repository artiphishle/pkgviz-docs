import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.eyebrow}>OPEN-SOURCE ARCHITECTURE ANALYSIS</div>
        <Heading as="h1" className={styles.heroTitle}>
          See your dependency structure before it becomes a problem.
        </Heading>
        <p className={styles.heroSubtitle}>
          PKGViz turns source projects into an interactive package graph and a portable audit with
          concrete dependency evidence.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/getting-started">
            Run your first audit
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Explore PKGViz
          </Link>
        </div>
        <div className={styles.command}>
          <code>bunx pkgviz</code>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Open-source package dependency and architecture analysis"
      description="Visualize package dependencies, find cyclic dependencies with evidence, and export portable architecture audits across TypeScript, Java, C++, Python, Delphi, and Kotlin."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
