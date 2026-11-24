/**
 * Todos los documentos legales publicados, de donde sale el sitemap. Un
 * documento nuevo se suma acá, en `legalPaths` (legal.ts) y en la columna
 * "Legal" de `footerLinks` (site.ts).
 */

import { dataProcessingAgreement } from "@/lib/dpa";
import { dentuxTerms, solvorxTerms } from "@/lib/legal";
import { cookiePolicy, privacyPolicy } from "@/lib/privacy";
import { accountDeletion, support } from "@/lib/support";

export const legalDocuments = [
  solvorxTerms,
  privacyPolicy,
  cookiePolicy,
  accountDeletion,
  support,
  dataProcessingAgreement,
  dentuxTerms,
];
