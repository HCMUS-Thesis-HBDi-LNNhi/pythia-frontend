import Layout from "./layout";
import toast from "./toast.component";
import Loading from "./loading.component";

export { Layout, toast, Loading };

import Button from "./buttons/button.component";
import UploadButton from "./buttons/uploadButton.component";

export { Button, UploadButton };

import Input from "./inputs/input.component";
import Radio from "./inputs/radio.component";
import Select from "./inputs/select.component";

export { Input, Radio, Select };

import ChartHeader from "./charts/header.component";
import ChartBody from "./charts/body.component";
import ChartOptions from "./charts/options.component";
import { SingleBarChart } from "./charts/bar.component";
import { SingleLineChart } from "./charts/line.component";
import PieChart from "./charts/pie.component";
import ScatterChart from "./charts/scatter.component";
import GeoChart from "./charts/geo.component";

export {
  ChartHeader,
  ChartBody,
  ChartOptions,
  SingleBarChart,
  GeoChart,
  SingleLineChart,
  PieChart,
  ScatterChart,
};

import Dialog from "./dialog.component";
import Tag from "./tag.component";
import Textarea from "./textarea.component";
import Pane from "./pane.component";
import Tooltip from "./tooltip.component";

export { Dialog, Tag, Textarea, Pane, Tooltip };

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import {
  ChoroplethController,
  ProjectionScale,
  ColorScale,
  GeoFeature,
} from "chartjs-chart-geo";
import AnnotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  Title,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  ChoroplethController,
  ProjectionScale,
  ColorScale,
  GeoFeature,
  AnnotationPlugin
);
