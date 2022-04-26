import { useEffect, useState } from 'react';

type Props = {
  src: string;
  alt: string;
};

export const Image = ({ src, alt }: Props) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  const onError = () => {
    setError(true);
  };

  if (error) {
    return <img src={`${process.env.PUBLIC_URL}/photos/avatar.png`} alt="avatar" />;
  }

  return (<img onError={onError} src={src} alt={alt} />);
};
