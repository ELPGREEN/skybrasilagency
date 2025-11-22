import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Smartphone,
  Database,
  Video,
  Gift,
  Sparkles,
  Shield,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Code,
  Target,
  Rocket,
  BarChart3,
  Lock,
  Globe,
  MessageSquare,
  Star,
  CheckCircle2,
} from "lucide-react";

const Platform = () => {
  const estruturaInicial = [
    {
      title: "Frontend (App e Site)",
      icon: Smartphone,
      items: [
        "Interface de vídeos curtos",
        "Interface de lives",
        "Página de perfil",
        "Loja de diamantes",
        "Efeitos e presentes personalizados",
      ],
    },
    {
      title: "Backend",
      icon: Database,
      items: [
        "Sistema de upload e streaming de vídeo",
        "Banco de dados de usuários, vídeos, presentes e diamantes",
        "Sistema de autenticação (login, cadastro, segurança)",
        "Painel de administração",
      ],
    },
  ];

  const funcionalidades = [
    {
      icon: Video,
      title: "Vídeos Curtos",
      items: ["Upload e edição", "Feed personalizado", "Curtidas, comentários e compartilhamentos"],
    },
    {
      icon: MessageSquare,
      title: "Lives",
      items: ["Transmissão em tempo real", "Chat ao vivo", "Envio de presentes"],
    },
    {
      icon: Gift,
      title: "Presentes Virtuais",
      items: [
        "Catálogo de presentes (design exclusivo)",
        "Conversão em diamantes",
        "Ranking de usuários",
      ],
    },
    {
      icon: Sparkles,
      title: "Efeitos Visuais",
      items: [
        "Biblioteca de filtros e efeitos",
        "Ferramenta de criação e personalização",
      ],
    },
  ];

  const sistemaDiamantes = [
    {
      icon: DollarSign,
      title: "Compra de Diamantes",
      description: "Integração com meios de pagamento e loja própria com revenda",
    },
    {
      icon: Star,
      title: "Uso de Diamantes",
      description: "Envio de presentes, acesso a conteúdos exclusivos e monetização para criadores",
    },
    {
      icon: TrendingUp,
      title: "Revenda Própria",
      description: "Painel de revendedores, controle de estoque e comissão, sistema antifraude",
    },
  ];

  const tecnologias = [
    {
      categoria: "Frontend",
      tech: "React Native (Mobile) + React.js/Next.js (Web)",
      descricao: "Interface responsiva e performática",
    },
    {
      categoria: "Backend",
      tech: "Node.js + Express/NestJS",
      descricao: "APIs robustas e escaláveis",
    },
    {
      categoria: "Banco de Dados",
      tech: "PostgreSQL + MongoDB + Redis",
      descricao: "Dados estruturados, flexíveis e cache rápido",
    },
    {
      categoria: "Streaming",
      tech: "AWS MediaConvert, Mux, Cloudflare Stream",
      descricao: "Entrega de vídeo de alta qualidade",
    },
    {
      categoria: "Armazenamento",
      tech: "Amazon S3 / Firebase Storage",
      descricao: "Armazenamento escalável de arquivos",
    },
    {
      categoria: "Infraestrutura",
      tech: "Docker + Kubernetes + AWS/GCP",
      descricao: "Microserviços e escalabilidade automática",
    },
  ];

  const roadmap = [
    {
      fase: "Fase 1",
      titulo: "Planejamento e Protótipo",
      duracao: "Semanas 1-4",
      items: [
        "Pesquisa de mercado e benchmarking",
        "Definição de funcionalidades essenciais",
        "Criação de wireframes e protótipos",
        "Escolha de tecnologias e arquitetura",
      ],
    },
    {
      fase: "Fase 2",
      titulo: "Desenvolvimento do MVP",
      duracao: "Semanas 5-12",
      items: [
        "Backend: autenticação, upload de vídeos, streaming básico",
        "Frontend: feed de vídeos, perfil, editor simples",
        "Lives: transmissão básica e chat ao vivo",
        "Sistema de diamantes e presentes virtuais",
      ],
    },
    {
      fase: "Fase 3",
      titulo: "Lançamento Beta e Expansão",
      duracao: "Semanas 13-20",
      items: [
        "Lançamento beta com influenciadores",
        "Efeitos visuais e filtros personalizados",
        "Loja de diamantes com pagamentos",
        "Painel administrativo completo",
      ],
    },
    {
      fase: "Fase 4",
      titulo: "Lançamento Oficial e Escala",
      duracao: "Semanas 21-24",
      items: [
        "Campanhas de marketing e afiliados",
        "Algoritmo de recomendação",
        "CDN e otimização global",
        "Monitoramento e suporte 24h",
      ],
    },
  ];

  const diferenciais = [
    "Sistema próprio de revenda de diamantes",
    "Efeitos personalizados e exclusivos",
    "Monetização direta para criadores regionais",
    "Ecossistema de microempreendedores",
    "Foco em criadores locais da América Latina",
    "Maior controle e transparência para usuários",
  ];

  const seguranca = [
    {
      icon: Lock,
      title: "Proteção de Dados",
      desc: "Criptografia AES-256, TLS/SSL e autenticação 2FA",
    },
    {
      icon: Shield,
      title: "Moderação de Conteúdo",
      desc: "IA + equipe humana para filtrar conteúdo impróprio",
    },
    {
      icon: CheckCircle2,
      title: "Segurança de Pagamentos",
      desc: "Integração com gateways confiáveis e tokenização",
    },
    {
      icon: Globe,
      title: "Escalabilidade",
      desc: "Microserviços, CDN e infraestrutura em nuvem",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Plataforma <span className="text-gradient-primary">SKY</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Uma plataforma revolucionária de vídeos curtos e lives com sistema próprio
            de diamantes, monetização descentralizada e foco em criadores regionais.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {diferenciais.map((diff, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm"
              >
                {diff}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="estrutura" className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 md:grid-cols-4 mb-12">
            <TabsTrigger value="estrutura">Estrutura</TabsTrigger>
            <TabsTrigger value="funcionalidades">Funcionalidades</TabsTrigger>
            <TabsTrigger value="tecnologias">Tecnologias</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          {/* Estrutura Inicial */}
          <TabsContent value="estrutura" className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              {estruturaInicial.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-card/50 backdrop-blur border-border hover:border-primary transition-smooth">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <CardTitle className="text-2xl">{item.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {item.items.map((subItem, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{subItem}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Sistema de Diamantes */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-12">
                Sistema de <span className="text-gradient-primary">Diamantes</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {sistemaDiamantes.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full bg-gradient-tech border-border hover:glow-primary transition-smooth">
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Segurança */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-12">
                Segurança e <span className="text-gradient-primary">Escalabilidade</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {seguranca.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full bg-card/50 backdrop-blur border-border text-center">
                        <CardContent className="p-6">
                          <Icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                          <h3 className="font-bold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Funcionalidades */}
          <TabsContent value="funcionalidades" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {funcionalidades.map((func, index) => {
                const Icon = func.icon;
                return (
                  <motion.div
                    key={func.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-gradient-tech border-border hover:border-primary transition-smooth">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <CardTitle className="text-2xl">{func.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {func.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Painel Administrativo */}
            <Card className="mt-12 bg-card/50 backdrop-blur border-border">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-primary" />
                  Painel Administrativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Gerenciamento de Usuários
                    </h4>
                    <p className="text-muted-foreground">
                      Controle completo sobre perfis, banimentos, verificações e histórico de atividades.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Moderação de Conteúdo
                    </h4>
                    <p className="text-muted-foreground">
                      Sistema automatizado + humano para filtrar denúncias e conteúdo impróprio.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Métricas e Relatórios
                    </h4>
                    <p className="text-muted-foreground">
                      Indicadores em tempo real, crescimento, engajamento e receita por canal.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Gestão de Diamantes
                    </h4>
                    <p className="text-muted-foreground">
                      Controle de estoque, histórico de vendas e aprovação de revendedores.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tecnologias */}
          <TabsContent value="tecnologias" className="space-y-6">
            {tecnologias.map((tech, index) => (
              <motion.div
                key={tech.categoria}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur border-border hover:border-primary transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <span className="inline-block px-4 py-2 bg-gradient-primary text-white rounded-lg font-bold">
                          {tech.categoria}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{tech.tech}</h3>
                        <p className="text-muted-foreground">{tech.descricao}</p>
                      </div>
                      <Code className="w-8 h-8 text-primary flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Roadmap */}
          <TabsContent value="roadmap" className="space-y-8">
            {roadmap.map((fase, index) => (
              <motion.div
                key={fase.fase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="bg-gradient-tech border-border hover:glow-primary transition-smooth">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-glow-primary">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{fase.titulo}</CardTitle>
                        <p className="text-muted-foreground mt-1">{fase.duracao}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {fase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <Card className="bg-gradient-primary p-12 text-center">
            <Rocket className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Transformando Entretenimento em Oportunidade
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              A Plataforma SKY é mais que vídeos — é um ecossistema completo de
              criatividade, engajamento e monetização descentralizada para a América
              Latina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white text-primary font-semibold hover:shadow-lg transition-smooth"
              >
                Saber Mais
              </a>
              <a
                href="/vip"
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-smooth"
              >
                Entrar na Lista VIP
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Platform;
