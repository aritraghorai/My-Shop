import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

export default function AlertComponent() {
  const Capitalize = (word: string) => {
    const nw = word.toLowerCase();
    return nw.charAt(0).toUpperCase() + nw.slice(1);
  };
  const alertState = useSelector((state: RootState) => state.alertState);

  return (
    <>
      {alertState.alert && (
        <div style={{ height: '50px' }}>
          {
            <div
              className={`alert alert-${alertState.type} alert-dismissible fade show`}
              role="alert"
              style={{ textAlign: 'center' }}
            >
              {Capitalize(alertState.Message)}
            </div>
          }
        </div>
      )}
    </>
  );
}
