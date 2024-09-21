import { styled } from '@mui/material/styles';
import { Button, Container, Table, IconButton } from '@mui/material';

// Styled container
export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingBottom: '2rem',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  maxWidth: 'lg',
  margin: '0 auto',
  width: '100%',
  paddingLeft: '1rem',
  paddingRight: '1rem',
}));

// Styled title
export const Title = styled('h4')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.palette.primary.main,
  marginBottom: '1rem',
}));

// Styled add button
export const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '25px',
  padding: '10px 20px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

// Styled filter section
export const Filters = styled('div')(({ theme }) => ({
  marginTop: '1.5rem',
  marginBottom: '1.5rem',
  padding: '10px 20px',
  borderRadius: '10px',
  backgroundColor: theme.palette.grey[100],
}));

// Styled table
export const StyledTable = styled(Table)(({ theme }) => ({
  marginTop: '2rem',
  '& .MuiTableCell-root': {
    padding: '10px',
    fontSize: '0.9rem',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiTableRow-root:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Styled image
export const Image = styled('img')(({ theme }) => ({
  width: '50px',
  height: 'auto',
  marginRight: '1rem',
}));

// Styled feedback button
export const FeedbackButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '1rem',
  right: '1rem',
  backgroundColor: theme.palette.error.main,
  color: '#fff',
  borderRadius: '50%',
  padding: '10px',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));
