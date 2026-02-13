import { Link } from 'react-router-dom';

export function CopyrightDispute() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif mb-2">IV Copyright Dispute Policy</h1>
        <p className="text-neutral-400 mb-8">Effective date: February 10, 2026</p>

        <div className="prose prose-invert prose-neutral max-w-none space-y-6 text-neutral-300">
          <p>
            IV respects intellectual property rights and does not permit copyright infringement on our Services (as defined in the{' '}
            <Link to="/terms" className="text-primary-400 hover:underline">Terms of Service</Link>). IV hosts user-generated content (UGC) but does not verify or guarantee the copyright validity of any submitted material. All responsibility for copyright compliance lies solely with the user. IV has no obligation to monitor or pre-screen any user-submitted logos, data, or other content for copyright infringement or any other issues.
          </p>
          <p>
            Submitted data is limited to company registration requirements, plus graphed information from Stripe Connect and Google Analytics 4 (GA4) integrations, which may be exposed to third parties (e.g., investors or authorized users via dashboards or visualizations). IV does not guarantee the authenticity of user-linked Stripe/GA4 data and assumes no liability for any third-party damages resulting from reliance on inaccurate or manipulated data.
          </p>

          {/* Types of Submitted Data */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Types of Submitted Data</h2>

          <h3 className="text-lg font-semibold text-white">Company Basic Info</h3>
          <p>
            Company logo (square image recommended; user must confirm copyright ownership), company name (required), one-line description (10-100 characters), founding date, founding location, employee count (selection from '1~10', '10~100', '100~1000', '1000~10000', '10000+'), company introduction (1,000-10,000 characters), category (e.g., 'AI/ML', 'Fintech', 'Edtech', 'CleanTech'), maturity ('Pre-seed' to 'Series C+'), company links (website/GitHub/LinkedIn/X(Twitter)/YouTube; displayed as small icon buttons opening in new windows).
          </p>

          <h3 className="text-lg font-semibold text-white">C-level Executive Input</h3>
          <p>
            CEO profile photo (recommended; user must confirm copyright), CEO introduction (text; required/recommended adjustable), CEO links (LinkedIn/X recommended), additional C-levels (name/title/profile photo optional/introduction optional/LinkedIn/X links optional/school/major optional; displayed in investor detail view right-side executive box with SNS icons linking externally).
          </p>

          <h3 className="text-lg font-semibold text-white">Other</h3>
          <p>
            Company introduction video (optional; user must confirm copyright), company news (optional), executive names/emails (optional; subject to{' '}
            <Link to="/privacy" className="text-blue-400 hover:underline bg-blue-400/10 px-1 py-0.5 rounded">Privacy and Cookies Policy</Link>).
          </p>

          <h3 className="text-lg font-semibold text-white">Integrated Data Visualizations</h3>
          <p>
            Graphed information from Stripe Connect (e.g., read-only balances/transactions/payouts visualized as graphs/dashboards) and GA4 (e.g., traffic/user behavior/event metrics visualized); this data may be exposed to third parties within the Services for analytics/insights, strictly as necessary and per user authorization. IV does not verify or assume liability for any copyrighted elements in graphed data.
          </p>

          <p>
            Users must confirm ownership or permission for all content upon submission, including any copyrighted elements in graphed Stripe/GA4 data. IV provides content "AS-IS" with no warranties, and all infringement risks (e.g., lawsuits, damages) are borne by the user (see{' '}
            <Link to="/terms" className="text-primary-400 hover:underline">Terms' Disclaimer of Warranties and Limitation of Liability</Link>). IV assumes zero liability for user-submitted or graphed data.
          </p>

          {/* Reporting Procedure */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Reporting Procedure</h2>
          <p>
            If you believe user-submitted content (e.g., logo, profile photo, video, or graphed Stripe/GA4 visualizations) infringes your copyright, submit a report via email to{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>{' '}
            (or mail: 3243 44TH APT 1F, ASTORIA, NY 11103-2339). IV will review reports in its sole discretion.
          </p>

          <h3 className="text-lg font-semibold text-white">Required Info</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Description of the infringed work (e.g., original logo or data source)</li>
            <li>Location on IV Services (specific URL or company name)</li>
            <li>Your contact details (name, email, phone)</li>
            <li>Simple evidence of infringement (e.g., original link or proof of ownership)</li>
          </ul>
          <p>
            IV will act in its sole discretion, which may include content removal, account suspension, or termination. IV's decisions are final and incur no liability.
          </p>

          {/* Repeat Infringer Policy */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Repeat Infringer Policy</h2>
          <p>
            In cases of repeated copyright infringement (e.g., multiple valid reports against the same user or account), IV will, in its sole discretion, take escalating actions such as temporary suspension, permanent account termination, or restriction of service access to prevent further risks. IV assumes no liability for any consequences of such actions.
          </p>

          {/* Counter-Notice */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Counter-Notice</h2>
          <p>
            If your content is removed, submit an objection via the above email, including your contact details, description of the removed content, and why it should be restored (e.g., non-infringement evidence). IV will decide restoration in its sole discretion, with no liability.
          </p>

          <hr className="border-neutral-800" />
          <p>
            IV does not encourage infringement and processes reports in good faith but bears no responsibility for outcomes. Policy changes will be posted; continued use constitutes agreement.
          </p>

          {/* Related Policies */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Related Policies</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><Link to="/terms" className="text-primary-400 hover:underline">Terms of Service</Link></li>
            <li><Link to="/privacy" className="text-blue-400 hover:underline bg-blue-400/10 px-1 py-0.5 rounded">Privacy and Cookies Policy</Link></li>
            <li><Link to="/dpa" className="text-primary-400 hover:underline">Data Processing Addendum (DPA)</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
