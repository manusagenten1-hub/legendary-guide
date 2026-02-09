import { Product, ContactInfo } from './types';

export const CONTACT_INFO: ContactInfo = {
  whatsapp: '5551981794338',
  phoneDisplay: '(51) 98179-4338',
  address: 'Av. Álvares Cabral - Morada do Vale I, Gravataí - RS, 94085-000',
  hours: 'Seg a Dom: 18h às 23h',
};

export const DEFAULT_MESSAGE = "Olá! Vim pelo site da Brasa Burguer e gostaria de fazer um pedido.";

// Using Unsplash images for realistic food visuals as requested
export const PRODUCTS: Product[] = [
  // Burgers
  {
    id: 'b1',
    name: 'Cheeseburger Clássico',
    description: 'Pão brioche, hambúrguer bovino, queijo cheddar e molho especial.',
    price: 28.90,
    image: 'https://www.unileverfoodsolutions.com.sg/dam/global-ufs/mcos/SEA/calcmenu/recipes/SG-recipes/vegetables-&-vegetable-dishes/%E7%BB%8F%E5%85%B8%E8%8A%9D%E5%A3%AB%E6%B1%89%E5%A0%A1/main-header.jpg',
    category: 'burger'
  },
  {
    id: 'b2',
    name: 'Bacon Burger',
    description: 'Hambúrguer bovino, cheddar, bacon crocante e maionese da casa.',
    price: 32.90,
    image: 'https://img77.uenicdn.com/image/upload/v1582164126/business/99def3c9-86a1-4c19-9317-d5376c18c298/hamburguer-shutterstockjpg.jpg',
    category: 'burger'
  },
  {
    id: 'b3',
    name: 'Duplo Cheddar',
    description: 'Dois hambúrgueres, cheddar duplo e pão brioche.',
    price: 38.90,
    image: 'https://osaboroso.com.br/wp-content/uploads/2023/08/IMG-20230912-WA0057.jpg',
    category: 'burger'
  },
  {
    id: 'b4',
    name: 'Smash Burger',
    description: 'Smash bovino, cheddar, cebola grelhada e molho especial.',
    price: 25.90,
    image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&w=800&q=80',
    category: 'burger'
  },
  {
    id: 'b5',
    name: 'Burger Salada',
    description: 'Hambúrguer bovino, cheddar, alface, tomate e maionese.',
    price: 29.90,
    image: 'https://assets.unileversolutions.com/recipes-v2/106684.jpg',
    category: 'burger'
  },
  {
    id: 'b6',
    name: 'Burger Barbecue',
    description: 'Hambúrguer bovino, cheddar, bacon e molho barbecue.',
    price: 33.90,
    image: 'https://img.freepik.com/fotos-premium/um-hamburguer-com-molho-barbecue-e-molho-barbecue_900321-26172.jpg',
    category: 'burger'
  },
  {
    id: 'b7',
    name: 'Chicken Burger',
    description: 'Frango empanado crocante, alface e maionese.',
    price: 26.90,
    image: 'https://veef.com.au/wp-content/uploads/2022/05/veef-chicken-new-recipe.jpg',
    category: 'burger'
  },
  {
    id: 'b8',
    name: 'Xis Bacon',
    description: 'Hambúrguer, queijo, bacon, alface, tomate e milho.',
    price: 34.90,
    image: 'https://www.rbsdirect.com.br/imagesrc/25682613.jpg?w=700',
    category: 'burger'
  },
  {
    id: 'b9',
    name: 'Xis Calabresa',
    description: 'Hambúrguer, calabresa, queijo e maionese.',
    price: 31.90,
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/e1/e8/66/x-calabresa-supreme-pra.jpg',
    category: 'burger'
  },
  {
    id: 'b10',
    name: 'Burger da Casa',
    description: 'Hambúrguer especial, queijo, bacon, cebola caramelizada e molho da casa.',
    price: 39.90,
    image: 'https://cdn.abrahao.com.br/base/14a/7e3/761/chapa-de-hamburguer-profissional.jpg',
    category: 'burger'
  },
  // Combos
  {
    id: 'c1',
    name: 'Combo Clássico',
    description: 'Cheeseburger + batata frita + refrigerante',
    price: 39.90,
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=800&q=80',
    category: 'combo'
  },
  {
    id: 'c2',
    name: 'Combo Bacon',
    description: 'Bacon Burger + batata frita + refrigerante',
    price: 44.90,
    image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&w=800&q=80',
    category: 'combo'
  },
  {
    id: 'c3',
    name: 'Combo Smash',
    description: 'Smash Burger + batata frita + refrigerante',
    price: 36.90,
    image: 'https://static.wixstatic.com/media/368834_73b6ec25839e485d8999bf718d654dab~mv2.jpeg/v1/fill/w_1280,h_852,al_c,q_85,enc_avif,quality_auto/368834_73b6ec25839e485d8999bf718d654dab~mv2.jpeg',
    category: 'combo'
  },
  {
    id: 'c4',
    name: 'Combo Xis',
    description: 'Xis Bacon ou Xis Calabresa + refrigerante',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1605789538467-f715d58e03f9?auto=format&fit=crop&w=800&q=80',
    category: 'combo'
  }
];