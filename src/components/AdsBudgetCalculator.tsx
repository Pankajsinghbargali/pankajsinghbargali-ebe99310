import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Calculator, IndianRupee, LineChart, MousePointerClick } from 'lucide-react';
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

    return { customers, leadsOrCarts, clicks, monthlySpend, dailyBudget, roas };
  }, [revenueGoal, orderValue, cpc, conversionRate, closeRate]);

  const leadLabel = businessType === 'Lead Gen' ? 'leads' : 'add-to-carts';

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
          <div className="rounded-2xl border border-border bg-card/70 p-5 md:p-7 shadow-[0_24px_80px_-40px_hsl(var(--ink)/0.35)]">
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

            <div className="grid md:grid-cols-2 gap-4">
              <NumberField icon={<IndianRupee />} label="Monthly revenue goal" value={revenueGoal} setValue={setRevenueGoal} />
              <NumberField icon={<IndianRupee />} label="Average order value" value={orderValue} setValue={setOrderValue} />
              <NumberField icon={<MousePointerClick />} label="Expected CPC" value={cpc} setValue={setCpc} />
              <NumberField icon={<LineChart />} label="Click conversion rate %" value={conversionRate} setValue={setConversionRate} />
              <NumberField icon={<Calculator />} label={businessType === 'Lead Gen' ? 'Lead close rate %' : 'Cart checkout rate %'} value={closeRate} setValue={setCloseRate} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-ink text-offwhite p-6 md:p-8 sticky top-28 overflow-hidden">
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
      </div>
    </section>
  );
}

function NumberField({ icon, label, value, setValue }: { icon: ReactNode; label: string; value: number; setValue: (value: number) => void }) {
  return (
    <label className="group block rounded-xl border border-border bg-background p-4 transition-all hover:border-gold/60 focus-within:border-gold focus-within:ring-4 focus-within:ring-gold/10">
      <span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        <span className="text-gold [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
        {label}
      </span>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="mt-3 w-full bg-transparent text-2xl font-medium outline-none"
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
