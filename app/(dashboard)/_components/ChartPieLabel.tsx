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
import { AlertCircle, Telescope } from "lucide-react";

interface Props {
  title: string;
}

const ChartPieLabel = ({title}: Props) => {
  const [data, setData] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const {getItem} = useLocalStorageManager();

  const fetchData = async () => {
    const endpoint = title === "Devices" ?
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/user/me/device-type` :
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/user/me/os`;

    setIsLoading(true);
    try {
      const result = await fetch(endpoint, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getItem('accessToken')}`
        },
      });

      if (!result.ok) {
        if (result.status === 401) {
          setErrors(["unauthorized"]);
        } else {
          setErrors(["Error, please try again!"]);
        }
        return;
      }

      const body = await result.json();
      setData(body);
    } catch (err) {
      setErrors(["An error occurred, try again"]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const blueColors = [
    { light: 'hsl(217, 91%, 60%)', dark: 'hsl(217, 91%, 70%)' },  
    { light: 'hsl(210, 100%, 50%)', dark: 'hsl(210, 100%, 65%)' },
    { light: 'hsl(199, 89%, 48%)', dark: 'hsl(199, 89%, 63%)' },  
    { light: 'hsl(214, 95%, 36%)', dark: 'hsl(214, 95%, 55%)' },  
    { light: 'hsl(221, 83%, 53%)', dark: 'hsl(221, 83%, 68%)' },  
  ];
  
  const chartData = data.map((item) => ({
    name: item.key,
    visitors: item.count,
    fill: `var(--color-${item.key.toLowerCase().replace(/\s+/g, '-')})`
  }));
  
  const chartConfig: ChartConfig = {
    visitors: {
      label: "Visits",
    },
    ...data.reduce((acc, item, index) => {
      const colorIndex = index % blueColors.length;
      acc[item.key.toLowerCase().replace(/\s+/g, '-')] = {
        label: item.key,
        theme: {
          light: blueColors[colorIndex].light,
          dark: blueColors[colorIndex].dark,
        }
      };
      return acc;
    }, {} as ChartConfig)
  };

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
        </div>) : data.length > 0 ?
        (<div className="flex-1 mb-6">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie 
                data={chartData} 
                dataKey="visitors" 
                nameKey="name"
                label 
              />
            </PieChart>
          </ChartContainer>
        </div>) : (<div className=" h-[150px] flex flex-col items-center justify-center gap-2 opacity-80">
          <Telescope size={30}/>
          <p className="text-lg font-medium">No {title} founded</p>
        </div>)
      }
      <div className="text-muted-foreground text-center">
        {title}
      </div>
    </div>
  );
};

export default ChartPieLabel;