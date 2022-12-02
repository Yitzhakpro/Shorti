import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Links } from '../../../services';

function AllLinks(): JSX.Element {
  const { isLoading, isError } = useQuery({
    queryKey: ['getOwnShortUrls'],
    queryFn: () => Links.getOwnShortUrls(),
  });

  return (
    <div>
      {isLoading && <p>loading</p>}
      {isError && <p>error fetching</p>}
    </div>
  );
}

export default AllLinks;
