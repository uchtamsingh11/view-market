import LegalPageLayout from '@/components/legal-page-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ViewMarket',
  description: 'Learn how ViewMarket collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We collect information you provide directly to us, such as when you create an account, make a purchase, 
          or contact us for support. This may include your name, email address, phone number, payment information, 
          and any other information you choose to provide. We also automatically collect certain information about 
          your device and how you interact with our services, including your IP address, browser type, operating 
          system, and usage patterns. Additionally, we may collect information from third-party sources to enhance 
          our services and provide you with a better experience.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We use the information we collect to provide, maintain, and improve our services, process transactions, 
          and communicate with you about your account and our services. This includes sending you important updates, 
          security alerts, and promotional materials that may be of interest to you. We also use your information 
          to personalize your experience, analyze usage patterns, and develop new features and services. Our goal 
          is to ensure that our platform remains secure, efficient, and tailored to your needs while respecting 
          your privacy preferences.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
          except as described in this policy. We may share your information with trusted service providers who assist 
          us in operating our platform, conducting business, or serving you, provided they agree to keep your information 
          confidential. We may also disclose your information when required by law, to protect our rights or the rights 
          of others, or in connection with a business transaction such as a merger or acquisition. In all cases, we ensure 
          that appropriate safeguards are in place to protect your personal information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We implement appropriate technical and organizational measures to protect your personal information against 
          unauthorized access, alteration, disclosure, or destruction. This includes encryption of sensitive data, 
          regular security assessments, and strict access controls for our employees and contractors. While we strive 
          to protect your information, no method of transmission over the internet or electronic storage is completely 
          secure, and we cannot guarantee absolute security. We encourage you to take steps to protect your account 
          information and notify us immediately of any unauthorized use of your account.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You have the right to access, update, or delete your personal information at any time. You can manage your 
          account settings, communication preferences, and privacy controls through your account dashboard. If you wish 
          to delete your account or have questions about your data, please contact our support team. You also have the 
          right to opt out of certain communications and data processing activities, subject to applicable laws and 
          regulations. We respect your choices and will work with you to ensure your privacy preferences are honored 
          while maintaining the functionality of our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We use cookies and similar tracking technologies to enhance your experience on our platform, analyze usage 
          patterns, and provide personalized content and advertisements. Cookies are small data files stored on your 
          device that help us remember your preferences and improve our services. You can control cookie settings 
          through your browser, though disabling certain cookies may affect the functionality of our platform. We also 
          work with third-party analytics and advertising partners who may use cookies and other technologies to collect 
          information about your online activities across different websites and services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our services are global, and your information may be transferred to and processed in countries other than 
          your country of residence. These countries may have different data protection laws than your country, but 
          we ensure that appropriate safeguards are in place to protect your information in accordance with this 
          privacy policy and applicable laws. When we transfer your information internationally, we use approved 
          transfer mechanisms and work only with partners who provide adequate protection for your personal data. 
          By using our services, you consent to the transfer of your information as described in this policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We may update this privacy policy from time to time to reflect changes in our practices, technology, legal 
          requirements, or other factors. When we make significant changes, we will notify you through our platform 
          or by email, and we will update the "Last updated" date at the top of this policy. We encourage you to 
          review this policy periodically to stay informed about how we collect, use, and protect your information. 
          Your continued use of our services after any changes to this policy constitutes your acceptance of the 
          updated terms. If you do not agree with any changes, please discontinue use of our services.
        </p>
      </section>
    </LegalPageLayout>
  )
}