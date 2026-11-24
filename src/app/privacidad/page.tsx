import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/lib/privacy";

export const metadata = legalMetadata(privacyPolicy);

export default function PrivacidadPage() {
  return <LegalPage document={privacyPolicy} />;
}
