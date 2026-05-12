import { defineType, defineField } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article d\'Actualité',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de l\'article',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date de publication',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'link',
      title: 'Lien (URL ou PDF externe)',
      type: 'url',
      description: 'Lien vers un PDF Google Drive ou une page web classique.',
    })
  ],
});
