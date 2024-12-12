"use client"

import { Bar, BarChart, CartesianGrid, XAxis  } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"


const chartData = [
  { month: "Jan", Doanh_thu: 186, Loi_nhuan: 80 },
  { month: "Feb", Doanh_thu: 305, Loi_nhuan: 200 },
  { month: "Mar", Doanh_thu: 237, Loi_nhuan: 120 },
  { month: "Apr", Doanh_thu: 73, Loi_nhuan: 190 },
  { month: "May", Doanh_thu: 209, Loi_nhuan: 130 },
  { month: "Jun", Doanh_thu: 214, Loi_nhuan: 140 },
]

const chartConfig = {
  Doanh_thu: {
    label: "Doanh thu",
    color: "hsl(var(--chart-1))",
  },
  Loi_nhuan: {
    label: "Lợi nhuận",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Chart() {
  return (
    
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
      <CartesianGrid vertical={false} />
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Doanh_thu" fill="var(--color-Doanh_thu)" radius={4} />
        <Bar dataKey="Loi_nhuan" fill="var(--color-Loi_nhuan)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

  