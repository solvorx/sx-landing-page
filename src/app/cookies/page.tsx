import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { cookiePolicy } from "@/lib/privacy";

export const metadata = legalMetadata(cookiePolicy);

export default function CookiesPage() {
  return <LegalPage document={cookiePolicy} />;
}
