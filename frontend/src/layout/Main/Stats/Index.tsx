import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { dataHeader, editTextStyle, headingStyle, root, row } from "./Styles";
import LineChart from "../Line/Index";
import BarChart from "../Bar/Index";
import PieChart from "../Pie/Index";
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, List, ListItem, ListItemIcon } from "@mui/material";
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

interface Chart {
  id: string;
  show: boolean;
  component: React.ReactNode;
}

export default function Stats() {
  const [editMode, setEditMode] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);

  const [charts, setCharts] = useState<Chart[]>([
    {
      id: "bar",
      show: true,
      component: <BarChart text="check" editMode={editMode} />,
    },
    {
      id: "line1",
      show: true,
      component: <LineChart text="check" editMode={editMode} />,
    },
    {
      id: "pie",
      show: true,
      component: <PieChart text="check" editMode={editMode} />,
    },
    {
      id: "line2",
      show: true,
      component: <LineChart text="ex" editMode={editMode} />,
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
      prevCharts.map((chart) => {
        if (!chart.show) return chart;
        switch (chart.id) {
          case "bar":
            return {
              ...chart,
              component: (
                <BarChart
                  text="check"
                  editMode={editMode}
                  onDelete={() => handleDelete("bar")}
                />
              ),
            };
          case "line1":
            return {
              ...chart,
              component: (
                <LineChart
                  text="check"
                  editMode={editMode}
                  onDelete={() => handleDelete("line1")}
                />
              ),
            };
          case "pie":
            return {
              ...chart,
              component: (
                <PieChart
                  text="check"
                  editMode={editMode}
                  onDelete={() => handleDelete("pie")}
                />
              ),
            };
          case "line2":
            return {
              ...chart,
              component: (
                <LineChart
                  text="ex"
                  editMode={editMode}
                  onDelete={() => handleDelete("line2")}
                />
              ),
            };
          default:
            return chart;
        }
      })
    );
  }, [editMode, handleDelete]);

  return (
    <Box sx={root}>
      <Box sx={dataHeader}>
        <Typography sx={headingStyle}>Stats</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography sx={editTextStyle}>Edit</Typography>
          <Switch checked={editMode} onChange={handleEditToggle} />
          <Tooltip title="Toggle the edit mode to rearrange charts from the dashboard. Inorder to delete a chart drag it to the delete button at the bottom.">
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
                  {chart.component}
                </SortableItem>
              ))}
              {editMode && (
              <>
                {charts
                  .slice(0,2)
                  .filter((chart) => !chart.show)
                  .map((chart) => (
                    <AddCardOverlay
                      key={chart.id}
                      onAdd={handleOpenAddCardModal}
                    />
                  ))}
              </>
            )}
          </Box>
          <Box sx={row}>
            {charts
              .filter((chart) => chart.show)
              .slice(2)
              .map((chart) => (
                <SortableItem key={chart.id} id={chart.id} editMode={editMode}>
                  {chart.component}
                </SortableItem>
              ))}
              {editMode && (
              <>
                {charts
                  .slice(2)
                  .filter((chart) => !chart.show)
                  .map((chart) => (
                    <AddCardOverlay
                      key={chart.id}
                      onAdd={handleOpenAddCardModal}
                    />
                  ))}
              </>
            )}
          </Box>
        </SortableContext>
      </DndContext>

      <Dialog open={showAddCardModal} onClose={handleCloseAddCardModal}>
        <DialogTitle  sx = {{marginLeft: 'auto', marginRight: 'auto'}} > Select Cards to Add</DialogTitle>
        <DialogContent>
          <List sx = {{display: 'flex'}}>
            {charts
              .filter((chart) => !chart.show)
              .map((chart) => (
                <ListItem
                  sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  key={chart.id}
                  onClick={() => handleChartSelect(chart.id)}
                >
                  {chart.component}
                  <ListItemIcon>
                    <Checkbox
                      checked={selectedCharts.includes(chart.id)}
                    />
                  </ListItemIcon>
                </ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions sx = {{marginLeft: 'auto', marginRight: 'auto'}} > 
          <Button onClick={handleCloseAddCardModal}>Cancel</Button>
          <Button
            onClick={() => handleAddCard(selectedCharts)}
            color="primary"
            variant="contained"
          >
            Add Selected
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}