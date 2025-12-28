"Use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReChart = ({data}) => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSales" fill="#8884d8" name="Total Sales" />
          <Bar dataKey="totalItems" fill="#82ca9d" name="Items Sold" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ReChart