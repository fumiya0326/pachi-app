import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

interface ConfirmModalProps {
  title: string;
  caption: string;
  onConfirm: () => void;
  confirmButtonCaption: string
  onCancel: () => void;
  cancelButtonCaption: string;
  open: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = (props) => {

  const { open, title, caption, onConfirm, onCancel, confirmButtonCaption, cancelButtonCaption } = props;

  return (
    <Modal
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        background: '#222',
      }}>
        <h2 id="child-modal-title">
          {title}
        </h2>
        <p id="child-modal-description">
          {caption}
        </p>
        <Button sx={{ m: 1 }} onClick={onCancel} variant={'outlined'}>
          {cancelButtonCaption}
        </Button>
        <Button sx={{ m: 1 }} onClick={onConfirm} variant={'contained'}>
          {confirmButtonCaption}
        </Button>
      </Box>
    </Modal>
  )
}