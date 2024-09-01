import Box from '@mui/material/Box';
import { closeIcon, errorTextStyle, root } from './Styles';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';


interface Props {
  containerError:any;
  vehiclesError:any;
}

export default function Status({containerError, vehiclesError}: Props) {
  const show = containerError || vehiclesError;
  return (
    <Box sx = {{
        ...root,
        display: show ? "flex" : "none"
    }}>
        {
            containerError && (
                <>
                    <CloseIcon sx = {closeIcon} />
                    <Typography sx = {errorTextStyle}>
                        Error loading containers
                    </Typography>
                </>
            )
        }
        {
            vehiclesError && (
                <>
                    <CloseIcon sx = {closeIcon} />
                    <Typography sx = {errorTextStyle}>
                        Error loading vehicles
                    </Typography>
                </>
            )
        }
    </Box>
  )
}
