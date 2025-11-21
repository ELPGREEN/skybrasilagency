import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserPlus,
  CheckCircle,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Inscrição",
      description:
        "Preencha nosso formulário detalhado contando sobre você, seu canal, audiência e objetivos profissionais.",
      color: "primary",
    },
    {
      icon: CheckCircle,
      title: "2. Onboarding",
      description:
        "Nossa equipe analisa seu perfil e agenda uma reunião para conhecer você melhor e alinhar expectativas.",
      color: "secondary",
    },
    {
      icon: Sparkles,
      title: "3. Treinamento e Identidade",
      description:
        "Acesso completo à nossa plataforma de cursos, desenvolvimento de branding e configuração técnica.",
      color: "accent",
    },
    {
      icon: Target,
      title: "4. Conexão com Marcas",
      description:
        "Começamos a conectar você com marcas alinhadas ao seu conteúdo e audiência para campanhas estratégicas.",
      color: "primary",
    },
    {
      icon: BarChart3,
      title: "5. Execução de Campanhas + Relatórios",
      description:
        "Você executa as campanhas com nosso suporte, e nós fornecemos relatórios detalhados de performance e resultados.",
      color: "secondary",
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
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Como <span className="text-gradient-primary">Funciona</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Do cadastro às primeiras campanhas, veja o passo a passo para se tornar
            um Streamer SKY BRASIL
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-6 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Content */}
                <Card className="flex-1 bg-card/50 backdrop-blur border-border hover:border-primary transition-smooth hover:glow-primary">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <Card className="bg-gradient-tech p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Simples e Transparente</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nosso processo é estruturado para garantir que você tenha todo o
              suporte necessário em cada etapa da sua jornada como creator
              profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/vip"
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-gradient-primary text-white font-semibold hover:shadow-glow-primary transition-smooth"
              >
                Começar Agora
              </a>
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-smooth"
              >
                Tirar Dúvidas
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
