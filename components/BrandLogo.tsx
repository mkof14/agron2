import React from 'react';

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
  variant?: 'nav' | 'footer' | 'hero' | 'inline';
}

const variantClass = {
  nav: 'h-9 w-36',
  footer: 'h-14 w-52',
  hero: 'h-24 w-[22rem] md:h-32 md:w-[30rem]',
  inline: 'h-10 w-40'
};

const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', imgClassName = '', variant = 'inline' }) => (
  <span className={`inline-flex items-center overflow-hidden rounded-xl ${variantClass[variant]} ${className}`}>
    <img
      src="/brand/agron-logo.png"
      alt="AGRON"
      width={1024}
      height={280}
      className={`h-full w-full object-contain ${imgClassName}`}
      loading="eager"
      decoding="async"
    />
  </span>
);

export default BrandLogo;
