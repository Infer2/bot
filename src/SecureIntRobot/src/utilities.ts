import crypto from 'crypto';

export function validateSignature(timestamp: string, body: string, signature: string, publicKey: string): boolean {
  const isValidSignature = crypto.createHmac('sha256', publicKey)
    .update(timestamp + body)
    .digest('hex') === signature;

  return isValidSignature;
}
