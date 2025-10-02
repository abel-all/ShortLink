import { Button } from '@/components/ui/button';
import { PaginationData } from '../links/page';

interface Props {
    pagination: PaginationData;
    onPageChange: (newPage: number) => void;
}

const PaginationControls = ({ pagination, onPageChange }: Props) => {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i);
  
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-muted-foreground">
        Showing {pagination.pageNo * pagination.pageSize + 1} to{' '}
        {Math.min((pagination.pageNo + 1) * pagination.pageSize, pagination.totalElements)} of{' '}
        {pagination.totalElements} entries
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.pageNo - 1)}
          disabled={pagination.pageNo === 0}
        >
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {pages.slice(
            Math.max(0, pagination.pageNo - 2),
            Math.min(pagination.totalPages, pagination.pageNo + 3)
          ).map((page) => (
            <Button
              key={page}
              variant={page === pagination.pageNo ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="w-9"
            >
              {page + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.pageNo + 1)}
          disabled={pagination.pageNo >= pagination.totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;