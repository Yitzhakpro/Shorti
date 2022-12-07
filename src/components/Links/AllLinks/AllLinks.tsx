import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Links } from '../../../services';

function AllLinks(): JSX.Element {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['getOwnShortUrls'],
    queryFn: () => Links.getOwnShortUrls(),
  });

  return (
    <div>
      {isLoading && <p>loading</p>}
      {isError && <p>error fetching</p>}
      {data &&
        data.map((urlInfo) => {
          const { id, fullUrl, linkId, views, createdAt } = urlInfo;
          return (
            <div key={id}>
              <p>{id}</p>
              <p>{fullUrl}</p>
              <p>{linkId}</p>
              <p>{views}</p>
              <p>{createdAt.toString()}</p>
            </div>
          );
        })}
    </div>
  );
}

export default AllLinks;
