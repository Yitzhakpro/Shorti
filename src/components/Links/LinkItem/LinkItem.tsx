import React from 'react';
import { Paper } from '@mui/material';
import type { UrlInfo } from '../../../types';

interface ILinkItemProps {
  linkInfo: UrlInfo;
}

function LinkItem(props: ILinkItemProps): JSX.Element {
  const { id, fullUrl, linkId, views, createdAt } = props.linkInfo;

  return (
    <Paper>
      <p>{id}</p>
      <p>{fullUrl}</p>
      <p>{linkId}</p>
      <p>{views}</p>
      <p>{createdAt.toString()}</p>
    </Paper>
  );
}

export default LinkItem;
