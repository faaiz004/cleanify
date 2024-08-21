import { SxProps,Theme } from "@mui/material";


export const root: SxProps<Theme> = {
    display: 'flex',
    flexDirection: {
        xs: 'column',
        sm: 'column',
        md: 'row',
    },
    justifyContent: 'center',
    minHeight: '90vh',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    gap: {
        xs: '40px',
        sm: '40px',
        md: '0px',
    },
    paddingY: {
        xs: '40px',
        sm: '40px',
        md: '0px',
    }
}




export const textContainer: SxProps<Theme> = {
    width: {
        xs: '100%',
        sm: '100%',
        md: '50%',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: {
        xs: '0px',
        sm: '0px',
        md: '120px',
    }
}

export const textStyles: SxProps<Theme> = {
    width: '70%',
    color: 'primary.main',
    fontSize: {
        xs: '34px',
        sm: '30px',
        md: '36px',
    },
    lineHeight: '40px',
    fontWeight: 700,
    fontFamily: 'Raleway',
    textAlign: {
        xs: 'center',
        sm: 'center',
        md: 'left',
    }
}

export const subTextStyles: SxProps<Theme> = {
    width: '70%',
    color: 'black',
    fontSize: {
        xs: '16px',
        sm: '20px',
        md: '24px',
    },
    lineHeight: '30px',
    fontWeight: 400,
    fontFamily: 'Raleway',
    textAlign: {
        xs: 'center',
        sm: 'center',
        md: 'left',
    }
}

export const formContainer: SxProps<Theme> = {
    width: {
        xs: '100%',
        sm: '100%',
        md: '50%',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',

}

export const form : SxProps<Theme> = {
    width: {
        xs: '90%',
        sm: '60%',
        md: '80%',
    },
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
}

export const buttonStyle: SxProps<Theme> = {
    width: '90%',
    backgroundColor: 'primary.main',
    color: 'white',
    fontSize: '20px',
    height: '59px',
    fontWeight: 700,
    fontFamily: 'Raleway',
    borderRadius: '10px',
    '&:hover': {
        backgroundColor: 'primary.dark',
    }
}