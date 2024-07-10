import { EChartsOption } from 'echarts';

export const priorityChartOption: EChartsOption = {
  tooltip: {
    show: true,
    trigger: 'item',
  },
  legend: {
    top: '', left: 'center',
  },
  color: ['#E1AEAE', '#FFE68E', '#649869'],
  series: [{
    name: 'Tasks by status',
    type: 'pie',
    radius: ['80%', '60%'],
    avoidLabelOverlap: true,
    padAngle: 5,
    itemStyle: {
      borderRadius: 10,
    },
    label: {
      show: false, position: 'center',
    },
    emphasis: {
      label: {
        show: true, fontSize: '1rem', fontWeight: 'bolder',
      },
    },
    labelLine: {
      show: false,
    },
    data: [],
  }],
};
