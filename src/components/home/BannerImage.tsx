import React from 'react';

interface BannerImageProps {
  path: string;
  alternative: string;
}

const BannerImage: React.FC<BannerImageProps> = ({ path, alternative }) => {

  return (
    <div>
      <img src={path} alt={alternative} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
};

export default BannerImage;
