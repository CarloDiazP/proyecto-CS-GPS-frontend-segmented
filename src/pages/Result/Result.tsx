import { ResultItem } from '../../components/ResultItem/ResultItem';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import './Result.css';

export const Result = () => {
  const results: string[] = [
    'src/assets/img-01.png',
    'src/assets/img-02.png',
    'src/assets/img-03.png',
    'src/assets/img-04.png',
    'src/assets/img-05.png',
    'src/assets/img-06.png',
    'src/assets/img-07.png',
    'src/assets/img-08.png',
    'src/assets/img-09.png',
    'src/assets/img-10.png',
    'src/assets/img-11.png',
    'src/assets/img-12.png',
    'src/assets/img-13.png',
    'src/assets/img-14.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // show animation button
  useEffect(() => {
    let interval: number;

    if (open) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % results.length);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [open, results.length]);

  // modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentImageIndex(0);
  };

  return (
    <>
      <div className="container">
        <div
          className="back-button"
          onClick={() => {
            navigate('/');
          }}
        >
          <ArrowBackIosNewIcon
            className="back-button-icon"
            style={{ fontSize: '5rem' }}
          />
          <div className="back-button-text">Volver</div>
        </div>
        <div className="show-animation-button" onClick={handleOpen}>
          <span>Ver animación</span>
        </div>
        <div className="description">
          La imagen terminó de procesar, pulse en “Ver animación” para ver la
          segmentación de manera gráfica o puede seleccionar una iteración en
          específico
        </div>
        <div className="images-grid">
          {results.map((result, index) => {
            return <ResultItem image={result} iteration={index} />;
          })}
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="modalContainer">
          <img
            className="modalImage"
            src={results[currentImageIndex]}
            alt={`Resultado ${currentImageIndex + 1}`}
          />
          <div className="modalCloseButton" onClick={handleClose}>
            Cerrar
          </div>
        </div>
      </Modal>
    </>
  );
};
