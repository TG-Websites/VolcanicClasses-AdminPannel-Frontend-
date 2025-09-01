import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function MonthlySalesChart() {
  const { data } = useSelector((state: RootState) => state.adminDashboard);
  console.log("Hello", data);

  const options: ApexOptions = {
    colors: ["#ef4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: {
      categories: [...(data?.chartData?.yearly?.labels || [])], // spread → new array
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: { title: { text: undefined } },
    grid: {
      yaxis: { lines: { show: true } },
    },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: true }, // ✅ show month (Jan, Feb…)
      y: { formatter: (val: number) => `${val}` },
    },
  };

  // ✅ get yearly orders data
  const series = data?.chartData?.yearly?.series
  ? data.chartData.yearly.series.map((s) => ({ ...s, data: [...s.data] }))
  : [];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          monthly Course Purchased
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          {series.length >= 0 ? (
            <Chart options={options} series={series} type="bar" height={180} />
          ) : (
            <p className="text-gray-500 text-center">No chart data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
