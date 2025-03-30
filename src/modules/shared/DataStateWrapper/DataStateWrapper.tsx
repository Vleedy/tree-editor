import { ReactNode } from 'react';

import ReportIcon from '@mui/icons-material/Report';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import './_dataStateWrapper.scss';

type DataStateWrapperProps<T> = {
  isLoading: boolean;
  error: string | null;
  data: T | null | undefined;
  children: (data: T) => ReactNode;
  loaderComponent?: ReactNode;
  errorComponent?: (error: string) => ReactNode;
  emptyComponent?: ReactNode;
};

const Loader = () => <div className="data-state-wrapper data-state-wrapper__loader"></div>;

const Error = ({ message }: { message: string }) => {
  return (
    <div className="data-state-wrapper data-state-wrapper__error">
      <ReportIcon sx={{ fontSize: '15rem' }} color="error" />
      <h1 title={message}>{message}</h1>
    </div>
  );
};

const Empty = () => {
  return (
    <div className="data-state-wrapper data-state-wrapper__empty">
      <TravelExploreIcon sx={{ fontSize: '15rem' }} color="primary" />
      <h1>No data available</h1>
    </div>
  );
};

const DataStateWrapper = <T,>({
  isLoading,
  error,
  data,
  children,
  loaderComponent = <Loader />,
  errorComponent = (message) => <Error message={message} />,
  emptyComponent = <Empty />,
}: DataStateWrapperProps<T>) => {
  if (isLoading) return <>{loaderComponent}</>;
  if (error) return <>{errorComponent(error)}</>;
  if (!data) return <>{emptyComponent}</>;

  return <>{children(data)}</>;
};

export default DataStateWrapper;
