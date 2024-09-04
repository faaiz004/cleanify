import { DivIcon } from "leaflet";

const createClusterCustomIcon = (cluster: any) => {
  const count = cluster.getChildCount();
  let size = 'large';
  let dimensions = 50;

  if (count < 10) {
    size = 'small';
    dimensions = 30;
  } else if (count < 100) {
    size = 'medium';
    dimensions = 40;
  }

  return new DivIcon({
    html: `<div class="cluster-icon ${size}" style="background-color: rgba(47, 79, 79, 0.8); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; width: ${dimensions}px; height: ${dimensions}px;">${count}</div>`,
    className: 'custom-cluster-icon',
    iconSize: [dimensions, dimensions],
  });
};

export default createClusterCustomIcon;