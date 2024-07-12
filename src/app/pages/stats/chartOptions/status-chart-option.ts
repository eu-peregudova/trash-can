import { EChartsOption } from 'echarts';

export const statusChartOption: EChartsOption = {
  toolbox: {
    feature: {
      saveAsImage: { show: true, name: 'All tasks by status' },
    },
  },
  tooltip: {
    show: true,
    trigger: 'item',
  },
  legend: {
    top: '',
    left: 'center',
  },
  color: ['#000000', '#707070', '#c3c3c3'],
  series: [
    {
      name: 'Tasks by status',
      type: 'pie',
      radius: ['80%', '60%'],
      avoidLabelOverlap: true,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '1rem',
          fontWeight: 'bolder',
        },
      },
      labelLine: {
        show: false,
      },
      data: [],
    },
  ],
};
