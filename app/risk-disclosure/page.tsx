import LegalPageLayout from '@/components/legal-page-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Risk Disclosure | ViewMarket',
  description: 'Important risk disclosures and warnings related to using ViewMarket services.',
}

export default function RiskDisclosurePage() {
  return (
    <LegalPageLayout title="Risk Disclosure">
      <section>
        <h2 className="text-2xl font-semibold mb-4">General Investment Risks</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          All investments carry inherent risks, and you may lose some or all of your invested capital. Past performance 
          does not guarantee future results, and no investment strategy can guarantee profits or protect against losses. 
          Market conditions can change rapidly and unpredictably, affecting the value of investments and the performance 
          of financial instruments. Economic factors, political events, regulatory changes, and other external factors 
          can significantly impact investment outcomes. Before making any investment decisions, you should carefully 
          consider your financial situation, risk tolerance, and investment objectives. We strongly recommend consulting 
          with qualified financial advisors who can provide personalized guidance based on your specific circumstances.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Market Volatility</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Financial markets are subject to extreme volatility and can experience significant price fluctuations within 
          short periods. These fluctuations can result in substantial gains or losses, and the timing of market movements 
          is unpredictable. Volatility can be caused by various factors including economic data releases, geopolitical 
          events, changes in monetary policy, market sentiment, and technical factors. High volatility can lead to 
          rapid changes in asset values, making it difficult to execute trades at desired prices. Investors should be 
          prepared for the possibility of significant losses and should only invest amounts they can afford to lose. 
          Diversification and risk management strategies may help mitigate some risks but cannot eliminate them entirely.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Technology and Platform Risks</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our platform relies on complex technology systems that may experience outages, delays, or malfunctions that 
          could affect your ability to access your account or execute transactions. Internet connectivity issues, server 
          problems, software bugs, or cyber attacks could disrupt platform operations and potentially result in financial 
          losses. While we implement robust security measures and backup systems, we cannot guarantee uninterrupted 
          service or complete protection against all technical risks. Users should be aware that technology failures 
          could occur at critical times and should have contingency plans in place. We recommend maintaining alternative 
          means of accessing your investments and staying informed about your positions through multiple channels.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Regulatory and Legal Risks</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Financial services and investment activities are subject to extensive regulation that can change without 
          notice. Regulatory changes could affect the availability of certain services, alter the terms of existing 
          arrangements, or impose new compliance requirements that may impact your investments. Different jurisdictions 
          may have varying regulatory frameworks, and cross-border investments may be subject to additional legal 
          complexities. Changes in tax laws, reporting requirements, or other regulations could affect the profitability 
          or viability of certain investment strategies. Legal disputes, regulatory enforcement actions, or changes 
          in government policy could also impact market conditions and investment outcomes. Users should stay informed 
          about relevant regulations and seek professional legal and tax advice as needed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Liquidity Risks</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Some investments may be difficult to sell or convert to cash quickly, especially during periods of market 
          stress or low trading volume. Liquidity constraints could prevent you from exiting positions when desired 
          or force you to accept unfavorable prices when selling. Certain assets or markets may have limited trading 
          hours, restricted access, or other factors that affect liquidity. During times of high market volatility 
          or economic uncertainty, liquidity can dry up rapidly, making it challenging to execute trades at reasonable 
          prices. Investors should consider their liquidity needs and maintain appropriate cash reserves for unexpected 
          expenses or opportunities. Illiquid investments may also be subject to higher price volatility and valuation 
          uncertainties.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Counterparty and Credit Risks</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          When engaging in financial transactions, you are exposed to the risk that counterparties may fail to meet 
          their obligations, resulting in financial losses. This includes the risk that brokers, exchanges, clearing 
          houses, or other financial institutions may become insolvent or unable to honor their commitments. Credit 
          risk also applies to debt instruments, where issuers may default on interest payments or principal repayment. 
          Even well-established financial institutions can face unexpected difficulties that could affect their ability 
          to fulfill their obligations. While regulatory protections and insurance schemes may provide some coverage, 
          they may not fully compensate for all losses. Investors should research the creditworthiness of counterparties 
          and diversify their exposure to reduce concentration risk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Currency and Exchange Rate Risks</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Investments denominated in foreign currencies are subject to exchange rate fluctuations that can significantly 
          impact returns when converted back to your base currency. Currency values can be highly volatile and are 
          influenced by economic conditions, political stability, interest rate differentials, and central bank policies. 
          Even if an investment performs well in its local currency, unfavorable exchange rate movements could result 
          in losses when converted to your home currency. Currency hedging strategies may help mitigate some of this 
          risk but can be costly and may not be completely effective. Emerging market currencies tend to be particularly 
          volatile and may be subject to additional risks such as capital controls or limited convertibility. Investors 
          should carefully consider currency exposure when making international investments.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">No Guarantee of Returns</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We make no representations or guarantees regarding the performance of any investments or the accuracy of 
          any information provided on our platform. All investment decisions are made at your own risk, and you are 
          solely responsible for evaluating the merits and risks of any investment opportunity. Historical performance 
          data, projections, or estimates should not be considered as indicators of future results. Market conditions, 
          economic factors, and other variables can change rapidly and unpredictably, affecting investment outcomes. 
          No investment strategy can guarantee profits or protect against losses in all market conditions. You should 
          carefully consider your financial situation, investment objectives, and risk tolerance before making any 
          investment decisions, and seek professional advice when appropriate.
        </p>
      </section>
    </LegalPageLayout>
  )
}