"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
  const [jumlah, setJumlah] = useState(1);
  const [step, setStep] = useState(1);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ mapsUrl?: string, businessName?: string }>({});
  
  const router = useRouter();
  
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login?callbackUrl=/order');
    },
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="material-symbols-outlined animate-spin text-4xl text-blue-600">progress_activity</span>
      </div>
    );
  }

  const hargaPerReview = 5000;
  const total = jumlah * hargaPerReview;

  const handleKonfirmasiWA = () => {
    const text = `Halo Admin ReviewBisnisku, saya telah melakukan pembayaran untuk order ${jumlah} review (Total: Rp ${total.toLocaleString('id-ID')}). ID Order: ${createdOrderId}. Berikut lampiran bukti transfer saya:`;
    window.open(`https://wa.me/6285172252910?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleLanjutPembayaran = async () => {
    setIsSubmitting(true);
    try {
      const mapsUrl = (document.getElementById('maps_url') as HTMLInputElement)?.value;
      const businessName = (document.getElementById('business_name') as HTMLInputElement)?.value;
      const notes = (document.getElementById('notes') as HTMLTextAreaElement)?.value;
      const ratingEl = document.querySelector('input[name="rating"]:checked') as HTMLInputElement;
      const targetStar = ratingEl ? ratingEl.value : "5";

      const newErrors: { mapsUrl?: string, businessName?: string } = {};
      if (!mapsUrl) newErrors.mapsUrl = "*Mohon isi Link Maps Bisnis Anda";
      if (!businessName) newErrors.businessName = "*Mohon isi Nama Bisnis Anda";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setErrors({});

      const formData = new FormData();
      formData.append('businessName', businessName);
      formData.append('mapsUrl', mapsUrl);
      formData.append('reviewsCount', jumlah.toString());
      formData.append('targetStar', targetStar);
      formData.append('notes', notes);
      formData.append('totalPrice', total.toString());
      
      const fileInput = document.getElementById('upload_gambar') as HTMLInputElement;
      if (fileInput && fileInput.files) {
        Array.from(fileInput.files).forEach((file) => {
          formData.append('images', file);
        });
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setCreatedOrderId(data.id);
        setStep(2);
      } else {
        alert("Gagal memproses order. Silakan coba lagi.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-gray-50 pb-28 lg:pb-0">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 md:px-8 py-4 max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-blue-600 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back</span>
            <span className="hidden md:inline text-sm font-semibold text-blue-600">Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>reviews</span>
            <span className="text-lg font-bold text-gray-900">Form Order</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {step === 1 ? (
            <>
              {/* Kiri: Form Section */}
              <div className="flex-1 space-y-6">
                
                {/* Panel 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                    <span className="material-symbols-outlined text-blue-600">storefront</span>
                    Detail Bisnis
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="maps_url">Link Google Maps Bisnis Anda</label>
                      <input 
                        type="url" 
                        id="maps_url" 
                        className={`w-full px-4 py-3 rounded-lg border ${errors.mapsUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} bg-gray-50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800`}
                        placeholder="https://maps.app.goo.gl/..."
                        onChange={() => setErrors(prev => ({ ...prev, mapsUrl: undefined }))}
                      />
                      {errors.mapsUrl && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.mapsUrl}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="business_name">Nama Bisnis (Sesuai di Maps)</label>
                      <input 
                        type="text" 
                        id="business_name" 
                        className={`w-full px-4 py-3 rounded-lg border ${errors.businessName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} bg-gray-50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800`}
                        placeholder="Contoh: Kedai Kopi Nusantara"
                        onChange={() => setErrors(prev => ({ ...prev, businessName: undefined }))}
                      />
                      {errors.businessName && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.businessName}</p>}
                    </div>
                  </div>
                </div>

                {/* Panel 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                    <span className="material-symbols-outlined text-blue-600">reviews</span>
                    Detail Review
                  </h2>
                  <div className="space-y-8">
                    
                    {/* Jumlah Review Redesign */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Jumlah Review</label>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setJumlah(Math.max(1, jumlah - 1))}
                          className="w-12 h-12 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-full text-gray-700 active:bg-gray-200"
                        >
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <div className="flex-1 text-center font-bold text-2xl text-gray-800 border-b-2 border-gray-200 pb-2">
                          {jumlah}
                        </div>
                        <button 
                          onClick={() => setJumlah(jumlah + 1)}
                          className="w-12 h-12 flex items-center justify-center bg-blue-600 border border-blue-600 rounded-full text-white active:bg-blue-700"
                        >
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>

                    {/* Target Bintang */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Target Bintang</label>
                      <div className="flex gap-4">
                        {[5, 4].map((star) => (
                          <label key={star} className="cursor-pointer relative flex-1">
                            <input type="radio" name="rating" value={star} defaultChecked={star === 5} className="peer sr-only" />
                            <div className="w-full text-center py-3 rounded-lg border-2 border-gray-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 flex items-center justify-center gap-2 transition-all">
                              <span className="font-bold text-gray-800">{star}</span>
                              <span className="material-symbols-outlined text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="notes">Catatan / Template Spesifik (Opsional)</label>
                      <textarea 
                        id="notes" 
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800 resize-y"
                        placeholder="Contoh: Tolong sebutkan menu Kopi Susu Aren kami enak..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="upload_gambar">Upload Gambar (Bisa Lebih Dari Satu)</label>
                      <input 
                        type="file" 
                        id="upload_gambar" 
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                      />
                      
                      {previewImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 gap-4">
                          {previewImages.map((src, index) => (
                            <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-100">
                              <img src={src} alt="Preview" className="w-full h-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm"
                              >
                                <span className="material-symbols-outlined text-sm block">close</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Kanan: Ringkasan Desktop */}
              <div className="hidden lg:block w-96 shrink-0">
                <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl sticky top-28">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">receipt_long</span>
                    Ringkasan Order
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-blue-100">Harga Per Review</span>
                      <span className="font-bold">Rp 5.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Jumlah Pesanan</span>
                      <span className="font-bold">{jumlah}x Review</span>
                    </div>
                    
                    <div className="w-full border-t border-dashed border-blue-400 my-4"></div>
                    
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-medium">Total Bayar</span>
                      <span className="text-3xl font-bold">Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleLanjutPembayaran}
                    disabled={isSubmitting}
                    className="w-full bg-white text-blue-700 py-4 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 active:bg-gray-100 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined">payment</span>
                    )}
                    {isSubmitting ? 'Memproses...' : 'Lanjut Pembayaran'}
                  </button>
                </div>
              </div>

              {/* Fixed Bottom Bar Mobile */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-semibold">Total Bayar</span>
                    <span className="text-xl font-bold text-gray-900">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                  <button 
                    onClick={handleLanjutPembayaran}
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 active:bg-blue-700 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined text-[20px]">payment</span>
                    )}
                    {isSubmitting ? 'Tunggu...' : 'Bayar'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 text-center relative">
              <button 
                onClick={() => setStep(1)}
                className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2 mt-8 md:mt-0">Pembayaran QRIS</h2>
              <p className="text-gray-600 mb-4">
                Order ID: <strong className="text-gray-900">{createdOrderId}</strong>
              </p>
              <p className="text-gray-600 mb-8">
                Silakan scan kode QR di bawah ini untuk membayar total tagihan <strong className="text-blue-600 font-bold text-xl">Rp {total.toLocaleString('id-ID')}</strong>
              </p>

              <div className="w-64 h-64 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-8 border-2 border-dashed border-gray-300 overflow-hidden">
                <img src="/qris.jpeg" alt="Scan QRIS" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4 max-w-sm mx-auto border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sudah Melakukan Pembayaran?</h3>
                <button 
                  onClick={handleKonfirmasiWA}
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold active:bg-[#128C7E] flex items-center justify-center gap-2 shadow-md"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.888-.653-1.488-1.46-1.661-1.759-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Kirim Bukti Transfer
                </button>
                <p className="text-sm text-center text-gray-500">Admin kami akan segera memproses order Anda setelah mutasi masuk.</p>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Floating WhatsApp Button (Hidden on Mobile Step 1 to avoid covering bottom bar) */}
      <a 
        href="https://wa.me/6285172252910?text=Halo%20Admin,%20saya%20butuh%20bantuan%20terkait%20layanan%20ReviewBisnisku."
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors z-[999] flex items-center justify-center gap-2 ${step === 1 ? 'bottom-28 lg:bottom-6' : 'bottom-6'}`}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.888-.653-1.488-1.46-1.661-1.759-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}