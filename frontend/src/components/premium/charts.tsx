import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import ReactEChartsCore from 'echarts-for-react/lib/core';

// Import core echarts modules
import * as echartsCore from 'echarts/core';
import { BarChart, LineChart, PieChart, ScatterChart, RadarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// Register required components
echartsCore.use([
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  TransformComponent,
  CanvasRenderer,
]);

interface ChartProps {
  option: any;
  height?: string;
  width?: string;
  className?: string;
  loading?: boolean;
}

export function LineChartComponent({ option, height = '400px', width = '100%', className = '', loading = false }: ChartProps) {
  return (
    <ReactEChartsCore
      echarts={echartsCore}
      option={option}
      style={{ height, width }}
      className={className}
      showLoading={loading}
    />
  );
}

export function BarChartComponent({ option, height = '400px', width = '100%', className = '', loading = false }: ChartProps) {
  return (
    <ReactEChartsCore
      echarts={echartsCore}
      option={option}
      style={{ height, width }}
      className={className}
      showLoading={loading}
    />
  );
}

export function PieChartComponent({ option, height = '400px', width = '100%', className = '', loading = false }: ChartProps) {
  return (
    <ReactEChartsCore
      echarts={echartsCore}
      option={option}
      style={{ height, width }}
      className={className}
      showLoading={loading}
    />
  );
}

export function ScatterChartComponent({ option, height = '400px', width = '100%', className = '', loading = false }: ChartProps) {
  return (
    <ReactEChartsCore
      echarts={echartsCore}
      option={option}
      style={{ height, width }}
      className={className}
      showLoading={loading}
    />
  );
}

export function RadarChartComponent({ option, height = '400px', width = '100%', className = '', loading = false }: ChartProps) {
  return (
    <ReactEChartsCore
      echarts={echartsCore}
      option={option}
      style={{ height, width }}
      className={className}
      showLoading={loading}
    />
  );
}

// Preset chart options
export const chartPresets = {
  line: (data: number[], labels: string[]) => ({
    xAxis: {
      type: 'category',
      data: labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data,
        type: 'line',
        smooth: true,
      },
    ],
  }),

  bar: (data: number[], labels: string[]) => ({
    xAxis: {
      type: 'category',
      data: labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data,
        type: 'bar',
      },
    ],
  }),

  pie: (data: Array<{ name: string; value: number }>) => ({
    series: [
      {
        type: 'pie',
        radius: '50%',
        data,
      },
    ],
  }),

  scatter: (data: Array<[number, number]>) => ({
    xAxis: {},
    yAxis: {},
    series: [
      {
        type: 'scatter',
        data,
      },
    ],
  }),
};
