import React from 'react';
import MenuLink from '../MenuLink';
import Image from 'next/image';
import clsx from 'clsx';

interface PostCoverImageProps {
  linkProps: React.ComponentProps<typeof MenuLink>;
  imageProps: React.ComponentProps<typeof Image>;
}

const PostCoverImage: React.FC<PostCoverImageProps> = ({
  imageProps,
  linkProps,
}) => {
  return (
    <MenuLink
      {...linkProps}
      href={linkProps.href}
      className={clsx(
        'w-full',
        'h-full',
        'overflow-hidden',
        'rounded-xl',
        linkProps.className,
      )}
    >
      <Image
        {...imageProps}
        className={clsx(
          'group-hover:scale-105',
          'transition',
          'w-full',
          'h-full',
          'object-cover',
          'object-center',
          imageProps.className,
        )}
        alt={imageProps.alt}
      />
    </MenuLink>
  );
};

export default PostCoverImage;
