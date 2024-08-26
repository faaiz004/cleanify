import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
    height: '89vh',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
}

export const dataHeader: SxProps<Theme> = {
    width: '520px',
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

export const row: SxProps<Theme> = {
    width: '100%',
    height: '50%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
}

export const headingStyle: SxProps<Theme> = {
    fontFamily: 'Raleway',
    fontSize: '28px',
    fontWeight: 700,
    color: '#6B9AB6',
}



export const Container: SxProps<Theme> = {
    width: '250px',
    height: '300px',
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
    width: '200px',
    height: '250px',
}


export const dialogStyles: SxProps<Theme> = {
    padding: '20px',
    borderRadius: '10px',
}