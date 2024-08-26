import { SxProps, Theme } from "@mui/material";

export const ButtonTextStyle: SxProps<Theme> = {
    fontSize: {
        sm: '12px',
        md: '14px',
    },
    fontFamily: 'Raleway',
    fontWeight: '700',
    color: 'black',
}

export const SignInButtonStyle: SxProps<Theme> = {
    fontSize: {
        sm: '12px',
        md: '16px',
    },
    padding: {
        sm: '5px 15px',
        md: '10px 25px',
    },
    fontFamily: 'Raleway',
    fontWeight: '700',
    color: 'white',
    backgroundColor: 'primary.main',
    '&:hover': {
        backgroundColor: 'primary.dark',
    }
}
