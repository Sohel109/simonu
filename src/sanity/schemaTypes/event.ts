import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Événement (Calendrier)',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Ex: Février 2026',
    }),
    defineField({
      name: 'title',
      title: 'Nom de l\'événement',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
    }),
    defineField({
      name: 'target',
      title: 'Cibles',
      type: 'string',
    }),
    defineField({
      name: 'theme',
      title: 'Thème',
      type: 'string',
    })
  ],
});
