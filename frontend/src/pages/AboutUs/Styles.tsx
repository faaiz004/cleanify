import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export const feature1Box: SxProps<Theme> = {
    marginTop: '100px',
    width: '100%',
    display: 'flex',
    flexDirection: {
        xs: 'column',
        sm: 'row',
    },
    gap: '20px',
    justifyContent: 'space-between',
    paddingX: '40px',
    
}

export const feature1ImageBox: SxProps<Theme> = {
    width: {
        xs: '100%',
        sm: '50%',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export const feature1textBox: SxProps<Theme> = {
    width: {
        xs: '100%',
        sm: '50%',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
}

export const feature1mainText: SxProps<Theme> = {
    fontSize: {
        xs: '24px',
        sm: '30px',
        md: '36px',
        lg: '48px',
    },
    fontWeight: 'bold',
    color: 'primary.main',
    fontFamily: 'Raleway',
    lineHeight: '1.5',
    textAlign: 'center',
}

export const feature1subText: SxProps<Theme> = {
    fontSize: {
        xs: '16px',
        sm: '16px',
        md: '18px',
        lg: '24px',
    },
    color: 'black',
    fontFamily: 'Urbanist',
    fontWeight: '400',
    lineHeight: '1.5',
    textAlign: 'center',
}

export const textFiledStyling: SxProps<Theme> = {
    width: '70%',
    backgroundColor: 'white',
}

export const footerContainer = {
    backgroundColor: '#2D8083',
    width: '100%',
    padding: '20px',
    textAlign: 'center',
    color: '#fff',
    marginTop: '40px',
  };
  
export const footerText = {
    marginBottom: '10px',
    fontSize: '14px',
  };
  
export const socialIconsContainer = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  };
  
export const socialIcon = {
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',
    '&:hover': {
      color: '#38A3A5',
    },
  };
  