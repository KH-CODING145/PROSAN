import axios from 'axios';

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

const SUBMISSION_COOLDOWN_MS = 15000; // 15 seconds anti-spam client throttle
let lastSubmissionTimestamp = 0;

export async function sendContactMessage(data: ContactSubmissionPayload): Promise<ContactResponse> {
  // Honeypot spam check
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return {
      success: true,
      message: 'Thanks! Your message has been sent successfully.'
    };
  }

  // Client rate limiter
  const now = Date.now();
  if (now - lastSubmissionTimestamp < SUBMISSION_COOLDOWN_MS) {
    const waitSeconds = Math.ceil((SUBMISSION_COOLDOWN_MS - (now - lastSubmissionTimestamp)) / 1000);
    throw new Error(`Please wait ${waitSeconds} seconds before sending another message.`);
  }

  const endpoint = import.meta.env.VITE_CONTACT_API_URL;

  if (endpoint && endpoint.trim().length > 0) {
    try {
      const response = await axios.post(endpoint, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 8000
      });
      lastSubmissionTimestamp = Date.now();
      return {
        success: true,
        message: response.data?.message || 'Thanks! Your message has been sent successfully.'
      };
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to dispatch message to server. Please try again.');
    }
  }

  // Default robust simulation with artificial network latency for preview
  await new Promise((resolve) => setTimeout(resolve, 800));
  lastSubmissionTimestamp = Date.now();

  return {
    success: true,
    message: 'Thanks! Your message has been sent successfully.'
  };
}
