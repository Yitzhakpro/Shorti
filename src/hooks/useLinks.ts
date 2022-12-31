import { useState, useEffect, useCallback } from 'react';
import { Links } from '../services';
import { notifyLoading, updateNotify } from '../utils';
import type { UrlInfo } from '../types';

function useLinks() {
  const [isLoading, setIsLoading] = useState(false);
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

  const createLink = useCallback(
    async (fullUrl: string): Promise<void> => {
      const loadingId = notifyLoading('Creating a shorti...');
      try {
        const addedLink = await Links.createShortUrl(fullUrl);

        const newLinksList = [...linksList, addedLink];

        setLinksList(newLinksList);
        updateNotify(loadingId, 'Created a shorti :)', 'success');
      } catch (error: any) {
        updateNotify(loadingId, error.message, 'error');
      }
    },
    [linksList]
  );

  const deleteLink = useCallback(
    async (id: string): Promise<void> => {
      const loadingId = notifyLoading('deleting a shorti...');
      try {
        await Links.deleteShortUrl(id);

        const filteredLinks = linksList.filter((urlInfo) => {
          return urlInfo.id !== id;
        });

        setLinksList(filteredLinks);
        updateNotify(loadingId, 'Deleted a shorti :(', 'success');
      } catch (error: any) {
        updateNotify(loadingId, error.message, 'error');
      }
    },
    [linksList]
  );

  return { isLoading, linksList, isError, createLink, deleteLink };
}

export default useLinks;
