import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { getCartWhatsappLink } from '../services/whatsapp';
import { Trash2, ShoppingBag, ArrowRight, MapPin, Store, CreditCard, Banknote } from 'lucide-react';

export const CartSection: React.FC = () => {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { addOrder } = useAdmin();
  
  // Form States
  const [customerName, setCustomerName] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');
  const [address, setAddress] = useState('');
  const [paymentType, setPaymentType] = useState<'online' | 'on_delivery'>('on_delivery');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const [error, setError] = useState('');

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Validações
    if (items.length === 0) {
      setError('Seu carrinho está vazio.');
      return;
    }
    if (!customerName.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    if (deliveryMethod === 'delivery' && !address.trim()) {
      setError('Para entrega, é necessário informar o endereço.');
      return;
    }
    if (!paymentMethod) {
      setError('Selecione uma forma de pagamento.');
      return;
    }
    
    setError('');

    // Monta a descrição do pagamento
    let paymentDescription = '';
    if (paymentType === 'online') {
      paymentDescription = `Pagar Agora (Online) - ${paymentMethod}`;
    } else {
      paymentDescription = `Pagar na Entrega/Retirada - ${paymentMethod}`;
    }

    // 1. Registrar o pedido no Dashboard Administrativo (Simulação de Backend)
    const newOrderId = `#${Math.floor(1000 + Math.random() * 9000)}`; // Gera ID ex: #4521
    const itemsSummary = items.map(i => `${i.quantity}x ${i.name}`).join(', ');
    const now = new Date();
    
    addOrder({
      id: newOrderId,
      customer: customerName,
      items: itemsSummary,
      total: cartTotal,
      status: 'Pendente',
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      timestamp: now.getTime()
    });

    // 2. Gerar Link do WhatsApp
    const link = getCartWhatsappLink(items, cartTotal, {
      customerName,
      deliveryMethod,
      address,
      paymentMethod: paymentDescription
    });
    
    // 3. Abrir WhatsApp e Limpar Carrinho
    window.open(link, '_blank');
    // Opcional: Limpar carrinho após o pedido ser "enviado"
    // clearCart(); 
  };

  return (
    <section id="cart-section" className="py-24 bg-brand-dark relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
           <div className="inline-block p-3 rounded-full bg-brand-yellow/10 mb-4">
            <ShoppingBag className="w-8 h-8 text-brand-yellow" />
           </div>
           <h2 className="text-3xl md:text-4xl text-white font-bold uppercase brand-font">
            Finalizar Pedido
          </h2>
          <p className="text-gray-400 mt-2">Revise seus itens e escolha a forma de entrega</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
            <p className="text-xl text-gray-500 mb-4">Seu carrinho está vazio</p>
            <a href="#menu" className="text-brand-orange hover:text-white font-bold uppercase tracking-wider transition-colors">
              Voltar ao cardápio
            </a>
          </div>
        ) : (
          <div className="bg-black/40 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/5 shadow-xl">
            {/* Cart Items List */}
            <div className="space-y-6 mb-8 border-b border-white/10 pb-8">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover hidden sm:block" />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">{item.name}</h4>
                      <p className="text-brand-yellow text-xs sm:text-sm font-mono">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-white font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-400 p-2"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl text-gray-300 font-medium">Total</span>
                <span className="text-3xl text-brand-yellow font-bold brand-font">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="space-y-8">
              
              {/* 1. Identificação */}
              <div>
                <h3 className="text-white font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                  1. Seus Dados
                </h3>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Seu Nome Completo"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                />
              </div>

              {/* 2. Entrega */}
              <div>
                <h3 className="text-white font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                  2. Forma de Entrega
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'bg-brand-red text-white border-brand-red'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <MapPin className="w-6 h-6 mb-2" />
                    <span className="font-bold">Entrega</span>
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'bg-brand-red text-white border-brand-red'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Store className="w-6 h-6 mb-2" />
                    <span className="font-bold">Retirada</span>
                  </button>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="animate-fade-in-up">
                    <label className="block text-sm text-gray-400 mb-2">Endereço Completo</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, Número, Bairro e Complemento"
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-none"
                    />
                  </div>
                )}
              </div>

              {/* 3. Pagamento */}
              <div>
                <h3 className="text-white font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                  3. Pagamento
                </h3>
                
                {/* Tipo de Pagamento (Quando) */}
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => {
                      setPaymentType('on_delivery');
                      setPaymentMethod('');
                    }}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      paymentType === 'on_delivery'
                        ? 'bg-brand-yellow text-brand-black'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    Pagar na Entrega
                  </button>
                  <button
                    onClick={() => {
                      setPaymentType('online');
                      setPaymentMethod('');
                    }}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      paymentType === 'online'
                        ? 'bg-brand-yellow text-brand-black'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    Pagar Online
                  </button>
                </div>

                {/* Opções de Pagamento */}
                <div className="space-y-3">
                  {paymentType === 'on_delivery' ? (
                    <>
                      <label className="flex items-center p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:border-brand-orange/50 transition-colors">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Cartão de Crédito"
                          checked={paymentMethod === 'Cartão de Crédito'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-brand-orange focus:ring-brand-orange bg-gray-800 border-gray-600"
                        />
                        <CreditCard className="w-5 h-5 ml-3 mr-3 text-gray-300" />
                        <span className="text-white">Cartão de Crédito (Maquininha)</span>
                      </label>
                      <label className="flex items-center p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:border-brand-orange/50 transition-colors">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Cartão de Débito"
                          checked={paymentMethod === 'Cartão de Débito'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-brand-orange focus:ring-brand-orange bg-gray-800 border-gray-600"
                        />
                        <CreditCard className="w-5 h-5 ml-3 mr-3 text-gray-300" />
                        <span className="text-white">Cartão de Débito (Maquininha)</span>
                      </label>
                      <label className="flex items-center p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:border-brand-orange/50 transition-colors">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Pix"
                          checked={paymentMethod === 'Pix'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-brand-orange focus:ring-brand-orange bg-gray-800 border-gray-600"
                        />
                        <div className="w-5 h-5 ml-3 mr-3 flex items-center justify-center font-bold text-gray-300 text-xs border border-gray-300 rounded">PIX</div>
                        <span className="text-white">Pix (No ato)</span>
                      </label>
                    </>
                  ) : (
                    <>
                       <label className="flex items-center p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:border-brand-orange/50 transition-colors">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Pix"
                          checked={paymentMethod === 'Pix'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-brand-orange focus:ring-brand-orange bg-gray-800 border-gray-600"
                        />
                        <div className="w-5 h-5 ml-3 mr-3 flex items-center justify-center font-bold text-gray-300 text-xs border border-gray-300 rounded">PIX</div>
                        <span className="text-white">Pix (Envio de comprovante)</span>
                      </label>
                      <label className="flex items-center p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:border-brand-orange/50 transition-colors">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Link de Pagamento"
                          checked={paymentMethod === 'Link de Pagamento'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-brand-orange focus:ring-brand-orange bg-gray-800 border-gray-600"
                        />
                        <CreditCard className="w-5 h-5 ml-3 mr-3 text-gray-300" />
                        <span className="text-white">Cartão (Link de Pagamento)</span>
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Error & Submit */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center font-medium">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold uppercase tracking-wider text-lg shadow-lg hover:shadow-green-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Confirmar no WhatsApp
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};