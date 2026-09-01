import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import confetti from 'canvas-confetti';
import { submitContactInquiry } from '../services/firestoreService';

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export type FormErrors = Partial<Record<keyof ContactFormValues, string>>;
export type FormTouched = Partial<Record<keyof ContactFormValues, boolean>>;
export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseContactFormOptions {
  initialValues?: Partial<ContactFormValues>;
  onSubmit?: (values: ContactFormValues) => Promise<{ success: boolean; message: string }>;
  cooldownMs?: number;
}

const DEFAULT_INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  honeypot: ''
};

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

let lastSubmissionTime = 0;

/**
 * Validates a single field or all form fields
 */
export function validateContactField(name: keyof ContactFormValues, value: string): string | undefined {
  const trimmed = value.trim();

  switch (name) {
    case 'name':
      if (!trimmed) return 'Your name is required';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      if (trimmed.length > 80) return 'Name cannot exceed 80 characters';
      return undefined;

    case 'email':
      if (!trimmed) return 'Email address is required';
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address';
      return undefined;

    case 'subject':
      if (!trimmed) return 'Subject line is required';
      if (trimmed.length < 3) return 'Subject must be at least 3 characters';
      if (trimmed.length > 120) return 'Subject cannot exceed 120 characters';
      return undefined;

    case 'message':
      if (!trimmed) return 'Message content is required';
      if (trimmed.length < 15) return 'Message must be at least 15 characters';
      if (trimmed.length > 2000) return 'Message cannot exceed 2,000 characters';
      return undefined;

    default:
      return undefined;
  }
}

/**
 * Validates the full form payload
 */
export function validateContactForm(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};

  const nameError = validateContactField('name', values.name);
  if (nameError) errors.name = nameError;

  const emailError = validateContactField('email', values.email);
  if (emailError) errors.email = emailError;

  const subjectError = validateContactField('subject', values.subject);
  if (subjectError) errors.subject = subjectError;

  const messageError = validateContactField('message', values.message);
  if (messageError) errors.message = messageError;

  return errors;
}

/**
 * Firestore submission handler with rate limiting & anti-spam
 */
export async function defaultFirestoreSubmitHandler(
  values: ContactFormValues,
  cooldownMs = 10000
): Promise<{ success: boolean; message: string }> {
  // 1. Honeypot check for bots
  if (values.honeypot && values.honeypot.trim().length > 0) {
    return {
      success: true,
      message: 'Thanks! Your message has been received.'
    };
  }

  // 2. Client-side anti-spam throttle check
  const now = Date.now();
  if (now - lastSubmissionTime < cooldownMs) {
    const remaining = Math.ceil((cooldownMs - (now - lastSubmissionTime)) / 1000);
    throw new Error(`Rate limit reached. Please wait ${remaining}s before sending another message.`);
  }

  // 3. Submit directly to Firebase Firestore
  await submitContactInquiry({
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  });

  lastSubmissionTime = Date.now();

  return {
    success: true,
    message: `Thank you, ${values.name}! Your inquiry has been securely stored in Firebase Firestore and forwarded to PRO SAN. I will respond to ${values.email} shortly.`
  };
}

/**
 * Custom State Management Hook for Contact Form handling and validation
 */
export function useContactForm(options: UseContactFormOptions = {}) {
  const {
    initialValues = {},
    onSubmit,
    cooldownMs = 10000
  } = options;

  const [values, setValues] = useState<ContactFormValues>({
    ...DEFAULT_INITIAL_VALUES,
    ...initialValues
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

  /**
   * Set field value and clear errors if valid
   */
  const setFieldValue = useCallback((field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Real-time validation if already touched
    setErrors((prevErrors) => {
      const fieldError = validateContactField(field, value);
      if (!fieldError) {
        const { [field]: _, ...rest } = prevErrors;
        return rest;
      }
      return { ...prevErrors, [field]: fieldError };
    });
  }, []);

  /**
   * Universal change handler for inputs and textareas
   */
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFieldValue(name as keyof ContactFormValues, value);
  }, [setFieldValue]);

  /**
   * Blur handler to trigger field-level validation on focus exit
   */
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | keyof ContactFormValues) => {
    const fieldName = (typeof e === 'string' ? e : e.target.name) as keyof ContactFormValues;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const error = validateContactField(fieldName, values[fieldName] || '');
    setErrors((prev) => {
      if (error) {
        return { ...prev, [fieldName]: error };
      }
      const { [fieldName]: _, ...rest } = prev;
      return rest;
    });
  }, [values]);

  /**
   * Pre-fill template options (e.g. for quick inquiries)
   */
  const applyTemplate = useCallback((template: { subject: string; message: string }) => {
    setValues((prev) => ({
      ...prev,
      subject: template.subject,
      message: template.message
    }));
    setTouched((prev) => ({
      ...prev,
      subject: true,
      message: true
    }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.subject;
      delete newErrors.message;
      return newErrors;
    });
  }, []);

  /**
   * Reset form to clean initial state
   */
  const resetForm = useCallback(() => {
    setValues({ ...DEFAULT_INITIAL_VALUES, ...initialValues });
    setErrors({});
    setTouched({});
    setStatus('idle');
    setServerMessage('');
  }, [initialValues]);

  /**
   * Handles form submit with full validation, submission handler, and status management
   */
  const handleSubmit = useCallback(async (e?: FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Touch all fields
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    // Validate entire form
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return false;
    }

    setStatus('loading');
    setServerMessage('');

    try {
      const submitFn = onSubmit || ((vals) => defaultFirestoreSubmitHandler(vals, cooldownMs));
      const response = await submitFn(values);

      setStatus('success');
      setServerMessage(response.message);

      // Trigger celebratory micro-confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.75 }
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not available
      }

      // Reset form values while keeping success banner
      setValues({ ...DEFAULT_INITIAL_VALUES, ...initialValues });
      setTouched({});
      setErrors({});

      return true;
    } catch (err: any) {
      setStatus('error');
      setServerMessage(err.message || 'Failed to send message. Please try again later.');
      return false;
    }
  }, [values, onSubmit, cooldownMs, initialValues]);

  const isValid = Object.keys(validateContactForm(values)).length === 0;
  const isDirty = (
    values.name !== (initialValues.name || '') ||
    values.email !== (initialValues.email || '') ||
    values.subject !== (initialValues.subject || '') ||
    values.message !== (initialValues.message || '')
  );

  return {
    values,
    errors,
    touched,
    status,
    serverMessage,
    isValid,
    isDirty,
    isSubmitting: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    applyTemplate,
    resetForm
  };
}
