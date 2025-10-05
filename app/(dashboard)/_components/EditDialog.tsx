import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ShortLink } from "../links/page";

interface Props {
    link: ShortLink;
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    onSave: (id: number, formData: any) => Promise<void>;
}

const EditDialog = ({ link, open, onOpenChange, onSave }: Props) => {
  const [formData, setFormData] = useState({
    name: link?.name || '',
    description: link?.description || '',
    isActive: link?.active,
  });

  useEffect(() => {
    if (link) {
      setFormData({
        name: link.name,
        description: link.description,
        isActive: link.active,
      });
    }
  }, [link]);

  const handleSave = () => {
    onSave(link.id, formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] rounded-xl border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Short Link</DialogTitle>
          <DialogDescription>
            Update the details of your short link.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 mb-10">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <Checkbox
              className='cursor-pointer border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] h-5 w-5'
              id="active"
              checked={formData.isActive}
              onCheckedChange={() => setFormData({ ...formData, isActive: !formData.isActive })}
            />
            <Label htmlFor="active" className="cursor-pointer">Active</Label>
          </div>
        </div>
        <DialogFooter>
          <div onClick={() => onOpenChange(false)}>
            <Button 
              title="Cancel"
              version="outline"
            />
          </div>
          <div onClick={handleSave}>
            <Button 
              title="Save changes"
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;