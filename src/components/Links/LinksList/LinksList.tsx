import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Links } from '../../../services';
import { SkeletonList } from '../../../utilComponents';
import LinkItem from '../LinkItem';
import type { UrlInfo } from '../../../types';
import './linksList.css';

function LinksList(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [linksList, setLinksList] = useState<UrlInfo[]>([]);
  const [isError, setIsError] = useState(false);

  // TODO: re-think in react query
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    Links.getOwnShortUrls()
      .then((links) => {
        setLinksList(links);
        setIsLoading(false);
      })
      .catch((_error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleDeleteLink = useCallback(
    async (id: string): Promise<void> => {
      try {
        await Links.deleteShortUrl(id);

        const filteredLinks = linksList.filter((urlInfo) => {
          return urlInfo.id !== id;
        });

        setLinksList(filteredLinks);
      } catch (error) {
        console.error(error);
      }
    },
    [linksList]
  );

  return (
    <Container className="links-list" maxWidth="md">
      {isLoading && <SkeletonList variant="rectangular" height={80} rows={4} />}
      {isError && <p>error fetching</p>}
      {linksList &&
        linksList.map((urlInfo) => {
          return <LinkItem key={urlInfo.id} linkInfo={urlInfo} handleDelete={handleDeleteLink} />;
        })}
    </Container>
  );
}

export default LinksList;
