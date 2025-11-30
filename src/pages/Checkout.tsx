import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import EfiPay from 'payment-token-efi';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  
  // ✅ ESTADOS EFI PAY
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    holderName: '',
    cvv: '',
    expirationMonth: '',
    expirationYear: '',
    installments: '1',
    brand: ''
  });
  const [installmentsOptions, setInstallmentsOptions] = useState<any[]>([]);
  const [paymentError, setPaymentError] = useState('');

  // ✅ CONFIG EFI PAY (EXECUTA UMA VEZ)
  useEffect(() => {
    EfiPay.CreditCard
      .setAccount(import.meta.env.VITE_EFI_PAYEE_CODE || 'SEU_PAYEE_CODE_AQUI')
      .setEnvironment('sandbox') // MUDE PARA 'production' DEPOIS
      .debugger(true); // REMOVE EM PRODUÇÃO
  }, []);

  // ✅ DETECTAR BANDEIRA E PARCELAS
  const detectCardBrand = async (cardNumber: string) => {
    try {
      const brand = await EfiPay.CreditCard
        .setCardNumber(cardNumber.replace(/\s/g, ''))
        .verifyCardBrand();
      
      setPaymentData(prev => ({ ...prev, brand }));
      setPaymentError('');
      
      if (brand) {
        const installments = await EfiPay.CreditCard
          .setBrand(brand)
          .setTotal(total * 100) // Centavos
          .getInstallments();
        setInstallmentsOptions(installments);
      }
    } catch (err: any) {
      setPaymentError('Cartão inválido');
      setPaymentData(prev => ({ ...prev, brand: '' }));
    }
  };

  // ✅ PROCESSAR PAGAMENTO REAL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');

    // Validar bandeira
    if (!paymentData.brand) {
      setPaymentError('Insira um cartão válido para detectar a bandeira');
      setIsProcessing(false);
      return;
    }

    try {
      // ✅ GERAR TOKEN EFI PAY
      const tokenData = await EfiPay.CreditCard
        .setCreditCardData({
          brand: paymentData.brand,
          number: paymentData.cardNumber.replace(/\s/g, ''),
          cvv: paymentData.cvv,
          expirationMonth: paymentData.expirationMonth,
          expirationYear: paymentData.expirationYear,
          holderName: paymentData.holderName,
          holderDocument: (document.getElementById('cpf') as HTMLInputElement)?.value.replace(/\D/g, '') || '',
          reuse: false
        })
        .getPaymentToken();

      console.log('✅ TOKEN GERADO:', tokenData);

      // ✅ ENVIAR PARA BACK-END (SIMULAÇÃO TEMPORÁRIA)
      // SUBSTITUA POR SEU ENDPOINT REAL: fetch('/api/efipay/cobranca', ...)
      const paymentResponse = {
        status: 'approved',
        charge_id: 'CHARGE_' + Date.now(),
        payment_token: tokenData.payment_token
      };

      // ✅ SIMULA BACK-END (REMOVA DEPOIS)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // ✅ SUCESSO
      toast({
        title: "✅ Pagamento Aprovado!",
        description: `Cobrança ${paymentResponse.charge_id} processada com sucesso!`,
        duration: 5000,
      });
      
      clearCart();
      setIsProcessing(false);
      navigate("/");

    } catch (err: any) {
      console.error('❌ ERRO EFI PAY:', err);
      const errorMsg = err.message || 'Erro ao processar pagamento';
      setPaymentError(errorMsg);
      toast({
        title: "❌ Erro no Pagamento",
        description: errorMsg,
        variant: "destructive",
        duration: 5000,
      });
      setIsProcessing(false);
    }
  };

  // Formatar cartão
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .substring(0, 19);
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
                      <Input id="name" placeholder="Seu nome" required />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" type="tel" placeholder="(00) 00000-0000" required />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" required />
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
                    <Input id="cep" placeholder="00000-000" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="street">Rua</Label>
                  <Input id="street" placeholder="Nome da rua" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="number">Número</Label>
                    <Input id="number" placeholder="123" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input id="complement" placeholder="Apto, Bloco, etc" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input id="neighborhood" placeholder="Bairro" required />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" placeholder="Cidade" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ✅ SEÇÃO PAGAMENTO EFI PAY */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pagamento com Cartão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Número do Cartão */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input 
                    id="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      setPaymentData(prev => ({ ...prev, cardNumber: formatted }));
                      
                      const clean = formatted.replace(/\s/g, '');
                      if (clean.length >= 6) {
                        detectCardBrand(clean);
                      }
                    }}
                    placeholder="0000 0000 0000 0000"
                    className="text-lg h-12"
                    required
                  />
                  {paymentData.brand && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Bandeira: <span className="font-mono uppercase">{paymentData.brand}</span>
                    </p>
                  )}
                </div>

                {/* Nome e Parcelas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input 
                      id="cardName"
                      value={paymentData.holderName}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, holderName: e.target.value }))}
                      placeholder="Nome impresso no cartão"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Parcelas</Label>
                    <Select 
                      value={paymentData.installments} 
                      onValueChange={(value) => setPaymentData(prev => ({ ...prev, installments: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="1x sem juros" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1x de R$ {(total).toFixed(2)} (sem juros)</SelectItem>
                        {installmentsOptions.map((inst: any) => (
                          <SelectItem key={inst.installments} value={inst.installments.toString()}>
                            {inst.installments}x de R$ {(inst.payment_value / 100).toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Validade */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Validade (Mês)</Label>
                    <Select 
                      onValueChange={(value) => setPaymentData(prev => ({ ...prev, expirationMonth: value }))}
                      required
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 12}, (_, i) => 
                          String(i + 1).padStart(2, '0')
                        ).map(month => (
                          <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Validade (Ano)</Label>
                    <Select 
                      onValueChange={(value) => setPaymentData(prev => ({ ...prev, expirationYear: value }))}
                      required
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="AAAA" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 10}, (_, i) => 
                          (new Date().getFullYear() + i).toString()
                        ).map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* CVV */}
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv"
                    type="number"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                    placeholder="123"
                    maxLength={3}
                    className="h-10"
                    required
                  />
                </div>

                {/* Erro */}
                {paymentError && (
                  <Alert variant="destructive" className="border-red-200">
                    <AlertDescription>{paymentError}</AlertDescription>
                  </Alert>
                )}

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <CreditCard className="w-3 h-3" />
                    Pagamento 100% seguro via <strong>EfiPay</strong>
                  </p>
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
                  type="submit"
                  form="checkout-form" // ✅ Conecta com o form
                  disabled={isProcessing || !paymentData.brand}
                  className="w-full bg-gradient-primary hover:shadow-glow-primary"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando Pagamento...
                    </>
                  ) : (
                    "Finalizar Pedido"
                  )}
                </Button>

                <div className="text-xs text-muted-foreground text-center pt-2">
                  Seus dados estão seguros e protegidos
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* ✅ FORM INVISÍVEL PARA SUBMIT */}
      <form id="checkout-form" onSubmit={handleSubmit} className="hidden">
        <input type="submit" />
      </form>
    </div>
  );
};

export default Checkout;
