import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Telescope } from 'lucide-react';

interface CountryVisitor {
  country: string;
  visitors: number;
}

const countryNameToFlag = (countryName: string): string => {
  const countryCodes: { [key: string]: string } = {
    'United States': 'US',
    'United Kingdom': 'GB',
    'Germany': 'DE',
    'France': 'FR',
    'Canada': 'CA',
    'Australia': 'AU',
    'Japan': 'JP',
    'Brazil': 'BR',
    'India': 'IN',
    'Spain': 'ES',
    'Italy': 'IT',
    'Netherlands': 'NL',
    'Mexico': 'MX',
    'South Korea': 'KR',
    'Russia': 'RU',
    'Switzerland': 'CH',
    'Sweden': 'SE',
    'Poland': 'PL',
    'Belgium': 'BE',
    'Argentina': 'AR',
  };

  const code = countryCodes[countryName];
  if (!code) return '🏳️';

  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Simulated API call
const fetchCountryVisitors = (): Promise<CountryVisitor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: CountryVisitor[] = [
        { country: 'United States', visitors: 45230 },
        { country: 'United Kingdom', visitors: 28450 },
        { country: 'Germany', visitors: 19800 },
        { country: 'France', visitors: 15670 },
        { country: 'Canada', visitors: 12340 },
        { country: 'Australia', visitors: 9850 },
        { country: 'Japan', visitors: 8670 },
        { country: 'Brazil', visitors: 4340 },
        { country: 'India', visitors: 3890 },
        { country: 'Spain', visitors: 3250 },
        { country: 'Italy', visitors: 2980 },
        { country: 'Netherlands', visitors: 2650 },
        { country: 'Mexico', visitors: 2340 },
        { country: 'South Korea', visitors: 2120 },
        { country: 'Russia', visitors: 1890 },
        { country: 'Switzerland', visitors: 1670 },
        { country: 'Sweden', visitors: 1450 },
        { country: 'Poland', visitors: 1280 },
        { country: 'Belgium', visitors: 1120 },
        { country: 'Morocco', visitors: 980 },
      ]
      .sort((a, b) => b.visitors - a.visitors);
      
      // Uncomment to test empty state
      // resolve([]);
      
      resolve(data);
    }, 1500);
  });
};

const TableSkeleton = () => {
  return (
    <>
      {[...Array(10)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-5 w-8" />
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-5 w-32" />
            </div>
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-5 w-20 ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

const CountryVisitorsTable = () => {
  const [data, setData] = useState<CountryVisitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchCountryVisitors();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="max-h-[540px] overflow-y-auto px-6">
        <Table>
          <TableHeader>
            <TableRow className='text-lg font-medium h-14'>
              <TableHead className="w-[60px] md:w-[80px]">Rank</TableHead>
              <TableHead className="min-w-[180px]">Country</TableHead>
              <TableHead className="text-right min-w-[120px]">Visitors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 opacity-80">
                    <Telescope size={30}/>
                    <p className="text-lg font-medium">No visitor data available</p>
                    <p className="text-sm">Please check back later</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow 
                  key={item.country} 
                  className="hover:bg-blue-50/30 dark:hover:bg-blue-50/10 transition-colors border-gray-200 dark:border-gray-800"
                >
                  <TableCell className="text-base font-light">
                    #{index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-xl md:text-2xl">{countryNameToFlag(item.country)}</span>
                      <span className="text-sm md:text-base font-light">{item.country}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-normal text-sm md:text-base">
                    {formatNumber(item.visitors)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CountryVisitorsTable;