export const structure = (S: any) =>
  S.list()
    .title('Contenu')
    .items([
      S.documentTypeListItem('artist').title('Artistes'),
      S.documentTypeListItem('event').title('Programme'),
      S.documentTypeListItem('gallery').title('Galerie'),
    ]);