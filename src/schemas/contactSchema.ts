import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Your name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name cannot exceed 80 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address (e.g. name@domain.com)')
    .max(120, 'Email cannot exceed 120 characters'),
  subject: z
    .string()
    .trim()
    .min(1, 'Subject line is required')
    .min(3, 'Subject must be at least 3 characters')
    .max(120, 'Subject cannot exceed 120 characters'),
  message: z
    .string()
    .trim()
    .min(1, 'Message content is required')
    .min(15, 'Message must be at least 15 characters')
    .max(2000, 'Message cannot exceed 2,000 characters'),
  honeypot: z.string().optional()
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Validates a single field using the Zod schema
 */
export function validateFieldWithZod<K extends keyof ContactFormData>(
  field: K,
  value: string
): string | undefined {
  const fieldSchema = contactSchema.shape[field];
  if (!fieldSchema) return undefined;

  const result = fieldSchema.safeParse(value);
  if (!result.success) {
    return result.error.issues?.[0]?.message;
  }
  return undefined;
}

/**
 * Validates all fields using the Zod schema
 */
export function validateFormWithZod(values: ContactFormData): Partial<Record<keyof ContactFormData, string>> {
  const result = contactSchema.safeParse(values);
  if (result.success) {
    return {};
  }

  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  for (const issue of result.error.issues) {
    const fieldName = issue.path[0] as keyof ContactFormData;
    if (fieldName && !errors[fieldName]) {
      errors[fieldName] = issue.message;
    }
  }
  return errors;
}
