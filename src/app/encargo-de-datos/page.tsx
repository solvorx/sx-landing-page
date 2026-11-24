import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { dataProcessingAgreement } from "@/lib/dpa";

export const metadata = legalMetadata(dataProcessingAgreement);

export default function EncargoDeDatosPage() {
  return <LegalPage document={dataProcessingAgreement} />;
}
