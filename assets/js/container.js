import React from 'react';
import Login from './login';
import Download from './download';
import Image from './image';
import Social from './social';
import Footer from './footer';

export default function(props) {
  const { image } = props.userData;
  const defaultImage = '/img/default.jpg';
  const imageUrl = image || defaultImage;

  return (
    <div className="container">
      <div className="image-wrapper">
        <Image url={imageUrl} />
        <div className="container-shadow" />
        <div className="button-wrapper">
          {image ? <Download url={image} /> : <Login />}
        </div>
      </div>
      <Social />
      <Footer />
    </div>
  );
}
