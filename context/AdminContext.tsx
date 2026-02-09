import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '../types';

interface AdminContextType {
  // Alert Logic
  alertMessage: string;
  isAlertActive: boolean;
  setAlertMessage: (msg: string) => void;
  setIsAlertActive: (active: boolean) => void;
  updateAlert: (msg: string, active: boolean) => void;
  
  // Order Logic (Real-time data)
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Alert State
  const [alertMessage, setAlertMessage] = useState('HOJE: FRETE GRÁTIS PARA PEDIDOS ACIMA DE R$ 50,00!');
  const [isAlertActive, setIsAlertActive] = useState(false);

  // Orders State (Starts empty for real-time tracking)
  const [orders, setOrders] = useState<Order[]>([]);

  const updateAlert = (msg: string, active: boolean) => {
    setAlertMessage(msg);
    setIsAlertActive(active);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  return (
    <AdminContext.Provider value={{ 
      alertMessage, 
      isAlertActive, 
      setAlertMessage, 
      setIsAlertActive,
      updateAlert,
      orders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within a AdminProvider');
  }
  return context;
};