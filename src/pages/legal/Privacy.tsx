import { Link } from 'react-router-dom';

export function Privacy() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif mb-2">IV Privacy and Cookies Policy</h1>
        <p className="text-neutral-400 mb-8">Effective date: February 10, 2026</p>

        <div className="prose prose-invert prose-neutral max-w-none space-y-6 text-neutral-300">
          <p>
            We understand that your privacy is important, and we take it seriously. This Privacy and Cookies Policy ("Policy") explains IV's policies and procedures for how we collect, use, disclose, store, and protect your information when you use IV's services, websites, and applications (collectively, the "Services"). It also explains your privacy rights and how applicable laws may protect you. By accessing or using the Services, you consent to the collection, use, disclosure, and storage of your information as described in this Policy or as required by law. We do not use or disclose your personal information except as described herein, for operational necessities, or as mandated by legal obligations—IV assumes no liability for any use consistent with this Policy. Third-party websites or services linked through the Services (e.g., user-provided links to LinkedIn, GitHub, or integrations like Stripe Connect or Google Analytics 4) are subject to those third parties' terms of service and privacy policies; IV assumes no responsibility or liability for their practices, content, or security. Any capitalized terms not defined in this Policy have the meanings given in the IV <Link to="/terms" className="text-primary-400 hover:underline">Terms of Service</Link>, which are incorporated by reference.
          </p>
          <p>
            This Policy is intended to meet transparency duties under the New York SHIELD Act (Stop Hacks and Improve Electronic Data Security Act), the New York State Department of Financial Services cybersecurity rule (23 NYCRR 500), the federal Children's Online Privacy Protection Act (COPPA), the New York Child Data Protection Act (NYCDPA), and the General Data Protection Regulation (GDPR) where relevant. IV complies with these laws to the minimum extent required, assuming no additional liabilities beyond legal mandates. We will post any updates or changes to this Policy on this page, with material changes notified via email (if provided) or in-app alerts at least 30 days in advance where required by law (e.g., under SHIELD Act for security changes). Your continued use constitutes acceptance—IV assumes no liability for non-review.
          </p>
          <p>This Privacy and Cookies Policy is written to describe:</p>
          <ul className="list-none space-y-1">
            <li>(a) Who we are and how to contact us</li>
            <li>(b) Your rights related to your personal data (subject to verification and legal limits)</li>
            <li>(c) Your marketing communication choices</li>
            <li>(d) What personal data we collect (minimized for Services)</li>
            <li>(e) How and why we use your personal data (for operational efficiency)</li>
            <li>(f) How we use cookies and other tracking or profiling technologies (essentials only)</li>
            <li>(g) Who we share your personal data with (limited processors)</li>
            <li>(h) How long we keep your personal data (as needed, no liability for retention)</li>
            <li>(i) Where we store your personal data (US-based, minimal transfers)</li>
            <li>(g) How we protect your personal data (reasonable measures, no guarantees)</li>
            <li>(k) Our policy on children's privacy (strict limits, no liability for violations)</li>
            <li>(l) Links to other websites (no IV responsibility)</li>
            <li>(m) Changes to this Privacy and Cookies Policy</li>
            <li>(n). How We Use and Share Your Information</li>
          </ul>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">A. Who We Are and How to Contact Us</h2>
          <p>
            IV is a New York-based platform providing free core Services for company registration (e.g., submitting logos, names, descriptions, founding details, employee counts, categories, maturity stages), executive profiles (e.g., C-level photos, introductions, links), Member screens (e.g., filtered company lists with total registered companies), and integrations (e.g., read-only access to Stripe Connect or Google Analytics 4 data, stored securely via Supabase with tokenization). Our principal place of business is 3243 44TH APT 1F, ASTORIA, NY 11103-2339. For any questions, requests (e.g., data access/deletion), or complaints about this Policy or our data practices, contact us at <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>. We will respond to verifiable requests within legally required timeframes (e.g., 45 days under SHIELD Act for breaches), but IV reserves the right to verify identity, charge for excessive requests, or deny unfounded/non-mandatory ones without liability, in accordance with New York law. For GDPR (EU/UK users only), contact details are the same—IV minimizes EU data processing and assumes no extra-jurisdictional liabilities.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">B. Your Rights Related to Your Personal Data (Subject to Verification and Legal Limits)</h2>
          <p>
            You have certain rights regarding your personal data, subject to applicable laws, IV's operational needs, verification of your identity, and legal limits (e.g., retention for audits). Under NYCDPA (for New York minors under 18), SHIELD Act (data security), COPPA (under 13), and GDPR (if applicable to EU/UK users):
          </p>
          <p>
            <strong className="text-white">Access:</strong> Request confirmation of processing and a copy of your data (e.g., submitted company profiles or connected analytics)—IV may deny if burdensome or repetitive.
          </p>
          <p>
            <strong className="text-white">Correction:</strong> Request correction of inaccurate data (e.g., update founding dates or employee counts)—IV assumes no liability for uncorrected user-submitted errors.
          </p>
          <p>
            <strong className="text-white">Deletion:</strong> Request deletion of your data (e.g., remove executive profiles), though IV may retain anonymized/aggregated versions for internal use (e.g., service improvements) or as required by law (e.g., for audits under SHIELD Act). Public User Submissions (e.g., approved company listings) may persist if shared or cached by others—IV assumes no liability for incomplete deletion.
          </p>
          <p>
            <strong className="text-white">Opt-Out of Sale/Sharing:</strong> IV does not "sell" personal data under applicable definitions (NY has no CCPA equivalent), but you may opt-out of any targeted advertising (if implemented) or data sharing with processors (e.g., Supabase, Stripe)—IV reserves the right to continue essential sharing without liability.
          </p>
          <p>
            <strong className="text-white">Portability:</strong> Request transfer of your data in a structured format, where technically feasible—IV assumes no liability for compatibility issues.
          </p>
          <p>
            <strong className="text-white">Restriction/Objection:</strong> Object to processing for direct marketing or request restrictions, though IV may deny if processing is necessary for Services (e.g., storing tokenized data for graphs) or legal reasons—IV assumes no liability for denied requests.
          </p>
          <p>
            <strong className="text-white">Withdraw Consent:</strong> Withdraw consent at any time (e.g., revoke OAuth for Stripe/GA4), but this may limit or terminate Services—IV assumes no liability for resulting inaccessibility or data loss.
          </p>
          <p>
            To exercise rights, email <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a> with verifiable proof of identity (e.g., account details). IV will respond within 45 days (extendable under law), but reserves the right to charge fees for excessive/repetitive requests, deny those not legally required, or limit responses to minimize operational impact, without liability. For GDPR, you may complain to your supervisory authority, but IV minimizes exposure by limiting EU data processing. Under SHIELD Act, we report breaches if required, but assume no proactive monitoring duty. IV's liability for rights requests is limited to the maximum extent under New York law (nearly zero for non-mandatory actions).
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">C. Your Marketing Communication Choices</h2>
          <p>
            IV may send essential service-related communications (e.g., registration confirmations, updates to company lists, or security alerts under SHIELD Act). For optional marketing (if any, e.g., feature promotions or newsletters), you can opt-out at any time via unsubscribe links in emails or by emailing <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>. Opting out does not affect transactional or legal communications (e.g., policy updates). IV assumes no liability for unsolicited communications from third parties (e.g., via user-shared links like LinkedIn) or for delays in processing opt-outs.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">D. What Personal Data We Collect (Minimized for Services)</h2>
          <p>
            IV collects only the minimal personal data necessary to provide the Services, in line with data minimization principles under SHIELD Act and GDPR:
          </p>
          <p>
            <strong className="text-white">Account/Registration Data:</strong> Email address, username, password (hashed and tokenized via Supabase), and company-related details (e.g., logos, names, descriptions, founding dates/locations, employee counts, categories, maturity stages)—collected only if you submit them.
          </p>
          <p>
            <strong className="text-white">Executive Profiles:</strong> Names, titles, photos (optional), introductions, links (e.g., LinkedIn/X), school/major—voluntary and minimal.
          </p>
          <p>
            <strong className="text-white">Integration Data:</strong> Limited read-only data from Stripe (e.g., balances/transactions) or GA4 (e.g., metrics), via OAuth—IV does not collect or store modifiable/sensitive payment details, minimizing risk.
          </p>
          <p>
            <strong className="text-white">Usage Data:</strong> Automatically collected info like IP address, device type, browser, interactions (e.g., filtered Member screens, graph views)—aggregated/anonymized where possible for internal analytics only.
          </p>
          <p>
            <strong className="text-white">Cookies/Tracking:</strong> See below—essentials only, no unnecessary profiling.
          </p>
          <p>
            We do not collect sensitive data (e.g., racial/ethnic origin, health, biometrics) unless inadvertently submitted by you (e.g., in profiles)—IV assumes no liability for such unsolicited submissions and may delete them without notice. Data is collected automatically (e.g., logs for security under SHIELD Act) or via your voluntary input, with consent implied by use—IV minimizes collection to reduce liability.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6">Information You Directly Provide to Us</h3>
          <p>
            While using the Services, you may provide information that can identify you personally ("Personal Data"). The Personal Data we may collect includes:
          </p>
          <p>
            <strong className="text-white">Identity Data:</strong> first name, last name, former/previous name, username or similar identifier, password, marital status, title, date of birth, gender, and profile photo.
          </p>
          <p>
            <strong className="text-white">Contact Data:</strong> email address, home address, work address, billing address, and phone number.
          </p>
          <p>
            <strong className="text-white">Professional / Company Profile Data:</strong> educational and professional history, interests and achievements, completed projects; company pitch deck, company logo, employee count, category, company stage, company links (Website, GitHub, X, LinkedIn, YouTube); C-level team details (names, titles, education/work history); 5-minute intro video; Investor Q&A; and Google GA4 connection/data (where applicable).
          </p>
          <p>
            <strong className="text-white">Online Presence Data:</strong> links to public social media profiles, personal websites, login credentials for X or other third-party services (where applicable), and other online materials, including company links (Website, GitHub, X, LinkedIn, YouTube).
          </p>
          <p>
            <strong className="text-white">Financial Data:</strong> bank account details, payment card details, and Stripe connection/data (where applicable).
          </p>
          <p>
            <strong className="text-white">Transaction Data:</strong> details of payments to and from you, and details of subscriptions or Services you purchase from us (and, where applicable, transaction-related data with third parties, such as credit history).
          </p>
          <p>
            <strong className="text-white">Content Data:</strong> any content you post to the Services (including profiles, preferences, settings, questions, answers, messages, comments, and other contributions) and related metadata (such as when you posted it).
          </p>
          <p>
            <strong className="text-white">Marketing & Communications Data:</strong> your preferences for receiving marketing from us or third parties, your communication preferences, and the content of messages you send us (and our responses).
          </p>
          <p>
            <strong className="text-white">Behavioral Data:</strong> inferred or assumed information about your behavior and interests based on your online activity (often grouped into "segments").
          </p>
          <p>
            <strong className="text-white">Technical Data:</strong> Google Analytics 4 (GA4) data (where applicable), IP address, login data, browser type and version, time zone and location, browser plug-in types and versions, operating system and platform, and other device/technology information used to access the Services.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6">Personal Data from Third Party Sources</h3>
          <p>
            In addition to Personal Data we collect directly from you, we may also collect certain Personal Data from third parties (some of which may not be publicly available), including:
          </p>
          <p>
            <strong className="text-white">Social media sites:</strong> Identity Data, Contact Data, Online Presence Data
          </p>
          <p>
            <strong className="text-white">Our affiliates:</strong> Identity Data, Contact Data, Marketing & Communications Data, Behavioral Data, Transaction Data, Financial Data, Content Data
          </p>
          <p>
            <strong className="text-white">Analytics providers (e.g., Google Analytics 4):</strong> Behavioral Data, Technical Data, and GA4 Integration Data as described above
          </p>
          <p>
            <strong className="text-white">Payment processors (e.g., Stripe):</strong> Financial Data, Transaction Data, and Stripe Integration Data as described above
          </p>
          <p>
            <strong className="text-white">Advertisers:</strong> Behavioral Data, Technical Data
          </p>
          <p>
            <strong className="text-white">Data brokers:</strong> Identity Data, Contact Data, Behavioral Data, Technical Data, Online Presence Data
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">E. How and Why We Use Your Personal Data</h2>
          <p>
            IV uses your personal data solely for legitimate, operational purposes, minimizing processing and liability:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and maintain Services (e.g., display company cards in Member grids, generate graphs from tokenized Supabase data, process registrations).</li>
            <li>For internal operations and improvements (e.g., aggregate anonymized data for trends or debugging—IV owns and may use such aggregates without restriction or liability).</li>
            <li>For security and fraud prevention (e.g., tokenization/encryption under SHIELD Act to protect against breaches).</li>
            <li>For legal compliance (e.g., respond to subpoenas or audits—IV cooperates minimally and assumes no liability for outcomes).</li>
          </ul>
          <p>
            No automated decision-making or profiling that significantly affects you—IV assumes no liability for any incidental effects.
          </p>
          <p>
            Processing is based on your consent (via use), contractual necessity (for Services), or legitimate interests (e.g., security)—IV assumes no liability for your data use outcomes (e.g., business decisions from graphs or lists).
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">F. How We Use Cookies and Other Tracking or Profiling Technologies</h2>
          <p>
            IV limits its use of cookies and similar technologies (e.g., session storage or local storage) to only those strictly necessary for fundamental operations, such as maintaining user sessions (e.g., preserving logins for Member screens or graph rendering) and performing basic, aggregated analytics (e.g., anonymized monitoring of interactions like filter usage on company lists to assess general system performance). We avoid third-party advertising trackers, sophisticated user profiling, or any optional tools that gather excess data. Under New York law (including the SHIELD Act, which emphasizes data security without mandating specific cookie consents), no explicit opt-in is required for these essential technologies—your continued access and use of the Services constitutes implied consent, consistent with U.S. consumer protection standards (e.g., FTC guidelines that prioritize clear disclosure over mandatory prompts for functional cookies). For users from any international jurisdictions, applicable local laws govern at your own risk—IV does not target non-U.S. users and assumes no proactive duty to comply with or adapt to foreign regulations, limiting all liability accordingly. Should any non-essential technologies be added in the future (e.g., for voluntary enhancements), you can opt-out by contacting <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>, with effects implemented as soon as practicable—IV assumes no liability for processing delays or previous applications. All cookie-related data is kept to a minimum and protected (e.g., through tokenization in Supabase), but IV provides no absolute security guarantees and disclaims all responsibility for any potential risks, incidents, breaches, or third-party involvements, to the fullest extent permitted under New York and U.S. law.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">G. Who We Share Your Personal Data With</h2>
          <p>
            Sharing is strictly limited to operational necessities, minimizing IV's exposure:
          </p>
          <p>
            <strong className="text-white">1. Service Providers/Processors:</strong> Trusted vendors like Supabase (for secure, tokenized storage), Stripe (for integrations—read-only data only), or Google (for GA4)—bound by strict contracts requiring data protection equivalent to SHIELD Act standards; IV assumes no liability for their independent actions.
          </p>
          <p>
            <strong className="text-white">2. Legal/Regulatory:</strong> Shared with authorities if required by law (e.g., subpoenas, SHIELD Act breach reports)—IV notifies you where legally permitted but assumes no liability for non-notification.
          </p>
          <p>
            <strong className="text-white">3. Business Transfers:</strong> In mergers/acquisitions, data may transfer—IV assumes no liability for successor practices.
          </p>
          <p>
            <strong className="text-white">4. No Sales or Broad Sharing:</strong> IV does not sell, rent, or broadly share personal data; aggregated/anonymized data may be used internally without identifying you—IV assumes no liability for de-anonymization risks.
          </p>
          <p>
            <strong className="text-white">5. Affiliates/Service Providers:</strong> For internal ops (e.g., Supabase for tokenized storage)—IV oversees but assumes no liability for vendor issues.
          </p>
          <p>
            <strong className="text-white">6. Professional Advisers:</strong> For legal/compliance support (e.g., auditors under SHIELD Act)—minimal disclosure, with IV assuming no liability for advice outcomes.
          </p>
          <p>
            <strong className="text-white">7. API Users/Business Partners:</strong> For authorized integrations (e.g., Stripe/GA4 metrics)—user-initiated, with IV assuming no liability for partner misuse.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">H. How Long We Keep Your Personal Data (As Needed, No Liability for Retention)</h2>
          <p>
            Personal data is retained only as long as necessary for Services (e.g., while your account is active) or legal requirements (e.g., 7 years for financial audits under NY law, or SHIELD Act compliance logs). Deletion requests are honored promptly where feasible, but IV may retain anonymized/aggregated versions for internal use or backups—IV assumes no liability for incomplete deletion, retention periods, or any resulting issues (e.g., data in cached company lists).
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">I. Where We Store Your Personal Data</h2>
          <p>
            All personal data is stored in the United States (NY-based servers and Supabase infrastructure), with strong security measures under SHIELD Act. For any minimal international transfers (e.g., to EU for GDPR users), we use Standard Contractual Clauses or equivalent safeguards—IV minimizes such transfers and assumes no liability for data locality, cross-border risks, or jurisdictional claims.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">G. How We Protect Your Personal Data</h2>
          <p>
            IV implements reasonable administrative, technical, and physical safeguards (e.g., encryption, access controls, tokenization via Supabase, regular audits) to protect personal data, in compliance with SHIELD Act and NY DFS rules (23 NYCRR 500). However, no system is completely secure—IV provides no guarantees against breaches, unauthorized access, or data loss, and assumes no liability for any incidents, damages, or losses arising therefrom, even if advised of the possibility. In the event of a breach (as defined under SHIELD Act), IV will notify affected individuals only if required by law, without additional obligations. Report suspected incidents to <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>—IV assumes no proactive monitoring duty.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">K. Our Policy on Children's Privacy</h2>
          <p>
            IV complies with COPPA (no knowing collection from under 13) and NYCDPA (restricted processing for under 18 in NY). The Services are not directed to children under 13 (or 18 in NY for certain processing)—if under 13, do not use or provide data. For 13-17, we require informed opt-in consent for non-essential processing (e.g., marketing) and minimize data use. If we discover unauthorized child data, we delete it promptly—IV assumes no liability for unauthorized access by minors, parental failures, or any resulting claims; contact us at <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a> to report.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">L. Links to Other Websites</h2>
          <p>
            The Services may include links to third-party sites (e.g., user-submitted LinkedIn/X/YouTube links opening in new windows, or integrations like Stripe/GA4)—these are for convenience only. IV does not endorse, control, or assume any responsibility or liability for their content, privacy practices, security, or terms. Your interactions with third parties are at your own risk—review their policies before clicking or sharing data; IV assumes no liability for any issues, losses, or breaches arising from linked sites.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">M. Changes to This Privacy and Cookies Policy</h2>
          <p>
            We may update this Policy at any time to reflect changes in practices, laws (e.g., SHIELD Act amendments), or Services. Updates will be posted here with a new effective date. For material changes (e.g., new data uses), we provide notice via email (if available) or in-app alerts, at least 30 days in advance where required (e.g., under NY law for security impacts). Your continued use constitutes acceptance—IV assumes no liability for your failure to review changes or any resulting impacts.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-2xl font-semibold text-white">N. How We Use and Share Your Information</h2>

          <h3 className="text-xl font-semibold text-white mt-6">Legal Basis / Permitted Purposes (New York / U.S.)</h3>
          <p>
            In New York and the U.S., IV limits data processing to what is allowed under laws like the SHIELD Act (for security) and NYCDPA (for minors), focusing on:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Fulfilling Service delivery (e.g., storing tokenized data via Supabase to generate read-only views).</li>
            <li>Legitimate operational needs (e.g., fraud detection or anonymized analytics to maintain efficiency)—balanced against your interests but prioritized for IV's protection.</li>
            <li>Legal compliance (e.g., responding to subpoenas with minimal disclosure).</li>
            <li>Your implied consent through use (revocable, but revocation may end access—IV assumes no liability for disruptions).</li>
          </ul>
          <p>
            IV processes data only when these bases apply, minimizing liability for any interpretations or claims.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6">Purposes for Using Personal Data</h3>

          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="border-b border-neutral-800 pb-4">
                <h4 className="text-white font-semibold mb-2">Purpose</h4>
                <p className="text-sm text-neutral-400">Delivering, Updating, and Maintaining Services/Site/Business</p>
                <p className="mt-2"><strong className="text-white">Why We Do This:</strong> To handle core functions like processing company registrations, displaying profiles in Member grids, or aggregating metrics for graphs—IV restricts to operational basics, assuming no liability for user reliance or errors.</p>
              </div>

              <div className="border-b border-neutral-800 pb-4">
                <h4 className="text-white font-semibold mb-2">Purpose</h4>
                <p className="text-sm text-neutral-400">Processing Payments (If Applicable)</p>
                <p className="mt-2"><strong className="text-white">Why We Do This:</strong> For future premium features, to secure transactions via Stripe—IV does not handle sensitive card data, minimizing risk and liability for fraud or disputes.</p>
              </div>

              <div className="border-b border-neutral-800 pb-4">
                <h4 className="text-white font-semibold mb-2">Purpose</h4>
                <p className="text-sm text-neutral-400">Research and Development</p>
                <p className="mt-2"><strong className="text-white">Why We Do This:</strong> To refine Services through anonymized usage patterns (e.g., aggregate filter trends)—IV owns results and assumes no liability for derived insights or their applications.</p>
              </div>

              <div className="border-b border-neutral-800 pb-4">
                <h4 className="text-white font-semibold mb-2">Purpose</h4>
                <p className="text-sm text-neutral-400">Communicating with Users About Services</p>
                <p className="mt-2"><strong className="text-white">Why We Do This:</strong> For essential alerts (e.g., approval notices or security updates under SHIELD Act)—non-opt-out, with IV assuming no liability for delivery failures.</p>
              </div>

              <div className="border-b border-neutral-800 pb-4">
                <h4 className="text-white font-semibold mb-2">Purpose</h4>
                <p className="text-sm text-neutral-400">Providing Customer Support</p>
                <p className="mt-2"><strong className="text-white">Why We Do This:</strong> To address queries or fix issues (e.g., OAuth revocations)—limited to verified requests, with IV assuming no liability for unresolved matters.</p>
              </div>

              <div className="border-b border-neutral-800 pb-4">
                <h4 className="text-white font-semibold mb-2">Purpose</h4>
                <p className="text-sm text-neutral-400">Enhancing Security</p>
                <p className="mt-2"><strong className="text-white">Why We Do This:</strong> To safeguard against threats (e.g., tokenization in Supabase)—per SHIELD Act, but IV provides no guarantees and assumes no liability for incidents.</p>
              </div>

              <div className="border-b border-neutral-800 pb-4">
                <h4 className="text-white font-semibold mb-2">Purpose</h4>
                <p className="text-sm text-neutral-400">Marketing, Promoting, and Driving Engagement</p>
                <p className="mt-2"><strong className="text-white">Why We Do This:</strong> For optional promotions (e.g., new integration tips)—opt-out available, with IV assuming no liability for perceived intrusions.</p>
              </div>

              <div className="pb-4">
                <h4 className="text-white font-semibold mb-2">Purpose</h4>
                <p className="text-sm text-neutral-400">Complying with Law, Legal Process, and Protecting Interests</p>
                <p className="mt-2"><strong className="text-white">Why We Do This:</strong> To meet obligations (e.g., audits) or defend rights—IV discloses minimally and assumes no liability for legal outcomes or third-party actions.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mt-6">What Happens When You Do Not Provide Necessary Personal Data?</h3>
          <p>
            If you withhold required data (e.g., email for registration or OAuth for integrations), IV may be unable to deliver Services (e.g., no graph generation or list access). In such cases, we may suspend/terminate your account without liability—IV assumes no responsibility for any inconveniences, losses, or alternative arrangements you must make.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6">How We Use Cookies and Other Tracking or Profiling Technologies</h3>
          <p>
            IV employs only basic tracking tools (e.g., session identifiers for login persistence or log files for error detection) to ensure minimal functionality, avoiding advanced profiling. These capture non-identifiable details like connection type or page loads, with no broad surveillance. Under NY law, no prior consent needed for essentials; browser controls available, but disabling may disrupt features (e.g., Member filters)—IV assumes no liability for impaired access or your settings choices.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6">Additional Disclosures on Data Sharing</h3>
          <p>
            <strong className="text-white">Business Transfers:</strong> Data may transfer in corporate events (e.g., sale)—IV provides no separate consent and assumes no liability for successor handling.
          </p>
          <p>
            <strong className="text-white">Publicly Available Content:</strong> Submitted public data (e.g., approved company profiles) is viewable by Members—IV assumes no liability for exposure or third-party use.
          </p>
          <p>
            <strong className="text-white">Access by Designated Third Parties:</strong> Authorized Members may view your submissions (e.g., lists)—IV assumes no liability for their actions or decisions.
          </p>
          <p>
            <strong className="text-white">Links to Other Websites:</strong> External links (e.g., user-provided URLs) are not IV-controlled—IV assumes no liability for any data shared via them.
          </p>

          <hr className="border-neutral-800" />

          <h2 className="text-xl font-semibold text-white">Related Policies</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><Link to="/terms" className="text-primary-400 hover:underline">Terms of Service</Link></li>
            <li><Link to="/copyright" className="text-primary-400 hover:underline">Copyright Dispute Policy</Link></li>
            <li><Link to="/dpa" className="text-primary-400 hover:underline">Data Processing Addendum (DPA)</Link></li>
          </ul>

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
