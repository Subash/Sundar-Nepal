import React from 'react';

export default function(props) {
  const { url } = props;
  return (
    <a className="btn btn-primary" href={url} download="profile-picture-nepal.jpg">Download</a>
  );
}
