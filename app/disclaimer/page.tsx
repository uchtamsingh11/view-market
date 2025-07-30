import LegalPageLayout from '@/components/legal-page-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | ViewMarket',
  description: 'Important disclaimers and limitations regarding the use of ViewMarket services.',
}

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer">
      <section>
        <h2 className="text-2xl font-semibold mb-4">General Information</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The information provided on this platform is for general informational purposes only. While we strive to 
          keep the information up to date and accurate, we make no representations or warranties of any kind, express 
          or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, 
          products, services, or related graphics contained on the platform. Any reliance you place on such information 
          is therefore strictly at your own risk. We reserve the right to modify, update, or remove any content without 
          prior notice, and we cannot guarantee that all information will be current or error-free at all times.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">No Professional Advice</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The content on this platform does not constitute professional, legal, financial, or investment advice. 
          Nothing contained on this platform should be construed as a recommendation to buy, sell, or hold any 
          investment or to engage in any particular investment strategy. Before making any financial or investment 
          decisions, you should consult with qualified professionals who can provide advice tailored to your specific 
          circumstances. We do not provide personalized investment advice or recommendations, and any information 
          presented should not be considered as such. Always conduct your own research and due diligence before 
          making any investment or business decisions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          In no event will we be liable for any loss or damage including, without limitation, indirect or consequential 
          loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in 
          connection with, the use of this platform. Through this platform, you may be able to link to other websites 
          that are not under our control. We have no control over the nature, content, and availability of those sites. 
          The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within 
          them. Our liability is limited to the maximum extent permitted by applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Third-Party Content</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our platform may contain content, information, or links provided by third parties. We do not control, 
          endorse, or assume responsibility for any third-party content, and we make no representations or warranties 
          regarding its accuracy, completeness, or reliability. Third-party content is provided for informational 
          purposes only and does not reflect our views or opinions. Users should independently verify any information 
          obtained from third-party sources and use their own judgment when relying on such content. We reserve the 
          right to remove or modify third-party content at any time without notice, and we are not responsible for 
          any changes made to such content by the original providers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Platform Availability</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We make every effort to keep our platform up and running smoothly. However, we do not guarantee that the 
          platform will be available at all times or that it will be free from errors, viruses, or other harmful 
          components. We reserve the right to suspend, modify, or discontinue any aspect of the platform at any time 
          without prior notice. Scheduled maintenance, updates, or unforeseen technical issues may result in temporary 
          unavailability of services. We will not be liable for any inconvenience, loss, or damage resulting from 
          platform downtime or unavailability. Users are encouraged to maintain backups of important data and to 
          have alternative plans in place for critical business operations.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">User Responsibility</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Users are solely responsible for their use of the platform and for any consequences arising from such use. 
          This includes responsibility for maintaining the confidentiality of account information, ensuring compliance 
          with applicable laws and regulations, and using the platform in accordance with our terms of service. Users 
          should exercise appropriate caution and judgment when sharing personal information or engaging in transactions 
          through the platform. We encourage users to regularly review their account settings, monitor their activities, 
          and report any suspicious or unauthorized activities immediately. By using our platform, users acknowledge 
          that they have read, understood, and agree to be bound by this disclaimer and our terms of service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          All content on this platform, including but not limited to text, graphics, logos, images, audio clips, 
          and software, is our property or the property of our content suppliers and is protected by applicable 
          intellectual property laws. Users may not reproduce, distribute, modify, or create derivative works from 
          any content without our express written permission. Unauthorized use of our intellectual property may 
          result in legal action and liability for damages. We respect the intellectual property rights of others 
          and expect our users to do the same. If you believe that your intellectual property rights have been 
          violated, please contact us immediately with detailed information about the alleged infringement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This disclaimer and your use of the platform are governed by and construed in accordance with applicable 
          laws, without regard to conflict of law principles. Any disputes arising from or relating to this disclaimer 
          or the use of the platform will be subject to the exclusive jurisdiction of the appropriate courts. If any 
          provision of this disclaimer is found to be invalid or unenforceable, the remaining provisions will continue 
          in full force and effect. We reserve the right to modify this disclaimer at any time, and such modifications 
          will be effective immediately upon posting. Your continued use of the platform after any changes constitutes 
          acceptance of the modified disclaimer. Please review this disclaimer regularly to stay informed of any updates.
        </p>
      </section>
    </LegalPageLayout>
  )
}