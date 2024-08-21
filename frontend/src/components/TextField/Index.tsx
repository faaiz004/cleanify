import "./Styles.css";
import Box from "@mui/material/Box";

export default function TextField({
  email,
  setEmail,
  error,
}: {
  email: string;
  setEmail: (email: string) => void;
  error: string;
}) {
  return (
    <Box sx={{ width: "90%" }}>
      <input
        type="email"
        placeholder="Enter your email"
        className={`text-field ${error.trim().length > 0 ? 'error' : ''}`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && (
        <Box sx={{ color: "red", fontSize: "12px", textAlign: "left" }}>
          {error}
        </Box>
      )}
    </Box>
  );
}
