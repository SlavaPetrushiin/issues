
'use client';

import { Card } from '@radix-ui/themes';
import { FunctionComponent } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface IChartSummaryProps {
	closed: number;
	open: number;
	inProgress: number;
}

const ChartSummary: FunctionComponent<IChartSummaryProps> = ({ closed, inProgress, open }) => {
  const data = [
    { label: 'Open', value: open || 0 },
    { label: 'In Progress', value: inProgress || 0 },
    { label: 'Closed', value: closed  || 0},
  ];

	return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
	)
}

export default ChartSummary