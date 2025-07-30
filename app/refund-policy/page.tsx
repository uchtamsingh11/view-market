import LegalPageLayout from '@/components/legal-page-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | ViewMarket',
  description: 'Learn about ViewMarket refund policy, terms, and procedures for requesting refunds.',
}

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout title="Refund Policy">
      <section>
        <h2 className="text-2xl font-semibold mb-4">General Refund Terms</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We strive to provide high-quality services and ensure customer satisfaction. Our refund policy is designed 
          to be fair and transparent while protecting both our customers and our business interests. Refunds are 
          available under specific circumstances and are subject to the terms and conditions outlined in this policy. 
          All refund requests must be submitted within the specified time frames and meet the eligibility criteria 
          described below. We reserve the right to approve or deny refund requests based on the specific circumstances 
          of each case and compliance with our terms of service. Refunds, when approved, will be processed using 
          the original payment method unless otherwise specified. Processing times may vary depending on your payment 
          provider and financial institution.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Eligibility for Refunds</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To be eligible for a refund, you must meet certain criteria and submit your request within the applicable 
          time frame. Refunds may be available for services that were not delivered as promised, contain significant 
          defects, or fail to meet the specifications described at the time of purchase. Technical issues on our 
          end that prevent you from accessing paid services may also qualify for refunds. However, refunds are not 
          available for services that have been fully delivered and used, changes in market conditions, or personal 
          circumstances that affect your ability to use the services. Subscription services may be eligible for 
          pro-rated refunds in certain circumstances, but this is evaluated on a case-by-case basis. All refund 
          requests must include detailed information about the issue and supporting documentation where applicable.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Refund Request Process</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To request a refund, you must contact our customer support team through the designated channels within 
          the applicable time frame. Your refund request should include your account information, transaction details, 
          a clear description of the issue, and any relevant supporting documentation. Our support team will review 
          your request and may ask for additional information or clarification. We aim to respond to all refund 
          requests within 5-7 business days of receipt. If your refund is approved, we will process it within 
          10-15 business days, though the actual time for funds to appear in your account may vary depending on 
          your payment method and financial institution. We will keep you informed throughout the process and 
          provide confirmation once the refund has been processed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibond mb-4">Subscription Refunds</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Subscription-based services have specific refund terms that depend on the type of subscription and the 
          circumstances of the refund request. Monthly subscriptions may be eligible for refunds if cancelled within 
          the first 7 days of the billing cycle, provided that the services have not been extensively used. Annual 
          subscriptions may qualify for pro-rated refunds in certain circumstances, such as significant service 
          disruptions or failure to deliver promised features. Free trial periods do not qualify for refunds, but 
          you can cancel your subscription at any time before the trial ends to avoid being charged. Automatic 
          renewals that occur due to technical issues or billing errors may be refunded if reported within 30 days. 
          Downgrade or upgrade changes to subscriptions are generally not eligible for refunds, but we may offer 
          account credits in some cases.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Non-Refundable Items</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Certain items and services are not eligible for refunds under any circumstances. This includes digital 
          products that have been downloaded or accessed, personalized services that have been customized to your 
          specifications, and services that have been fully delivered and consumed. Gift cards, promotional credits, 
          and bonus features obtained through special offers are also non-refundable. Services used in violation 
          of our terms of service or acceptable use policy are not eligible for refunds. One-time setup fees, 
          processing fees, and other administrative charges are generally non-refundable. Third-party services 
          or products purchased through our platform may be subject to the refund policies of the respective 
          providers. We clearly indicate which items are non-refundable at the time of purchase to ensure 
          transparency.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Partial Refunds and Credits</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          In some cases, we may offer partial refunds or account credits instead of full refunds. This may occur 
          when you have used a portion of the services, when there are technical issues that affect only some 
          features, or when the refund request falls outside the standard eligibility criteria but we determine 
          that some compensation is appropriate. Account credits can be used toward future purchases or subscription 
          renewals and typically have an expiration date. Partial refunds are calculated based on the unused 
          portion of services, the extent of the issue, and other relevant factors. We may also offer service 
          extensions, feature upgrades, or other forms of compensation in lieu of monetary refunds. All decisions 
          regarding partial refunds and credits are made at our discretion and are final.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          If you disagree with our decision regarding your refund request, you may escalate the matter through 
          our dispute resolution process. This involves a thorough review of your case by our senior support team 
          or management. You must provide additional evidence or documentation to support your dispute, and we 
          will conduct a fair and impartial review of all relevant information. The dispute resolution process 
          typically takes 10-15 business days, and our decision will be communicated to you in writing. If you 
          remain unsatisfied with the outcome, you may have additional recourse through your payment provider's 
          dispute resolution mechanisms or applicable consumer protection agencies. We are committed to resolving 
          all disputes fairly and in accordance with applicable laws and regulations. Our goal is to maintain 
          positive customer relationships while upholding our business policies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We reserve the right to modify this refund policy at any time to reflect changes in our business practices, 
          legal requirements, or service offerings. When we make significant changes, we will notify existing customers 
          through email, platform notifications, or other appropriate means. The updated policy will apply to all 
          future transactions, while existing transactions will be governed by the policy that was in effect at the 
          time of purchase. We encourage you to review this policy periodically to stay informed about our current 
          refund terms and procedures. If you do not agree with any changes to this policy, you may discontinue 
          using our services. The most current version of this policy will always be available on our website 
          and will supersede all previous versions. Material changes will be effective 30 days after notification 
          unless otherwise specified.
        </p>
      </section>
    </LegalPageLayout>
  )
}