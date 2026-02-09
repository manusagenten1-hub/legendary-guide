export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'burger' | 'combo' | 'drink';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ContactInfo {
  whatsapp: string;
  phoneDisplay: string;
  address: string;
  hours: string;
}

export interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: 'Pendente' | 'Em Preparo' | 'Saiu para Entrega' | 'Entregue';
  time: string;
  timestamp: number;
}