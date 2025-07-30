import LegalPageLayout from '@/components/legal-page-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookies Policy | ViewMarket',
  description: 'Learn about how ViewMarket uses cookies and similar tracking technologies.',
}

export default function CookiesPolicyPage() {
  return (
    <LegalPageLayout title="Cookies Policy">
      <section>
        <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Cookies are small text files that are stored on your device when you visit our website. They contain 
          information about your browsing behavior and preferences, helping us provide you with a better user experience. 
          Cookies can be either "session cookies" that are deleted when you close your browser, or "persistent cookies" 
          that remain on your device for a specified period or until you delete them. Most web browsers automatically 
          accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, 
          disabling cookies may affect the functionality of our website and prevent you from accessing certain features. 
          We use cookies for various purposes, including authentication, personalization, analytics, and advertising.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We use several types of cookies to enhance your experience on our platform. Essential cookies are necessary 
          for the basic functionality of our website, such as maintaining your login session and remembering your 
          preferences. Performance cookies help us understand how visitors interact with our website by collecting 
          anonymous information about page views, traffic sources, and user behavior patterns. Functional cookies 
          remember your choices and provide enhanced features like personalized content and language preferences. 
          Marketing cookies are used to deliver relevant advertisements and track the effectiveness of our advertising 
          campaigns. We also use analytics cookies to measure website performance and identify areas for improvement. 
          All cookies are categorized based on their purpose and duration.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our website may contain content from third-party services such as social media platforms, analytics providers, 
          and advertising networks. These third parties may set their own cookies on your device when you interact 
          with their content or services through our website. We do not control these third-party cookies, and their 
          use is governed by the respective privacy policies of these third parties. Common third-party cookies include 
          those from Google Analytics for website analytics, social media plugins for sharing content, and advertising 
          networks for displaying targeted ads. We recommend reviewing the privacy policies of these third parties 
          to understand how they use cookies and other tracking technologies. You can opt out of certain third-party 
          cookies through their respective opt-out mechanisms or browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Cookie Consent and Management</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          When you first visit our website, we will ask for your consent to use cookies through a cookie banner or 
          consent management platform. You can choose to accept all cookies, reject non-essential cookies, or customize 
          your cookie preferences. Your consent choices are stored and respected during your subsequent visits to our 
          website. You can change your cookie preferences at any time through our cookie settings panel or by modifying 
          your browser settings. Most browsers allow you to view, manage, and delete cookies through their settings 
          menu. You can also set your browser to notify you when cookies are being sent or to automatically reject 
          certain types of cookies. Please note that blocking or deleting cookies may impact your user experience 
          and the functionality of our website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How We Use Cookie Information</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We use the information collected through cookies to improve our website and services, personalize your 
          experience, and provide relevant content and advertisements. Cookie data helps us understand user preferences, 
          optimize website performance, and identify technical issues. We analyze aggregated cookie data to gain 
          insights into user behavior patterns, popular content, and website usage trends. This information is used 
          to make informed decisions about website improvements, content development, and feature enhancements. We 
          may also use cookie information to remember your login status, language preferences, and other settings 
          to provide a seamless user experience across multiple visits. Marketing cookies help us deliver targeted 
          advertisements and measure the effectiveness of our advertising campaigns across different platforms and 
          channels.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Retention and Security</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We retain cookie information for as long as necessary to fulfill the purposes for which it was collected, 
          unless a longer retention period is required by law or legitimate business interests. Different types of 
          cookies have different retention periods, ranging from session-only cookies that expire when you close 
          your browser to persistent cookies that may remain on your device for months or years. We implement 
          appropriate technical and organizational measures to protect cookie information from unauthorized access, 
          disclosure, or misuse. This includes encryption of sensitive data, secure transmission protocols, and 
          regular security assessments. We regularly review our cookie practices and retention policies to ensure 
          they remain current and compliant with applicable laws and regulations. You can delete cookies from your 
          device at any time through your browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Legal Basis for Cookie Use</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our use of cookies is based on various legal grounds depending on the type and purpose of the cookies. 
          Essential cookies are necessary for the performance of our contract with you and to provide the services 
          you request. Analytics and performance cookies are used based on our legitimate interest in understanding 
          how our website is used and improving our services. Marketing cookies require your explicit consent, which 
          we obtain through our cookie consent mechanism. We comply with applicable data protection laws, including 
          the General Data Protection Regulation (GDPR) and other relevant privacy regulations. Our cookie practices 
          are designed to be transparent, fair, and respectful of your privacy rights. You have the right to withdraw 
          your consent for non-essential cookies at any time, and we provide clear mechanisms for you to exercise 
          this right.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We may update this cookies policy from time to time to reflect changes in our practices, technology, 
          legal requirements, or other factors. When we make significant changes, we will notify you through our 
          website or other appropriate means, and we will update the "Last updated" date at the top of this policy. 
          We encourage you to review this policy periodically to stay informed about how we use cookies and similar 
          technologies. Your continued use of our website after any changes to this policy constitutes your acceptance 
          of the updated terms. If you do not agree with any changes, you can adjust your cookie preferences or 
          discontinue using our website. We are committed to transparency and will always provide clear information 
          about our cookie practices and any changes we make to this policy.
        </p>
      </section>
    </LegalPageLayout>
  )
}