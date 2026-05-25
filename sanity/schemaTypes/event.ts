import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Programme',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string'
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime'
    }),

    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string'
    }),

    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string'
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),

    defineField({
      name: 'cover',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ]
});