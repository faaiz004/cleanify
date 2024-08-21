import { SxProps } from '@mui/system';

export const InputErrorBox: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  width: '90%',
};

export const PasswordField = (error: boolean): SxProps => ({
  width: '100%',
  backgroundColor: 'white',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  border: error ? '1px red solid' : '1px solid #ccc',
  borderRadius: '10px',
  '&:hover': {
    border:  error ? '1px red solid' : '1px solid #048748'
  }
});

export const Icon: SxProps = {
  cursor: 'pointer',
  color: '#1A1A1A'
};
