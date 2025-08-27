/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStatsParcelsQuery } from "@/redux/features/admin/admin.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { handleLoadingError } from "@/utils/ErrorHandle";

export default function Analytics() {
  const { data, isLoading, isError } = useStatsParcelsQuery(undefined);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            {payload[0].name}:{" "}
            <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const loadingErrorUI = handleLoadingError(isLoading, isError);
  if (loadingErrorUI) return loadingErrorUI;

  if (!data || !data.data)
    return <p className="text-center py-8">No data found</p>;

  const COLORS = ["#4ade80", "#fbbf24", "#60a5fa", "#f87171", "#a78bfa"];

  // Pie chart data (statusDistribution)
  const statusData = data.data.statusDistribution.map((item: any) => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
  }));

  // Bar chart data (monthlyShipments)
  const shipmentsData = data.data.monthlyShipments.map((item: any) => ({
    name: `${item._id.month}/${item._id.year}`,
    delivered: item.deliveredParcels,
  }));

  // Parcel trends (createdAt)
  const trendsData = data.data.parcelTrends.map((item: any) => ({
    name: `${item._id.month}/${item._id.year}`,
    total: item.totalParcels,
  }));

  return (
    <div className="container mx-auto space-y-6 font-mono">
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold text-center text-gray-600 dark:text-gray-400">
          Overview of parcel delivery performance
        </h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 font-semibold ">
        <Card className="bg-white dark:bg-gray-700 shadow-md border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-50">
              Total Parcels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.data.totalParcel}</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-700 shadow-md border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-50">
              Delivered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {data.data.delivered}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-700 shadow-md border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-50">
              In Transit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {data.data.inTransit}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-700 shadow-md border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-50">
              Requested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              {data.data.requested}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-700 shadow-md border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-50">
              Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {data.data.cancelled}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart - Status Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(Number(percent) * 100).toFixed(0)}%)`
                  }
                  labelLine={false}
                >
                  {statusData.map((index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  contentStyle={{
                    backgroundColor: "hsl(222.2 84% 4.9%)",
                    border: "1px solid hsl(217.2 32.6% 17.5%)",
                    borderRadius: "6px",
                    color: "hsl(210 40% 98%)",
                  }}
                />
                <Legend
                  wrapperStyle={{ color: "hsl(210 40% 98%)", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - Monthly Shipments */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Monthly Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={shipmentsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(217.2 32.6% 17.5%)"
                />
                <XAxis
                  dataKey="name"
                  stroke="hsl(214.3 31.8% 91.4%)"
                  fontSize={12}
                />
                <YAxis stroke="hsl(214.3 31.8% 91.4%)" fontSize={12} />
                <Tooltip
                  content={<CustomTooltip />}
                  contentStyle={{
                    backgroundColor: "hsl(222.2 84% 4.9%)",
                    border: "1px solid hsl(217.2 32.6% 17.5%)",
                    borderRadius: "6px",
                    color: "hsl(210 40% 98%)",
                  }}
                />
                <Bar
                  dataKey="delivered"
                  fill="#4ade80"
                  name="Delivered Parcels"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart - Parcel Trends */}
      <Card className="bg-card border-border mb-10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Parcel Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={trendsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(217.2 32.6% 17.5%)"
              />
              <XAxis
                dataKey="name"
                stroke="hsl(214.3 31.8% 91.4%)"
                fontSize={12}
              />
              <YAxis stroke="hsl(214.3 31.8% 91.4%)" fontSize={12} />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{
                  backgroundColor: "hsl(222.2 84% 4.9%)",
                  border: "1px solid hsl(217.2 32.6% 17.5%)",
                  borderRadius: "6px",
                  color: "hsl(210 40% 98%)",
                }}
              />
              <Bar
                dataKey="total"
                fill="#60a5fa"
                name="Total Parcels"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
