import Button from '@/components/Button';
import { PaginationData } from '../links/page';

interface Props {
    pagination: PaginationData;
    onPageChange: (newPage: number) => void;
}

const PaginationControls = ({ pagination, onPageChange }: Props) => {
  
  return (
    <div className="flex items-center justify-between max-lg:flex-col gap-6 px-2 py-4">
      <div className="text-sm sm:text-base text-muted-foreground">
        Showing {pagination.pageNo * pagination.pageSize + 1} to{' '}
        {Math.min((pagination.pageNo + 1) * pagination.pageSize, pagination.totalElements)} of{' '}
        {pagination.totalElements} entries
      </div>
      <div className="flex items-center space-x-2">
        <div
          onClick={() => onPageChange(pagination.pageNo - 1)}
        >
          <Button 
            title="Previous"
            disabled={pagination.pageNo === 0}
            version="outline"
            wfull='w-36'
          />
        </div>
        <div
          onClick={() => onPageChange(pagination.pageNo + 1)}
        >
          <Button 
            title="Next"
            disabled={pagination.pageNo >= pagination.totalPages - 1}
            version="outline"
            wfull='w-36'
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;