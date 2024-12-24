import Modal from '@mui/material/Modal';
import { useState } from 'react';
import './ResultItem.css';

type ResultItemProps = {
  image: string;
  iteration: number;
};

export const ResultItem = ({ image, iteration }: ResultItemProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="item" onClick={handleOpen}>
        <div className="iteration">Iteración {iteration}</div>
        <img
          className="iterationImage"
          src={image}
          alt={`iteration ${iteration}`}
        />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="modalContainerItem">
          <img
            className="modalImageItem"
            src={image}
            alt={`Resultado ${iteration}`}
          />
          <div className="modalCloseButtonItem" onClick={handleClose}>
            Cerrar
          </div>
        </div>
      </Modal>
    </>
  );
};
