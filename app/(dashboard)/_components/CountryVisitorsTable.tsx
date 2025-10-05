import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

const dummyData: CountryVisitor[] = [
  { country: 'United States', visitors: 45230 },
  { country: 'United Kingdom', visitors: 28450 },
  { country: 'Germany', visitors: 19800 },
  { country: 'France', visitors: 15670 },
  { country: 'Canada', visitors: 12340 },
  { country: 'Australia', visitors: 9850 },
  { country: 'Japan', visitors: 670 },
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
  { country: 'Argentina', visitors: 980 },
].sort((a, b) => b.visitors - a.visitors);

const CountryVisitorsTable = () => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const totalVisitors = dummyData.reduce((sum, item) => sum + item.visitors, 0);

  return (
    <div className="rounded-xl border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] overflow-hidden">
      <div className="max-h-[540px] overflow-y-auto no-scrollbar px-6">
        <Table>
          <TableHeader>
            <TableRow className='text-lg font-medium h-14'>
              <TableHead className="w-[60px] md:w-[80px]">Rank</TableHead>
              <TableHead className="min-w-[180px]">Country</TableHead>
              <TableHead className="text-right min-w-[120px]">Visitors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((item, index) => (
              <TableRow 
                key={item.country} 
                className={`hover:bg-blue-50/30 dark:hover:bg-blue-50/10 transition-colors border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]`}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CountryVisitorsTable;