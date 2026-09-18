import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PKGViz',
  tagline: 'See dependencies. Find architectural risk. Keep the evidence.',
  url: 'https://artiphishle.github.io',
  baseUrl: '/pkgviz-docs/',
  projectName: 'pkgviz-docs',
  organizationName: 'artiphishle',
  trailingSlash: false,
  favicon: 'img/favicon.ico',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: path.resolve(__dirname, 'sidebars.ts'),
          editUrl: 'https://github.com/artiphishle/pkgviz-docs/edit/main/',
        },
        theme: {
          customCss: path.resolve(__dirname, 'src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'description',
        content:
          'PKGViz is an open-source package dependency and architecture analysis tool with interactive graphs, cyclic-dependency evidence, multi-language parsers, and portable audit output.',
      },
      {
        name: 'keywords',
        content:
          'dependency graph, software architecture, cyclic dependencies, static analysis, TypeScript, Java, C++, Python, Delphi, Kotlin',
      },
    ],
    navbar: {
      title: 'PKGViz',
      items: [
        { type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Documentation' },
        {
          href: 'https://github.com/artiphishle/pkgviz',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Explore',
          items: [
            { label: 'Get started', to: '/docs/getting-started' },
            { label: 'CLI', to: '/docs/cli' },
            { label: 'Audit format', to: '/docs/audit' },
          ],
        },
        {
          title: 'Project',
          items: [
            { label: 'PKGViz on GitHub', href: 'https://github.com/artiphishle/pkgviz' },
            { label: 'Documentation source', href: 'https://github.com/artiphishle/pkgviz-docs' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PKGViz contributors. Open-source software.`,
    },
  },
};

export default config;
