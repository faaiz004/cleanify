import { SxProps, Theme } from "@mui/material";


export const root: SxProps<Theme> = {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    zIndex: 1000,
}

export const closeIcon: SxProps<Theme> = {
    color: '#990000',
    fontSize: '24px',
}

export const errorTextStyle: SxProps<Theme> = {
    fontSize: '16px',
    fontWeight: 400,
    color: 'black',
    fontFamily: 'Urbanist',
}