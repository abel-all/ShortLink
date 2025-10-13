'use client';

import Button from '@/components/Button';
import { CircleCheckBig, CircleX, Mail, MapPin, Phone, Send, Signature } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const HelpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form on success
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl">
        <div className="mb-8 sm:mb-10">
          <div className="text-4xl font-medium">Help Center</div>
          <div className="text-lg font-normal opacity-80">We&apos;re here to help. Get in touch with us anytime.</div>
        </div>

        {/* Contact Information Section */}
        <section className='border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] rounded-xl p-6 sm:p-8 mb-6'>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Signature className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-medium">
              Contact Information
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-3 text-black">
            {/* Phone */}
            <div className="flex items-start space-x-4 p-4 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <div className="flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-80">Phone</div>
                <div className="mt-1 md:text-lg text-sm font-medium">+1 (555) 123-4567</div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 p-4 rounded-3xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
              <div className="flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-80">Email</div>
                <div className="mt-1 md:text-lg text-sm font-medium">support@company.com</div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4 p-4 rounded-3xl bg-gradient-to-r from-green-50 to-teal-50 border border-green-100">
              <div className="flex-shrink-0">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-80">Address</div>
                <div className="mt-1 md:text-lg text-sm font-medium">123 Business Ave</div>
                <div className="opacity-80">New York, NY 10001</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className='border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] rounded-xl p-6 sm:p-8 mb-6'>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-medium">
              Send us a Message
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 border rounded-full h-12 placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <CircleX  className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-full h-12 placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <CircleX  className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 border rounded-full h-12 placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.message ? 'border-red-500 bg-red-50' : 'border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]'
                }`}
                placeholder="Write your message here..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <CircleX  className="w-4 h-4 mr-1" />
                  {errors.message}
                </p>
              )}
            </div>

            <Button 
              title={isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
              wfull='w-full'
              disabled={isSubmitting}
              version='form'
            />

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CircleCheckBig className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-800">Your message has been sent successfully!</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <CircleX className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-800">Something went wrong. Please try again.</p>
              </div>
            )}
            
          </form>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;