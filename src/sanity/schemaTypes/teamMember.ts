import { defineType, defineField } from 'sanity';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Membre de l\'équipe',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom / Prénom',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description (Mission)',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Bureau Exécutif', value: 'bureau' },
          { title: 'Pôle Opérationnel', value: 'pole' }
        ],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Pour choisir qui apparaît en premier (1, 2, 3...)'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    }
  }
});
