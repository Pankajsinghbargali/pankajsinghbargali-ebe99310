import { useMemo, useState } from 'react';
import type { ReactNode, ElementType } from 'react';
import { AlertTriangle, Calculator, CheckCircle2, IndianRupee, LineChart, MousePointerClick, TrendingUp, Globe, BarChart3, Users, ShoppingCart } from 'lucide-react';
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
          <div className="glass-pane min-w-0 rounded-2xl border border-border p-5 md:p-7 shadow-[0_24px_80px_-40px_hsl(var(--ink)/0.35)]" style={{ background: 'rgba(10,10,20,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.08)' }}>
            {/* Glass Toggle Row */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">

              {/* Platform Toggle */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-2 ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Platform</p>
                <div
                  className="relative grid grid-cols-2 p-1.5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.12)',
                  }}
                >
                  {/* Glowing active pill */}
                  <div
                    className="absolute inset-y-1.5 left-1.5 rounded-xl transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      width: 'calc(50% - 6px)',
                      transform: platform === 'Meta' ? 'translateX(100%)' : 'translateX(0)',
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      boxShadow: '0 0 16px rgba(251,191,36,0.45), 0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  />
                  {([['Google', Globe], ['Meta', BarChart3]] as [Platform, ElementType][]).map(([item, Icon]) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPlatform(item)}
                      className="relative z-10 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors duration-300"
                      style={{ color: platform === item ? '#0a0a0a' : 'rgba(255,255,255,0.45)' }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item} Ads
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Type Toggle */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-2 ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Business type</p>
                <div
                  className="relative grid grid-cols-2 p-1.5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.12)',
                  }}
                >
                  <div
                    className="absolute inset-y-1.5 left-1.5 rounded-xl transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      width: 'calc(50% - 6px)',
                      transform: businessType === 'E-commerce' ? 'translateX(100%)' : 'translateX(0)',
                      background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                      boxShadow: '0 0 16px rgba(167,139,250,0.45), 0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  />
                  {([['Lead Gen', Users], ['E-commerce', ShoppingCart]] as [BusinessType, ElementType][]).map(([item, Icon]) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setBusinessType(item)}
                      className="relative z-10 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors duration-300"
                      style={{ color: businessType === item ? '#ffffff' : 'rgba(255,255,255,0.45)' }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="grid sm:grid-cols-2 gap-5 min-w-0">
              <NumberField icon={<IndianRupee />} label="Monthly revenue goal" value={revenueGoal} setValue={setRevenueGoal} min={10000} max={10000000} step={10000} />
              <NumberField icon={<IndianRupee />} label="Average order value" value={orderValue} setValue={setOrderValue} min={100} max={100000} step={500} />
              <NumberField icon={<MousePointerClick />} label="Expected CPC" value={cpc} setValue={setCpc} min={5} max={500} step={1} />
              <NumberField icon={<LineChart />} label="Click conversion rate %" value={conversionRate} setValue={setConversionRate} min={0.5} max={20} step={0.5} />
              <NumberField icon={<Calculator />} label={businessType === 'Lead Gen' ? 'Lead close rate %' : 'Cart checkout rate %'} value={closeRate} setValue={setCloseRate} min={1} max={100} step={1} />
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-3">
              <PlanSplit label="Prospecting" value="55%" text="Find new demand with controlled audience or keyword tests." />
              <PlanSplit label="Intent" value="30%" text="Capture high-intent search, warm audiences, and best sellers." />
              <PlanSplit label="Retargeting" value="15%" text="Recover visitors, form starters, product viewers, and abandoned carts." />
            </div>
          </div>

          {/* Launch Budget Card — always dark, immune to theme */}
          <div
            className="min-w-0 rounded-2xl border p-6 md:p-8 lg:sticky lg:top-28 overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
              borderColor: 'rgba(255,215,0,0.25)',
              color: '#ffffff',
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(255,215,0,0.12) 0%, transparent 60%)' }} />
            <div className="relative">
              <p className="mb-5 text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#ffd700' }}>Launch budget</p>
              <div className="text-5xl md:text-6xl font-semibold tracking-tight" style={{ color: '#ffffff' }}>{currency.format(results.dailyBudget || 0)}</div>
              <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>recommended per day</p>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <Metric label="Monthly spend" value={currency.format(results.monthlySpend || 0)} className="bg-white/5 border-white/10 text-white" />
                <Metric label="Projected ROAS" value={`${(results.roas || 0).toFixed(1)}x`} className="bg-white/5 border-white/10 text-white" />
                <Metric label={businessType === 'Lead Gen' ? 'Customers' : 'Orders'} value={results.customers.toLocaleString('en-IN')} className="bg-white/5 border-white/10 text-white" />
                <Metric label={`Needed ${leadLabel}`} value={results.leadsOrCarts.toLocaleString('en-IN')} className="bg-white/5 border-white/10 text-white" />
                <Metric label="Clicks" value={results.clicks.toLocaleString('en-IN')} className="col-span-2 bg-white/5 border-white/10 text-white" />
              </div>

              <p className="mt-6 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
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

function NumberField({ icon, label, value, setValue, min, max, step }: { icon: ReactNode; label: string; value: number; setValue: (value: number) => void; min: number; max: number; step: number }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div
      className="group block min-w-0 rounded-xl p-5 transition-all"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
        <span className="[&_svg]:h-4 [&_svg]:w-4" style={{ color: '#fbbf24' }}>{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="w-full min-w-0 bg-transparent text-2xl font-medium outline-none mb-5 transition-colors"
        style={{ color: '#ffffff' }}
      />
      {/* Custom styled range track */}
      <div className="relative h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        {/* Filled portion */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            boxShadow: '0 0 8px rgba(251,191,36,0.5)',
          }}
        />
        {/* Invisible native range on top for interaction */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ margin: 0 }}
        />
        {/* Thumb indicator */}
        <div
          className="absolute top-1/2 w-4 h-4 rounded-full -translate-y-1/2 -translate-x-1/2 transition-transform group-hover:scale-125"
          style={{
            left: `${pct}%`,
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            boxShadow: '0 0 10px rgba(251,191,36,0.7), 0 0 20px rgba(251,191,36,0.3)',
            border: '2px solid rgba(255,255,255,0.3)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

function Metric({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-xl border p-4 ${className}`}>
      <div className="text-lg font-semibold text-inherit">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.14em] opacity-60 text-inherit">{label}</div>
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
