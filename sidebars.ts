import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'getting-started',
    'cli',
    {
      type: 'category',
      label: 'Understand PKGViz',
      items: ['languages', 'visualization', 'audit'],
    },
    {
      type: 'category',
      label: 'Engineering',
      items: ['architecture', 'development', 'status-and-roadmap'],
    },
  ],
};

export default sidebars;
