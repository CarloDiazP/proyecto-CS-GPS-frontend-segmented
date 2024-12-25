import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/loadAnimation.json';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileChange = (event: FileChangeEvent): void => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const getSegmentedImages = async () => {
    if (!selectedFile) {
      alert('Por favor selecciona una imagen primero.');
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(
        'https://trabajo-final-calidad-gps.onrender.com/?multiple=true',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Archivo subido correctamente:', data);
        navigate('/result', { state: data });
      } else {
        console.error('Error al subir el archivo:', response.statusText);
        alert('Error al procesar la imagen.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al procesar la imagen.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="segmented-title">
        <span>Segmented</span>
      </div>
      <div className="description">
        Segmented es una aplicación web que permite visualizar la segmentación
        de caracteres dentro de una imagen utilizando un algoritmo ...
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
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div
            className="uploadBox"
            style={{
              backgroundImage: previewImage ? `url(${previewImage})` : 'none',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundBlendMode: 'screen',
              backgroundPosition: 'center',
            }}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            {!previewImage && (
              <>
                <CloudUploadIcon
                  className="uploadIcon"
                  style={{ fontSize: '13rem' }}
                />
                <div className="uploadDescription">Sube una imagen</div>
              </>
            )}
          </div>
          {selectedFile && (
            <button
              className="uploadButton"
              onClick={() => {
                setIsLoading(true);
                getSegmentedImages();
              }}
            >
              Procesar Imagen
            </button>
          )}
        </>
      )}
    </div>
  );
};
