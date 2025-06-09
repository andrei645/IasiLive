
interface CustomBannerProps {
    title: string;
    description: string;
    src: string;
}

export default function CustomBanner({title,description,src}:CustomBannerProps) {
    return (
      <div className="relative w-full h-64 md:h-96">
        {/* Imaginea de fundal */}
        <img
          src={src}
          alt="Background"
          className="w-full h-full object-cover"
        />
  
        {/* Text suprapus */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
          <p className="text-sm md:text-lg mt-2 text-center">
            {description}
            </p>
        </div>
      </div>
    );
  }