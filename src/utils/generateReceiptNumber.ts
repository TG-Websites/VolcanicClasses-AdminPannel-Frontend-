export function generateReceiptNumber() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // 20250906
  return `RCPT-${datePart}`;
}
