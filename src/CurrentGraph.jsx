import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CurrentGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="currentSpeed" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="currentStrength" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CurrentGraph;
