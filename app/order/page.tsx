"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
  const [jumlah, setJumlah] = useState(1);
  const [step, setStep] = useState(1);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  const { data: session } = useSession();
  const router = useRouter();

  const hargaPerReview = 5000;
  const total = jumlah * hargaPerReview;

  const handleKonfirmasiWA = () => {
    const text = `Halo Admin ReviewBisnisku, saya telah melakukan pembayaran untuk order ${jumlah} review (Total: Rp ${total.toLocaleString('id-ID')}). Berikut lampiran bukti transfer saya:`;
    window.open(`https://wa.me/6285172252910?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setPreviewImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col relative bg-surface-container-low">
        {/* Global Texture Overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply z-0" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>

      <header className="bg-surface/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back</span>
            <span className="hidden md:inline text-label-lg font-label-lg text-primary">Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>reviews</span>
            <span className="text-title-lg font-title-lg font-bold text-on-surface">Form Order</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {step === 1 ? (
            <>
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-outline-variant/30">
              <h2 className="text-title-lg font-title-lg text-on-surface mb-6 flex items-center gap-2 border-b border-outline-variant/50 pb-4">
                <span className="material-symbols-outlined text-primary">storefront</span>
                Detail Bisnis
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="maps_url">Link Google Maps Bisnis Anda</label>
                  <input 
                    type="url" 
                    id="maps_url" 
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-md font-body-md"
                    placeholder="https://maps.app.goo.gl/..."
                  />
                  <p className="text-body-sm text-on-surface-variant mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    Pastikan link dapat diakses publik.
                  </p>
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="business_name">Nama Bisnis (Sesuai di Maps)</label>
                  <input 
                    type="text" 
                    id="business_name" 
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-md font-body-md"
                    placeholder="Contoh: Kedai Kopi Nusantara"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-outline-variant/30">
              <h2 className="text-title-lg font-title-lg text-on-surface mb-6 flex items-center gap-2 border-b border-outline-variant/50 pb-4">
                <span className="material-symbols-outlined text-primary">reviews</span>
                Detail Review
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-3" htmlFor="jumlah">Jumlah Review</label>
                  <div className="flex items-center gap-4">
                    <button 
                      type="button" 
                      onClick={() => setJumlah(Math.max(1, jumlah - 1))}
                      className="w-12 h-12 flex items-center justify-center bg-surface border border-outline-variant rounded-full text-on-surface hover:bg-surface-variant transition shadow-sm"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input 
                      type="number" 
                      id="jumlah" 
                      min="1"
                      value={jumlah}
                      onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 text-center px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-title-lg font-title-lg font-bold"
                    />
                    <button 
                      type="button" 
                      onClick={() => setJumlah(jumlah + 1)}
                      className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-full hover:bg-primary-container hover:text-on-primary-container transition shadow-sm"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-3">Target Bintang</label>
                  <div className="flex gap-3">
                    {[5, 4].map((star) => (
                      <label key={star} className="cursor-pointer relative">
                        <input type="radio" name="rating" value={star} defaultChecked={star === 5} className="peer sr-only" />
                        <div className="px-5 py-2.5 rounded-xl border border-outline-variant peer-checked:border-primary peer-checked:bg-primary/5 flex items-center gap-1.5 transition-all shadow-sm">
                          <span className="text-label-md font-bold">{star}</span>
                          <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="notes">Catatan / Template Spesifik (Opsional)</label>
                  <textarea 
                    id="notes" 
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-md font-body-md resize-y"
                    placeholder="Contoh: Tolong sebutkan menu Kopi Susu Aren kami enak..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="upload_gambar">Upload Gambar (Bisa Lebih Dari Satu)</label>
                  <input 
                    type="file" 
                    id="upload_gambar" 
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-md font-body-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  <p className="text-body-sm text-on-surface-variant mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    Gambar opsi jika Anda ingin ulasan disertai foto.
                  </p>
                  
                  {previewImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 md:grid-cols-4 gap-4">
                      {previewImages.map((src, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden border border-outline-variant aspect-square">
                          <img src={src} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-error/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error"
                            title="Hapus gambar"
                          >
                            <span className="material-symbols-outlined text-[16px] block">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-primary text-on-primary p-6 md:p-8 rounded-3xl shadow-lg sticky top-28 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')]">
              <h3 className="text-title-lg font-title-lg mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">receipt_long</span>
                Ringkasan Order
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-body-md">
                  <span className="text-on-primary/80">Harga Per Review</span>
                  <span className="font-bold">Rp 5.000</span>
                </div>
                <div className="flex justify-between text-body-md text-on-primary/90">
                  <span className="text-on-primary/80">Jumlah Pesanan</span>
                  <span className="font-bold">{jumlah}x Review</span>
                </div>
                
                <div className="w-full h-px bg-white/20 my-4 border-dashed border-t border-white/30"></div>
                
                <div className="flex justify-between items-end">
                  <span className="text-title-md font-medium">Total Bayar</span>
                  <span className="text-headline-sm font-bold tracking-tight">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (!session) {
                    setShowLoginPopup(true);
                  } else {
                    setStep(2);
                  }
                }}
                className="w-full bg-white text-primary py-4 rounded-full font-label-lg font-bold hover:bg-surface-variant transition-colors shadow-md flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">payment</span>
                Lanjut Pembayaran
              </button>

              <div className="mt-6 flex items-start gap-3 bg-black/10 p-4 rounded-2xl">
                <span className="material-symbols-outlined text-xl shrink-0">verified_user</span>
                <p className="text-body-sm text-sm opacity-90 leading-snug">
                  Garansi aman dan permanen. Pengerjaan dilakukan secara bertahap untuk menjaga kualitas.
                </p>
              </div>
            </div>
          </div>
            </>
          ) : (
            <div className="lg:col-span-3 max-w-2xl mx-auto w-full">
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-outline-variant/30 text-center relative">
                <button 
                  onClick={() => setStep(1)}
                  className="absolute top-6 left-6 p-2 rounded-full hover:bg-surface-variant transition-colors flex items-center justify-center text-on-surface-variant"
                  title="Kembali"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                
                <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2 mt-4 md:mt-0">Pembayaran QRIS</h2>
                <p className="text-body-md font-body-md text-on-surface-variant mb-8">
                  Silakan scan kode QR di bawah ini untuk membayar total tagihan <strong className="text-primary font-bold">Rp {total.toLocaleString('id-ID')}</strong>
                </p>

                <div className="w-64 h-64 mx-auto bg-surface-variant rounded-2xl flex items-center justify-center mb-8 border-2 border-dashed border-outline-variant/50 overflow-hidden relative">
                  {/* Contoh / Placeholder Gambar QRIS */}
                  <img src="qris.jpeg" alt="Scan QRIS" className="w-full h-full object-cover" />
                
                </div>

                <div className="space-y-4 max-w-sm mx-auto border-t border-outline-variant/30 pt-6">
                  <h3 className="text-label-lg font-bold text-on-surface mb-2">Sudah Melakukan Pembayaran?</h3>
                  <button 
                    onClick={handleKonfirmasiWA}
                    className="w-full bg-[#25D366] text-white py-4 rounded-full font-label-lg font-bold hover:bg-[#128C7E] transition-colors shadow-[0_4px_16px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2 group"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.888-.653-1.488-1.46-1.661-1.759-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Kirim Bukti Transfer ke WA
                  </button>
                  <p className="text-body-sm text-center text-on-surface-variant">Admin kami akan segera memproses order Anda setelah mutasi masuk.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/6285172252910?text=Halo%20Admin,%20saya%20butuh%20bantuan%20terkait%20layanan%20ReviewBisnisku."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors z-[9999] flex items-center justify-center gap-2 group"
        title="Bantuan via WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.888-.653-1.488-1.46-1.661-1.759-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-surface rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-[fadeIn_0.2s_ease-out]">
            <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>
            <h3 className="text-title-lg font-bold text-center text-on-surface mb-2">Harus Login</h3>
            <p className="text-body-md text-center text-on-surface-variant mb-6">
              Anda harus login terlebih dahulu untuk dapat melanjutkan ke proses pembayaran.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowLoginPopup(false)}
                className="flex-1 py-3 rounded-full font-label-md font-bold text-on-surface-variant bg-surface-variant hover:bg-surface-variant/80 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => router.push('/login')}
                className="flex-1 py-3 rounded-full font-label-md font-bold text-on-primary bg-primary hover:bg-primary-container hover:text-on-primary-container transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}