import React, { useCallback } from 'react';
import Add from '@mui/icons-material/Add';
import { Container, Fab } from '@mui/material';
import { useLinks, useModal } from '../../../hooks';
import { SkeletonList } from '../../../utilComponents';
import CreateLinkDialog from '../CreateLinkDialog';
import LinkItem from '../LinkItem';
import './linksList.css';

function LinksList(): JSX.Element {
  const { isLoading, linksList, isError, createLink, deleteLink } = useLinks();
  const [addShortiOpen, setIsShortiOpen, toggleShorti] = useModal();

  const closeCreateLinkDialog = useCallback(() => {
    setIsShortiOpen(false);
  }, [setIsShortiOpen]);

  return (
    <>
      <Container className="links-list" maxWidth="md">
        {isLoading && <SkeletonList variant="rectangular" height={80} rows={15} />}
        {isError && <p>error fetching</p>}
        {linksList &&
          linksList.map((urlInfo) => {
            return <LinkItem key={urlInfo.id} linkInfo={urlInfo} handleDelete={deleteLink} />;
          })}
      </Container>

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
