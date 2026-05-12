import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'xqxyobh1',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-05-04', // use current date (YYYY-MM-DD) to target the latest API version
});
