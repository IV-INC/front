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

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">1. Definitions</h2>
          <p><strong className="text-white">1.1</strong> "Controller," "Processor," "Personal Data," "Processing," "Data Subject," and "Supervisory Authority" have the meanings given in the GDPR.</p>
          <p><strong className="text-white">1.2</strong> "Customer" means the entity or person that enters into the Terms and uses the Services.</p>
          <p><strong className="text-white">1.3</strong> "Services" means IV's websites, products, applications, and services provided under the Terms.</p>
          <p><strong className="text-white">1.4</strong> "Sub-processor" means a third party engaged by IV to process Personal Data on behalf of Customer.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">2. Roles and Scope</h2>
          <p><strong className="text-white">2.1</strong> Customer is the Controller of Personal Data processed via the Services (as described in Annex 1). IV is the Processor of such Personal Data.</p>
          <p><strong className="text-white">2.2</strong> IV will process Personal Data only on Customer's documented instructions, including with respect to transfers of Personal Data to a third country, unless required to do so by applicable law. If IV is required by law to process otherwise, IV will inform Customer of that legal requirement unless prohibited by law.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">3. Details of Processing</h2>
          <p>The subject matter, duration, nature, and purpose of Processing, as well as the types of Personal Data and categories of Data Subjects, are described in Annex 1.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">4. Customer Obligations</h2>
          <p>Customer is responsible for:</p>
          <p>(a) the lawfulness of Processing, including having a valid legal basis and providing required notices to Data Subjects;</p>
          <p>(b) ensuring that its instructions to IV comply with GDPR and other applicable data protection laws; and</p>
          <p>(c) the accuracy, quality, and legality of Personal Data provided to IV.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">5. IV (Processor) Obligations</h2>
          <p><strong className="text-white">5.1 Confidentiality.</strong> IV will ensure that persons authorized to process Personal Data are bound by confidentiality obligations.</p>
          <p><strong className="text-white">5.2 Security.</strong> IV will implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, as described in Annex 2 (and as IV may update from time to time).</p>
          <p><strong className="text-white">5.3 Assistance.</strong> Taking into account the nature of Processing and the information available to IV, IV will provide reasonable assistance to Customer to help Customer fulfill GDPR obligations regarding:</p>
          <p>(a) Data Subject rights requests; and</p>
          <p>(b) security, breach notification, and impact assessments,</p>
          <p>in each case to the extent Customer cannot reasonably fulfill them without IV's assistance. IV may charge reasonable fees for assistance that requires material engineering or operational effort.</p>
          <p><strong className="text-white">5.4 Deletion/Return.</strong> At the choice of Customer, and as described in Section 11, IV will delete or return Personal Data at the end of the Services, unless applicable law requires retention.</p>
          <p><strong className="text-white">5.5 Audit/Information.</strong> IV will make available to Customer information reasonably necessary to demonstrate compliance with this DPA and will allow for and contribute to audits, as described in Section 10.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">6. Sub-processors</h2>
          <p><strong className="text-white">6.1 Authorization.</strong> Customer gives IV general authorization to engage Sub-processors to process Personal Data on Customer's behalf.</p>
          <p><strong className="text-white">6.2 List.</strong> IV's current Sub-processors are listed in Annex 3.</p>
          <p><strong className="text-white">6.3 Changes.</strong> IV will provide notice of any intended addition or replacement of Sub-processors. If Customer reasonably objects on data protection grounds within a reasonable time, the parties will work in good faith to resolve the objection (for example, by providing an alternative). If the parties cannot resolve the objection, Customer may stop using the affected part of the Services or terminate the Services in accordance with the Terms.</p>
          <p><strong className="text-white">6.4 Flow-down.</strong> IV will impose data protection obligations on Sub-processors that are no less protective than those in this DPA, including appropriate security measures.</p>
          <p><strong className="text-white">6.5 Responsibility.</strong> IV remains responsible to Customer for the performance of its Sub-processors' obligations in accordance with GDPR Article 28(4).</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">7. Data Subject Requests</h2>
          <p>Customer is responsible for responding to Data Subject requests. If IV receives a request directly from a Data Subject relating to Personal Data processed on behalf of Customer, IV will (unless legally prohibited) notify Customer. IV will provide reasonable cooperation and assistance, as described in Section 5.3.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">8. Personal Data Breaches</h2>
          <p><strong className="text-white">8.1 Notification.</strong> IV will notify Customer without undue delay after becoming aware of a Personal Data Breach involving Personal Data processed on behalf of Customer.</p>
          <p><strong className="text-white">8.2 Information.</strong> IV will provide information reasonably necessary to support Customer's breach notification and remediation obligations, taking into account the information available to IV.</p>
          <p><strong className="text-white">8.3 No Admission.</strong> Breach notification under this Section is not an admission of fault or liability.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">9. International Transfers</h2>
          <p><strong className="text-white">9.1 Transfers.</strong> Customer acknowledges that IV and its Sub-processors may process Personal Data in the United States and other countries.</p>
          <p><strong className="text-white">9.2 Transfer Mechanism.</strong> Where GDPR applies and Personal Data is transferred from the EEA/UK/Switzerland to a country not recognized as providing an adequate level of protection, the parties will rely on an appropriate transfer mechanism, such as the EU Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914) and, where applicable, the UK Addendum.</p>
          <p><strong className="text-white">9.3 Onward Transfers.</strong> IV will ensure that onward transfers to Sub-processors outside the EEA/UK/Switzerland are covered by an appropriate transfer mechanism.</p>
          <p><strong className="text-white">9.4 Supplementary Measures.</strong> The parties will implement supplementary measures where required, taking into account the transfer context and risk.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">10. Audits</h2>
          <p><strong className="text-white">10.1</strong> Customer may audit IV's compliance with this DPA no more than once per 12-month period, unless:</p>
          <p>(a) a competent Supervisory Authority requires otherwise; or</p>
          <p>(b) a material Personal Data Breach has occurred.</p>
          <p><strong className="text-white">10.2</strong> Audits will be:</p>
          <p>(a) conducted on reasonable prior written notice;</p>
          <p>(b) during normal business hours;</p>
          <p>(c) subject to confidentiality; and</p>
          <p>(d) limited to information relevant to Customer's Processing.</p>
          <p><strong className="text-white">10.3</strong> IV may satisfy audit requests by providing a reasonable third-party security report or written responses, where appropriate.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">11. Termination; Return/Deletion</h2>
          <p><strong className="text-white">11.1</strong> Upon termination or expiration of the Services, Customer may request return or deletion of Personal Data processed on Customer's behalf, unless retention is required by applicable law.</p>
          <p><strong className="text-white">11.2</strong> If Customer requests deletion, IV will delete Personal Data within a reasonable timeframe, subject to:</p>
          <p>(a) backup retention cycles; and</p>
          <p>(b) legal or security retention requirements.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">12. Liability; Indemnity</h2>
          <p><strong className="text-white">12.1 Limitation of Liability.</strong> To the maximum extent permitted by applicable law, each party's total aggregate liability arising out of or relating to this DPA will be subject to the limitations and exclusions of liability set out in the Terms. If the Terms do not specify a DPA-related cap, IV's total aggregate liability under this DPA will not exceed USD $100 or the fees paid by Customer to IV for the Services in the 12 months preceding the event giving rise to the claim, whichever is greater. Nothing in this DPA limits liability to the extent such limitation is prohibited by applicable law.</p>
          <p><strong className="text-white">12.2 Customer Indemnity.</strong> Customer will indemnify and hold IV harmless from third-party claims arising from Customer's content/data, Customer's instructions, or Customer's failure to comply with GDPR as Controller, except to the extent caused by IV's breach of its processor obligations under GDPR.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">13. Governing Law; Disputes</h2>
          <p>This DPA is governed by the governing law and dispute resolution provisions in the Terms, unless GDPR requires otherwise.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">14. Contact</h2>
          <p>
            Questions about this DPA:{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>
          </p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">ANNEX 1 — Processing Details</h2>

          <h3 className="text-lg font-semibold text-white mt-4">A. Subject Matter</h3>
          <p>Provision of the Services (e.g., company registration, profile management, analytics/visualization features, and related support).</p>

          <h3 className="text-lg font-semibold text-white mt-4">B. Duration</h3>
          <p>For the term of the Customer's use of the Services, plus any limited retention period necessary for legitimate operational purposes (e.g., backups, security, dispute resolution), unless a longer period is required by law.</p>

          <h3 className="text-lg font-semibold text-white mt-4">C. Nature and Purpose of Processing</h3>
          <p>Collection, storage, organization, aggregation, analysis, and display of Customer-provided and Customer-authorized data to provide the Services, including:</p>
          <p>- account creation and authentication;</p>
          <p>- company/profile registration and management;</p>
          <p>- analytics ingestion and reporting/visualization (e.g., GA4, Stripe, or similar integrations authorized by Customer);</p>
          <p>- security and abuse prevention.</p>

          <h3 className="text-lg font-semibold text-white mt-4">D. Types of Personal Data</h3>
          <p>May include (depending on what Customer submits or authorizes):</p>
          <p>- names, emails, usernames, profile photos, and profile information (e.g., role, background/education fields if provided);</p>
          <p>- company-related contact and profile details;</p>
          <p>- usage/activity data within the Services;</p>
          <p>- integration tokens or credentials provided by Customer (stored encrypted where applicable);</p>
          <p>- analytics or financial metrics derived from Customer-authorized integrations (which may include Personal Data depending on context).</p>

          <h3 className="text-lg font-semibold text-white mt-4">E. Categories of Data Subjects</h3>
          <p>- Customer's users and account administrators;</p>
          <p>- individuals included in company profiles submitted by Customer (e.g., founders/executives/team members);</p>
          <p>- other individuals whose Personal Data Customer chooses to submit to the Services.</p>

          <h3 className="text-lg font-semibold text-white mt-4">F. Special Categories of Data</h3>
          <p>Not intended to be processed. Customers should not submit special category data unless strictly necessary and agreed in writing.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">ANNEX 2 — Security Measures (Summary)</h2>
          <p>IV maintains a security program designed to protect Personal Data, which may include:</p>
          <p>- access controls and least-privilege permissions;</p>
          <p>- encryption in transit (e.g., TLS) for data transmission;</p>
          <p>- encryption at rest for sensitive secrets/tokens (e.g., GA4/Stripe access tokens) stored in IV's database;</p>
          <p>- logging/monitoring for security-relevant events;</p>
          <p>- backup and recovery procedures;</p>
          <p>- vulnerability and patch management practices appropriate to the Service.</p>
          <p>IV may update security measures over time as systems evolve.</p>

          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">ANNEX 3 — Sub-processors (Current)</h2>
          <p>The following Sub-processors may be used (depending on features enabled by Customer):</p>
          <p>- Supabase (hosting/database infrastructure)</p>
          <p>- Stripe (payment processing and/or financial data integrations, if enabled)</p>
          <p>- Google (analytics services such as Google Analytics/GA4, if enabled)</p>
          <p>IV may add or replace Sub-processors with notice under Section 6.3.</p>
        </div>
      </div>
    </div>
  );
}
