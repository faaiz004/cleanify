import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
    height: 'calc(100vh - 100px)', // Subtract the height of the navbar
    width: {
        sm: '380px',
        md: '420px',
        lg: '520px',
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
}

export const dataHeader: SxProps<Theme> = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingY: '10px',
    paddingX: '20px',
    justifyContent: 'space-between',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
}

export const editTextStyle: SxProps<Theme> = {
    fontFamily: 'Urbanist',
    fontSize: '20px',
    fontWeight: 400,
    color: 'black',
}


export const headingStyle: SxProps<Theme> = {
    fontFamily: 'Raleway',
    fontSize: {
        sm: '16px',
        md: '20px',
        lg: '24px',
    },
    fontWeight: 700,
    color: '#6B9AB6',
}

export const row: SxProps<Theme> = {
    width: '100%',
    height: '50%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
}


export const Container: SxProps<Theme> = {
    width: {
        sm: '180px',
        md: '200px',
        lg: '250px',
    },
    height: '100%',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '20px',
    position: 'relative'
}


export const headingContainer: SxProps<Theme> = { 
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingX: '10px',
}


export const grahContainer: SxProps<Theme> = {
    width: {
        sm: '140px',
        md: '150px',
        lg: '200px',
    },
    height: '80%',
}


export const dialogStyles: SxProps<Theme> = {
    padding: '20px',
    borderRadius: '10px',
}