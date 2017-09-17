import React from 'react';

export default function(props) {
  const { url } = props;
  return (
    <div className="image">
      <img src={url} />
    </div>
  );
}
