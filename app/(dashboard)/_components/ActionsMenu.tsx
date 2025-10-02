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
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
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
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ActionsMenu;