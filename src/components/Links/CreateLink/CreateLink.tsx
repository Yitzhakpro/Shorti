import React, { useState } from 'react';
import { Links } from '../../../services';

function CreateLink(): JSX.Element {
  const [fullUrl, setFullUrl] = useState('');

  const handleFullUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullUrl(event.target.value);
  };

  const handleCreateUrl = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const resp = await Links.createShortUrl(fullUrl);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleCreateUrl}>
      <input type="text" onChange={handleFullUrlChange} />

      <button type="submit">create short url</button>
    </form>
  );
}

export default CreateLink;
