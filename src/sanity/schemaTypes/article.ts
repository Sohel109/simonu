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
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Article Standard', value: 'post' },
          { title: 'Post Instagram', value: 'instagram' },
          { title: 'Vidéo / Reel', value: 'video' }
        ],
        layout: 'radio'
      },
      initialValue: 'post'
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image de couverture / Miniature',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'videoFile',
      title: 'Fichier Vidéo',
      type: 'file',
      description: 'Téléchargez votre fichier vidéo (MP4, MOV, etc.) ici si vous avez choisi la catégorie Vidéo.',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'link',
      title: 'Lien externe (ex: Instagram URL)',
      type: 'url',
      description: 'Lien vers le post Instagram original ou un article externe (optionnel).',
    })
  ],
});

