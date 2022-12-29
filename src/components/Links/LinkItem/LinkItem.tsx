import React, { useId } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, Paper, Typography } from '@mui/material';
import { fromNow } from '../../../utils';
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

  const handleDeleteLink = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    handleDelete(event.currentTarget, id);
  };

  return (
    <Paper className="link-item" elevation={2}>
      <Typography>{`${window.location.host}/${linkId}`}</Typography>
      <Typography>{fullUrl}</Typography>

      <div className="link-item-footer">
        <div className="link-item-footer-info">
          {views > 0 && (
            <>
              <Typography>{views} clicks</Typography>
              <Divider
                className="link-item-footer-info-divider"
                orientation="vertical"
                variant="middle"
              />
            </>
          )}
          <Typography>{fromNow(createdAt)}</Typography>
        </div>

        <div className="link-item-footer-actions">
          <Button
            id={`delete-${deleteBtnId}`}
            startIcon={<DeleteIcon />}
            onClick={handleDeleteLink}
          >
            DELETE
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default LinkItem;
