import { CONTACT_INFO, DEFAULT_MESSAGE } from '../constants';
import { CartItem } from '../types';

export const getWhatsappLink = (message: string = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`;
};

export interface OrderDetails {
  customerName: string;
  deliveryMethod: 'pickup' | 'delivery';
  address: string;
  paymentMethod: string;
}

export const getCartWhatsappLink = (items: CartItem[], total: number, details: OrderDetails) => {
  let message = `Olá! Me chamo *${details.customerName}* e gostaria de fazer um pedido:\n\n`;

  // Itens
  items.forEach(item => {
    message += `- ${item.quantity}x ${item.name}\n`;
  });

  message += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
  message += `------------------------------\n`;

  // Entrega
  if (details.deliveryMethod === 'delivery') {
    message += `*Forma de Entrega:* Delivery\n`;
    message += `*Endereço:* ${details.address}\n`;
  } else {
    message += `*Forma de Entrega:* Retirada no Balcão\n`;
  }

  // Pagamento
  message += `*Pagamento:* ${details.paymentMethod}\n\n`;
  message += `Aguardo a confirmação!`;

  return getWhatsappLink(message);
};