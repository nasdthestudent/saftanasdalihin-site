// components/sections/ContactForm.tsx
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormInputs } from '@/lib/schemas';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

export const ContactForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setSubmissionStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmissionStatus('error');
        setErrorMessage(result.message || 'Failed to send message. Please try again later.');
        return;
      }

      setSubmissionStatus('success');
      const currentName = getValues('name');
      const currentEmail = getValues('email');
      
      reset({
          name: currentName,
          email: currentEmail,
          subject: '',
          message: '',
      });

    } catch {
      setSubmissionStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border p-6 shadow-lg bg-background">
      
      {/* Submission Status */}
      {submissionStatus === 'success' && (
        <div className="rounded-md bg-green-100 p-4 text-green-700 border border-green-300">
          Message sent successfully! Thank you, I will reply soon.
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className="rounded-md bg-red-100 p-4 text-red-700 border border-red-300">
          error: {errorMessage}
        </div>
      )}

      {/* Input Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`w-full rounded-lg border p-3 bg-secondary/20 focus:ring-2 focus:ring-primary focus:outline-none transition ${
            errors.name ? 'border-red-500' : 'border-border'
          }`}
          placeholder="Your name"
          disabled={isSubmitting}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Input Email Address */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full rounded-lg border p-3 bg-secondary/20 focus:ring-2 focus:ring-primary focus:outline-none transition ${
            errors.email ? 'border-red-500' : 'border-border'
          }`}
          placeholder="example@domain.com"
          disabled={isSubmitting}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Input Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          className={`w-full rounded-lg border p-3 bg-secondary/20 focus:ring-2 focus:ring-primary focus:outline-none transition ${
            errors.subject ? 'border-red-500' : 'border-border'
          }`}
          placeholder="Project Proposal / Job Inquiry / Others"
          disabled={isSubmitting}
        />
        {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
      </div>

      {/* Input Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={`w-full rounded-lg border p-3 bg-secondary/20 focus:ring-2 focus:ring-primary focus:outline-none transition ${
            errors.message ? 'border-red-500' : 'border-border'
          }`}
          placeholder="Project details, offers, or questions..."
          disabled={isSubmitting}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      {/* Send Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary 
                   px-6 py-3 font-semibold text-primary-foreground transition-all 
                   hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <FaPaperPlane /> Send Message
          </>
        )}
      </button>
    </form>
  );
};