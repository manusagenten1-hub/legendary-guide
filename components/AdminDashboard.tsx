import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Lock, BarChart3, ShoppingBag, Megaphone, ArrowLeft, LogOut, TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

const SECRET_PASS = "121314151617181910121314151617181910121314151617181910";

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'alerts'>('overview');

  // Consume real data from context
  const { alertMessage, isAlertActive, updateAlert, orders, updateOrderStatus } = useAdmin();
  
  const [tempAlertMsg, setTempAlertMsg] = useState(alertMessage);
  const [tempAlertActive, setTempAlertActive] = useState(isAlertActive);

  // --- KPI Calculations (Real-time) ---
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Previous month mock (Fixed for demo comparison)
  const prevMonthRevenue = 1500; 
  
  // Calculate percentage growth (handling division by zero)
  const growthPercentage = prevMonthRevenue > 0 
    ? ((totalRevenue - prevMonthRevenue) / prevMonthRevenue) * 100 
    : 100;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Trim whitespace to avoid copy-paste errors
    if (passwordInput.trim() === SECRET_PASS) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta. Verifique os dígitos.');
      // Don't clear input so user can fix typos in the long password
    }
  };

  const handleSaveAlert = () => {
    updateAlert(tempAlertMsg, tempAlertActive);
    alert('Aviso atualizado com sucesso!');
  };

  const cycleStatus = (id: string, currentStatus: string) => {
    const statuses = ['Pendente', 'Em Preparo', 'Saiu para Entrega', 'Entregue'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length] as any;
    updateOrderStatus(id, nextStatus);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-brand-black flex items-center justify-center p-4">
        <div className="bg-brand-dark p-8 rounded-2xl border border-white/10 shadow-2xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-brand-red" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 brand-font uppercase">Área Restrita</h2>
          <p className="text-gray-400 mb-6 text-sm">Digite a chave de acesso para continuar.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setError(''); // Clear error when typing
                }}
                className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors text-center tracking-widest ${error ? 'border-brand-red' : 'border-white/10'}`}
                placeholder="••••••••••••••••"
              />
            </div>
            {error && <p className="text-brand-red text-sm font-bold animate-pulse">{error}</p>}
            
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg font-bold uppercase text-sm transition-colors"
              >
                Voltar
              </button>
              <button 
                type="submit" 
                className="flex-1 py-3 bg-brand-red hover:bg-brand-darkRed text-white rounded-lg font-bold uppercase text-sm transition-colors shadow-lg"
              >
                Acessar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-brand-black flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-brand-dark border-b border-white/10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white brand-font uppercase">Painel Administrativo</h1>
            <p className="text-xs text-brand-yellow font-mono">v1.0.0 • Brasa Burguer</p>
          </div>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold uppercase text-xs px-3 py-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar / Tabs */}
        <aside className="w-20 md:w-64 bg-brand-dark/50 border-r border-white/5 flex flex-col">
          <nav className="p-2 md:p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-brand-red text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="hidden md:inline font-medium">Visão Geral</span>
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-brand-red text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              <div className="hidden md:flex flex-1 justify-between items-center">
                <span className="font-medium">Pedidos</span>
                {orders.length > 0 && (
                   <span className="bg-white text-brand-red text-xs font-bold px-2 py-0.5 rounded-full">{orders.length}</span>
                )}
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('alerts')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'alerts' ? 'bg-brand-red text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Megaphone className="w-5 h-5" />
              <span className="hidden md:inline font-medium">Avisos</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-black/20">
          
          {/* TAB: VISÃO GERAL */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white uppercase brand-font mb-6">Desempenho</h2>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brand-dark p-6 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <DollarSign className="w-16 h-16 text-green-500" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-green-500/20 p-3 rounded-lg text-green-500">
                      <DollarSign className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Faturamento (Sessão)</p>
                  <h3 className="text-3xl font-bold text-white">R$ {totalRevenue.toFixed(2).replace('.', ',')}</h3>
                </div>
                
                <div className="bg-brand-dark p-6 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <ShoppingBag className="w-16 h-16 text-blue-500" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg text-blue-500">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Pedidos Realizados</p>
                  <h3 className="text-3xl font-bold text-white">{totalOrders}</h3>
                </div>

                <div className="bg-brand-dark p-6 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Users className="w-16 h-16 text-brand-yellow" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-brand-yellow/20 p-3 rounded-lg text-brand-yellow">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Ticket Médio</p>
                  <h3 className="text-3xl font-bold text-white">R$ {averageTicket.toFixed(2).replace('.', ',')}</h3>
                </div>
              </div>

              {/* Comparativo Chart (Real Data) */}
              <div className="bg-brand-dark p-6 md:p-8 rounded-2xl border border-white/5 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white">Comparativo de Renda</h3>
                    <p className="text-sm text-gray-500">Sessão Atual vs Meta Mensal (Exemplo)</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                      <span className="text-gray-400">Meta/Ant.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                      <span className="text-gray-400">Atual</span>
                    </div>
                  </div>
                </div>

                <div className="h-64 flex items-end justify-center gap-16 px-4 border-b border-white/10 pb-4 relative">
                  
                  {/* Previous/Target Bar (Mocked for visual comparison) */}
                  <div className="flex flex-col items-center gap-2 group w-24">
                    <div className="flex items-end justify-center w-full h-full relative">
                      <div className="w-12 bg-gray-600 rounded-t-sm hover:opacity-80 transition-all relative" style={{ height: '40%' }}>
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">R$ 1.500</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium uppercase">Meta/Anterior</span>
                  </div>

                  {/* Current Real Data Bar */}
                  <div className="flex flex-col items-center gap-2 group w-24">
                    <div className="flex items-end justify-center w-full h-full relative">
                      {/* Calculate height based on a max value of 5000 for scale, clamped between 5% and 100% */}
                      <div 
                        className="w-12 bg-brand-red rounded-t-sm hover:opacity-80 transition-all relative shadow-[0_0_15px_rgba(217,4,41,0.3)] duration-1000" 
                        style={{ height: `${Math.min(100, Math.max(2, (totalRevenue / 5000) * 100))}%` }}
                      >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-darkRed text-white text-xs px-2 py-1 rounded whitespace-nowrap">R$ {totalRevenue.toFixed(0)}</div>
                      </div>
                    </div>
                    <span className="text-xs text-brand-yellow font-bold uppercase">Atual</span>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB: PEDIDOS */}
          {activeTab === 'orders' && (
             <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white uppercase brand-font">Pedidos em Tempo Real</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-20 bg-brand-dark rounded-2xl border border-dashed border-white/10">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-400 font-bold mb-2">Nenhum pedido recebido ainda</h3>
                  <p className="text-gray-600">Realize um pedido no site para vê-lo aparecer aqui instantaneamente.</p>
                </div>
              ) : (
                <div className="bg-brand-dark rounded-2xl border border-white/5 overflow-hidden shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                          <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                          <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                          <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Itens</th>
                          <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                          <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status (Clique)</th>
                          <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tempo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {orders.map((order) => (
                          <tr key={order.timestamp} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 text-brand-yellow font-mono text-sm">{order.id}</td>
                            <td className="p-4 text-white font-medium">{order.customer}</td>
                            <td className="p-4 text-gray-400 text-sm truncate max-w-[200px]" title={order.items}>{order.items}</td>
                            <td className="p-4 text-white font-bold">R$ {order.total.toFixed(2).replace('.', ',')}</td>
                            <td className="p-4">
                              <button 
                                onClick={() => cycleStatus(order.id, order.status)}
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 select-none ${
                                  order.status === 'Entregue' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                  order.status === 'Pendente' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                  'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                }`}
                              >
                                {order.status}
                              </button>
                            </td>
                            <td className="p-4 text-gray-500 text-xs">{order.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: AVISOS */}
          {activeTab === 'alerts' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white uppercase brand-font">Gerenciar Avisos do Site</h2>
              
              <div className="bg-brand-dark p-8 rounded-2xl border border-white/5 shadow-lg max-w-2xl">
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                    Texto do Aviso (Banner)
                  </label>
                  <input 
                    type="text" 
                    value={tempAlertMsg}
                    onChange={(e) => setTempAlertMsg(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-all"
                    placeholder="Ex: Estamos fechados hoje para manutenção"
                  />
                  <p className="text-gray-500 text-xs mt-2">Este texto aparecerá no topo do site para todos os visitantes.</p>
                </div>

                <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 mb-8">
                  <div>
                    <h4 className="text-white font-bold">Ativar Aviso</h4>
                    <p className="text-gray-400 text-xs">O banner ficará visível no site.</p>
                  </div>
                  <button 
                    onClick={() => setTempAlertActive(!tempAlertActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${tempAlertActive ? 'bg-brand-yellow' : 'bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${tempAlertActive ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleSaveAlert}
                    className="flex items-center gap-2 bg-brand-red hover:bg-brand-darkRed text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95"
                  >
                    <Megaphone className="w-5 h-5" />
                    Salvar e Publicar
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-8">
                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-4">Pré-visualização</h3>
                {tempAlertActive ? (
                  <div className="bg-brand-yellow text-brand-black px-4 py-3 text-center font-bold uppercase tracking-wider text-sm shadow-lg rounded-lg">
                    {tempAlertMsg || "Aviso do site"}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-600 rounded-lg p-4 text-center text-gray-600 text-sm">
                    Aviso desativado (não visível)
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};