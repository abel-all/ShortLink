'use client'

import React, { useState, useEffect } from 'react';
import { Search, Check, Trash2, AlertCircle } from 'lucide-react';
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
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import TableSkeleton from '../_components/TableSkeleton';
import EditDialog from '../_components/EditDialog';
import ActionsMenu from '../_components/ActionsMenu';
import PaginationControls from '../_components/PaginationControls';
import CreateNewLink from '../_components/CreateNewLink';
import useLocalStorageManager from '@/hooks/useLocalStorageManager';


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

export interface formDataType {
  description: string;
  name: string;
  isActive: boolean;
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
  const [errors, setErrors] = useState<string[]>([]);
  const [editErrors, setEditErrors] = useState<string[]>([]);
  const [deleteErrors, setDeleteErrors] = useState<string[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    pageNo: 0,
    pageSize: 4,
    totalElements: 0,
    totalPages: 0,
  });

  const { getItem } = useLocalStorageManager();
  

  // Fetch data
  const fetchLinks = async (pageNo: number, pageSize: number) => {
    setLoading(true);
    try {
      const result = await fetch(`http://localhost:8080/api/v1/users/me/short-link/all?pageSize=${pageSize}&pageNo=${pageNo}`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${getItem('accessToken')}`
        },
      });

      if (!result.ok) {
        setErrors(["Error fetching links, please try again"]);
        return
      }

      const body = await result.json();
      
      const data = body.data;

      setLinks(data);
      setPagination({
        pageNo,
        pageSize,
        totalElements: body.totalElements,
        totalPages: body.totalPages,
      });
    } catch (error) {
      setErrors(['Error fetching links, please try again']);
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
      // API call
      try {
      const result = await fetch(`http://localhost:8080/api/v1/users/me/short-link/delete`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([linkToDelete.id]),
      });

      if (!result.ok) {
        setDeleteErrors(["Error, please try again"]);
        return
      }
      
      setLinks(links.filter(l => l.id !== linkToDelete.id));
      setDeleteDialogOpen(false);
      setLinkToDelete(null);
    } catch (error) {
      setDeleteErrors(['Error, please try again']);}
    // } finally {
    //   setLoading(false);
    // }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLinks.length > 0) {
      // API call
      try {
        const result = await fetch(`http://localhost:8080/api/v1/users/me/short-link/delete`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${getItem('accessToken')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(selectedLinks),
        });

        if (!result.ok) {
          setErrors(["Error, please try again"]);
          return
        }

        setLinks(links.filter(l => !selectedLinks.includes(l.id)));
        setSelectedLinks([]);
      } catch (error) {
        setErrors(['Error, please try again']);}
      // } finally {
      //   setLoading(false);
      // }
    }
  };

  const handleEdit = (link: ShortLink) => {
    setLinkToEdit(link);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (id: number, formData: formDataType) => {
    // API call
    try {
      const result = await fetch(`http://localhost:8080/api/v1/users/me/short-link/${id}/update`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!result.ok) {
        setEditErrors(["Error, please try again"]);
        return
      }

      const body = await result.json();
      
      const data = body.data;
      
      setLinks(links.map(l => 
        l.id === id 
          ? { ...l, name: data.name, description: data.description, active: data.active }
          : l
      ));
      setEditDialogOpen(false);
    } catch (error) {
      setEditErrors(['Error, please try again']);}
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleCopy = (link: ShortLink) => {
    const hostname: string = window.location.hostname;
    const shortLink = `${hostname}:3000/r/${link.linkId}`;
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
    <div className='py-12 px-4 sm:px-6 lg:px-8'>
      <div className="w-full space-y-4">
        <div className="mb-8 sm:mb-10 flex max-md:flex-col gap-2 md:justify-between md:items-center">
          <div>
            <div className="text-4xl font-medium">Links</div>
            <div className="text-lg font-normal opacity-80">Shorten, share, and track your links in seconds.</div>
          </div>
          <CreateNewLink setLinks={setLinks}/>
        </div>
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
              <SelectTrigger className="w-[140px] !h-12 rounded-full px-4 cursor-pointer border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={passwordFilter} onValueChange={setPasswordFilter}>
              <SelectTrigger className="w-[140px] !h-12 rounded-full px-4 cursor-pointer border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]">
                <SelectValue placeholder="Password" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Links</SelectItem>
                <SelectItem value="protected">Protected</SelectItem>
                <SelectItem value="unprotected">Unprotected</SelectItem>
              </SelectContent>
            </Select>

            {selectedLinks.length > 0 && (
              <div onClick={handleBulkDelete}>
                <Button 
                  title={
                    <div className='flex items-center gap-2'>
                    <Trash2 className="h-4 w-4" />
                    Delete Selected (${selectedLinks.length})
                  </div>
                  }
                  version="colored"
                  textColor="bg-red-600 hover:bg-red-700 text-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-lg flex flex-col gap-3">
            {errors.map((error, index) => (
              <div key={index} className='flex items-start gap-3'>
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
              </div>
            ))}
          </div>
        )}

        {/* Table */}
        <div className="rounded-xl border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className='h-12'>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      className='border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] h-5 w-5'
                      checked={selectedLinks.length === filteredLinks.length && filteredLinks.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-lg">Link ID</TableHead>
                  <TableHead className="min-w-[200px] text-lg">Link</TableHead>
                  <TableHead className="text-lg">Name</TableHead>
                  <TableHead className="text-lg">Description</TableHead>
                  <TableHead className="text-lg">Status</TableHead>
                  <TableHead className="text-lg">Password</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableSkeleton />
                ) : filteredLinks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground text-lg">
                      No links found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLinks.map((link) => (
                    <TableRow key={link.id} className='border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]'>
                      <TableCell>
                        <Checkbox
                          className='border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] h-5 w-5'
                          checked={selectedLinks.includes(link.id)}
                          onCheckedChange={() => toggleSelect(link.id)}
                        />
                      </TableCell>
                      <TableCell className="max-w-[100px] truncate text-sm sm:text-base font-light">{link.linkId}</TableCell>
                      <TableCell className="max-w-xs truncate text-sm sm:text-base font-light" title={link.link}>
                        {link.link}
                      </TableCell>
                      <TableCell className="max-w-[100px] truncate text-sm sm:text-base font-light">{link.name}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm sm:text-base font-light">{link.description}</TableCell>
                      <TableCell className="">
                        <span className={`inline-flex items-center rounded-full px-4 py-1 text-sm sm:text-base font-light ${
                          link.active 
                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' 
                            : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                        }`}>
                          {link.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {link.password ? (
                          <span className="inline-flex items-center rounded-full px-4 py-1 text-sm sm:text-base font-light bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
                            Protected
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm sm:text-base font-light">None</span>
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
          <AlertDialogContent className='sm:max-w-[625px] rounded-xl'>
            <AlertDialogHeader className='mb-14'>
              <AlertDialogTitle className="text-xl">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the short link
                {linkToDelete && ` "${linkToDelete.name}"`}.
              </AlertDialogDescription>
              {/* Error Alert */}
              {deleteErrors.length > 0 && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-lg flex flex-col gap-3">
                  {deleteErrors.map((error, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                    </div>
                  ))}
                </div>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div onClick={() => setDeleteDialogOpen(false)}>
                <Button 
                  title="Cancel"
                  version='outline'
                />
              </div>
              <div onClick={() => {
                  setDeleteDialogOpen(false);
                  confirmDelete();
                }}
              >
                <Button 
                  title="Delete"
                  version='colored'
                  textColor='bg-red-600 hover:bg-red-700 text-white'
                />
              </div>
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
            editErrors={editErrors}
          />
        )}

        {/* Copy Notification */}
        {copied && (
          <div className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-green-600 px-4 h-12 text-white">
            <Check className="h-5 w-5" />
            <span>Link copied to clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
}