import { Link } from 'react-router-dom';

export function DPA() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif mb-2">IV Data Processing Addendum (DPA)</h1>
        <p className="text-neutral-400 mb-8">Effective Date: February 10, 2026</p>

        <div className="prose prose-invert prose-neutral max-w-none space-y-6 text-neutral-300">
          <p>
            This Data Processing Addendum ("DPA") supplements the IV{' '}
            <Link to="/terms" className="text-primary-400 hover:underline">Terms of Service</Link>{' '}
            ("Terms") and applies to the extent IV processes Personal Data on behalf of a Customer in connection with the Services where the Personal Data is subject to the GDPR (EU) 2016/679 ("GDPR"). If there is a conflict between this DPA and the Terms regarding Personal Data processing, this DPA will control.
          </p>
          <p>
            For clarity: IV may process some Personal Data as an independent controller for its own purposes (e.g., account administration, security, fraud prevention, billing if applicable). This DPA covers only processing where Customer is the Controller and IV acts as Processor on Customer's documented instructions.
          </p>

          {/* 1. Definitions */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">1. Definitions</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-white">1.1</strong> "Controller," "Processor," "Personal Data," "Processing," "Data Subject," and "Supervisory Authority" have the meanings given in the GDPR.</li>
            <li><strong className="text-white">1.2</strong> "Customer" means the entity or person that enters into the Terms and uses the Services.</li>
            <li><strong className="text-white">1.3</strong> "Services" means IV's websites, products, applications, and services provided under the Terms.</li>
            <li><strong className="text-white">1.4</strong> "Sub-processor" means a third party engaged by IV to process Personal Data on behalf of Customer.</li>
          </ul>

          {/* 2. Roles and Scope */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">2. Roles and Scope</h2>
          <p>
            <strong className="text-white">2.1</strong> Customer is the Controller of Personal Data processed via the Services. IV is the Processor of such Personal Data.
          </p>
          <p>
            <strong className="text-white">2.2</strong> IV will process Personal Data only on Customer's documented instructions, unless required to do so by applicable law.
          </p>

          {/* 3. Details of Processing */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">3. Details of Processing</h2>
          <p>
            The subject matter, duration, nature, and purpose of Processing, as well as the types of Personal Data and categories of Data Subjects, are described in Annex 1 below.
          </p>

          {/* 4. Customer Obligations */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">4. Customer Obligations</h2>
          <p>Customer is responsible for:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>The lawfulness of Processing, including having a valid legal basis and providing required notices to Data Subjects</li>
            <li>Ensuring that its instructions to IV comply with GDPR and other applicable data protection laws</li>
            <li>The accuracy, quality, and legality of Personal Data provided to IV</li>
          </ul>

          {/* 5. IV (Processor) Obligations */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">5. IV (Processor) Obligations</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-white">5.1 Confidentiality.</strong> IV will ensure that persons authorized to process Personal Data are bound by confidentiality obligations.</li>
            <li><strong className="text-white">5.2 Security.</strong> IV will implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, as described in Annex 2.</li>
            <li><strong className="text-white">5.3 Assistance.</strong> IV will provide reasonable assistance to Customer to help fulfill GDPR obligations regarding Data Subject rights requests, security, breach notification, and impact assessments.</li>
            <li><strong className="text-white">5.4 Deletion/Return.</strong> At the choice of Customer, IV will delete or return Personal Data at the end of the Services, unless applicable law requires retention.</li>
            <li><strong className="text-white">5.5 Audit/Information.</strong> IV will make available information reasonably necessary to demonstrate compliance with this DPA and will allow for audits as described in Section 10.</li>
          </ul>

          {/* 6. Sub-processors */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">6. Sub-processors</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-white">6.1</strong> Customer gives IV general authorization to engage Sub-processors.</li>
            <li><strong className="text-white">6.2</strong> IV's current Sub-processors are listed in Annex 3 below.</li>
            <li><strong className="text-white">6.3</strong> IV will provide notice of any intended addition or replacement of Sub-processors. If Customer reasonably objects, the parties will work in good faith to resolve it.</li>
            <li><strong className="text-white">6.4</strong> IV will impose data protection obligations on Sub-processors that are no less protective than those in this DPA.</li>
            <li><strong className="text-white">6.5</strong> IV remains responsible for Sub-processors' obligations per GDPR Article 28(4).</li>
          </ul>

          {/* 7. Data Subject Requests */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">7. Data Subject Requests</h2>
          <p>
            Customer is responsible for responding to Data Subject requests. If IV receives a request directly, IV will notify Customer (unless legally prohibited) and provide reasonable cooperation.
          </p>

          {/* 8. Personal Data Breaches */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">8. Personal Data Breaches</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-white">8.1</strong> IV will notify Customer without undue delay after becoming aware of a Personal Data Breach.</li>
            <li><strong className="text-white">8.2</strong> IV will provide information reasonably necessary to support breach notification and remediation.</li>
            <li><strong className="text-white">8.3</strong> Breach notification is not an admission of fault or liability.</li>
          </ul>

          {/* 9. International Transfers */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">9. International Transfers</h2>
          <p>
            Customer acknowledges that IV and its Sub-processors may process Personal Data in the United States and other countries. Where GDPR applies and Personal Data is transferred outside the EEA/UK/Switzerland, the parties will rely on an appropriate transfer mechanism, such as the EU Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914).
          </p>

          {/* 10. Audits */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">10. Audits</h2>
          <p>
            Customer may audit IV's compliance with this DPA no more than once per 12-month period (unless required by a Supervisory Authority or after a material breach). Audits will be conducted on reasonable prior written notice, during normal business hours, subject to confidentiality.
          </p>

          {/* 11. Termination */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">11. Termination; Return/Deletion</h2>
          <p>
            Upon termination or expiration of the Services, Customer may request return or deletion of Personal Data, unless retention is required by applicable law. IV will delete Personal Data within a reasonable timeframe, subject to backup retention cycles and legal requirements.
          </p>

          {/* 12. Liability */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">12. Liability; Indemnity</h2>
          <p>
            Each party's total aggregate liability under this DPA is subject to the limitations in the{' '}
            <Link to="/terms" className="text-primary-400 hover:underline">Terms</Link>. IV's total aggregate liability will not exceed USD $100 or the fees paid by Customer in the 12 months preceding the claim, whichever is greater.
          </p>

          {/* 13. Governing Law */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">13. Governing Law; Disputes</h2>
          <p>
            This DPA is governed by the governing law and dispute resolution provisions in the{' '}
            <Link to="/terms" className="text-primary-400 hover:underline">Terms</Link>, unless GDPR requires otherwise.
          </p>

          {/* Annex 1 */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">ANNEX 1 — Processing Details</h2>

          <h3 className="text-lg font-semibold text-white">A. Subject Matter</h3>
          <p>Provision of the Services (e.g., company registration, profile management, analytics/visualization features, and related support).</p>

          <h3 className="text-lg font-semibold text-white">B. Duration</h3>
          <p>For the term of the Customer's use of the Services, plus any limited retention period necessary for legitimate operational purposes.</p>

          <h3 className="text-lg font-semibold text-white">C. Nature and Purpose of Processing</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Account creation and authentication</li>
            <li>Company/profile registration and management</li>
            <li>Analytics ingestion and reporting/visualization (e.g., GA4, Stripe)</li>
            <li>Security and abuse prevention</li>
          </ul>

          <h3 className="text-lg font-semibold text-white">D. Types of Personal Data</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Names, emails, usernames, profile photos, and profile information</li>
            <li>Company-related contact and profile details</li>
            <li>Usage/activity data within the Services</li>
            <li>Integration tokens or credentials (stored encrypted)</li>
            <li>Analytics or financial metrics from authorized integrations</li>
          </ul>

          <h3 className="text-lg font-semibold text-white">E. Categories of Data Subjects</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Customer's users and account administrators</li>
            <li>Individuals included in company profiles (e.g., founders/executives/team members)</li>
            <li>Other individuals whose Personal Data Customer submits to the Services</li>
          </ul>

          <h3 className="text-lg font-semibold text-white">F. Special Categories of Data</h3>
          <p>Not intended to be processed. Customers should not submit special category data unless strictly necessary and agreed in writing.</p>

          {/* Annex 2 */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">ANNEX 2 — Security Measures (Summary)</h2>
          <p>IV maintains a security program designed to protect Personal Data, which may include:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access controls and least-privilege permissions</li>
            <li>Encryption in transit (e.g., TLS) for data transmission</li>
            <li>Encryption at rest for sensitive secrets/tokens stored in IV's database</li>
            <li>Logging/monitoring for security-relevant events</li>
            <li>Backup and recovery procedures</li>
            <li>Vulnerability and patch management practices</li>
          </ul>

          {/* Annex 3 */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">ANNEX 3 — Sub-processors (Current)</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-white">Supabase</strong> — hosting/database infrastructure</li>
            <li><strong className="text-white">Stripe</strong> — payment processing and/or financial data integrations (if enabled)</li>
            <li><strong className="text-white">Google</strong> — analytics services such as Google Analytics/GA4 (if enabled)</li>
          </ul>
          <p>IV may add or replace Sub-processors with notice under Section 6.3.</p>

          {/* Contact */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">14. Contact</h2>
          <p>
            Questions about this DPA:{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>
          </p>

          {/* Related Policies */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Related Policies</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><Link to="/terms" className="text-primary-400 hover:underline">Terms of Service</Link></li>
            <li><Link to="/privacy" className="text-blue-400 hover:underline bg-blue-400/10 px-1 py-0.5 rounded">Privacy and Cookies Policy</Link></li>
            <li><Link to="/copyright" className="text-blue-400 hover:underline bg-blue-400/10 px-1 py-0.5 rounded">Copyright Dispute Policy</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
