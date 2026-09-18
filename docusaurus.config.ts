import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PKGViz',
  tagline: 'Package dependency and architecture analysis',
  url: 'https://artiphishle.github.io',
  baseUrl: '/pkgviz-docs/',
  projectName: 'pkgviz-docs',
  organizationName: 'artiphishle',
  trailingSlash: false,

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: path.resolve(__dirname, 'sidebars.ts'),
        },
        theme: {
          customCss: path.resolve(__dirname, 'src/css/custom.css'),
        },
      },
    ],
  ],
};

export default config;
