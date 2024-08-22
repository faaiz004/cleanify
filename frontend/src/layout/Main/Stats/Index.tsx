import { useState } from "react";
import Box from "@mui/material/Box";
import { dataHeader, editTextStyle, headingStyle, root, row } from "./Styles";
import LineChart from "../Line/Index";
import BarChart from "../Bar/Index";
import PieChart from "../Pie/Index";
import { Typography } from "@mui/material";
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
    transform: editMode ? (transform ? CSS.Transform.toString(transform) : undefined) : undefined,
    transition: editMode ? transition : undefined,
    opacity: isDragging ? 0.5 : 1,
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
  component: React.ReactNode;
}

export default function Stats() {
  const [editMode, setEditMode] = useState(false);

  const [charts, setCharts] = useState<Chart[]>([
    { id: "bar", component: <BarChart  text="check"  /> },
    { id: "line1", component: <LineChart text="check"   /> },
    { id: "pie", component: <PieChart  text="check"  /> },
    { id: "line2", component: <LineChart  text="ex" /> },
  ]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

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




  return (
    <Box sx={root}>
      <Box sx={dataHeader}>
        <Typography sx={headingStyle}>Stats</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography sx={editTextStyle}>Edit</Typography>
          <Switch checked={editMode} onChange={handleEditToggle} />
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
            {charts.slice(0, 2).map((chart) => (
              <SortableItem key={chart.id} id={chart.id} editMode={editMode}>
                {chart.component}
              </SortableItem>
            ))}
          </Box>
          <Box sx={row}>
            {charts.slice(2).map((chart) => (
              <SortableItem key={chart.id} id={chart.id} editMode={editMode}>
                {chart.component}
              </SortableItem>
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    </Box>
  );
}

