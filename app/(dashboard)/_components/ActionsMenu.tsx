import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, Edit, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShortLink } from '../links/page';

interface Props  {
    link: ShortLink;
    onDelete: (link: ShortLink) => void;
    onEdit: (link: ShortLink) => void;
    onCopy: (link: ShortLink) => void;
}

const ActionsMenu = ({ link, onDelete, onEdit, onCopy }: Props) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className='cursor-pointer'>
        <MoreHorizontal className="h-5 w-5" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => onCopy(link)}>
        <Copy className="mr-2 h-4 w-4" />
        Copy shortlink
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onEdit(link)}>
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onDelete(link)} className="text-red-600">
        <Trash2 className="text-red-600 mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ActionsMenu;