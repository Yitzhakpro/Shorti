import React, { useCallback, useState } from 'react';
import Add from '@mui/icons-material/Add';
import { Container, Fab } from '@mui/material';
import { useLinks, useModal } from '../../../hooks';
import { SkeletonList } from '../../../utilComponents';
import CreateLinkDialog from '../CreateLinkDialog';
import DeleteLinkPopper from '../DeleteLinkPopper';
import LinkItem from '../LinkItem';
import LinksFetchingError from '../LinksFetchingError';
import './linksList.css';

function LinksList(): JSX.Element {
  const { isLoading, linksList, isError, fetchLinks, createLink, deleteLink } = useLinks();
  const [addShortiOpen, setIsShortiOpen, toggleShorti] = useModal();

  const [deleteAnchorEl, setDeleteAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteId, setDeleteId] = useState('');

  const isDeleteConfirmationOpen = Boolean(deleteAnchorEl);

  const openDeleteConfirmation = (element: EventTarget & HTMLElement, id: string): void => {
    if (deleteAnchorEl && deleteAnchorEl.id === element.id) {
      setDeleteAnchorEl(null);
      setDeleteId('');
    } else if (deleteAnchorEl && deleteAnchorEl.id !== element.id) {
      setDeleteAnchorEl(element);
      setDeleteId(id);
    } else {
      setDeleteAnchorEl(element);
      setDeleteId(id);
    }
  };

  const closeDeleteConfirmation = (): void => {
    setDeleteAnchorEl(null);
    setDeleteId('');
  };

  const handleDeleteLink = async (): Promise<void> => {
    if (!deleteId) {
      return;
    }

    await deleteLink(deleteId);
    setDeleteAnchorEl(null);
    setDeleteId('');
  };

  const closeCreateLinkDialog = useCallback(() => {
    setIsShortiOpen(false);
  }, [setIsShortiOpen]);

  return (
    <>
      <Container className="links-list" maxWidth="md">
        {isLoading && <SkeletonList variant="rectangular" height={80} rows={15} />}
        {isError && <LinksFetchingError refetchLinks={fetchLinks} />}
        {linksList &&
          linksList.map((urlInfo) => {
            return (
              <LinkItem key={urlInfo.id} linkInfo={urlInfo} handleDelete={openDeleteConfirmation} />
            );
          })}
      </Container>

      <DeleteLinkPopper
        open={isDeleteConfirmationOpen}
        anchorEl={deleteAnchorEl}
        handleClose={closeDeleteConfirmation}
        handleDelete={handleDeleteLink}
      />

      <CreateLinkDialog
        isOpen={addShortiOpen}
        handleClose={closeCreateLinkDialog}
        createLink={createLink}
      />
      <Fab
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        color="primary"
        onClick={toggleShorti}
      >
        <Add />
      </Fab>
    </>
  );
}

export default LinksList;
