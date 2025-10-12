"use client"

import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react";
import useLocalStorageManager from "@/hooks/useLocalStorageManager";
import { StatItem } from "../home/page";
import { AlertCircle } from "lucide-react";

interface Props {
  title: string;
  chartData: object[];
  chartConfig: ChartConfig;
}

const ChartPieLabel = ({title, chartData, chartConfig}: Props) => {

  const [data, setData] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const {getItem} = useLocalStorageManager();

  const fetchData = async () => {
    const endpoint = title === "Devices" ?
                    "http://localhost:8080/api/v1/analytics/user/me/device-type" :
                    "http://localhost:8080/api/v1/analytics/user/me/os";

    setIsLoading(true);
  try {
    // API call
    const result = await fetch(endpoint, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getItem('accessToken')}`
      },
    });

    if (!result.ok) {
      if (result.status === 401) {
        setErrors(["unauthorized"])
        // setData([]);
      }
      else {
        setErrors(["Error, please try again!"]);
        // setData([]);
      }
      return
    }

    const body = await result.json();

    setData(body);

  
    } catch (err) {
      setErrors(["An error occurred, try again"])
      // setData([]);
    } finally {
      setIsLoading(false)
    }
};

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="flex flex-col">
      {errors.length > 0 ? 
      (<div className='rounded-xl w-full h-[250px] mb-6 bg-red-50 dark:bg-red-900/40 flex flex-col gap-2 items-center justify-center'>
        <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        {errors.map((error, index) => (
          <div key={index} className='text-base text-red-800 dark:text-red-300'>
            {error}
          </div>
        ))}
      </div>) : (<div className="flex-1 mb-6">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </div>)}
      <div className="text-muted-foreground text-center">
        {title}
      </div>
    </div>
  )
}

export default ChartPieLabel;