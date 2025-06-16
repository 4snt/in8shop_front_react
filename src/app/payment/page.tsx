// app/payment/page.tsx
export const dynamic = "force-dynamic"; // força SSR, não pré-render
// opcional: export const runtime = 'nodejs';

import PaymentClient from "./PaymentClient";

export default function Page() {
  return <PaymentClient />;
}
