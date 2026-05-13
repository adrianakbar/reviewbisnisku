"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  businessName: string;
  mapsUrl: string;
  reviewsCount: number;
  targetStar: number;
  status: string;
  totalPrice: number;
  createdAt: string;
  customerWa: string | null;
  images?: string[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredOrders = filter === "All" 
    ? orders 
    : orders.filter(o => o.status === filter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-error-container text-on-error-container border-error/20';
      case 'Processing': return 'bg-secondary-container text-on-secondary-container border-secondary/20';
      case 'Completed': return 'bg-[#c6f6d5] text-[#22543d] border-[#9ae6b4]';
      default: return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(d);
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col relative">
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <header className="bg-surface/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-outline-variant/30">
        <div className="px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            <span className="text-title-lg font-title-lg font-bold text-on-surface">Admin Dashboard</span>
          </div>
          <Link href="/" className="flex items-center gap-2 hover:bg-surface-variant px-4 py-2 rounded-full transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined text-xl">home</span>
            <span className="hidden md:inline font-label-md font-bold">Ke Website</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 relative z-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2">Kelola Pesanan</h1>
            <p className="text-body-lg text-on-surface-variant">Pantau dan kelola semua pesanan review masuk.</p>
          </div>
          
          <div className="flex gap-2 bg-surface p-1 rounded-xl shadow-sm border border-outline-variant/30 self-start md:self-auto overflow-x-auto max-w-full">
            {["All", "Pending", "Processing", "Completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-label-md transition-all whitespace-nowrap ${
                  filter === f 
                    ? 'bg-primary text-on-primary shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-variant/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-outline-variant/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container/50 border-b border-outline-variant/50 text-label-md text-on-surface-variant">
                  <th className="p-4 md:p-6 font-bold">ID / Tanggal</th>
                  <th className="p-4 md:p-6 font-bold">Bisnis</th>
                  <th className="p-4 md:p-6 font-bold">Detail</th>
                  <th className="p-4 md:p-6 font-bold">Total</th>
                  <th className="p-4 md:p-6 font-bold">Status</th>
                  <th className="p-4 md:p-6 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
                      <p className="mt-2 font-label-md">Memuat data...</p>
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-variant/20 transition-colors group">
                      <td className="p-4 md:p-6">
                        <span className="font-label-md font-bold text-on-surface max-w-[120px] truncate block" title={order.id}>{order.id}</span>
                        <span className="block text-body-sm text-on-surface-variant mt-1">{formatDate(order.createdAt)}</span>
                      </td>
                      <td className="p-4 md:p-6">
                        <span className="font-label-md font-bold text-on-surface">{order.businessName}</span>
                        <a 
                          href={order.mapsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline text-body-sm mt-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">map</span>
                          Lihat Maps
                        </a>
                      </td>
                      <td className="p-4 md:p-6">
                        <div className="flex items-center gap-2">
                          <span className="bg-surface-container px-2 py-1 rounded-md text-body-sm font-medium">
                            {order.reviewsCount}x Review
                          </span>
                          <span className="flex items-center text-secondary font-bold text-body-sm bg-secondary-container/20 px-2 py-1 rounded-md">
                            {order.targetStar} <span className="material-symbols-outlined text-[14px] ml-0.5" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                          </span>
                        </div>
                        {order.images && order.images.length > 0 && (
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {order.images.map((img, i) => (
                              <a key={i} href={img} target="_blank" rel="noopener noreferrer" className="block w-10 h-10 rounded overflow-hidden border border-outline-variant hover:opacity-80 transition-opacity" title="Lihat Foto">
                                <img src={img} alt="Bukti Foto" className="w-full h-full object-cover" />
                              </a>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="p-4 md:p-6">
                        <span className="font-label-md font-bold text-on-surface">
                          Rp {order.totalPrice.toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="p-4 md:p-6">
                        <span className={`px-3 py-1.5 rounded-full text-label-sm font-bold border flex items-center gap-1.5 w-max ${getStatusColor(order.status)}`}>
                          <span className={`w-2 h-2 rounded-full ${order.status === 'Pending' ? 'bg-error' : order.status === 'Processing' ? 'bg-secondary' : 'bg-[#38a169]'}`}></span>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 md:p-6 text-center">
                        <div className="flex justify-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          {order.customerWa && (
                            <a 
                              href={`https://wa.me/${order.customerWa}?text=Halo%20pemesan%20dari%20${order.businessName},%20terkait%20order%20${order.id}...`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                              title="Hubungi via WA"
                            >
                              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.888-.653-1.488-1.46-1.661-1.759-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                            </a>
                          )}
                          
                          <div className="relative group/menu">
                            <button className="w-10 h-10 rounded-full bg-surface-variant/50 text-on-surface-variant flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[20px]">more_vert</span>
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-2xl shadow-xl border border-outline-variant/30 py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-50">
                              <button 
                                onClick={() => updateStatus(order.id, 'Pending')}
                                className="w-full text-left px-4 py-2 hover:bg-error-container/50 text-on-error-container text-body-sm font-medium"
                              >
                                Tandai Pending
                              </button>
                              <button 
                                onClick={() => updateStatus(order.id, 'Processing')}
                                className="w-full text-left px-4 py-2 hover:bg-secondary-container/50 text-on-secondary-container text-body-sm font-medium"
                              >
                                Tandai Processing
                              </button>
                              <button 
                                onClick={() => updateStatus(order.id, 'Completed')}
                                className="w-full text-left px-4 py-2 hover:bg-[#c6f6d5]/50 text-[#22543d] text-body-sm font-medium"
                              >
                                Tandai Completed
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <span className="material-symbols-outlined text-4xl opacity-50">inbox</span>
                        <p className="font-label-md">Tidak ada pesanan dengan status "{filter}".</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
