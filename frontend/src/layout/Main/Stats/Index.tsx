import { useState, useEffect, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import {
  dataHeader,
  editTextStyle,
  headingStyle,
  root,
  row,
} from "./Styles";
import LineChart from "./Line/Index";
import BarChart from "./Bar/Index";
import PieChart from "./Pie/Index";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import {
  DndContext,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import AddCardOverlay from "../../../components/AddCardOverlay/Index";
import { ContainerType } from "../../../pages/Main/constants";
import { fleetStatus, fleetUsageData } from "./constants";
import { fleetStatusData } from "./constants";
import DoughnutChartFleetData from "./fleetStatusDataPie/Index.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

// Memoize SortableItem to prevent unnecessary re-renders
const SortableItem = React.memo(function SortableItem({
  id,
  children,
  editMode,
}: {
  id: string;
  children: React.ReactNode;
  editMode: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: editMode
      ? transform
        ? CSS.Transform.toString(transform)
        : undefined
      : undefined,
    transition: editMode ? transition : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: 100,
    width: "100%",
    height: "100%",
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...(editMode ? { ...attributes, ...listeners } : {})}
    >
      {children}
    </Box>
  );
});

interface ChartProps {
  text: string;
  editMode: boolean;
  onDelete?: () => void;
  containers?: ContainerType[];
  fleetUsageData?: any;
  fleetStatusData?:any;
  containerLoading?: boolean;
  containerError?: any;
}

interface Chart {
  id: string;
  show: boolean;
  componentProps: ChartProps
}

interface StatsProps {
  containers: ContainerType[];
  containerLoading: boolean;
  containerError: any;
}

const getChartComponent = (chart: Chart): React.ReactNode => {

  const { id, componentProps } = chart;

  switch (id) {
    case "bar":
      return <BarChart {...componentProps} />;
    case "line2":
      return <LineChart {...componentProps} />;
    case "pie1":
      return <DoughnutChartFleetData {...componentProps}/>;
    case "pie":
      return <PieChart {...componentProps} />;
    default:
      return null; // Return null if ID does not match any known component
  }
};

const Stats: React.FC<StatsProps> = ({ containers, containerLoading, containerError }) => {
  const [editMode, setEditMode] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);

  const currentCity = useSelector((state: RootState) => state.location.currentLocation.Name);
    // fleetUsageData
    const filteredFleetUsageData = useMemo(() => {
      return fleetUsageData.filter((data) => data.city === currentCity);
    }, [currentCity]);

    const filteredFleetStatusData = useMemo(() => {
      return fleetStatusData.filter((data:fleetStatus) => data.location == currentCity);
    }, [currentCity]);

  const [charts, setCharts] = useState<Chart[]>([
    {
      id: "bar",
      show: true,
      componentProps: { text: "Fleet Usage", editMode: editMode, fleetUsageData:filteredFleetUsageData },
    },
    {
      id: "pie1",
      show: true,
      componentProps: { text: "Fleet Status", editMode: editMode , fleetStatusData: filteredFleetStatusData },
    },
    {
      id: "pie",
      show: true,
      componentProps: { text: "Bins", editMode: editMode, containers: containers, containerLoading: containerLoading, containerError: containerError },
    },
    {
      id: "line2",
      show: true,
      componentProps: { text: "example", editMode: editMode },
    },
  ]);



  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px
    },
  });
  const keyboardSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = charts.findIndex((chart) => chart.id === active.id);
      const newIndex = charts.findIndex((chart) => chart.id === over.id);
      setCharts((charts) => arrayMove(charts, oldIndex, newIndex));
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleDelete = useCallback(
    (id: string) => {
      setCharts((prevCharts) => {
        const updatedCharts = prevCharts.map((chart) =>
          chart.id === id ? { ...chart, show: false } : chart
        );

        // Move the deleted item to the end of the array
        const activeChartIndex = updatedCharts.findIndex(
          (chart) => chart.id === id
        );
        const deletedChart = updatedCharts.splice(activeChartIndex, 1)[0];
        return [...updatedCharts, deletedChart];
      });
    },
    [setCharts]
  );

  const handleAddCard = (ids: string[]) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        ids.includes(chart.id) ? { ...chart, show: true } : chart
      )
    );
    setShowAddCardModal(false); // Close the modal after adding
  };

  const handleOpenAddCardModal = () => {
    setShowAddCardModal(true);
    setSelectedCharts([]); // Clear previous selections
  };

  const handleCloseAddCardModal = () => {
    setShowAddCardModal(false);
  };

  const handleChartSelect = (id: string) => {
    setSelectedCharts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((chartId) => chartId !== id)
        : [...prevSelected, id]
    );
  };

  useEffect(() => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) => ({
        ...chart,
        componentProps: {
          ...chart.componentProps,
          editMode: editMode,
          onDelete: () => handleDelete(chart.id),
        },
      }))
    );
  }, [editMode, handleDelete]); // Add handleDelete to the dependency array


  useEffect(() => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === "pie" // Only update the pie chart
          ? {
              ...chart,
              componentProps: {
                ...chart.componentProps,
                containers: containers, // Update the containers prop
                containerLoading: containerLoading,
                containerError: containerError,
              },
            }
          : chart // Return the chart unchanged if it's not the pie chart
      )
    );
  }, [containers]); // This useEffect will run only when containers change

  useEffect(() => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === "bar" // Only update the pie chart
          ? {
              ...chart,
              componentProps: {
                ...chart.componentProps,
                fleetUsageData:filteredFleetUsageData
              },
            }
          : chart // Return the chart unchanged if it's not the pie chart
      )
    );
  }, [filteredFleetUsageData]); // This useEffect will run only when containers change

  useEffect(() => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === "pie1" // Only update the pie chart
          ? {
              ...chart,
              componentProps: {
                ...chart.componentProps,
                fleetStatusData: filteredFleetStatusData
              },
            }
          : chart // Return the chart unchanged if it's not the pie chart
      )
    );
  }, [filteredFleetStatusData]); // This useEffect will run only when containers change

  
  

  return (
    <Box sx={root}>
      <Box sx={dataHeader}>
        <Typography sx={headingStyle}>Stats</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography sx={editTextStyle}>Edit</Typography>
          <Switch checked={editMode} onChange={handleEditToggle} />
          <Tooltip title="Toggle the edit mode to rearrange charts from the dashboard. Inorder to delete a chart press the delete button.">
            <InfoIcon sx={{ color: "gray" }} />
          </Tooltip>
        </Box>
      </Box>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={editMode ? handleDragEnd : undefined}
      >
        <SortableContext
          items={charts.map((chart) => chart.id)}
          strategy={rectSortingStrategy}
        >
          <Box sx={row}>
            {charts
              .filter((chart) => chart.show)
              .slice(0, 2)
              .map((chart) => (
                <SortableItem key={chart.id} id={chart.id} editMode={editMode}>
                  {getChartComponent(chart)}
                </SortableItem>
              ))}
            {editMode && (
              <Box sx = {{height: '100%', width: '100%'}}> 
                {charts
                  .slice(0, 2)
                  .filter((chart) => !chart.show)
                  .map((chart) => (
                    <AddCardOverlay
                      key={chart.id}
                      onAdd={handleOpenAddCardModal}
                    />
                  ))}
              </Box>
            )}
          </Box>
          <Box sx={row}>
            {charts
              .filter((chart) => chart.show)
              .slice(2)
              .map((chart) => (
                <SortableItem key={chart.id} id={chart.id} editMode={editMode}>
                  {getChartComponent(chart)}
                </SortableItem>
              ))}
            {editMode && (
              <Box sx = {{height: '100%', width: '100%'}}>
                {charts
                  .slice(2)
                  .filter((chart) => !chart.show)
                  .map((chart) => (
                    <AddCardOverlay
                      key={chart.id}
                      onAdd={handleOpenAddCardModal}
                    />
                  ))}
              </Box>
            )}
          </Box>
        </SortableContext>
      </DndContext>

      <Dialog
        open={showAddCardModal}
        onClose={handleCloseAddCardModal}
        sx={{
          borderRadius: "16px", // Rounded edges for the dialog
          padding: "16px", // Padding inside the dialog
          "& .MuiDialog-paper": {
            borderRadius: "16px", // Ensure the dialog paper also has rounded edges
          },
        }}
      >
        <DialogTitle
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            paddingBottom: "8px", // Adding some padding at the bottom
          }}
        >
          Select Cards to Add
        </DialogTitle>

        <DialogContent sx={{ padding: "16px" }}>
          {" "}
          {/* Adding padding inside the content */}
          <List sx={{ display: "flex" }}>
            {charts
              .filter((chart) => !chart.show)
              .map((chart) => (
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  key={chart.id}
                  onClick={() => handleChartSelect(chart.id)}
                >
                  {getChartComponent(chart)}
                  <ListItemIcon>
                    <Checkbox checked={selectedCharts.includes(chart.id)} />
                  </ListItemIcon>
                </ListItem>
              ))}
          </List>
        </DialogContent>

        <DialogActions
          sx={{ marginLeft: "auto", marginRight: "auto", paddingTop: "8px" }}
        >
          <Button onClick={handleCloseAddCardModal}>Cancel</Button>
          <Button
            onClick={() => handleAddCard(selectedCharts)}
            color="primary"
            variant="contained"
            sx={{ borderRadius: "8px" }} // Rounded edges for the button
          >
            Add Selected
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Stats;