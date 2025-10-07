export type PhishEmail = {
  id: string;
  from: string;
  subject: string;
  body: string;
  isPhish: boolean;
  hint: string;
};

export const PHISH_EMAILS: PhishEmail[] = [
  {
    id: 'p1',
    from: 'IT Support <it-support@micr0soft.com>',
    subject: 'URGENT: Password Expiring',
    body: 'Your password expires today. Click this link to renew: http://micr0soft-reset.com',
    isPhish: true,
    hint: 'Misspelled domain and urgency are red flags.',
  },
  {
    id: 'p2',
    from: 'HR <hr@company.com>',
    subject: 'Updated Employee Handbook',
    body: 'Please review the updated policies by Friday. Document attached via company SharePoint.',
    isPhish: false,
    hint: 'Legitimate internal sender and known process.',
  },
  {
    id: 'p3',
    from: 'Security Team <security@company.com>',
    subject: 'Multi-Factor Authentication Required',
    body: 'Enroll in MFA using this official portal: https://secure.company.com/mfa',
    isPhish: false,
    hint: 'HTTPS, correct internal domain, and standard policy.',
  },
  {
    id: 'p4',
    from: 'Payments <billing@streamflix.com>',
    subject: 'Payment Failed - Update Now',
    body: 'We could not process your payment. Update card here: http://stream-flix-bill.com',
    isPhish: true,
    hint: 'Non-HTTPS and domain not matching brand.',
  },
];
