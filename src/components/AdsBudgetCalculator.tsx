import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, Calculator, CheckCircle2, IndianRupee, LineChart, MousePointerClick, TrendingUp } from 'lucide-react';
import RevealHeading from './RevealHeading';

type Platform = 'Google' | 'Meta';
type BusinessType = 'Lead Gen' | 'E-commerce';

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function AdsBudgetCalculator() {
  const [platform, setPlatform] = useState<Platform>('Google');
  const [businessType, setBusinessType] = useState<BusinessType>('Lead Gen');
  const [revenueGoal, setRevenueGoal] = useState(300000);
  const [orderValue, setOrderValue] = useState(15000);
  const [cpc, setCpc] = useState(55);
  const [conversionRate, setConversionRate] = useState(8);
  const [closeRate, setCloseRate] = useState(35);

  const results = useMemo(() => {
    const customers = Math.max(1, Math.ceil(revenueGoal / Math.max(orderValue, 1)));
    const leadsOrCarts = Math.ceil(customers / Math.max(closeRate / 100, 0.01));
    const clicks = Math.ceil(leadsOrCarts / Math.max(conversionRate / 100, 0.01));
    const monthlySpend = clicks * cpc;
    const dailyBudget = monthlySpend / 30;
    const roas = revenueGoal / Math.max(monthlySpend, 1);
    const spendShare = monthlySpend / Math.max(revenueGoal, 1);
    const efficiencyScore = Math.max(1, Math.min(10, Math.round((roas / 4) * 6 + (conversionRate / 20) * 2 + (closeRate / 70) * 2)));
    const riskScore = Math.max(1, Math.min(10, Math.round(spendShare * 10 + (roas < 2 ? 3 : 0) + (conversionRate < 5 ? 2 : 0))));

    return { customers, leadsOrCarts, clicks, monthlySpend, dailyBudget, roas, spendShare, efficiencyScore, riskScore };
  }, [revenueGoal, orderValue, cpc, conversionRate, closeRate]);

  const leadLabel = businessType === 'Lead Gen' ? 'leads' : 'add-to-carts';
  const customerLabel = businessType === 'Lead Gen' ? 'customers' : 'orders';
  const insight = getInsight({
    platform,
    businessType,
    revenueGoal,
    orderValue,
    cpc,
    conversionRate,
    closeRate,
    ...results,
  });

  return (
    <section id="budget-calculator" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--gold)/0.08)_0%,_transparent_55%)] pointer-events-none" />
      <div className="container-narrow relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <RevealHeading as="p" className="label-eyebrow mb-6">- Ads budget tool</RevealHeading>
            <RevealHeading as="h2" delay={100} className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Calculate the daily budget before the campaign spends a rupee.
            </RevealHeading>
            <RevealHeading as="p" delay={180} className="mt-6 text-muted-foreground leading-relaxed">
              A fast planning section for Google and Meta campaigns. Enter the commercial goal, expected click cost, and conversion assumptions to get a realistic launch budget.
            </RevealHeading>
          </div>
          <div className="rounded-full border border-border bg-card px-5 py-3 text-sm text-muted-foreground">
            {platform} · {businessType}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
          <div className="glass-pane min-w-0 rounded-2xl border border-border bg-card/70 p-5 md:p-7 shadow-[0_24px_80px_-40px_hsl(var(--ink)/0.35)]">
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {(['Google', 'Meta'] as Platform[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPlatform(item)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${platform === item ? 'border-gold bg-gold text-ink shadow-lg shadow-gold/15' : 'border-border bg-background hover:border-gold/60'}`}
                >
                  {item} Ads
                </button>
              ))}
              {(['Lead Gen', 'E-commerce'] as BusinessType[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setBusinessType(item)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${businessType === item ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:border-foreground/40'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 min-w-0">
              <NumberField icon={<IndianRupee />} label="Monthly revenue goal" value={revenueGoal} setValue={setRevenueGoal} />
              <NumberField icon={<IndianRupee />} label="Average order value" value={orderValue} setValue={setOrderValue} />
              <NumberField icon={<MousePointerClick />} label="Expected CPC" value={cpc} setValue={setCpc} />
              <NumberField icon={<LineChart />} label="Click conversion rate %" value={conversionRate} setValue={setConversionRate} />
              <NumberField icon={<Calculator />} label={businessType === 'Lead Gen' ? 'Lead close rate %' : 'Cart checkout rate %'} value={closeRate} setValue={setCloseRate} />
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-3">
              <PlanSplit label="Prospecting" value="55%" text="Find new demand with controlled audience or keyword tests." />
              <PlanSplit label="Intent" value="30%" text="Capture high-intent search, warm audiences, and best sellers." />
              <PlanSplit label="Retargeting" value="15%" text="Recover visitors, form starters, product viewers, and abandoned carts." />
            </div>
          </div>

          <div className="glass-pane min-w-0 rounded-2xl border border-border bg-ink text-offwhite p-6 md:p-8 lg:sticky lg:top-28 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--gold)/0.18)_0%,_transparent_60%)] pointer-events-none" />
            <div className="relative">
              <p className="label-eyebrow text-gold mb-5">Launch budget</p>
              <div className="text-5xl md:text-6xl font-semibold tracking-tight">{currency.format(results.dailyBudget)}</div>
              <p className="mt-2 text-offwhite/60">recommended per day</p>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <Metric label="Monthly spend" value={currency.format(results.monthlySpend)} />
                <Metric label="Projected ROAS" value={`${results.roas.toFixed(1)}x`} />
                <Metric label={businessType === 'Lead Gen' ? 'Customers' : 'Orders'} value={results.customers.toLocaleString('en-IN')} />
                <Metric label={`Needed ${leadLabel}`} value={results.leadsOrCarts.toLocaleString('en-IN')} />
                <Metric label="Clicks" value={results.clicks.toLocaleString('en-IN')} className="col-span-2" />
              </div>

              <p className="mt-6 text-sm leading-relaxed text-offwhite/65">
                Start here, then shift 10-15% toward the audience or keyword set that produces the lowest qualified acquisition cost after the first learning cycle.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--gold)/0.12)_0%,_transparent_58%)] pointer-events-none" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${insight.badgeClass}`}>
                  {insight.status === 'Strong plan' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                  {insight.status}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-gold" />
                  {insight.focus}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight">{insight.title}</h3>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">{insight.summary}</p>
              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                <InsightMetric label="Spend share" value={`${Math.round(results.spendShare * 100)}%`} />
                <InsightMetric label="Efficiency" value={`${results.efficiencyScore}/10`} />
                <InsightMetric label="Risk" value={`${results.riskScore}/10`} />
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <InsightCard title="What is working" text={insight.working} />
            <InsightCard title="What to improve first" text={insight.nextStep} />
            <InsightCard title="First 7 days" text={`Watch ${businessType === 'Lead Gen' ? 'CPL, lead quality, and close rate' : 'CPA, cart rate, and checkout completion'} before raising spend. The first target is ${results.leadsOrCarts.toLocaleString('en-IN')} ${leadLabel} and ${results.customers.toLocaleString('en-IN')} ${customerLabel}.`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function getInsight(input: {
  platform: Platform;
  businessType: BusinessType;
  revenueGoal: number;
  orderValue: number;
  cpc: number;
  conversionRate: number;
  closeRate: number;
  customers: number;
  leadsOrCarts: number;
  clicks: number;
  monthlySpend: number;
  dailyBudget: number;
  roas: number;
  spendShare: number;
  efficiencyScore: number;
  riskScore: number;
}) {
  const isLead = input.businessType === 'Lead Gen';
  const channel = input.platform;
  const label = isLead ? 'lead pipeline' : 'purchase funnel';

  if (input.roas < 2) {
    return {
      status: 'High risk',
      focus: 'Fix economics first',
      badgeClass: 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300',
      title: `The ${channel} budget is possible, but the unit economics are tight.`,
      summary: `At ${currency.format(input.dailyBudget)} per day, projected ROAS is ${input.roas.toFixed(1)}x. Before scaling, reduce CPC, improve conversion rate, or raise average order value so paid traffic does not consume too much of revenue.`,
      working: `The model gives a clear traffic target: ${input.clicks.toLocaleString('en-IN')} clicks are needed to produce ${input.leadsOrCarts.toLocaleString('en-IN')} ${isLead ? 'leads' : 'add-to-carts'}.`,
      nextStep: `Improve the weakest conversion point first. A small lift from ${input.conversionRate}% click conversion can reduce the required daily budget quickly.`,
    };
  }

  if (input.roas < 3 || input.spendShare > 0.4) {
    return {
      status: 'Needs control',
      focus: isLead ? 'Lead quality' : 'Checkout lift',
      badgeClass: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-200',
      title: `Launch the ${label}, but keep the first cycle disciplined.`,
      summary: `${currency.format(input.monthlySpend)} monthly spend can support a ${currency.format(input.revenueGoal)} revenue goal, but the margin for waste is not huge. Start with the recommended daily budget and pause weak audiences early.`,
      working: `${channel} can create enough volume if CPC stays near ${currency.format(input.cpc)} and conversion stays near ${input.conversionRate}%.`,
      nextStep: isLead
        ? `Qualify lead sources aggressively. Track which campaigns turn into real conversations, not just form fills.`
        : `Use product-page and checkout improvements before increasing spend. Cart quality matters more than raw click volume here.`,
    };
  }

  return {
    status: 'Strong plan',
    focus: 'Scale carefully',
    badgeClass: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    title: `This ${channel} plan has enough room to test and learn.`,
    summary: `The model projects ${input.roas.toFixed(1)}x ROAS with ${currency.format(input.dailyBudget)} per day. That gives you enough signal to test audiences, keywords, and offers without losing control of spend.`,
    working: `Spend share is ${Math.round(input.spendShare * 100)}% of revenue, which leaves room to optimize after the first learning cycle.`,
    nextStep: `Split budget across prospecting, intent capture, and retargeting. Move 10-15% toward the best-performing source after 3-5 days of clean data.`,
  };
}

function NumberField({ icon, label, value, setValue }: { icon: ReactNode; label: string; value: number; setValue: (value: number) => void }) {
  return (
    <label className="group block min-w-0 rounded-xl border border-border bg-background p-4 transition-all hover:border-gold/60 focus-within:border-gold focus-within:ring-4 focus-within:ring-gold/10">
      <span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        <span className="text-gold [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
        <span className="truncate">{label}</span>
      </span>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="mt-3 w-full min-w-0 bg-transparent text-2xl font-medium outline-none"
      />
    </label>
  );
}

function Metric({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-xl border border-offwhite/10 bg-offwhite/5 p-4 ${className}`}>
      <div className="text-lg font-semibold">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.14em] text-offwhite/45">{label}</div>
    </div>
  );
}

function InsightMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
    </div>
  );
}

function InsightCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-gold/50 hover:-translate-y-0.5">
      <h4 className="text-sm font-semibold tracking-tight">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function PlanSplit({ label, value, text }: { label: string; value: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
        <span className="text-lg font-semibold text-gold">{value}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
