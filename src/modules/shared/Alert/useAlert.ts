import { useState, useCallback } from 'react';

import { IAlert } from './types';

const useAlert = () => {
  const [alertMessage, setAlertMessage] = useState<IAlert | null>(null);

  const handleAlertClose = useCallback(() => setAlertMessage(null), []);
  const showAlert = useCallback((alert: IAlert) => setAlertMessage(alert), []);

  return { alertMessage, showAlert, handleAlertClose };
};

export default useAlert;
