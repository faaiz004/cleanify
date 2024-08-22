import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography,Box } from "@mui/material";
import { Container, grahContainer, headingContainer, headingStyle } from "../Stats/Styles";


Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({
    text,
}:{
    text: string
}) {
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 1,
    }
    const data = {
        labels : [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],
        datasets: [
            {
                label : 'Steps',
                data: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
                borderColor: 'rgba(75, 192, 192, 1)', 
            }
        ]
    }
    return (
        <Box sx = {Container}>
            <Box sx = {headingContainer}>
                <Typography sx = {headingStyle}>{text}</Typography>
                    
            </Box>
            
            <Box sx = {grahContainer}>
            <Line data={data} options={options} />
        </Box>
        
        </Box>



    )
}
