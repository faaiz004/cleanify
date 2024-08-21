import { SxProps, Theme } from "@mui/material";


export const root: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '90vh',
    backgroundColor: '#F4F3F3',
    alignItems: 'center',
    width: '100%',
}

export const textAndImageContainer: SxProps<Theme> = {
    display: 'flex',
    flexDirection: {
        xs: 'column',
        sm: 'column',
        md: 'row',
    },
    width: '100%',
    alignItems: 'center',
    gap: '40px',
}

export const textBox : SxProps<Theme> = {
    width: {
        xs: '100%',
        sm: '100%',
        md: '50%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
}

export const mainTextStyle: SxProps<Theme> = {
    width: '70%',
    color: 'primary.main',
    fontSize: '36px',
    lineHeight: '40px',
    fontWeight: 700,
    fontFamily: 'Raleway',
    textAlign: {
        xs: 'center',
        sm: 'center',
        md: 'left',
    }
}

export const secondaryTextStyle: SxProps<Theme> = {
    width: '70%',
    color: 'secondary.main',
    fontSize: '20px',
    lineHeight: '30px',
    fontWeight: 500,
    fontFamily: 'Urbanist',
    textAlign: {
        xs: 'center',
        sm: 'center',
        md: 'left',
    }
}

export const buttonStyle: SxProps<Theme> = {
    padding: {
        xs: '5px 15px',
        sm: '5px 15px',
        md: '10px 25px',
    },
    backgroundColor: 'primary.main',
    color: 'white',
    fontSize: '20px',
    fontWeight: 700,
    fontFamily: 'Raleway',
    '&:hover': {
        backgroundColor: 'primary.dark',
    }
    
}

export const imageContainer: SxProps<Theme> = {
    width: {
        xs: '100%',
        sm: '100%',
        md: '50%',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
}