import Button from '@/components/Button';
import { PaginationData } from '../links/page';

interface Props {
    pagination: PaginationData;
    onPageChange: (newPage: number) => void;
}

const PaginationControls = ({ pagination, onPageChange }: Props) => {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i);
  
  return (
    <div className="flex items-center justify-between px-2 py-4">
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
          />
        </div>
        <div className="flex items-center gap-1">
          {pages.slice(
            Math.max(0, pagination.pageNo - 2),
            Math.min(pagination.totalPages, pagination.pageNo + 3)
          ).map((page) => (
            <div
              key={page}
              onClick={() => onPageChange(page)}
            >
              <Button 
                title={page + 1}
                version={page === pagination.pageNo ? 'colored' : 'outline'}
                textColor='bg-foreground text-background'
              />
            </div>
          ))}
        </div>
        <div
          onClick={() => onPageChange(pagination.pageNo + 1)}
        >
          <Button 
            title="Next"
            disabled={pagination.pageNo >= pagination.totalPages - 1}
            version="outline"
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;