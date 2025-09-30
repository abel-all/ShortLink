'use client';

import { CircleX, Mail, MapPin, Phone } from 'lucide-react';
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
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl">
        <div className="mb-12">
          <div className="text-5xl font-medium text-gray-900 mb-4">Help Center</div>
          <div className="text-xl font-normal opacity-80">We&apos;re here to help. Get in touch with us anytime.</div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-medium mb-6">Contact Information</h2>
          
          <div className="grid lg:grid-cols-3 gap-3 text-black">
            {/* Phone */}
            <div className="flex items-start space-x-4 p-4 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <div className="flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-80">Phone</div>
                <div className="mt-1 text-lg font-medium">+1 (555) 123-4567</div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 p-4 rounded-3xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
              <div className="flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-80">Email</div>
                <div className="mt-1 text-lg font-medium">support@company.com</div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4 p-4 rounded-3xl bg-gradient-to-r from-green-50 to-teal-50 border border-green-100">
              <div className="flex-shrink-0">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-80">Address</div>
                <div className="mt-1 text-lg font-medium">123 Business Ave</div>
                <div className="opacity-80">New York, NY 10001</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="">
          <h2 className="text-3xl font-medium mb-6">Send us a Message</h2>
          
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
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
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
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

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-800">Your message has been sent successfully!</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-800">Something went wrong. Please try again.</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
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
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;