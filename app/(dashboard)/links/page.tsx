'use client'

import React, { useState, useEffect } from 'react';
import { Search, Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import TableSkeleton from '../_components/TableSkeleton';
import EditDialog from '../_components/EditDialog';
import ActionsMenu from '../_components/ActionsMenu';
import PaginationControls from '../_components/PaginationControls';


// Types
export interface ShortLink {
  id: number;
  linkId: string;
  link: string;
  expirationDate: string | null;
  name: string;
  description: string;
  password: string | null;
  active: boolean;
}

export interface PaginationData {
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export default function ShortLinksDataTable() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<ShortLink | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [linkToEdit, setLinkToEdit] = useState<ShortLink | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [passwordFilter, setPasswordFilter] = useState<string>('all');
  const [pagination, setPagination] = useState<PaginationData>({
    pageNo: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
  });

  // Fetch data
  const fetchLinks = async (pageNo: number, pageSize: number) => {
    setLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        linkId: `${Math.random().toString(36).substr(2, 8)}`,
        link: `https://example.com/link${i + 1}`,
        expirationDate: i % 3 === 0 ? '2025-12-31T23:59:59Z' : null,
        name: `Link ${i + 1}`,
        description: `Description ${i + 1}`,
        password: i % 2 === 0 ? null : 'protected',
        active: i % 3 !== 0,
      }));

      const start = pageNo * pageSize;
      const end = start + pageSize;
      const paginatedData = mockData.slice(start, end);

      setLinks(paginatedData);
      setPagination({
        pageNo,
        pageSize,
        totalElements: mockData.length,
        totalPages: Math.ceil(mockData.length / pageSize),
      });
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks(pagination.pageNo, pagination.pageSize);
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchLinks(newPage, pagination.pageSize);
  };

  const handleDelete = (link: ShortLink) => {
    setLinkToDelete(link);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (linkToDelete) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setLinks(links.filter(l => l.id !== linkToDelete.id));
      setDeleteDialogOpen(false);
      setLinkToDelete(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLinks.length > 0) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setLinks(links.filter(l => !selectedLinks.includes(l.id)));
      setSelectedLinks([]);
    }
  };

  const handleEdit = (link: ShortLink) => {
    setLinkToEdit(link);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (id: number, formData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setLinks(links.map(l => 
      l.id === id 
        ? { ...l, name: formData.name, description: formData.description, active: formData.isActive }
        : l
    ));
    setEditDialogOpen(false);
  };

  const handleCopy = (link: ShortLink) => {
    const shortLink = `https://short.link/${link.linkId}`;
    navigator.clipboard.writeText(shortLink);
    setCopied(link.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleSelectAll = () => {
    if (selectedLinks.length === filteredLinks.length) {
      setSelectedLinks([]);
    } else {
      setSelectedLinks(filteredLinks.map(l => l.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedLinks(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Filtering
  const filteredLinks = links.filter(link => {
    const matchesSearch = 
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.linkId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesActive = 
      activeFilter === 'all' ||
      (activeFilter === 'active' && link.active) ||
      (activeFilter === 'inactive' && !link.active);
    
    const matchesPassword = 
      passwordFilter === 'all' ||
      (passwordFilter === 'protected' && link.password !== null) ||
      (passwordFilter === 'unprotected' && link.password === null);

    return matchesSearch && matchesActive && matchesPassword;
  });

  return (
    <div className="w-full space-y-4 p-4">
      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or link ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={activeFilter} onValueChange={setActiveFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={passwordFilter} onValueChange={setPasswordFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Password" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Links</SelectItem>
              <SelectItem value="protected">Protected</SelectItem>
              <SelectItem value="unprotected">Unprotected</SelectItem>
            </SelectContent>
          </Select>

          {selectedLinks.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              Delete Selected ({selectedLinks.length})
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedLinks.length === filteredLinks.length && filteredLinks.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Link ID</TableHead>
                <TableHead className="min-w-[200px]">Link</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Password</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableSkeleton />
              ) : filteredLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No links found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedLinks.includes(link.id)}
                        onCheckedChange={() => toggleSelect(link.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">{link.linkId}</TableCell>
                    <TableCell className="max-w-xs truncate" title={link.link}>
                      {link.link}
                    </TableCell>
                    <TableCell className="max-w-[100px] truncate">{link.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{link.description}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        link.active 
                          ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' 
                          : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                      }`}>
                        {link.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {link.password ? (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
                          Protected
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <ActionsMenu
                        link={link}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onCopy={handleCopy}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {!loading && filteredLinks.length > 0 && (
        <PaginationControls pagination={pagination} onPageChange={handlePageChange} />
      )}

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the short link
              {linkToDelete && ` "${linkToDelete.name}"`}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      {linkToEdit && (
        <EditDialog
          link={linkToEdit}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={handleSaveEdit}
        />
      )}

      {/* Copy Notification */}
      {copied && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg">
          <Check className="h-4 w-4" />
          <span>Link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}