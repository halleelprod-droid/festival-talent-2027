import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryProps = {
  images: GalleryImage[];
};

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
