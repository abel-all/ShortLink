'use client'

import React, { useState } from 'react';
import { User, Mail, Lock, Trash2, Save, AlertCircle, Check, Loader2 } from 'lucide-react';
import Button from '@/components/Button';
import useLocalStorageManager from '@/hooks/useLocalStorageManager';
import useUser from '@/context/UserContext';
import { useRouter } from 'next/navigation';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
}

const SettingsPage = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com'
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { getItem } = useLocalStorageManager();
  const { addUserInfo } = useUser();

  const router = useRouter();

  const simulateApiCall = (duration: number = 1500): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, duration));
  };

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('personal');
    setErrors([]);
    setSuccess(null);

    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me/update-info`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getItem('accessToken')}`
        },
        body: JSON.stringify(personalInfo),
      });
      
      if (!result.ok) {
        if (result.status === 401) {
          setErrors(["unauthorized"])
          return
        }
      }
      const body = await result.json();
      if (body.message !== "OK") setErrors(Object.values(body.errors));
      
      addUserInfo(body.data);

      setSuccess('personal');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setErrors(['Failed to update personal information']);
    } finally {
      setLoading(null);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('password');
    setErrors([]);
    setSuccess(null);

    if (!passwords.oldPassword || !passwords.newPassword) {
      setErrors(['Please fill in both password fields']);
      setLoading(null);
      return;
    }

    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me/update-password`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getItem('accessToken')}`
        },
        body: JSON.stringify(passwords),
      });
      
      if (!result.ok) {
        if (result.status === 401) {
          setErrors(["unauthorized"])
          return
        }
        const body = await result.json();
        setErrors(Object.values(body.errors))
      }

      setPasswords({ oldPassword: '', newPassword: '' });
      setSuccess('password');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setErrors(['Failed to change password']);
    } finally {
      setLoading(null);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading('delete');
    setErrors([]);

    try {
      // Simulate API call
      await simulateApiCall(2000);
      
      console.log('Sending account deletion request to backend');
      setSuccess('delete');
      router.push("/");
    } catch (err) {
      setErrors(['Failed to delete account']);
    } finally {
      setLoading(null);
      setShowDeleteConfirm(false);
    }
  };

  return (
      <div className="max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-4xl font-medium">
            Settings
          </h1>
          <p className="text-lg font-normal opacity-80">
            Manage your account settings and preferences
          </p>
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

        {/* Section 1: Personal Information */}
        <section className="border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] rounded-xl p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-medium">
              Personal Information
            </div>
          </div>

          <form onSubmit={handlePersonalInfoSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  value={personalInfo.firstName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                  className="w-full px-4 rounded-full h-12 placeholder-gray-600 dark:placeholder-gray-400 border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  value={personalInfo.lastName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                  className="w-full px-4 rounded-full h-12 placeholder-gray-500 dark:placeholder-gray-400 border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Email Address
              </label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="w-full px-4 rounded-full h-12 placeholder-gray-500 dark:placeholder-gray-400 border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter email address"
                />
            </div>

            <Button 
              title={loading === 'personal' ? (
                <div className='flex items-center gap-2'>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </div>
              ) : success === 'personal' ? (
                <div className='flex items-center gap-2'>
                  <Check className="h-4 w-4" />
                  Saved
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <Save className="h-4 w-4" />
                  Save Changes
                </div>
              )}
              disabled={loading === 'personal'}
              version="colored"
              textColor="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white"
            />
          </form>
        </section>

        {/* Section 2: Change Password */}
        <section className="border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] rounded-xl p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-medium">
              Change Password
            </h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Old Password
              </label>
              <input
                type="password"
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                className="w-full px-4 rounded-full h-12 placeholder-gray-500 dark:placeholder-gray-400 border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full px-4 rounded-full h-12 placeholder-gray-500 dark:placeholder-gray-400 border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="Enter new password"
              />
            </div>

            <Button
              title={loading === 'password' ? (
                <div className='flex items-center gap-2'>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </div>
              ) : success === 'password' ? (
                <div className='flex items-center gap-2'>
                  <Check className="h-4 w-4" />
                  Updated
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <Lock className="h-4 w-4" />
                  Update Password
                </div>
              )} 
              version="colored"
              disabled={loading === 'password'}
              textColor="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white"
            />
          </form>
        </section>

        {/* Section 3: Delete Account */}
        <section className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-medium">
              Delete Account
            </h2>
          </div>

          <p className="text-sm sm:text-base opacity-80 mb-6">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          {!showDeleteConfirm ? (
            <div
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Button 
                title={
                  <div className='flex items-center gap-2'>
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </div>
                }
                version="colored"
                textColor="bg-red-600 hover:bg-red-700 text-white"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4  rounded-lg border border-red-300 dark:border-red-800">
                <p className="text-sm font-medium text-red-900 dark:text-red-200 mb-3">
                  Are you absolutely sure? This action cannot be undone.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div
                    onClick={handleDeleteAccount}
                  >
                    <Button 
                      title={loading === 'delete' ? (
                        <div className='flex items-center gap-2'>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Deleting...
                        </div>
                      ) : success === 'delete' ? (
                        <div className='flex items-center gap-2'>
                          <Check className="h-4 w-4" />
                          Deleted
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <Trash2 className="h-4 w-4" />
                          Yes, Delete My Account
                        </div>
                      )}
                      version="colored"
                      disabled={loading === 'delete'}
                      textColor="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white"
                    />
                  </div>
                  <div
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    <Button 
                      title="Cancel"
                      version='outline'
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
  );
};

export default SettingsPage;