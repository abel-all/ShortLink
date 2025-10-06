"use client"

import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface Props {
  title: string;
  chartData: object[];
  chartConfig: ChartConfig;
}

const ChartPieLabel = ({title, chartData, chartConfig}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 mb-6">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </div>
      <div className="text-muted-foreground text-center">
        {title}
      </div>
    </div>
  )
}

export default ChartPieLabel;