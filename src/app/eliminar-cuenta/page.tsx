import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { accountDeletion } from "@/lib/support";

export const metadata = legalMetadata(accountDeletion);

export default function EliminarCuentaPage() {
  return <LegalPage document={accountDeletion} />;
}
