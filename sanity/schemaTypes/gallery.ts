import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Galerie',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string'
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),

    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string'
    })
  ]
});