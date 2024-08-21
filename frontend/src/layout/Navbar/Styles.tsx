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

export const RegisterButtonStyle: SxProps<Theme> = {
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
        backgroundColor: 'primary.main',
    }
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
    color: 'secondary.main',
    backgroundColor: '#F4F3F3',
    '&:hover': {
        backgroundColor: '#F7F6F6',
        color: 'secondary.main',
    }
}