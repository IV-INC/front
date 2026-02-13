import { Link } from 'react-router-dom';

export function Terms() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-sm text-neutral-400 uppercase tracking-wider mb-4">
          PLEASE NOTE THAT YOUR USE OF AND ACCESS TO OUR SERVICES (DEFINED BELOW) ARE SUBJECT TO THE FOLLOWING TERMS; IF YOU DO NOT AGREE TO ALL OF THE FOLLOWING, YOU MAY NOT USE OR ACCESS THE SERVICES IN ANY MANNER.
        </p>

        <h1 className="text-3xl font-serif mb-2">IV Terms of Service</h1>
        <p className="text-neutral-400 mb-8">Effective date: February 10, 2026</p>

        <div className="prose prose-invert prose-neutral max-w-none space-y-6 text-neutral-300">
          <p>
            Welcome to IV. Please read this document to understand the rules and restrictions that govern your use of our website, products, services, and applications (collectively, the "Services"). If you have any questions, comments, or concerns regarding these Terms or the Services, please contact us at <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a> or 3243 44TH APT 1F, ASTORIA, NY 11103-2339.
          </p>
          <p>
            These Terms of Service ("Terms") are a legally binding contract between you and IV ("IV," "we," "us," or "our"). You must agree to and accept all of these Terms to use the Services. By accessing or using the Services in any way, you agree to these Terms, and they will remain in effect while you use the Services. These Terms include the provisions in this document, as well as our{' '}
            <Link to="/privacy" className="text-primary-400 hover:underline">Privacy and Cookies Policy</Link> and{' '}
            <Link to="/copyright" className="text-primary-400 hover:underline">Copyright Dispute Policy</Link>{' '}
            (collectively, the "Additional Policies"), which are incorporated by reference.
          </p>

          {/* Will these Terms ever change? */}
          <h2 className="text-xl font-semibold text-white">Will these Terms ever change?</h2>
          <p>
            We are constantly improving the Services, so these Terms may change from time to time to reflect those improvements, changes in law, or other business needs. We reserve the right to modify these Terms at any time.
          </p>
          <p>We will notify you of any changes by:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Posting the updated Terms on our website (or the applicable domain)</li>
            <li>Sending an email to the address associated with your account (if provided)</li>
            <li>Through in-app notifications, dashboard alerts, or other prominent means in the Services</li>
          </ul>
          <p>
            For <strong className="text-white">non-material changes</strong>, the updated Terms become effective immediately upon posting.
          </p>
          <p>
            For <strong className="text-white">material changes</strong> (such as significant reductions in functionality, new fees, material expansions in data usage rights, or other changes that substantially affect your rights or obligations), we will provide <strong className="text-white">reasonable advance notice</strong> — at least 30 days before the changes take effect (or longer if required by applicable law).
          </p>
          <p>
            If you do not agree to the updated Terms, you may reject them by ceasing to use the Services and/or terminating your account. However, if you continue to access or use the Services after the effective date of the changes, you agree to be bound by the updated Terms.
          </p>

          {/* Privacy & Security */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Privacy & Security</h2>
          <p>
            IV takes your privacy very seriously. Our latest{' '}
            <Link to="/privacy" className="text-primary-400 hover:underline">Privacy and Cookies Policy</Link>{' '}
            explains how we collect, use, disclose, store, and protect your personal information, including data accessed and stored from integrations like Stripe Connect and Google Analytics 4. We comply with applicable privacy and data security laws, including the federal Children's Online Privacy Protection Act (COPPA), New York's Child Data Protection Act (NYCDPA), the New York SHIELD Act, and the General Data Protection Regulation (GDPR) where relevant.
          </p>
          <p>
            The Children's Online Privacy Protection Act (COPPA) requires online service providers to obtain verifiable parental consent before knowingly collecting personal information from children under 13 years of age. We do not knowingly collect or solicit personal information from children under 13. If you are under 13, please do not attempt to register for the Services, use the Services, or send us any personal information.
          </p>
          <p>
            In addition, under New York's Child Data Protection Act (NYCDPA), which applies to users in New York State under 18 years of age:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>For users under 13, we process personal information only in compliance with COPPA.</li>
            <li>For users aged 13 to 17, we restrict processing of personal information unless we have obtained informed opt-in consent from the user or the processing is strictly necessary for limited purposes.</li>
          </ul>
          <p>
            If you believe a child under 13 (or a minor under 18 in New York) has provided us with personal information, please contact us immediately at <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>.
          </p>

          {/* Stripe Connect Integration */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Stripe Connect Integration</h2>
          <p>
            Certain features of the Services use Stripe Connect to access limited data from your Stripe account. We access your Stripe account solely via OAuth with the read_only scope, meaning we can view (but not modify or initiate transactions on) certain account data, such as balances, transactions, or payouts, strictly as necessary to provide the Services.
          </p>
          <p>By connecting your Stripe account to IV via OAuth, you authorize us to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access read-only data from your Stripe account.</li>
            <li>Store and aggregate this data on our servers for the purpose of providing analytics, insights, and visualizations within the Services.</li>
            <li>Use the stored data internally to generate reports and graphs that are displayed exclusively to you (the account owner) or authorized users within your organization.</li>
          </ul>
          <p>
            If you revoke our access to your Stripe account (e.g., by disconnecting OAuth), certain features may become unavailable immediately, and your account registration may be fully deregistered approximately 5 days after revocation to allow for data cleanup and compliance checks.
          </p>

          {/* Google Analytics 4 Integration */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Google Analytics 4 Integration</h2>
          <p>
            Certain features of the Services may integrate with Google Analytics 4 (GA4) to access limited analytics data from your GA4 property (e.g., traffic, user behavior, event metrics). We access your GA4 data solely via OAuth with read-only scopes, meaning we can view (but not edit, manage, or delete) data strictly as necessary to provide the Services.
          </p>
          <p>By connecting your Google account and authorizing GA4 access, you authorize us to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access read-only data from your GA4 property.</li>
            <li>Store and aggregate this data on our servers for the purpose of providing analytics, insights, and visualizations within the Services.</li>
            <li>Use the stored data internally to generate reports and graphs that are displayed exclusively to you or authorized users within your organization.</li>
          </ul>
          <p>
            If you revoke our access to your GA4 property (e.g., by disconnecting OAuth), certain features may become unavailable immediately, and your account registration may be fully deregistered approximately 5 days after revocation.
          </p>

          {/* Intellectual Property & Copyright */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Intellectual Property & Copyright</h2>
          <p>
            All content on the Services is owned by IV or our licensors and protected by copyright, trademark, and other laws. Our{' '}
            <Link to="/copyright" className="text-primary-400 hover:underline">Copyright Dispute Policy</Link>{' '}
            outlines how we handle copyright claims, including DMCA notices. For DMCA inquiries, contact our Designated Agent at the address or email above.
          </p>

          {/* Basics of Using IV */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Basics of Using IV</h2>
          <p>
            To use the Services, you may be required to sign up for an account and select a password and username ("IV User ID"). You agree to provide us with accurate, complete, and updated registration information about yourself. You may not select as your IV User ID a name that you do not have the right to use, that impersonates another person, or that infringes any trademark, copyright, or other proprietary right.
          </p>
          <p>
            You represent and warrant that you are at least 18 years of age (or the age of legal majority in your jurisdiction) and have the legal capacity to form a binding contract. If you are under 18 but at least 13 years old, you may use the Services only with verifiable consent from your parent or legal guardian.
          </p>
          <p>
            You must not share your account credentials with anyone and are responsible for maintaining the security of your account, including using strong, unique passwords and enabling multi-factor authentication (if available).
          </p>

          {/* Additional Restrictions */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Additional Restrictions</h2>
          <p>You represent, warrant, and agree that you will not use the Services in a manner that:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Infringes or violates intellectual property rights or any other rights of anyone else</li>
            <li>Violates any law or regulation, including applicable data protection laws</li>
            <li>Is harmful, fraudulent, deceptive, threatening, harassing, defamatory, or obscene</li>
            <li>Jeopardizes the security of your IV account or connected third-party accounts</li>
            <li>Attempts to obtain the password, account, or OAuth tokens of any other user</li>
            <li>Violates the security of any computer network or cracks any passwords</li>
            <li>"Crawls," "scrapes," or "spiders" any page, data, or portion of the Services</li>
            <li>Falsifies or impersonates company details or executive profiles</li>
            <li>Decompiles, reverse engineers, or attempts to obtain the source code of the Services</li>
          </ul>

          {/* Content and Intellectual Property */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Content and Intellectual Property</h2>
          <p>
            All Content is protected by copyright, trademark, and other intellectual property laws. You may not use, copy, reproduce, modify, or otherwise exploit any Content that you do not own without prior written consent.
          </p>
          <p>
            <strong className="text-white">Your Rights to Your Content:</strong> When you submit User Content, you retain all ownership rights. However, by submitting it, you grant IV a worldwide, non-exclusive, royalty-free, transferable, sublicensable license to use, store, reproduce, display, distribute, and modify your User Content as necessary to provide the Services.
          </p>
          <p>
            If you believe any Content on the Services infringes your intellectual property rights, please refer to our{' '}
            <Link to="/copyright" className="text-primary-400 hover:underline">Copyright Dispute Policy</Link>{' '}
            for DMCA notice procedures.
          </p>

          {/* Fees and Paid Features */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Fees and Paid Features</h2>
          <p>
            The Services are currently provided free of charge. We do not currently sell goods or paid subscriptions through the Site, and no payment information is required to use the Services.
          </p>
          <p>
            We may introduce paid features or services in the future. If we do, we will provide notice and any applicable additional terms before you are required to pay for any feature, providing at least 30 days' notice for material fee introductions.
          </p>

          {/* DPA */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Data Processing</h2>
          <p>
            If you are a paying subscriber to the Services, and to the extent that IV processes any Personal Data subject to the GDPR on your behalf, the{' '}
            <Link to="/dpa" className="text-primary-400 hover:underline">Data Processing Addendum (DPA)</Link>{' '}
            is incorporated by reference and will apply.
          </p>

          {/* Governing Law & Dispute Resolution */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Governing Law & Dispute Resolution</h2>
          <p>
            These Terms are governed by and will be construed under the laws of the State of New York, without regard to its conflicts of laws provisions. Any dispute shall be finally settled in New York County, New York, in English, in accordance with the Streamlined Arbitration Rules and Procedures of JAMS.
          </p>
          <p className="font-semibold text-white">
            Class Action Waiver: YOU AND IV ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION. ALL CLAIMS AND DISPUTES MUST BE ARBITRATED ON AN INDIVIDUAL BASIS.
          </p>

          {/* Limitation of Liability */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IV WILL NOT BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES OF ANY KIND. IV's total liability shall not exceed the greater of USD $100 or the amounts paid by you to IV in the twelve (12) months preceding the claim.
          </p>

          {/* Disclaimer of Warranties */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Disclaimer of Warranties</h2>
          <p>
            THE SERVICES AND CONTENT ARE PROVIDED ON AN "AS-IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR TITLE.
          </p>

          {/* Termination */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Termination</h2>
          <p>
            You may stop using the Services at any time by contacting us at <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>. IV may also terminate or suspend your use of the Services for any reason in our sole discretion, including your breach of these Terms.
          </p>

          {/* Indemnity */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Indemnity</h2>
          <p>
            You agree to indemnify, defend, and hold harmless IV, its affiliates, officers, directors, employees, agents, partners, and licensors from and against any third-party claims arising from your use of the Services, your violation of these Terms, or any Content you submit.
          </p>

          {/* Entire Agreement */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Entire Agreement</h2>
          <p>
            These Terms, together with the{' '}
            <Link to="/privacy" className="text-primary-400 hover:underline">Privacy and Cookies Policy</Link> and{' '}
            <Link to="/copyright" className="text-primary-400 hover:underline">Copyright Dispute Policy</Link>,
            constitute the complete, final, and exclusive statement of the mutual understanding between you and IV regarding the Services, superseding all prior agreements.
          </p>

          {/* Contact */}
          <hr className="border-neutral-800" />
          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>
            For questions about these Terms, please contact us at{' '}
            <a href="mailto:williamp2904@gmail.com" className="text-primary-400 hover:underline">williamp2904@gmail.com</a>{' '}
            or 3243 44TH APT 1F, ASTORIA, NY 11103-2339.
          </p>
        </div>
      </div>
    </div>
  );
}
