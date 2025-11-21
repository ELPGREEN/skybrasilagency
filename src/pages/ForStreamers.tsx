import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Handshake,
  DollarSign,
  Video,
  Palette,
  MessageCircle,
} from "lucide-react";

const ForStreamers = () => {
  const benefits = [
    {
      icon: Handshake,
      title: "Gestão de Parcerias",
      description:
        "Cuidamos de todas as negociações e contratos com marcas, para você focar no que faz de melhor: criar conteúdo.",
    },
    {
      icon: DollarSign,
      title: "Monetização Inteligente",
      description:
        "Estratégias comprovadas para maximizar seus ganhos através de parcerias, patrocínios e campanhas.",
    },
    {
      icon: Video,
      title: "Treinamento de Live",
      description:
        "Aprenda técnicas avançadas de engajamento, retenção de audiência e conversão durante suas transmissões.",
    },
    {
      icon: Palette,
      title: "Branding Pessoal",
      description:
        "Desenvolvemos sua identidade visual completa: logo, overlays, emotes e todo material necessário.",
    },
    {
      icon: MessageCircle,
      title: "Mentoria Contínua",
      description:
        "Acompanhamento semanal com nossa equipe para analisar resultados e ajustar estratégias.",
    },
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
            Venha ser um{" "}
            <span className="text-gradient-primary">Streamer SKY</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Treinamos você para se tornar um creator de alta conversão para marcas,
            com carreira sustentável e crescimento consistente.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur border-border hover:border-primary transition-smooth hover:glow-primary group">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-smooth">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Como Funciona o Processo
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Inscrição",
                description:
                  "Preencha o formulário e conte sobre seu canal, audiência e objetivos.",
              },
              {
                step: "02",
                title: "Avaliação",
                description:
                  "Nossa equipe analisa seu perfil e potencial de crescimento.",
              },
              {
                step: "03",
                title: "Onboarding",
                description:
                  "Reunião inicial para alinhar expectativas e criar seu plano personalizado.",
              },
              {
                step: "04",
                title: "Treinamento",
                description:
                  "Acesso à nossa plataforma de cursos e mentoria individual.",
              },
              {
                step: "05",
                title: "Primeiras Campanhas",
                description:
                  "Começamos a conectar você com marcas alinhadas ao seu conteúdo.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
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
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <Card className="bg-gradient-primary p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para Decolar sua Carreira?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Entre para a lista VIP e seja um dos próximos streamers SKY BRASIL
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/vip">Quero Ser Streamer</Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForStreamers;
