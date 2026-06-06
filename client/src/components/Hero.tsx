// src/components/Hero.tsx
import { useNavigate } from 'react-router-dom';
import classes from './Hero.module.css';

const features = [
  {
    icon: '📦',
    title: 'Cadastro de Anúncios',
    description: 'Gerencie todos os seus anúncios com tipo Clássico ou Premium, dimensões e custos em um só lugar.',
  },
  {
    icon: '🚚',
    title: 'Cálculo Automático de Frete',
    description: 'Frete calculado em tempo real via microsserviço, considerando peso real, cubagem e faixa de preço.',
  },
  {
    icon: '💰',
    title: 'Lucro e Margem Precisos',
    description: 'Descubra seu lucro líquido considerando comissão do ML, imposto, frete e custo operacional.',
  },
  {
    icon: '⚙️',
    title: 'Configuração Personalizada',
    description: 'Defina seu imposto e custo operacional fixo. O sistema aplica automaticamente em todos os cálculos.',
  },
  {
    icon: '📊',
    title: 'Dashboard com KPIs',
    description: 'Acompanhe margem média, cubagem total, anúncios críticos, ranking de margem e insights inteligentes.',
  },
  {
    icon: '🔒',
    title: 'Conta Segura',
    description: 'Autenticação com JWT e cookies HttpOnly. Seus dados e configurações são privados e protegidos.',
  },
];

const steps = [
  { number: '01', title: 'Crie sua conta', description: 'Cadastre-se em segundos com nome, loja e e-mail.' },
  { number: '02', title: 'Configure as taxas', description: 'Informe seu imposto e custo operacional fixo.' },
  { number: '03', title: 'Cadastre seus produtos', description: 'Adicione anúncios com dimensões, custo e preço de venda.' },
  { number: '04', title: 'Monitore seus lucros', description: 'Acompanhe margens e tome decisões com dados reais.' },
];

// const metrics = [
//   { value: '12%', label: 'Comissão Clássico' },
//   { value: '18%', label: 'Comissão Premium' },
//   { value: '28', label: 'Faixas de Peso' },
//   { value: '8', label: 'Faixas de Preço' },
// ];

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>

      {/* ── HERO PRINCIPAL ── */}
      <section className={classes.heroSection}>
        <div className={classes.heroBadge}>
          <span className={classes.badgeDot} />
          Plataforma para Sellers do Mercado Livre
        </div>

        <h1 className={classes.heroTitle}>
          Precifique com
          <span className={classes.highlight}> precisão.</span>
          <br />
          Venda com
          <span className={classes.highlight}> lucro.</span>
        </h1>

        <p className={classes.heroSubtitle}>
          O <strong>MeliHelper</strong> automatiza o cálculo de frete, comissão, imposto e custo
          operacional para que você nunca mais perca dinheiro por erro de precificação.
        </p>

        <div className={classes.heroActions}>
          <button
            className={classes.btnPrimary}
            onClick={() => navigate('/signup')}
          >
            Começar gratuitamente
          </button>
          <button
            className={classes.btnSecondary}
            onClick={() => navigate('/login')}
          >
            Já tenho uma conta
          </button>
        </div>

        {/* Métricas rápidas */}
        {/* <div className={classes.metricsRow}>
          {metrics.map((m) => (
            <div key={m.label} className={classes.metricItem}>
              <span className={classes.metricValue}>{m.value}</span>
              <span className={classes.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>*/}
      </section>

      {/* ── FÓRMULA DE CÁLCULO ── */}
      <section className={classes.formulaSection}>
        <p className={classes.sectionLabel}>Como calculamos seu lucro</p>
        <div className={classes.formulaBox}>
          <div className={classes.formulaItem}>
            <span className={classes.formulaValue}>Preço de Venda</span>
          </div>
          <span className={classes.formulaOp}>−</span>
          <div className={classes.formulaItem}>
            <span className={classes.formulaValue}>Custo</span>
          </div>
          <span className={classes.formulaOp}>−</span>
          <div className={classes.formulaItem}>
            <span className={classes.formulaValue}>Frete</span>
          </div>
          <span className={classes.formulaOp}>−</span>
          <div className={classes.formulaItem}>
            <span className={classes.formulaValue}>Comissão ML</span>
          </div>
          <span className={classes.formulaOp}>−</span>
          <div className={classes.formulaItem}>
            <span className={classes.formulaValue}>Imposto</span>
          </div>
          <span className={classes.formulaOp}>−</span>
          <div className={classes.formulaItem}>
            <span className={classes.formulaValue}>Custo Op.</span>
          </div>
          <span className={classes.formulaOp}>=</span>
          <div className={`${classes.formulaItem} ${classes.formulaResult}`}>
            <span className={classes.formulaValue}>Lucro Real</span>
          </div>
        </div>
      </section>

      {/* ── FUNCIONALIDADES ── */}
      <section className={classes.featuresSection}>
        <p className={classes.sectionLabel}>Funcionalidades</p>
        <h2 className={classes.sectionTitle}>Tudo que você precisa para precificar certo</h2>
        <div className={classes.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} className={classes.featureCard}>
              <span className={classes.featureIcon}>{f.icon}</span>
              <h3 className={classes.featureTitle}>{f.title}</h3>
              <p className={classes.featureDescription}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className={classes.stepsSection}>
        <p className={classes.sectionLabel}>Como funciona</p>
        <h2 className={classes.sectionTitle}>Comece a lucrar em 4 passos</h2>
        <div className={classes.stepsGrid}>
          {steps.map((step, i) => (
            <div key={step.number} className={classes.stepCard}>
              <div className={classes.stepConnector}>
                <span className={classes.stepNumber}>{step.number}</span>
                {i < steps.length - 1 && <div className={classes.stepLine} />}
              </div>
              <h3 className={classes.stepTitle}>{step.title}</h3>
              <p className={classes.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className={classes.ctaSection}>
        <h2 className={classes.ctaTitle}>
          Pronto para parar de adivinhar e começar a lucrar?
        </h2>
        <p className={classes.ctaSubtitle}>
          Crie sua conta gratuitamente e cadastre seu primeiro anúncio em menos de 2 minutos.
        </p>
        <button
          className={classes.btnPrimary}
          onClick={() => navigate('/signup')}
        >
          Criar conta agora
        </button>
      </section>

    </div>
  );
}