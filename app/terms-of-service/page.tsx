import LegalPageLayout from '@/components/legal-page-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ViewMarket',
  description: 'Terms and conditions governing the use of ViewMarket services and platform.',
}

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          By accessing and using our platform, you accept and agree to be bound by the terms and provision of this 
          agreement. If you do not agree to abide by the above, please do not use this service. These terms constitute 
          a legally binding agreement between you and ViewMarket, and they govern your use of all services, features, 
          and content available through our platform. Your continued use of the platform constitutes ongoing acceptance 
          of these terms, including any modifications we may make from time to time. We recommend that you review these 
          terms regularly to ensure you understand the current conditions governing your use of our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">User Accounts and Registration</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To access certain features of our platform, you must register for an account and provide accurate, complete, 
          and current information about yourself. You are responsible for maintaining the confidentiality of your account 
          credentials and for all activities that occur under your account. You agree to notify us immediately of any 
          unauthorized use of your account or any other breach of security. We reserve the right to suspend or terminate 
          accounts that violate these terms or engage in fraudulent, abusive, or illegal activities. You may not create 
          multiple accounts, use another person's account without permission, or transfer your account to another party 
          without our prior written consent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Acceptable Use Policy</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You agree to use our platform only for lawful purposes and in accordance with these terms. You may not use 
          the platform to transmit, distribute, or store content that is illegal, harmful, threatening, abusive, 
          defamatory, or otherwise objectionable. You also agree not to interfere with or disrupt the platform or 
          servers connected to the platform, or to violate any requirements, procedures, policies, or regulations 
          of networks connected to the platform. Prohibited activities include but are not limited to hacking, 
          spamming, distributing malware, engaging in fraudulent activities, or attempting to gain unauthorized 
          access to other users' accounts or our systems.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Payment Terms and Billing</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Certain features or services on our platform may require payment of fees. By subscribing to paid services, 
          you agree to pay all applicable fees and charges incurred by you or on your behalf through the platform. 
          All fees are non-refundable unless otherwise specified in our refund policy. We reserve the right to change 
          our pricing at any time, with reasonable notice provided to existing subscribers. Payment information must 
          be current, complete, and accurate, and you must promptly update all payment information to keep your 
          account current. Failure to pay fees when due may result in suspension or termination of your account 
          and access to paid services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The platform and its original content, features, and functionality are owned by ViewMarket and are protected 
          by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may 
          not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, 
          download, store, or transmit any of our content without our prior written consent. You retain ownership of 
          any content you submit to the platform, but you grant us a worldwide, non-exclusive, royalty-free license 
          to use, reproduce, modify, and distribute such content in connection with operating and providing the platform. 
          We respect the intellectual property rights of others and expect our users to do the same.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Privacy and Data Protection</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Your privacy is important to us. Our collection, use, and disclosure of your personal information is governed 
          by our Privacy Policy, which is incorporated into these terms by reference. By using the platform, you consent 
          to the collection and use of your information as described in our Privacy Policy. We implement appropriate 
          technical and organizational measures to protect your personal data, but we cannot guarantee the security of 
          any information you transmit to us over the internet. You are responsible for maintaining the security of 
          your account credentials and for any activities that occur under your account. Please review our Privacy 
          Policy regularly to understand how we handle your personal information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Termination</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We may terminate or suspend your account and access to the platform immediately, without prior notice or 
          liability, for any reason whatsoever, including without limitation if you breach these terms. Upon termination, 
          your right to use the platform will cease immediately, and any data associated with your account may be 
          deleted. You may also terminate your account at any time by following the account closure process outlined 
          in your account settings. Termination does not relieve you of any obligations incurred prior to termination, 
          and certain provisions of these terms will survive termination, including those relating to intellectual 
          property, disclaimers, limitations of liability, and governing law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Modifications to Terms</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We reserve the right to modify or replace these terms at any time at our sole discretion. If a revision 
          is material, we will provide at least 30 days notice prior to any new terms taking effect. Material changes 
          will be communicated through the platform, email, or other appropriate means. Your continued use of the 
          platform after any such changes constitutes your acceptance of the new terms. If you do not agree to the 
          new terms, you must stop using the platform. We encourage you to review these terms periodically to stay 
          informed of any updates. The most current version of these terms will always be available on our platform 
          and will supersede all previous versions.
        </p>
      </section>
    </LegalPageLayout>
  )
}