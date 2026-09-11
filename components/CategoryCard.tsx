import Image from 'next/image';

export default function CategoryCard({
  title,
  description,
  image
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="border border-hairline bg-paper">
      <div className="relative aspect-[4/3] w-full bg-cream">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 border-t border-hairline">
        <h3 className="font-serif text-lg text-ink">{title}</h3>
        <p className="mt-1 text-sm text-stone">{description}</p>
      </div>
    </div>
  );
}
