import type { StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Contenu')
    .items([
      S.documentTypeListItem('artist').title('Artistes'),
      S.documentTypeListItem('event').title('Programme'),
      S.documentTypeListItem('gallery').title('Galerie'),
    ]);
