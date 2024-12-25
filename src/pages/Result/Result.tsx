import { ResultItem } from '../../components/ResultItem/ResultItem';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './Result.css';

export const Result = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const results: string[] = state?.images || [];
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
  if (state === null) return <Navigate to={'/'} replace={true} />;

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
            return <ResultItem key={result} image={result} iteration={index} />;
          })}
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="modalContainer">
          <img
            className="modalImage"
            src={`https://trabajo-final-calidad-gps.onrender.com/${results[currentImageIndex]}`}
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
