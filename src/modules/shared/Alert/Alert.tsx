import { useEffect } from 'react';

import { default as MuiAlert } from '@mui/material/Alert';

import { AlertType } from './types';

import './_alert.scss';

interface IAlertProps {
  severity: AlertType;
  message: string;
  autoClose?: number;
  onClose: () => void;
}
const Alert: React.FC<IAlertProps> = ({ message, severity, autoClose, onClose }) => {
  useEffect(() => {
    if (!autoClose) return;

    const timeId = setTimeout(() => {
      onClose();
    }, autoClose);

    return () => {
      clearTimeout(timeId);
    };
  }, [autoClose, message, onClose]);

  return (
    <MuiAlert className="alert" variant="filled" severity={severity} onClose={onClose}>
      {message}
    </MuiAlert>
  );
};

export default Alert;
