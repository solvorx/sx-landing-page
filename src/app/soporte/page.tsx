import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { support } from "@/lib/support";

export const metadata = legalMetadata(support);

export default function SoportePage() {
  return <LegalPage document={support} />;
}
