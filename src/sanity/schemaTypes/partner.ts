import { defineType, defineField } from 'sanity';

export const partner = defineType({
  name: 'partner',
  title: 'Partenaire',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du partenaire',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'type',
      title: 'Type de partenaire',
      type: 'string',
      options: {
        list: [
          { title: 'Institutionnel', value: 'institutionnel' },
          { title: 'Social', value: 'social' },
          { title: 'Entreprise', value: 'entreprise' }
        ],
        layout: 'radio'
      }
    })
  ],
});
