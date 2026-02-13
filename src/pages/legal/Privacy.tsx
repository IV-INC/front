import { Link } from 'react-router-dom';

export function Privacy() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif mb-2">IV Privacy and Cookies Policy</h1>
        <p className="text-neutral-400 mb-8">Effective date: February 10, 2026</p>

        <div className="prose prose-invert prose-neutral max-w-none space-y-6 text-neutral-300">
          <p>
            We understand that your privacy is important, and we take it seriously. This Privacy and Cookies Policy ("Policy") explains IV's policies and procedures for how we collect, use, disclose, store, and protect your information when you use IV's services, websites, and applications (collectively, the "Services"). It also explains your privacy rights and how applicable laws may protect you.
          </p>
          <p>
            By accessing or using the Services, you consent to the collection, use, disclosure, and storage of your information as described in this Policy or as required by law. Any capitalized terms not defined in this Policy have the meanings given in the IV{' '}
            <Link to="/terms" className="text-primary-400 hover:underline">Terms of Service</Link>, which are incorporated by reference.
          </p>
          <p>
            This Policy is intended to meet transparency duties under the New York SHIELD Act, the New York State Department of Financial Services cybersecurity rule (23 NYCRR 500), the federal Children's Online Privacy Protection Act (COPPA), the New York Child Data Protection Act (NYCDPA), and the General Data Protection Regulation (GDPR) where relevant.
          </p>

          {/* A. Who We Are */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">A. Who We Are and How to Contact Us</h2>
          <p>
            IV is a New York-based platform providing free core Services for company registration, executive profiles, Member screens, and integrations (e.g., read-only access to Stripe Connect or Google Analytics 4 data, stored securely via Supabase with tokenization).
          </p>
          <p>
            Our principal place of business is 3243 44TH APT 1F, ASTORIA, NY 11103-2339. For any questions, requests (e.g., data access/deletion), or complaints about this Policy or our data practices, contact us at{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>.
          </p>

          {/* B. Your Rights */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">B. Your Rights Related to Your Personal Data</h2>
          <p>You have certain rights regarding your personal data, subject to applicable laws:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-blue-400">Access:</strong> Request confirmation of processing and a copy of your data.</li>
            <li><strong className="text-blue-400">Correction:</strong> Request correction of inaccurate data.</li>
            <li><strong className="text-blue-400">Deletion:</strong> Request deletion of your data, though IV may retain anonymized/aggregated versions for internal use or as required by law.</li>
            <li><strong className="text-blue-400">Opt-Out of Sale/Sharing:</strong> IV does not "sell" personal data under applicable definitions.</li>
            <li><strong className="text-blue-400">Portability:</strong> Request transfer of your data in a structured format, where technically feasible.</li>
            <li><strong className="text-blue-400">Restriction/Objection:</strong> Object to processing for direct marketing or request restrictions.</li>
            <li><strong className="text-blue-400">Withdraw Consent:</strong> Withdraw consent at any time (e.g., revoke OAuth for Stripe/GA4), but this may limit or terminate Services.</li>
          </ul>
          <p>
            To exercise rights, email{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>{' '}
            with verifiable proof of identity. IV will respond within 45 days (extendable under law).
          </p>

          {/* C. Marketing */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">C. Your Marketing Communication Choices</h2>
          <p>
            IV may send essential service-related communications (e.g., registration confirmations, updates to company lists, or security alerts). For optional marketing, you can opt-out at any time via unsubscribe links in emails or by emailing{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>.
          </p>

          {/* D. What We Collect */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">D. What Personal Data We Collect</h2>
          <p>IV collects only the minimal personal data necessary to provide the Services:</p>

          <h3 className="text-lg font-semibold text-white">Information You Directly Provide</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-blue-400">Identity Data:</strong> first name, last name, username, password, title, date of birth, gender, profile photo.</li>
            <li><strong className="text-blue-400">Contact Data:</strong> email address, home address, work address, billing address, phone number.</li>
            <li><strong className="text-blue-400">Professional / Company Profile Data:</strong> educational and professional history, company pitch deck, company logo, employee count, category, company stage, company links (Website, GitHub, X, LinkedIn, YouTube); C-level team details; 5-minute intro video; Investor Q&A; Google GA4 connection/data.</li>
            <li><strong className="text-blue-400">Online Presence Data:</strong> links to public social media profiles, personal websites, company links.</li>
            <li><strong className="text-blue-400">Financial Data:</strong> bank account details, payment card details, and Stripe connection/data (where applicable).</li>
            <li><strong className="text-blue-400">Transaction Data:</strong> details of payments and subscriptions.</li>
            <li><strong className="text-blue-400">Content Data:</strong> any content you post to the Services and related metadata.</li>
            <li><strong className="text-blue-400">Marketing & Communications Data:</strong> your preferences for receiving marketing and communication content.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white">Personal Data from Third Party Sources</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Social media sites: Identity Data, Contact Data, Online Presence Data</li>
            <li>Analytics providers (e.g., Google Analytics 4): Behavioral Data, Technical Data</li>
            <li>Payment processors (e.g., Stripe): Financial Data, Transaction Data</li>
          </ul>

          {/* E. How We Use */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">E. How and Why We Use Your Personal Data</h2>
          <p>IV uses your personal data solely for legitimate, operational purposes:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-blue-400">Service Delivery:</strong> Processing company registrations, displaying profiles in Member grids, generating graphs from data.</li>
            <li><strong className="text-blue-400">Internal Operations:</strong> Aggregate anonymized data for trends, debugging, and service improvements.</li>
            <li><strong className="text-blue-400">Security:</strong> Tokenization/encryption under SHIELD Act to protect against breaches.</li>
            <li><strong className="text-blue-400">Legal Compliance:</strong> Respond to subpoenas or audits as required by law.</li>
            <li><strong className="text-blue-400">Research & Development:</strong> Refine Services through anonymized usage patterns.</li>
            <li><strong className="text-blue-400">Communication:</strong> Essential alerts such as approval notices or security updates.</li>
            <li><strong className="text-blue-400">Customer Support:</strong> Address queries or fix issues.</li>
          </ul>

          {/* F. Cookies */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">F. How We Use Cookies and Tracking Technologies</h2>
          <p>
            IV limits its use of cookies and similar technologies to only those strictly necessary for fundamental operations, such as maintaining user sessions and performing basic, aggregated analytics. We avoid third-party advertising trackers, sophisticated user profiling, or any optional tools that gather excess data.
          </p>
          <p>
            Under New York law (including the SHIELD Act), no explicit opt-in is required for these essential technologies — your continued access and use of the Services constitutes implied consent. Should any non-essential technologies be added in the future, you can opt-out by contacting{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>.
          </p>

          {/* G. Who We Share With */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">G. Who We Share Your Personal Data With</h2>
          <p>Sharing is strictly limited to operational necessities:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-blue-400">Service Providers/Processors:</strong> Trusted vendors like Supabase (secure, tokenized storage), Stripe (read-only data integrations), or Google (GA4).</li>
            <li><strong className="text-blue-400">Legal/Regulatory:</strong> Shared with authorities if required by law (e.g., subpoenas, SHIELD Act breach reports).</li>
            <li><strong className="text-blue-400">Business Transfers:</strong> In mergers/acquisitions, data may transfer.</li>
            <li><strong className="text-blue-400">No Sales or Broad Sharing:</strong> IV does not sell, rent, or broadly share personal data.</li>
            <li><strong className="text-blue-400">Professional Advisers:</strong> For legal/compliance support.</li>
            <li><strong className="text-blue-400">API Users/Business Partners:</strong> For authorized integrations (e.g., Stripe/GA4 metrics).</li>
          </ul>

          {/* H. Retention */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">H. How Long We Keep Your Personal Data</h2>
          <p>
            Personal data is retained only as long as necessary for Services (e.g., while your account is active) or legal requirements (e.g., 7 years for financial audits under NY law, or SHIELD Act compliance logs). Deletion requests are honored promptly where feasible.
          </p>

          {/* I. Storage */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">I. Where We Store Your Personal Data</h2>
          <p>
            All personal data is stored in the United States (NY-based servers and Supabase infrastructure), with strong security measures under SHIELD Act. For any minimal international transfers (e.g., to EU for GDPR users), we use Standard Contractual Clauses or equivalent safeguards.
          </p>

          {/* G (J). Protection */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">J. How We Protect Your Personal Data</h2>
          <p>
            IV implements reasonable administrative, technical, and physical safeguards (e.g., encryption, access controls, tokenization via Supabase, regular audits) to protect personal data, in compliance with SHIELD Act and NY DFS rules (23 NYCRR 500). However, no system is completely secure — IV provides no guarantees against breaches, unauthorized access, or data loss.
          </p>
          <p>
            Report suspected incidents to{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>.
          </p>

          {/* K. Children */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">K. Our Policy on Children's Privacy</h2>
          <p>
            IV complies with COPPA (no knowing collection from under 13) and NYCDPA (restricted processing for under 18 in NY). The Services are not directed to children under 13 — if under 13, do not use or provide data. For ages 13-17, we require informed opt-in consent for non-essential processing and minimize data use. If we discover unauthorized child data, we delete it promptly. Contact us at{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>{' '}
            to report.
          </p>

          {/* L. Links */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">L. Links to Other Websites</h2>
          <p>
            The Services may include links to third-party sites (e.g., user-submitted LinkedIn/X/YouTube links, or integrations like Stripe/GA4) — these are for convenience only. IV does not endorse, control, or assume any responsibility for their content, privacy practices, security, or terms.
          </p>

          {/* M. Changes */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">M. Changes to This Privacy and Cookies Policy</h2>
          <p>
            We may update this Policy at any time to reflect changes in practices, laws, or Services. Updates will be posted here with a new effective date. For material changes (e.g., new data uses), we provide notice via email (if available) or in-app alerts, at least 30 days in advance where required. Your continued use constitutes acceptance.
          </p>

          {/* Related Policies */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Related Policies</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><Link to="/terms" className="text-primary-400 hover:underline">Terms of Service</Link></li>
            <li><Link to="/copyright" className="text-primary-400 hover:underline">Copyright Dispute Policy</Link></li>
            <li><Link to="/dpa" className="text-primary-400 hover:underline">Data Processing Addendum (DPA)</Link></li>
          </ul>

          {/* Contact */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>
            For questions about this Policy, please contact us at{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>{' '}
            or 3243 44TH APT 1F, ASTORIA, NY 11103-2339.
          </p>
        </div>
      </div>
    </div>
  );
}
