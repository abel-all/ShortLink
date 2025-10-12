import React, { useState } from 'react'
import Button from '@/components/Button'
import { Plus, Copy, Check, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useLocalStorageManager from '@/hooks/useLocalStorageManager'
import { ShortLink } from '../links/page'

interface LinkFormData {
  link: string
  description: string
  name: string
  password: string | null
}

interface ApiResponse {
  id: number
  linkId: string
  link: string
  expirationDate: string
  name: string
  description: string
  password: string
  active: boolean
}

const CreateNewLink = ({setLinks}: {setLinks: React.Dispatch<React.SetStateAction<ShortLink[]>>}) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [createdLink, setCreatedLink] = useState<ApiResponse | null>(null)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState<LinkFormData>({
    link: '',
    description: '',
    name: '',
    password: null,
  })

  const { getItem } = useLocalStorageManager();

  const handleInputChange = (field: keyof LinkFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors([])
  }

  const validateForm = (): boolean => {
    if (!formData.link.trim()) {
      setErrors(['Link is required'])
      return false
    }
    if (!formData.description.trim()) {
      setErrors(['Description is required'])
      return false
    }
    if (!formData.name.trim()) {
      setErrors(['Name is required'])
      return false
    }
    return true
  }

  const handleCreate = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setErrors([])

    try {
      // API call
      const result = await fetch("http://localhost:8080/api/v1/users/me/short-link/create", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getItem('accessToken')}`
        },
        body: JSON.stringify(formData),
      });

      if (!result.ok) {
        if (result.status === 401) {
          setErrors(["unauthorized"])
          return
        }
      }

      const body = await result.json();
      if (body.message !== "OK") {
        setErrors(Object.values(body.errors));
      } else {
        setLinks(prev => [...prev, body.data])
        setCreatedLink(body.data)
      }

    } catch (err) {
      setErrors(["An error occurred, try again"])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (createdLink) {
      const hostname: string = window.location.hostname;
      await navigator.clipboard.writeText(`${hostname}:3000/r/${createdLink.linkId}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ link: '', description: '', name: '', password: null })
        setCreatedLink(null)
        setErrors([])
        setCopied(false)
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <div>
          <Button
            title={
              <div className='flex justify-center items-center gap-2'>
                <Plus className='w-5 h-5' />
                Create new Link
              </div>
            }
          />
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[625px] rounded-xl border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]'>
        <DialogHeader>
          <DialogTitle className='text-xl'>
            {createdLink ? 'Link Created Successfully!' : 'Create New Link'}
          </DialogTitle>
          <DialogDescription>
            {createdLink
              ? 'Your link has been created. Copy the link ID below.'
              : 'Fill in the details to create a new link.'}
          </DialogDescription>
        </DialogHeader>

        {!createdLink ? (
          <div className='grid gap-6 py-4 mb-10'>
            <div className='grid gap-2'>
              <Label htmlFor='link'>
                Link <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='link'
                placeholder='https://example.com'
                value={formData.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='name'>
                Name <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='name'
                placeholder='My Link'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='description'>
                Description <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='description'
                placeholder='Enter description'
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='password'>
                Password <span className='opacity-70 text-sm'>(optional)</span>
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter password (optional)'
                value={formData.password ?? ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </div>

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

            <div
              onClick={handleCreate}
              className='-mb-11 mt-12'
            >
              <Button
                title={isLoading ? 'Creating...' : 'Create Link'}
                disabled={isLoading}
                wfull='w-full disabled:opacity-50 disabled:cursor-not-allowed'
              />
            </div>

          </div>
        ) : (
          <div className='space-y-4 mt-4'>
            <div className='mb-12 border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] p-4 rounded-lg space-y-4'>
              <div>
                <p className='text-sm mb-2'>Your link</p>
                <div className='flex items-center gap-2'>
                  <code className='flex-1 border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] px-3 py-2 rounded text-sm break-all'>
                    {createdLink.linkId}
                  </code>
                  <button
                    onClick={handleCopy}
                    className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors'
                    title='Copy to clipboard'
                  >
                    {copied ? (
                      <Check className='w-5 h-5 text-green-600 dark:text-green-400' />
                    ) : (
                      <Copy className='cursor-pointer w-5 h-5 text-gray-600 dark:text-gray-400' />
                    )}
                  </button>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]'>
                <div>
                  <p className='text-xs opacity-70'>Name</p>
                  <p className='text-sm font-medium'>{createdLink.name}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500 dark:text-gray-500'>Status</p>
                  <p className='text-sm text-green-600 dark:text-green-400 font-medium'>Active</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleClose(false)}
            >
              <Button 
                title="Close"
                wfull='w-full'
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewLink