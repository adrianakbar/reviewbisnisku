import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="bg-surface shadow-sm docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              reviews
            </span>
            <span className="text-headline-md font-headline-md font-bold text-primary">
              ReviewBisnisku
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200"
              href="#benefit"
            >
              Benefit
            </a>
            <a
              className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200"
              href="#carakerja"
            >
              Cara Kerja
            </a>
            <a
              className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200"
              href="#testimoni"
            >
              Testimoni
            </a>
            <a
              className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200"
              href="#harga"
            >
              Harga
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-primary font-label-md text-label-md hover:opacity-80 transition-opacity">
              Login
            </Link>
            <Link href="/order" className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              Order
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow relative">
        {/* Global Texture Overlay (Noise) */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply z-50" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>

        <section className="relative overflow-hidden py-20 lg:py-32 px-margin-mobile md:px-margin-desktop">
          <div className="absolute inset-0 bg-surface-container-low -z-10 rounded-b-[3rem] mx-4 lg:mx-8 overflow-hidden">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-secondary-fixed-dim/20 rounded-full blur-[100px] -z-10"></div>
          
          {/* Floating Icons Background */}
          <div className="absolute inset-0 pointer-events-none max-w-[1200px] mx-auto hidden lg:block z-0">
            {/* Food */}
            <div className="absolute top-[20%] left-[2%] bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-outline-variant/30 rotate-[-12deg] animate-[bounce_6s_infinite_alternate]">
              <span className="material-symbols-outlined text-error text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
            </div>
            {/* Property */}
            <div className="absolute bottom-[20%] left-[8%] bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-outline-variant/30 rotate-[12deg] animate-[bounce_7s_infinite_alternate] delay-700">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>real_estate_agent</span>
            </div>
            {/* Maps */}
            <div className="absolute top-[25%] right-[2%] bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-outline-variant/30 rotate-[15deg] animate-[bounce_5s_infinite_alternate] delay-1000">
              <span className="material-symbols-outlined text-secondary-fixed-dim text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
            </div>
            {/* Drink */}
            <div className="absolute bottom-[25%] right-[8%] bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-outline-variant/30 rotate-[-10deg] animate-[bounce_8s_infinite_alternate] delay-300">
              <span className="material-symbols-outlined text-tertiary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_cafe</span>
            </div>
            {/* Store/Retail */}
            <div className="absolute top-[10%] left-[30%] bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-outline-variant/30 rotate-[5deg] animate-[bounce_9s_infinite_alternate] opacity-60">
              <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            </div>
            {/* Health/Clinic */}
            <div className="absolute bottom-[10%] right-[30%] bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-outline-variant/30 rotate-[-5deg] animate-[bounce_6s_infinite_alternate] opacity-60 delay-500">
              <span className="material-symbols-outlined text-primary-fixed-dim text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_hospital</span>
            </div>
          </div>

          <div className="max-w-container-max mx-auto text-center flex flex-col items-center relative z-10">
            <span className="bg-white border border-outline-variant px-4 py-1.5 rounded-full text-label-sm font-label-sm text-on-surface-variant mb-6 inline-flex items-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <span
                className="material-symbols-outlined text-secondary-fixed-dim text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              #1 Layanan Review Manajemen
            </span>
            <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface max-w-4xl mx-auto mb-6 leading-tight">
              Tingkatkan Reputasi Bisnis Anda dengan Review Berkualitas
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              Dapatkan ulasan Google Maps yang otentik dan terpercaya untuk menarik
              lebih banyak pelanggan. Bangun kepercayaan digital yang kuat untuk
              bisnis Anda.
            </p>
            <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center gap-2">
              Mulai Sekarang
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </section>

        <section className="py-12 relative overflow-hidden bg-white/40 backdrop-blur-sm border-b border-surface-variant">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none -z-10"></div>
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24">
              <div className="text-center">
                <p className="text-headline-lg-mobile font-headline-lg-mobile text-primary mb-1">
                  10+
                </p>
                <p className="text-label-md font-label-md text-on-surface-variant">
                  Bisnis Terbantu
                </p>
              </div>
              <div className="hidden md:block w-px h-12 bg-surface-variant"></div>
              <div className="text-center">
                <p className="text-headline-lg-mobile font-headline-lg-mobile text-primary mb-1">
                  50+
                </p>
                <p className="text-label-md font-label-md text-on-surface-variant">
                  Review Terbit
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface relative overflow-hidden" id="benefit">
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          {/* Subtle Dots Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#80808020_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-10"></div>
          
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
                Mengapa Memilih Kami?
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Pendekatan profesional kami memastikan reputasi bisnis Anda tumbuh
                dengan cara yang aman dan efektif.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-md border border-outline-variant p-8 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"></div>
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-500"></div>
                  <span className="material-symbols-outlined text-primary relative z-10">
                    verified_user
                  </span>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-3 relative z-10">
                  Ulasan Otentik
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant relative z-10">
                  Review ditulis oleh pengguna nyata dengan akun Google yang
                  terverifikasi dan aktif, memberikan kesan natural pada halaman
                  bisnis Anda.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-outline-variant p-8 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"></div>
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-500"></div>
                  <span className="material-symbols-outlined text-primary relative z-10">
                    shield
                  </span>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-3 relative z-10">
                  Keamanan Terjamin
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant relative z-10">
                  Kami mematuhi panduan ketat untuk memastikan tidak ada
                  pelanggaran kebijakan yang dapat membahayakan akun Google My
                  Business Anda.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-outline-variant p-8 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"></div>
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-500"></div>
                  <span className="material-symbols-outlined text-primary relative z-10">
                    speed
                  </span>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-3 relative z-10">
                  Proses Cepat
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant relative z-10">
                  Sistem distribusi review yang terjadwal memastikan peningkatan
                  reputasi Anda terlihat dalam waktu singkat namun tetap wajar.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface-container-low relative overflow-hidden" id="carakerja">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-secondary-fixed-dim/5 to-transparent pointer-events-none -z-10"></div>
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
                Cara Kerja Kami
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Tiga langkah sederhana untuk meningkatkan visibilitas lokal Anda.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 relative">
              <div className="hidden md:block absolute top-[32px] left-[15%] w-[70%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10 border-t-2 border-dashed border-primary/20"></div>
              <div className="flex-1 flex flex-col items-center text-center w-full">
                <div className="w-16 h-16 bg-white border-2 border-primary rounded-full flex items-center justify-center mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <span className="text-headline-md font-headline-md text-primary">
                    1
                  </span>
                </div>
                <h4 className="text-label-md font-label-md text-on-surface mb-2">
                  Masukkan Link Google Maps
                </h4>
                <p className="text-body-sm font-body-sm text-on-surface-variant px-4">
                  Berikan tautan langsung ke halaman Google My Business Anda untuk
                  memulai proses.
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center text-center w-full">
                <div className="w-16 h-16 bg-white border-2 border-primary rounded-full flex items-center justify-center mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <span className="text-headline-md font-headline-md text-primary">
                    2
                  </span>
                </div>
                <h4 className="text-label-md font-label-md text-on-surface mb-2">
                  Pilih Rating &amp; Template
                </h4>
                <p className="text-body-sm font-body-sm text-on-surface-variant px-4">
                  Tentukan target bintang dan berikan masukan template ulasan jika
                  Anda memiliki preferensi spesifik.
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center text-center w-full">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                  <span className="text-headline-md font-headline-md text-on-primary">
                    3
                  </span>
                </div>
                <h4 className="text-label-md font-label-md text-on-surface mb-2">
                  Review Terbit
                </h4>
                <p className="text-body-sm font-body-sm text-on-surface-variant px-4">
                  Duduk dan perhatikan saat ulasan positif mulai muncul secara
                  bertahap di halaman Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface-container-low relative overflow-hidden" id="testimoni">
          {/* Ambient Glows & Watermark */}
          <div className="absolute top-10 right-10 opacity-5 pointer-events-none -z-10 rotate-[15deg]">
            <span className="material-symbols-outlined text-outline-variant/30" style={{ fontVariationSettings: "'FILL' 1", fontSize: "280px" }}>format_quote</span>
          </div>
          <div className="absolute -left-40 top-20 w-96 h-96 bg-tertiary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          <div className="absolute -right-40 bottom-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
                Apa Kata Mereka?
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Ribuan bisnis telah bertransformasi dengan ulasan berkualitas dari
                ReviewBisnisku.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-outline-variant/60 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[30px] -z-10 -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors duration-300 pointer-events-none"></div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>star</span>
                  ))}
                </div>
                <p className="text-body-sm font-body-sm text-on-surface flex-grow mb-6 italic relative z-10">
                  "Layanan luar biasa! Reputasi restoran kami meningkat pesat
                  sejak menggunakan ReviewBisnisku. Pelanggan baru terus berdatangan."
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-label-sm ring-4 ring-white">
                    BS
                  </div>
                  <div>
                    <p className="text-label-md font-label-md text-on-surface">
                      Budi Santoso
                    </p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant text-xs">
                      Owner Resto Sedap
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-outline-variant/60 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed-dim/10 rounded-full blur-[30px] -z-10 -mr-10 -mt-10 group-hover:bg-secondary-fixed-dim/20 transition-colors duration-300 pointer-events-none"></div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>star</span>
                  ))}
                </div>
                <p className="text-body-sm font-body-sm text-on-surface flex-grow mb-6 italic relative z-10">
                  "Sangat puas dengan hasilnya. Review yang masuk sangat natural dan
                  membantu toko online kami terlihat lebih kredibel di mata pencarian
                  Google."
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-label-sm ring-4 ring-white">
                    AP
                  </div>
                  <div>
                    <p className="text-label-md font-label-md text-on-surface">
                      Ani Putri
                    </p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant text-xs">
                      Manager Fashion Hub
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-outline-variant/60 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed-dim/10 rounded-full blur-[30px] -z-10 -mr-10 -mt-10 group-hover:bg-tertiary-fixed-dim/20 transition-colors duration-300 pointer-events-none"></div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>star</span>
                  ))}
                </div>
                <p className="text-body-sm font-body-sm text-on-surface flex-grow mb-6 italic relative z-10">
                  "Prosesnya cepat dan aman. Tim ReviewBisnisku sangat komunikatif.
                  Rekomendasi utama untuk UMKM yang ingin naik kelas secara digital."
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold text-label-sm ring-4 ring-white">
                    HW
                  </div>
                  <div>
                    <p className="text-label-md font-label-md text-on-surface">
                      Hendra Wijaya
                    </p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant text-xs">
                      Pendiri Solusi Teknik
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface relative overflow-hidden" id="harga">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(#80808020_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-10"></div>
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2"></div>
          
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
                Investasi Terbaik untuk Reputasi Anda
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Tingkatkan kepercayaan pelanggan dengan ulasan berkualitas tinggi dengan harga yang sangat terjangkau.
              </p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden relative transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1">
                {/* Highlight/Badge */}
                <div className="bg-primary text-on-primary text-center py-2 text-label-sm font-label-sm font-bold uppercase tracking-wider">
                  Paket Review Unggulan
                </div>
                
                <div className="p-8 md:p-12 text-center border-b border-outline-variant/30">
                  <p className="text-label-md font-label-md text-on-surface-variant mb-2">Harga Super Hemat</p>
                  <div className="flex justify-center items-start gap-1">
                    <span className="text-title-lg font-title-lg text-on-surface mt-2">Rp</span>
                    <span className="text-[4rem] leading-none font-bold text-primary">5.000</span>
                    <span className="text-title-md font-title-md text-on-surface-variant self-end mb-2">/ ulasan</span>
                  </div>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mt-4 bg-primary/5 inline-block px-4 py-1.5 rounded-full">
                    Tanpa minimum order. Fleksibel sesuai kebutuhan Anda.
                  </p>
                </div>
                
                <div className="p-8 md:p-12 bg-surface-container-lowest/50">
                  <h4 className="text-title-md font-title-md text-on-surface mb-6 text-center">
                    Keuntungan yang Anda Dapatkan:
                  </h4>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Garansi review permanen (tidak hilang)",
                      "Menggunakan akun real & aktif",
                      "Akun dilengkapi foto profil meyakinkan",
                      "Teks review natural & relevan dengan bisnis",
                      "Pengerjaan bertahap (anti-spam)",
                      "Aman untuk akun Google Maps Anda",
                      "Laporan pengerjaan transparan"
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "24px" }}>
                          check_circle
                        </span>
                        <span className="text-body-md font-body-md text-on-surface-variant pt-0.5">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 text-lg">
                    <span className="material-symbols-outlined text-xl">shopping_cart</span>
                    Order Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}