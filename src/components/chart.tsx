import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto'
import { Box } from '@mui/system';
import { FC, useEffect, useState } from 'react';
import annotationPlugin from "chartjs-plugin-annotation";
import { Counts } from './home-view';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
)

interface ChartProps {
  title: string;
  counts: Counts,
  currentValue: number,
}

export const Chart: FC<ChartProps> = (props) => {
  const { title, counts, currentValue } = props;

  const initLabels = (() => {
    const _labels: string[] = []
    for (let i = 0; i < 100; i++) {
      _labels.push(String(i));
    }
    return _labels;
  })();

  const [labels, setLabels] = useState<string[]>([])

  useEffect(() => {
    let _labels = initLabels;
    for (let i = 99; i > 0; i--) {
      _labels.pop();
      if (counts.setting6[i] !== 0) {
        break
      }
    }
    setLabels(_labels);
  }, [counts])

  // グラフオプション
  const options: any = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      autocolors: false,
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: currentValue,
            xMax: currentValue,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          }
        }
      }
    }
  };

  // グラフ表示データ
  const data = {
    labels: labels,
    datasets: [
      {
        label: "設定1",
        data: counts.setting1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 1,
        pointHoverRadius: 1
      },
      {
        label: "設定2",
        data: counts.setting2,
        borderColor: "rgb(255, 198, 32)",
        backgroundColor: "rgba(255, 198, 32, 0.5)",
        pointRadius: 1,
        pointHoverRadius: 1
      },
      {
        label: "設定3",
        data: counts.setting3,
        borderColor: "rgb(25, 99, 13)",
        backgroundColor: "rgba(25, 99, 13, 0.5)",
        pointRadius: 1,
        pointHoverRadius: 1
      },
      {
        label: "設定4",
        data: counts.setting4,
        borderColor: "rgb(255, 99, 13)",
        backgroundColor: "rgba(255, 99, 13, 0.5)",
        pointRadius: 1,
        pointHoverRadius: 1
      },
      {
        label: "設定5",
        data: counts.setting5,
        borderColor: "rgb(255, 9, 132)",
        backgroundColor: "rgba(255, 9, 132, 0.5)",
        pointRadius: 1,
        pointHoverRadius: 1
      },
      {
        label: "設定6",
        data: counts.setting6,
        borderColor: "rgb(25, 99, 132)",
        backgroundColor: "rgba(25, 99, 132, 0.5)",
        pointRadius: 1,
        pointHoverRadius: 1
      },
    ],
  };

  return (
    <Box>
      <Line options={options} data={data} />
    </Box>
  );
}