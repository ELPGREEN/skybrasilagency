import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Monitor,
  Mic,
  Camera,
  Settings,
  Zap,
  Shield,
  Download,
  Play,
  Volume2,
  Wifi,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

const SuporteOBS = () => {
  const [activeTab, setActiveTab] = useState("setup");

  const features = [
    {
      icon: Monitor,
      title: "Resolução 4K",
      description: "Configuração otimizada para 4K 60fps",
      benefit: "+200% qualidade visual",
    },
    {
      icon: Mic,
      title: "Áudio Profissional",
      description: "Mixagem com Noise Gate + Compressor",
      benefit: "Som cristalino sem ruídos",
    },
    {
      icon: Camera,
      title: "Overlays Personalizados",
      description: "Design exclusivo para seu branding",
      benefit: "+45% engajamento",
    },
    {
      icon: Settings,
      title: "Encoder NVENC",
      description: "Zero quedas de FPS mesmo em jogos pesados",
      benefit: "Estabilidade 100%",
    },
    {
      icon: Zap,
      title: "Bitrate Inteligente",
      description: "Adaptação automática da conexão",
      benefit: "Lives sem travamentos",
    },
    {
      icon: Shield,
      title: "Backup Automático",
      description: "Gravação local + nuvem simultânea",
      benefit: "Nunca perca uma live",
    },
  ];

  const setupSteps = [
    {
      step: "1",
      title: "Download & Instalação",
      description: "OBS Studio + Plugins essenciais",
      icon: Download,
      duration: "5 min",
    },
    {
      step: "2",
      title: "Configuração de Cena",
      description: "Layout profissional com webcam",
      icon: Camera,
      duration: "10 min",
    },
    {
      step: "3",
      title: "Áudio Perfeito",
      description: "Filtros profissionais de voz",
      icon: Mic,
      duration: "8 min",
    },
    {
      step: "4",
      title: "Encoder & Bitrate",
      description: "Configuração para Twitch/YouTube",
      icon: Settings,
      duration: "7 min",
    },
    {
      step: "5",
      title: "Teste & Otimização",
      description: "Teste ao vivo com análise",
      icon: Play,
      duration: "15 min",
    },
  ];

  const results = [
    { icon: CheckCircle, title: "0% Quedas", subtitle: "Estabilidade total" },
    { icon: Clock, title: "24/7 Suporte", subtitle: "Ajuda imediata" },
    { icon: Users, title: "500+ Streamers", subtitle: "Já configurados" },
    { icon: Star, title: "5.0 Rating", subtitle: "Avaliação perfeita" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-primary/5 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-indigo-600/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-full mb-6 backdrop-blur-sm"
            >
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">CONFIGURAÇÃO TÉCNICA COMPLETA</span>
              <Zap className="w-4 h-4 text-primary animate-pulse" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
            >
              Suporte OBS
              <span className="block text-4xl md:text-5xl text-foreground/80 mt-2">
                Lives Profissionais em 45 Minutos
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Configuração técnica completa para suas lives. Zero quedas, áudio cristalino e visual 
              profissional. <span className="font-semibold text-primary">Desde iniciantes até streamers full-time.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg hover:shadow-primary/30 min-w-[220px] h-14 text-lg font-semibold"
                asChild
              >
                <Link to="/vip" className="flex items-center gap-3">
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Agendar Configuração
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/50 hover:bg-primary/10 group min-w-[200px] h-14 text-lg"
                asChild
              >
                <Link to="/como-funciona" className="flex items-center gap-2">
                  <Settings className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Ver Detalhes
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background/50 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Configuração</span> 
              <span className="text-foreground">que Transforma</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Cada detalhe otimizado para máximo desempenho e qualidade profissional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full bg-card/80 backdrop-blur border-border/50 hover:border-primary/70 rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
                    <CardHeader className="pb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 mb-6 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <CardTitle className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="text-xs font-semibold text-primary/80 group-hover:text-primary transition-colors">
                          {feature.benefit}
                        </span>
                        <ArrowRight className="w-4 h-4 text-primary/50 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Setup Process */}
      <section className="py-20 bg-gradient-tech relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-5xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Setup Completo</span> 
              <span className="text-foreground">em 5 Passos</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Do zero ao ar em menos de 1 hora. Configuração testada em +500 streamers.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {setupSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === setupSteps.length - 1;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute -left-6 lg:-left-4 top-8 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary/50 transition-colors" />
                  <Card className={`relative bg-gradient-to-br from-card/80 to-card/50 backdrop-blur border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 ${isLast ? 'lg:col-span-1' : 'lg:col-span-1'}`}>
                    <CardContent className="p-6 pt-10 pb-8 text-center relative">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full border-2 border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all">
                        <span className="text-sm font-bold text-primary">{step.step}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {step.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs text-primary/70">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.map((result, index) => {
              const Icon = result.icon;
              return (
                <motion.div
                  key={result.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/70 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 p-8 h-full">
                    <CardContent className="pt-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl mb-6 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl animate-pulse" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Sua Live Profissional 
              <span className="block text-3xl">Começa Hoje</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Deixe a técnica conosco. Foque no seu conteúdo. 
              <span className="font-semibold">Configuração completa + suporte 24/7.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 h-14 text-lg font-semibold min-w-[240px] group"
                asChild
              >
                <Link to="/vip" className="flex items-center gap-3">
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Agendar Agora
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/50 text-white hover:bg-white/10 h-14 text-lg font-semibold min-w-[200px]"
                asChild
              >
                <Link to="/contato">
                  Falar com Especialista
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuporteOBS;