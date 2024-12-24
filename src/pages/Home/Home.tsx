import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/loadAnimation.json';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const getSegmentedImages = async () => {
    setTimeout(() => {
      setIsLoading(false);
      navigate('/result');
    }, 10000);
  };

  return (
    <div className="container">
      <div className="segmented-title">
        <span>Segmented</span>
      </div>
      <div className="description">
        Segmented una aplicación web que permite visualizar la segmentación de
        caractéres dentro de una imagen utilizando el algoritmo ...
      </div>
      {isLoading ? (
        <>
          <Lottie
            isClickToPauseDisabled={true}
            options={defaultOptions}
            height={500}
            width={500}
          />
          <div className="loadingDescription">
            Se está procesando la imagen ...
          </div>
        </>
      ) : (
        <>
          <div
            className="uploadBox"
            onClick={() => {
              setIsLoading(true);
              getSegmentedImages();
            }}
          >
            <CloudUploadIcon
              className="uploadIcon"
              style={{ fontSize: '13rem' }}
            />
            <div className="uploadDescription">Sube una imagen</div>
          </div>
        </>
      )}
    </div>
  );
};
