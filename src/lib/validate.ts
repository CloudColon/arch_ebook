// Checkout field rules, shared by the server order route and the static demo.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanBuyer(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").replace(/[^\d+]/g, "");
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Enter your full name.";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a 10 digit mobile number.";
  // The checkout checkbox; no order is created without it.
  if (body.agree !== "on") errors.agree = "Please accept the terms, payment policy and refund policy to continue.";
  return { name, email, phone, errors };
}
