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
import { formDataType, ShortLink } from "../links/page";
import { AlertCircle } from "lucide-react";

interface Props {
    link: ShortLink;
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    onSave: (id: number, formData: formDataType) => Promise<void>;
    editErrors: string[];
}

const EditDialog = ({ link, open, onOpenChange, onSave, editErrors }: Props) => {
  const [formData, setFormData] = useState<formDataType>({
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
          {editErrors.length > 0 && (
            <div className="mt-2 p-4 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-lg flex flex-col gap-3">
              {editErrors.map((error, index) => (
                <div key={index} className='flex items-start gap-3'>
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                </div>
              ))}
            </div>
          )}
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