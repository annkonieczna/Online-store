type HoverImageProps = {
  image: string;
  text: string;
};

export default function Photo({ image, text }: HoverImageProps) {
  return (
    <div className="relative group overflow-hidden  cursor-pointer">
      <img
        src={image}
        className="
          h-120 w-67.5 object-cover
          transition-transform duration-700 ease-in-out
          group-hover:scale-[1.05]
        "
      />

      <div
        className="
          absolute inset-0
          flex items-center justify-center
          bg-black/50
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
        "
      >
        <span
          className="
            text-white text-2xl font-semibold 
            relative
            before:absolute before:left-0 before:top-0 before:h-full before:w-1/2
            before:bg-black before:origin-left before:scale-x-100
            after:absolute after:right-0 after:top-0 after:h-full after:w-1/2
            after:bg-black after:origin-right after:scale-x-100
            group-hover:before:scale-x-0
            group-hover:after:scale-x-0
            before:transition-transform after:transition-transform
            before:duration-700 after:duration-700
            before:ease-in-out
            after:ease-in-out
            px-4
          "
        >
          {text}
        </span>
      </div>
    </div>
  );
}
