import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'SimONU Marseille CMS',

  projectId: 'xqxyobh1',
  dataset: 'production',
  basePath: '/admin',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
