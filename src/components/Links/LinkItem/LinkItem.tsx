import React, { useId } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Divider, Paper, Typography } from '@mui/material';
import { fromNow, notifyError } from '../../../utils';
import type { UrlInfo } from '../../../types';
import './linkItem.css';

interface ILinkItemProps {
  linkInfo: UrlInfo;
  handleDelete: (_element: EventTarget & HTMLElement, _id: string) => void;
}

function LinkItem(props: ILinkItemProps): JSX.Element {
  const { linkInfo, handleDelete } = props;
  const { id, fullUrl, linkId, views, createdAt } = linkInfo;

  const deleteBtnId = useId();

  const copyShortUrl = async (): Promise<void> => {
    try {
      const fullShortLink = `${window.location.host}/${linkId}`;
      await navigator.clipboard.writeText(fullShortLink);
    } catch (_err) {
      notifyError('Failed to copy link to clipboard');
    }
  };

  const handleDeleteLink = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    handleDelete(event.currentTarget, id);
  };

  return (
    <Paper className="link-item" elevation={2}>
      <Typography className="link-item-shorti-link">{`${window.location.host}/${linkId}`}</Typography>
      <a className="link-item-fullurl" href={fullUrl} target="_blank" rel="noreferrer">
        <Typography>{fullUrl}</Typography>
      </a>

      <div className="link-item-footer">
        <div className="link-item-footer-info">
          {views > 0 && (
            <>
              <Typography variant="caption">{views} clicks</Typography>
              <Divider
                className="link-item-footer-info-divider"
                orientation="vertical"
                variant="middle"
              />
            </>
          )}
          <Typography variant="caption">{fromNow(createdAt)}</Typography>
        </div>

        <div className="link-item-footer-actions">
          <Button
            startIcon={<ContentCopyIcon />}
            size="small"
            variant="contained"
            onClick={copyShortUrl}
          >
            <Typography className="link-item-button-text" variant="button">
              COPY
            </Typography>
          </Button>
          <Button startIcon={<EditIcon />} size="small" variant="contained">
            <Typography className="link-item-button-text" variant="button">
              RENAME
            </Typography>
          </Button>
          <Button
            id={`delete-${deleteBtnId}`}
            startIcon={<DeleteIcon />}
            size="small"
            variant="contained"
            color="error"
            onClick={handleDeleteLink}
          >
            <Typography className="link-item-button-text" variant="button">
              DELETE
            </Typography>
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default LinkItem;
