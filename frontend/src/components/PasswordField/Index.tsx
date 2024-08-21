import './Styles.css';
import Box from '@mui/material/Box'
import { InputErrorBox, PasswordField, Icon } from './Styles'
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function PasswordInput({
    password,
    error,
    placeholder,
    setPassword,
}:{
    password: string,
    error: string,
    placeholder: string
    setPassword: (password: string) => void
}) {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <Box sx={InputErrorBox}>
      <Box sx={PasswordField(error.trim().length > 0)}>
        <input
          placeholder={placeholder || 'Enter your password'}
          className="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        {showPassword ? (
          <VisibilityIcon
            sx={Icon}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          />
        ) : (
          <VisibilityOffIcon
            sx={Icon}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          />
        )}
      </Box>

      {error && (
        <Box sx={{ color: 'red', fontSize: '12px', textAlign: 'left' }}>
          {error}
        </Box>
      )}
    </Box>
  )
}
