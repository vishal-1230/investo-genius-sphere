
import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export type ChartType = 'line' | 'area' | 'bar' | 'pie';

interface ChartProps {
  data: any[];
  type: ChartType;
  height?: number;
  dataKey: string;
  xAxisKey?: string;
  colors?: string[];
  showGrid?: boolean;
  animate?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ChartComponent: React.FC<ChartProps> = ({
  data,
  type,
  height = 300,
  dataKey,
  xAxisKey = 'name',
  colors = ['#0088FE'],
  showGrid = true,
  animate = true,
}) => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (animate) {
      // Animate data loading
      const timer = setTimeout(() => {
        setChartData(data);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setChartData(data);
    }
  }, [data, animate]);

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: 'none'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }}
              animationDuration={1500}
            />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: 'none'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              fill={`${colors[0]}20`}
              strokeWidth={2}
              animationDuration={1500}
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: 'none'
              }} 
            />
            <Bar 
              dataKey={dataKey} 
              fill={colors[0]} 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length] || COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: 'none'
              }} 
            />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-4">
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
