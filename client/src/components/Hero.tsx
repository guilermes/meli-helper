import { useMemo, useState } from "react";
import "./Hero.css";

/* ---------- Dados ---------- */
interface Feature {
  icon: string;
  title: string;
  text: string;
}

const FEATURES: Feature[] = [
  { icon: "📦", title: "Anúncios em um só lugar", text: "Crie, edite preço e estoque e pause anúncios de vários marketplaces sem trocar de aba." },
  { icon: "📐", title: "Cubagem automática", text: "Calcule o peso cubado de cada produto e veja o frete correto antes de publicar." },
  { icon: "📈", title: "Métricas que ajudam a decidir", text: "Acompanhe vendas, conversão e margem por anúncio, loja e período." },
  { icon: "🔄", title: "Sincronização contínua", text: "Estoque e preços atualizados em todos os canais, evitando vendas sem produto." },
];

const MARKETPLACES = [
  { name: "Mercado Livre", live: true },
  { name: "Shopee", live: false },
  { name: "Amazon", live: false },
  { name: "Magalu", live: false },
];

const BARS = [38, 55, 46, 72, 63, 88, 80];

const KPIS = [
  { value: "R$ 48,2 mil", label: "Vendas no mês" },
  { value: "3,4%", label: "Conversão média" },
  { value: "27%", label: "Margem líquida" },
];

/* ---------- Calculadora de cubagem ---------- */
// Fator de cubagem em cm³/kg. Confira o valor usado pelo marketplace/transportadora.
const CUBAGE_FACTOR = 6000;

interface Dimensions {
  length: string;
  width: string;
  height: string;
  weight: string;
}

const num = (v: string): number => {
  const n = parseFloat(v.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

function CubageCalculator() {
  const [d, setD] = useState<Dimensions>({ length: "30", width: "20", height: "15", weight: "1.2" });

  const { cubed, charged, usesCubed } = useMemo(() => {
    const cubed = (num(d.length) * num(d.width) * num(d.height)) / CUBAGE_FACTOR;
    const real = num(d.weight);
    return { cubed, charged: Math.max(cubed, real), usesCubed: cubed > real };
  }, [d]);

  const fields: { key: keyof Dimensions; label: string }[] = [
    { key: "length", label: "Comprimento (cm)" },
    { key: "width", label: "Largura (cm)" },
    { key: "height", label: "Altura (cm)" },
    { key: "weight", label: "Peso real (kg)" },
  ];

  return (
    <div className="mh-panel" aria-labelledby="cubagem-title">
      <h3 id="cubagem-title">Calculadora de cubagem</h3>
      <small>Teste com as medidas do seu produto.</small>

      <div className="mh-fields">
        {fields.map(({ key, label }) => (
          <div className="mh-field" key={key}>
            <label htmlFor={`f-${key}`}>{label}</label>
            <input
              id={`f-${key}`}
              inputMode="decimal"
              value={d[key]}
              onChange={(e) => setD({ ...d, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>

      <div className="mh-result" aria-live="polite">
        <div>
          <span>Peso considerado no frete</span>
          <br />
          <strong>{charged.toFixed(2).replace(".", ",")} kg</strong>
        </div>
        <div className={`mh-badge ${usesCubed ? "" : "mh-badge--ok"}`}>
          {usesCubed ? `Peso cubado: ${cubed.toFixed(2).replace(".", ",")} kg` : "Vale o peso real"}
        </div>
      </div>
    </div>
  );
}

/* ---------- Página ---------- */
export default function Hero() {
  return (
    <div className="mh">
      <div className="mh-wrap">
        <header className="mh-header">
          <a href="#" className="mh-logo" aria-label="MeliHelper">
            <i>◆</i> MeliHelper
          </a>
          <nav className="mh-nav" aria-label="Principal">
            <a href="#recursos">Recursos</a>
            <a href="#marketplaces">Marketplaces</a>
            <a href="#metricas">Métricas</a>
          </nav>
          <a href="/login" className="mh-btn">Entrar</a>
        </header>

        <main>
          {/* Hero */}
          <section className="mh-hero">
            <div>
              <h1>Todos os seus marketplaces, gerenciados em um só painel</h1>
              <p className="mh-lead">
                Controle anúncios, calcule a cubagem e acompanhe suas métricas de venda sem planilhas nem abas duplicadas.
              </p>
              <div className="mh-actions">
                <a href="/cadastro" className="mh-btn mh-btn--primary">Criar conta grátis</a>
                <a href="#recursos" className="mh-btn">Ver recursos</a>
              </div>
            </div>
            <CubageCalculator />
          </section>

          {/* Recursos */}
          <section id="recursos" className="mh-section">
            <h2>Tudo o que o vendedor precisa no dia a dia</h2>
            <p className="mh-lead">Menos tempo operando, mais tempo vendendo.</p>
            <div className="mh-grid mh-grid--4">
              {FEATURES.map((f) => (
                <article className="mh-card" key={f.title}>
                  <div className="mh-icon" aria-hidden="true">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Marketplaces */}
          <section id="marketplaces" className="mh-section">
            <h2>Conecte os canais onde você vende</h2>
            <p className="mh-lead">Comece pelo Mercado Livre. Os demais canais estão a caminho.</p>
            <div className="mh-markets">
              {MARKETPLACES.map((m) => (
                <span key={m.name} className={`mh-chip ${m.live ? "" : "mh-chip--soon"}`}>
                  {m.name}
                  {!m.live && " (em breve)"}
                </span>
              ))}
            </div>
          </section>

          {/* Métricas */}
          <section id="metricas" className="mh-section">
            <div className="mh-metrics">
              <div>
                <h2>Veja o que vende, o que rende e o que ajustar</h2>
                <p className="mh-lead">
                  Compare o desempenho por anúncio e por período e descubra onde a margem está escapando.
                </p>
              </div>
              <div className="mh-panel">
                <h3>Vendas dos últimos 7 dias</h3>
                <div className="mh-bars" role="img" aria-label="Gráfico de vendas dos últimos 7 dias, em alta">
                  {BARS.map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mh-kpis">
                  {KPIS.map((k) => (
                    <div key={k.label}>
                      <b>{k.value}</b>
                      <span>{k.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mh-section">
            <div className="mh-panel mh-cta">
              <h2>Comece a organizar suas vendas hoje</h2>
              <p className="mh-lead">Crie sua conta e conecte seu primeiro marketplace em poucos minutos.</p>
              <div className="mh-actions">
                <a href="/cadastro" className="mh-btn mh-btn--primary">Criar conta grátis</a>
              </div>
            </div>
          </section>
        </main>

        <footer className="mh-footer">
          <span>© {new Date().getFullYear()} MeliHelper</span>
          <span>Termos de uso · Privacidade · Contato</span>
        </footer>
      </div>
    </div>
  );
}
