import React from 'react';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Links } from '../../../services';
import { SkeletonList } from '../../../utilComponents';
import LinkItem from '../LinkItem';

function LinksList(): JSX.Element {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['getOwnShortUrls'],
    queryFn: () => Links.getOwnShortUrls(),
  });

  return (
    <Container maxWidth="md">
      {isLoading && <SkeletonList variant="rectangular" height={80} rows={4} />}
      {isError && <p>error fetching</p>}
      {data &&
        data.map((urlInfo) => {
          return <LinkItem key={urlInfo.id} linkInfo={urlInfo} />;
        })}
    </Container>
  );
}

export default LinksList;
