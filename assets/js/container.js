import React from 'react';
import Login from './login';
import Download from './download';
import Image from './image';
import Social from './social';
import Footer from './footer';
import Loading from './loading';

export default function(props) {
  const { image, loading } = props.userData;
  const defaultImage = '/img/default.jpg';
  const imageUrl = image || defaultImage;
  let button = <Loading />;
  if (!loading && image) button = <Download url={image} />;
  if (!loading && !image) button = <Login />;

  return (
    <div className="container">
      <div className="image-wrapper">
        <Image url={imageUrl} />
        <div className="container-shadow" />
        <div className="button-wrapper">{button}</div>
      </div>
      <Social />
      <Footer />
    </div>
  );
}
