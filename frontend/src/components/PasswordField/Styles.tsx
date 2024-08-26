import { SxProps } from '@mui/system';
import { useTheme } from '@mui/material/styles';

export const InputErrorBox: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  width: '90%',
};

export const PasswordField = (error: boolean): SxProps => {
  const currentTheme = useTheme();

  return {
    width: '100%',
    backgroundColor: '#white', // Using the primary color from your theme
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    border: error ? `1px red solid` : `1px solid #ccc`,
    borderRadius: '10px',
    '&:hover': {
      border: error ? `1px red solid` : `1px solid ${currentTheme.palette.primary.main}`,
    },
  };
};

export const Icon: SxProps = {
  cursor: 'pointer',
  color: '#1A1A1A'
};
