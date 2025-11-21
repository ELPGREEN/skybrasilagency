import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Target,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Award,
} from "lucide-react";

const ForBrands = () => {
  const differentials = [
    {
      icon: BarChart3,
      title: "Estratégia Baseada em Métricas",
      description:
        "Todas as nossas campanhas são orientadas por dados, com KPIs claros e acompanhamento em tempo real.",
    },
    {
      icon: Target,
      title: "Modelos Flexíveis",
      description:
        "Adaptamos contratos e formatos às necessidades específicas de cada marca e campanha.",
    },
    {
      icon: Users,
      title: "Seleção Rigorosa",
      description:
        "Trabalhamos apenas com creators que passam por nosso processo de curadoria e treinamento.",
    },
    {
      icon: TrendingUp,
      title: "Foco em ROI",
      description:
        "Nosso objetivo é gerar resultados mensuráveis: vendas, leads e brand awareness.",
    },
    {
      icon: Shield,
      title: "Projeto Piloto Gratuito",
      description:
        "Teste nossa metodologia sem risco financeiro antes de se comprometer com campanhas maiores.",
    },
    {
      icon: Zap,
      title: "Streamers Treinados",
      description:
        "Todos os nossos creators passam por capacitação em estratégias de conversão e brand safety.",
    },
    {
      icon: Award,
      title: "+5 Anos de Experiência",
      description:
        "Desde 2020 conectando marcas e streamers com cases de sucesso comprovados.",
    },
  ];

  const stats = [
    { value: "150+", label: "Campanhas Realizadas" },
    { value: "50+", label: "Marcas Parceiras" },
    { value: "30M+", label: "Impressões Geradas" },
    { value: "85%", label: "Taxa de Satisfação" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Por que confiar sua marca na{" "}
            <span className="text-gradient-primary">SKY BRASIL</span>?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Somos especialistas em transformar streamers em embaixadores autênticos,
            com campanhas focadas em métricas e ROI real.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Card className="bg-card/50 backdrop-blur border-border p-6">
                <p className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Differentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nossos Diferenciais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentials.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur border-border hover:border-primary transition-smooth hover:glow-primary group">
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-smooth">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* How We Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Como Trabalhamos
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Briefing Detalhado",
                description:
                  "Entendemos seus objetivos, público-alvo e KPIs esperados.",
              },
              {
                step: "02",
                title: "Seleção de Creators",
                description:
                  "Escolhemos streamers alinhados com sua marca e audiência.",
              },
              {
                step: "03",
                title: "Planejamento da Campanha",
                description:
                  "Criamos estratégia de conteúdo, cronograma e métricas de sucesso.",
              },
              {
                step: "04",
                title: "Execução & Monitoramento",
                description:
                  "Acompanhamos cada live em tempo real e ajustamos quando necessário.",
              },
              {
                step: "05",
                title: "Relatório de Resultados",
                description:
                  "Entregamos análise completa com métricas, insights e recomendações.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <Card className="bg-gradient-accent p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Vamos Criar Algo Incrível Juntos?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Entre em contato e descubra como podemos impulsionar sua marca no mundo
              do streaming
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-accent hover:bg-white/90"
              asChild
            >
              <Link to="/contato">Fale com Nossa Equipe</Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForBrands;
