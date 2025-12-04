import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { useEfiPayment } from "@/hooks/useEfiPayment";
import { initEfiPay } from "@/lib/efiConfig";
import { checkoutSchema } from "@/lib/validation";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { processPayment, isProcessing } = useEfiPayment();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  // Inicializar EfíPay SDK ao montar o componente
  useEffect(() => {
    const PAYEE_CODE = 'SEU_PAYEE_CODE_AQUI';
    const ENVIRONMENT = 'sandbox';
    
    initEfiPay(PAYEE_CODE, ENVIRONMENT as 'sandbox' | 'production').catch(() => {
      toast({
        title: "Erro de inicialização",
        description: "Não foi possível carregar o sistema de pagamento. Recarregue a página.",
        variant: "destructive",
      });
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Limpar erro do campo ao digitar
    if (validationErrors[id]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const result = checkoutSchema.safeParse(formData);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setValidationErrors(errors);
      
      // Mostrar primeiro erro como toast
      const firstError = result.error.errors[0];
      toast({
        title: "Erro de validação",
        description: firstError.message,
        variant: "destructive",
      });
      return false;
    }
    
    setValidationErrors({});
    return true;
  };

  const sendOrderConfirmation = async (orderId: string) => {
    try {
      await supabase.functions.invoke('send-order-confirmation', {
        body: {
          name: formData.name,
          email: formData.email,
          orderId: orderId,
          total: total,
          items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      });
    } catch {
      // Silencioso - não falha a compra se email não for enviado
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação client-side
    if (!validateForm()) {
      return;
    }

    // Separar mês e ano da validade
    const [expiryMonth, expiryYear] = formData.expiry.split('/');
    
    // Preparar dados do pagamento
    const paymentData = {
      cardNumber: formData.cardNumber,
      cardName: formData.cardName,
      expiryMonth: expiryMonth.trim(),
      expiryYear: `20${expiryYear.trim()}`,
      cvv: formData.cvv,
      customer: {
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        phone: formData.phone,
      },
      address: {
        street: formData.street,
        number: formData.number,
        neighborhood: formData.neighborhood,
        zipcode: formData.cep.replace(/\D/g, ''),
        city: formData.city,
        complement: formData.complement,
      },
      items: items.map(item => ({
        name: item.name,
        value: item.price,
        amount: item.quantity,
      })),
    };

    // Processar pagamento
    const result = await processPayment(paymentData);

    if (result.success) {
      // Enviar email de confirmação
      await sendOrderConfirmation(result.charge_id || `${Date.now()}`);
      
      toast({
        title: "Pagamento confirmado!",
        description: "Você receberá um email com os detalhes do pedido.",
        duration: 5000,
      });
      clearCart();
      navigate("/");
    } else {
      toast({
        title: "Erro no pagamento",
        description: result.error || "Não foi possível processar o pagamento. Tente novamente.",
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-tech flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Carrinho Vazio</h2>
            <p className="text-muted-foreground mb-6">
              Adicione produtos ao carrinho para finalizar sua compra
            </p>
            <Button onClick={() => navigate("/vendas")} className="bg-gradient-primary">
              Ver Produtos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getFieldError = (field: string) => validationErrors[field];

  return (
    <div className="min-h-screen bg-gradient-tech py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/vendas")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Loja
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input 
                        id="name" 
                        placeholder="Seu nome" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className={getFieldError('name') ? 'border-destructive' : ''}
                        required 
                      />
                      {getFieldError('name') && <p className="text-xs text-destructive mt-1">{getFieldError('name')}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={getFieldError('email') ? 'border-destructive' : ''}
                        required 
                      />
                      {getFieldError('email') && <p className="text-xs text-destructive mt-1">{getFieldError('email')}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={getFieldError('phone') ? 'border-destructive' : ''}
                        required 
                      />
                      {getFieldError('phone') && <p className="text-xs text-destructive mt-1">{getFieldError('phone')}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input 
                        id="cpf" 
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        className={getFieldError('cpf') ? 'border-destructive' : ''}
                        required 
                      />
                      {getFieldError('cpf') && <p className="text-xs text-destructive mt-1">{getFieldError('cpf')}</p>}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input 
                      id="cep" 
                      placeholder="00000-000"
                      value={formData.cep}
                      onChange={handleInputChange}
                      className={getFieldError('cep') ? 'border-destructive' : ''}
                      required 
                    />
                    {getFieldError('cep') && <p className="text-xs text-destructive mt-1">{getFieldError('cep')}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="street">Rua</Label>
                  <Input 
                    id="street" 
                    placeholder="Nome da rua"
                    value={formData.street}
                    onChange={handleInputChange}
                    className={getFieldError('street') ? 'border-destructive' : ''}
                    required 
                  />
                  {getFieldError('street') && <p className="text-xs text-destructive mt-1">{getFieldError('street')}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="number">Número</Label>
                    <Input 
                      id="number" 
                      placeholder="123"
                      value={formData.number}
                      onChange={handleInputChange}
                      className={getFieldError('number') ? 'border-destructive' : ''}
                      required 
                    />
                    {getFieldError('number') && <p className="text-xs text-destructive mt-1">{getFieldError('number')}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input 
                      id="complement" 
                      placeholder="Apto, Bloco, etc"
                      value={formData.complement}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input 
                      id="neighborhood" 
                      placeholder="Bairro"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      className={getFieldError('neighborhood') ? 'border-destructive' : ''}
                      required 
                    />
                    {getFieldError('neighborhood') && <p className="text-xs text-destructive mt-1">{getFieldError('neighborhood')}</p>}
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input 
                      id="city" 
                      placeholder="Cidade"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={getFieldError('city') ? 'border-destructive' : ''}
                      required 
                    />
                    {getFieldError('city') && <p className="text-xs text-destructive mt-1">{getFieldError('city')}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={getFieldError('cardNumber') ? 'border-destructive' : ''}
                    maxLength={19}
                    required 
                  />
                  {getFieldError('cardNumber') && <p className="text-xs text-destructive mt-1">{getFieldError('cardNumber')}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Validade</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/AA"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className={getFieldError('expiry') ? 'border-destructive' : ''}
                      maxLength={5}
                      required 
                    />
                    {getFieldError('expiry') && <p className="text-xs text-destructive mt-1">{getFieldError('expiry')}</p>}
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={getFieldError('cvv') ? 'border-destructive' : ''}
                      maxLength={4}
                      required 
                    />
                    {getFieldError('cvv') && <p className="text-xs text-destructive mt-1">{getFieldError('cvv')}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input 
                    id="cardName" 
                    placeholder="Nome impresso no cartão"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={getFieldError('cardName') ? 'border-destructive' : ''}
                    required 
                  />
                  {getFieldError('cardName') && <p className="text-xs text-destructive mt-1">{getFieldError('cardName')}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-border/50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qtd: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="text-accent">Grátis</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-gradient-primary">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-gradient-primary hover:shadow-glow-primary"
                >
                  {isProcessing ? "Processando..." : "Finalizar Pedido"}
                </Button>

                <div className="text-xs text-muted-foreground text-center pt-2">
                  Seus dados estão seguros e protegidos
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
