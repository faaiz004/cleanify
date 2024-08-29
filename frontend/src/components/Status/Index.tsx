import Box from '@mui/material/Box';
import { closeIcon, errorTextStyle, root } from './Styles';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';


interface Props {
  error:any;
}

export default function Status({error}: Props) {
  const show = error !== null;
  return (
    <Box sx = {{
        ...root,
        display: show ? "flex" : "none"
    }}>
        <CloseIcon sx = {closeIcon} />
        <Typography sx = {errorTextStyle}>
            Error loading containers
        </Typography>
    </Box>
  )
}
