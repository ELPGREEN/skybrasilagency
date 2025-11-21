import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  Shield,
  BarChart3,
  Zap,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: Target,
      title: "Acesso a Marcas",
      description: "Conectamos você com as melhores marcas do mercado",
    },
    {
      icon: TrendingUp,
      title: "Monetizar seu Conteúdo",
      description: "Transforme suas lives em fonte de renda sustentável",
    },
    {
      icon: Sparkles,
      title: "Treinamento Especializado",
      description: "Aprenda estratégias de alta conversão com experts",
    },
    {
      icon: Shield,
      title: "Estratégia Personalizada",
      description: "Plano sob medida para seu crescimento",
    },
    {
      icon: BarChart3,
      title: "Suporte OBS",
      description: "Configuração técnica completa para suas lives",
    },
    {
      icon: Award,
      title: "Identidade Visual",
      description: "Branding profissional para se destacar",
    },
    {
      icon: Users,
      title: "Comunidade Exclusiva",
      description: "Rede de creators para networking e trocas",
    },
    {
      icon: Zap,
      title: "Mentoria de Conteúdo",
      description: "Orientação contínua para melhorar suas lives",
    },
  ];

  const platforms = [
    { name: "Twitch", color: "text-[#9146FF]" },
    { name: "YouTube", color: "text-[#FF0000]" },
    { name: "TikTok", color: "text-[#00F2EA]" },
    { name: "Instagram", color: "text-[#E4405F]" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-primary">
              Transformando Lives em Negócios
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 mb-8 leading-relaxed">
              Transformamos Streamers em Parceiros de Alta Conversão para Marcas.
              <br />
              Criando Negócios Sustentáveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/vip">Quero entrar na Lista VIP</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/como-funciona">Como Funciona</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-tech">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Por que escolher a{" "}
              <span className="text-gradient-primary">Sky Brasil</span> como sua
              agência?
            </h2>
            <p className="text-lg text-muted-foreground">
              Nós não só representamos – te transformamos em um criador estratégico.
              Desde 2020, ajudamos streamers a crescer, monetizar e se posicionar de
              forma profissional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur border-border hover:border-primary transition-smooth hover:glow-primary group">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-smooth">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Onde Você Pode Brilhar</h2>
            <p className="text-lg text-muted-foreground">
              Apoiamos streamers nas principais plataformas do mercado
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-card border-2 border-border flex items-center justify-center mb-3 hover:border-primary transition-smooth hover:glow-primary">
                  <span className={`text-3xl font-bold ${platform.color}`}>
                    {platform.name[0]}
                  </span>
                </div>
                <p className="text-sm font-medium">{platform.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-background/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Pronto para Transformar sua Carreira?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Junte-se aos streamers que estão construindo negócios sustentáveis com
              a SKY BRASIL
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/vip">Entrar na Lista VIP Agora</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
