(function(){
'use strict';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt=new Intl.NumberFormat('id-ID');
const dec=(v,d)=>v.toFixed(d).replace('.',',');
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}

/* ---------- DATA ---------- */
const YEARS=[2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];
const JML=[7.03,7.04,7.00,7.05,9.77,9.10,8.42,7.86,7.47,7.46,7.24];
const TPT=[5.61,5.50,5.34,5.28,7.07,6.49,5.86,5.32,4.91,4.85,4.68];
const PER=YEARS.map((y,i)=>i===10?'FEBRUARI 2026':'AGUSTUS '+y);
const NOTE=[
 'Turun dari 6,18% setahun sebelumnya. Rilis BPS 7 November 2016.',
 'Bertambah sekitar 10 ribu orang karena angkatan kerja tumbuh, meski TPT turun.',
 'Berkurang sekitar 40 ribu orang dibanding Agustus 2017.',
 'Naik 50 ribu orang, tetapi TPT tetap turun karena angkatan kerja bertambah.',
 'Pandemi COVID-19. Lonjakan terbesar dalam satu dekade, sekitar 2,7 juta orang.',
 'Pemulihan bertahap setelah pembatasan sosial dilonggarkan.',
 'Turun ke 8,42 juta seiring pulihnya aktivitas ekonomi.',
 'Pada periode yang sama, 9,9 juta anak muda 15–24 tahun tidak sekolah dan tidak bekerja (NEET).',
 'Turun ke 7,47 juta, TPT di bawah 5% pertama kali dalam data ini.',
 'Hanya berkurang sekitar 4 ribu orang, di tengah gelombang PHK.',
 'Data terbaru. 147,67 juta orang bekerja, tetapi porsi pekerja formal tinggal 40,58%.'
];
const NEWS=[
 {d:'27 MEI 2025',f:'25.000+',fl:'pencari kerja datang',h:'Job fair Bekasi berujung ricuh',
  body:'Bursa kerja "Bekasi Pasti Kerja 2025" di Cikarang diserbu lebih dari 25 ribu orang untuk sekitar dua ribu lowongan. Pelamar berdesakan memindai kode QR, sebagian pingsan karena panas, dan ada yang datang sejak subuh. Menaker meminta penyelenggara memperbaiki mitigasi risiko.',
  why:'Lamaran dikirim dari rumah dan dicocokkan AI, sehingga tidak ada lagi antrean puluhan ribu orang untuk melamar satu posisi.',
  src:[['detikFinance','https://finance.detik.com/berita-ekonomi-bisnis/d-7936994/viral-lautan-manusia-berebut-cari-kerja-di-job-fair-bekasi'],['Tirto','https://tirto.id/potret-pencari-kerja-di-indonesia-ikut-job-fair-hingga-pingsan-hcpN']]},
 {d:'JAN–NOV 2025',f:'79.302',fl:'pekerja terkena PHK',h:'PHK nyaris tembus 80 ribu orang',
  body:'Kemnaker mencatat 79.302 pekerja terkena PHK sepanjang Januari–November 2025. Jawa Barat tertinggi (17.234), disusul Jawa Tengah dan Banten. Angka ini hanya mencakup peserta Jaminan Kehilangan Pekerjaan, sehingga jumlah sebenarnya kemungkinan lebih besar.',
  why:'Korban PHK bisa langsung membuat profil, mendapat rekomendasi kerja baru, dan subsidi kuota serta transport dari Dana Abadi.',
  src:[['Bisnis.com','https://ekonomi.bisnis.com/read/20251222/12/1938900/jumlah-phk-nyaris-tembus-80000-orang-hingga-november-2025']]},
 {d:'FEBRUARI 2025',f:'#KaburAjaDulu',fl:'trending di media sosial',h:'Anak muda ingin bekerja di luar negeri',
  body:'Tagar #KaburAjaDulu ramai di X, TikTok, dan Instagram. Isinya keresahan anak muda soal sulitnya mencari kerja, upah yang tidak layak, dan syarat rekrutmen yang tidak inklusif. Anggota DPR meminta pemerintah menjadikannya bahan evaluasi.',
  why:'Lumina membuka akses ke lowongan di dalam negeri yang selama ini tidak terlihat, dan menunjukkan pelatihan apa yang membuka peluang lebih baik.',
  src:[['CNN Indonesia','https://www.cnnindonesia.com/nasional/20250218192922-32-1199764/politikus-pdip-soal-kaburajadulu-anak-muda-tak-puas-kondisi-negeri']]},
 {d:'AGUSTUS 2023 · BPS',f:'9,9 jt',fl:'anak muda 15–24 tahun',h:'Tidak sekolah, tidak bekerja, tidak pelatihan',
  body:'Sakernas Agustus 2023 mencatat sekitar 22,25% dari 44,47 juta anak muda berusia 15–24 tahun masuk kategori NEET. Penyebabnya antara lain putus asa, keterbatasan biaya, akses transportasi, dan kewajiban rumah tangga.',
  why:'Beasiswa sertifikasi dan subsidi transport dari Dana Abadi menyasar langsung hambatan yang disebut BPS.',
  src:[['CNBC Indonesia','https://www.cnbcindonesia.com/research/20240515103217-128-538210/10-juta-gen-z-di-ri-nganggur-sekolah-kagak-kerja-kagak-maunya-apa'],['GoodStats','https://goodstats.id/article/9-9-juta-anak-muda-di-indonesia-menganggur-paling-banyak-lulusan-sma-exeqg']]},
 {d:'28 MEI 2025',f:'SE M/6',fl:'Surat Edaran Menaker',h:'Syarat usia dan penampilan dilarang',
  body:'Menaker menerbitkan SE Nomor M/6/HK.04/V/2025 yang melarang diskriminasi dalam rekrutmen, termasuk batas usia, syarat berpenampilan menarik, dan status pernikahan, kecuali bila pekerjaan memang menuntutnya.',
  why:'Pencocokan buta Lumina menyembunyikan nama, foto, usia, dan agama saat AI menilai, sehingga yang dinilai hanya kemampuan.',
  src:[['Kontan','https://nasional.kontan.co.id/news/resmi-menaker-larang-pengusaha-lakukan-diskriminasi-rekruitmen-tenaga-kerja']]},
 {d:'5 MEI 2026 · BPS',f:'40,58%',fl:'porsi pekerja formal',h:'Pengangguran turun, kerja formal menyusut',
  body:'BPS mencatat TPT Februari 2026 sebesar 4,68% atau 7,24 juta orang. Namun porsi pekerja formal justru turun menjadi 40,58%, artinya banyak orang bekerja tanpa kontrak dan perlindungan yang memadai.',
  why:'Skor kecocokan Lumina memprioritaskan lowongan formal dan menampilkan status kontrak sejak awal.',
  src:[['Kontan','https://nasional.kontan.co.id/news/bps-pengangguran-turun-jadi-724-juta-orang-proporsi-pekerja-formal-turun-4058'],['Bisnis.com','https://ekonomi.bisnis.com/read/20260505/12/1971417/bps-tingkat-pengangguran-terbuka-tpt-468-pada-februari-2026']]}
];
const SKILLS=[['excel','Microsoft Excel'],['kom','Komunikasi'],['cs','Layanan pelanggan'],['desain','Desain grafis'],['akun','Akuntansi'],['python','Python & data'],['ing','Bahasa Inggris'],['las','Las & fabrikasi'],['sim','Mengemudi (SIM)'],['gudang','Logistik & gudang'],['k3','K3 keselamatan kerja'],['sosmed','Media sosial']];
const SKN=Object.fromEntries(SKILLS);
const CITIES=['Bekasi','Jakarta','Bandung','Surabaya','Batam','Makassar','Yogyakarta','Medan'];
const SOURCES=[['lumina','Lumina','#F1E4C6'],['karirhub','Karirhub Kemnaker','#9DB5A0'],['jobstreet','JobStreet','#8FA9C9'],['glints','Glints','#E7C9C0'],['kalibrr','Kalibrr','#B9C4D6'],['kitalulus','KitaLulus','#C9874A']];
const SRCN=Object.fromEntries(SOURCES.map(s=>[s[0],s[1]]));
const srcOn=new Set(SOURCES.map(s=>s[0]));
const JOBS=[
 {t:'Admin Gudang',c:'Pabrik garmen',city:'Bekasi',req:{gudang:3,excel:2,kom:1},src:['jobstreet','karirhub']},
 {t:'Customer Service',c:'E-commerce',city:'Jakarta',req:{cs:3,kom:2,ing:1},src:['glints','kalibrr']},
 {t:'Desainer Grafis Junior',c:'Agensi kreatif',city:'Bandung',req:{desain:3,sosmed:2,kom:1},src:['glints']},
 {t:'Staf Akuntansi',c:'Koperasi simpan pinjam',city:'Surabaya',req:{akun:3,excel:3},src:['karirhub','jobstreet']},
 {t:'Teknisi Las',c:'Galangan kapal',city:'Batam',req:{las:3,k3:2},src:['karirhub']},
 {t:'Mitra Kurir',c:'Perusahaan logistik',city:'Makassar',req:{sim:3,gudang:1,kom:1},src:['kitalulus','lumina']},
 {t:'Analis Data Junior',c:'Fintech',city:'Jakarta',req:{python:3,excel:2,ing:1},src:['kalibrr','glints','jobstreet']},
 {t:'Admin Media Sosial',c:'UMKM kuliner',city:'Yogyakarta',req:{sosmed:3,desain:1,kom:2},src:['lumina','kitalulus']}
];
// Fictional company profiles, one per job (index-aligned with JOBS)
const COS=[
 {n:'PT Benang Kencana Tekstil',type:'PT',sector:'Industri pakaian jadi',kbli:'14111',since:2009,size:'± 850 karyawan',hq:'Cikarang, Bekasi',sal:'Rp 5,2–5,6 jt',ben:'BPJS TK & Kesehatan, makan siang, uang transport',about:'Produsen garmen ekspor untuk merek pakaian kerja. Tiga lini produksi dan satu gudang distribusi.',ver:{nib:1,ahu:1,bpjs:1,fee:1},hired:34,resp:'2 hari',rate:4.4},
 {n:'PT Pasar Lintas Digital',type:'PT',sector:'Perdagangan eceran daring',kbli:'47911',since:2017,size:'± 420 karyawan',hq:'Jakarta Selatan',sal:'Rp 5,5–6,5 jt',ben:'BPJS, kerja hybrid, asuransi tambahan',about:'Marketplace kebutuhan rumah tangga dengan pusat layanan pelanggan 24 jam.',ver:{nib:1,ahu:1,bpjs:1,fee:1},hired:21,resp:'3 hari',rate:4.2},
 {n:'CV Garis Rupa Studio',type:'CV',sector:'Aktivitas desain khusus',kbli:'74100',since:2019,size:'± 18 karyawan',hq:'Bandung',sal:'Rp 3,8–4,5 jt',ben:'Jam kerja fleksibel, laptop kerja',about:'Studio desain identitas merek untuk UMKM dan brand lokal.',ver:{nib:1,ahu:1,bpjs:0,fee:1},hired:3,resp:'5 hari',rate:4.7},
 {n:'Koperasi Simpan Pinjam Arta Mandiri',type:'Koperasi',sector:'Simpan pinjam koperasi',kbli:'64141',since:2004,size:'± 65 karyawan',hq:'Surabaya',sal:'Rp 4,8–5,3 jt',ben:'BPJS, THR, tunjangan kesehatan keluarga',about:'Koperasi simpan pinjam dengan 12 kantor layanan di Jawa Timur.',ver:{nib:1,ahu:1,bpjs:1,fee:1},hired:6,resp:'4 hari',rate:4.3},
 {n:'PT Samudra Baja Marine',type:'PT',sector:'Industri pembuatan kapal',kbli:'30111',since:1998,size:'± 1.200 karyawan',hq:'Batam',sal:'Rp 6–8 jt',ben:'BPJS, mes karyawan, sertifikasi las dibiayai',about:'Galangan kapal untuk kapal tunda dan tongkang. Mensyaratkan sertifikat las yang masih berlaku.',ver:{nib:1,ahu:1,bpjs:1,fee:1},hired:40,resp:'2 hari',rate:4.1},
 {n:'PT Kilat Antar Sulawesi',type:'PT',sector:'Aktivitas kurir',kbli:'53201',since:2015,size:'± 300 karyawan + mitra',hq:'Makassar',sal:'Bagi hasil per paket',ben:'BPJS TK bukan penerima upah, bonus target',about:'Jasa kurir instan dan antar-kota di Sulawesi. Posisi ini berstatus kemitraan, bukan hubungan kerja.',ver:{nib:1,ahu:1,bpjs:1,fee:1},warn:'Status kemitraan, bukan karyawan tetap',hired:58,resp:'1 hari',rate:3.9},
 {n:'PT Dana Cerdas Teknologi',type:'PT',sector:'Teknologi finansial',kbli:'64951',since:2018,size:'± 260 karyawan',hq:'Jakarta Pusat',sal:'Rp 9–12 jt',ben:'BPJS, asuransi swasta, anggaran pelatihan',about:'Penyedia layanan pembayaran digital untuk UMKM.',ver:{nib:1,ahu:1,bpjs:1,fee:1,ojk:1},hired:9,resp:'4 hari',rate:4.5},
 {n:'CV Dapur Gudeg Sekar',type:'CV',sector:'Restoran',kbli:'56101',since:2012,size:'± 25 karyawan',hq:'Yogyakarta',sal:'Rp 2,6–3,0 jt',ben:'BPJS, makan, bonus penjualan',about:'Rumah makan keluarga dengan dua cabang dan penjualan daring.',ver:{nib:1,ahu:1,bpjs:1,fee:1},hired:4,resp:'3 hari',rate:4.8}
];
const VERN={nib:'NIB aktif (OSS)',ahu:'Badan hukum terdaftar',bpjs:'BPJS Ketenagakerjaan',fee:'Tanpa biaya rekrutmen',ojk:'Berizin OJK'};
// Fictional scam ads the verifier removes, keyed by the source they arrived from
const SCAMS=[['jobstreet','Minta biaya seragam'],['kitalulus','Minta deposit pelatihan']];
const CANDS=[
 {id:'K-3F2A',city:'Bekasi',exp:2,sk:['gudang','excel','kom','k3']},
 {id:'K-81C4',city:'Jakarta',exp:1,sk:['cs','kom','ing']},
 {id:'K-5D07',city:'Bandung',exp:3,sk:['desain','sosmed']},
 {id:'K-9AB1',city:'Surabaya',exp:4,sk:['akun','excel','kom']},
 {id:'K-27E9',city:'Batam',exp:5,sk:['las','k3','sim']},
 {id:'K-C6F3',city:'Medan',exp:0,sk:['python','excel','ing','kom']},
 {id:'K-0B5E',city:'Bekasi',exp:1,sk:['excel','cs','kom']},
 {id:'K-74D8',city:'Yogyakarta',exp:2,sk:['sosmed','desain','kom','ing']}
];
const ALLOC=[['Saham dividen',50,'#D8B46A'],['Bitcoin',20,'#C9874A'],['Emas',20,'#F0D58C'],['Kas & likuiditas',10,'#9DB5A0']];
const LAYERS=[
 ['Enkripsi berlapis','Data dienkripsi AES-256 saat disimpan dan TLS 1.3 saat dikirim. Kunci enkripsi dipisah dari server aplikasi.'],
 ['Pencocokan buta','Nama, foto, usia, agama, dan alamat disembunyikan saat AI menilai. Sejalan dengan SE Menaker M/6/HK.04/V/2025 tentang larangan diskriminasi rekrutmen.'],
 ['Persetujuan ganda','Perusahaan hanya melihat ID anonim. Identitas terbuka bila kandidat menyetujui permintaan perusahaan tersebut, satu per satu.'],
 ['Kendali penuh di tanganmu','Unduh, koreksi, atau hapus semua datamu kapan saja, sesuai hak subjek data dalam UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.'],
 ['Audit & manusia dalam loop','Setiap akses tercatat dan bisa diaudit. AI memberi rekomendasi beserta alasannya; keputusan akhir tetap di tangan rekruter manusia.']
];

const MISI=[
 ['Gratis selamanya bagi pencari kerja','Tidak ada biaya pendaftaran, biaya tersembunyi, atau fitur berbayar untuk pencari kerja. Akses tidak bergantung pada donasi.'],
 ['Pencocokan yang adil dan bisa dijelaskan','AI menilai kemampuan, bukan usia, penampilan, atau latar belakang. Setiap skor disertai alasannya.'],
 ['Data pribadi dijaga ketat','Enkripsi berlapis, persetujuan ganda, dan hak hapus data sesuai UU No. 27 Tahun 2022.'],
 ['Keuntungan menjadi dampak','Dana abadi dari lisensi perusahaan dan donasi membiayai subsidi, beasiswa, bantuan darurat, serta riset AI.'],
 ['Bergerak bersama ekosistem','Bermitra dengan Disnaker, Balai Latihan Kerja, kampus, dan UMKM agar lowongan dan pelatihan sampai ke daerah.']
];
const DIVS=[
 {n:'Engineering',c:'#F1E4C6',r:[['Full-stack Engineer',2,5,'Web, API pencocokan, dan dasbor perusahaan'],['Mobile Engineer (Android)',1,3,'Aplikasi ringan untuk HP kelas pemula'],['DevOps & Cloud Engineer',1,2,'Infrastruktur, skalabilitas, efisiensi biaya cloud'],['QA Engineer',1,2,'Uji otomatis dan keandalan rilis']]},
 {n:'AI & Data',c:'#D8B46A',r:[['ML Engineer (NLP Bahasa Indonesia)',2,4,'Parsing CV dan pencocokan semantik'],['Data Engineer',1,2,'Pipeline data lowongan dan pasar kerja'],['Data Scientist pasar kerja',1,2,'Tren, celah keahlian, dan prediksi permintaan'],['AI Fairness Specialist',0,1,'Audit bias model secara berkala']]},
 {n:'Keamanan & Hukum',c:'#B9C4D6',r:[['Security Engineer',1,2,'Enkripsi, uji penetrasi, respons insiden'],['Data Protection Officer',1,1,'Kepatuhan UU Pelindungan Data Pribadi'],['Legal & Compliance',1,2,'Ketenagakerjaan, OJK, kontrak B2B']]},
 {n:'Keuangan & Investasi',c:'#C9874A',r:[['Finance Analyst',1,2,'Anggaran, unit ekonomi, proyeksi arus kas'],['Investment Analyst',1,2,'Memantau portofolio dana abadi bersama manajer investasi berizin OJK'],['Akuntan & Auditor Internal',1,2,'Pembukuan dana abadi dan laporan publik'],['Fundraising & Grant Manager',1,2,'Donasi, CSR, dan hibah']]},
 {n:'Produk & Desain',c:'#E7C9C0',r:[['Product Manager',1,3,'Prioritas fitur dan peta jalan'],['UX Researcher',1,2,'Riset langsung bersama pencari kerja dan HR'],['UI & 3D Designer',1,2,'Antarmuka dan pengalaman visual']]},
 {n:'Dampak & Program',c:'#9DB5A0',r:[['Impact Program Manager',1,2,'Subsidi, beasiswa, bantuan darurat'],['Career Coach',2,10,'Pendampingan dan persiapan wawancara'],['Community Manager daerah',1,8,'Menjangkau pencari kerja di tiap provinsi'],['M&E Analyst',1,2,'Mengukur dan melaporkan dampak']]},
 {n:'Bisnis & Kemitraan',c:'#8FA9C9',r:[['B2B Sales (HR)',2,6,'Menjual lisensi ke perusahaan'],['Partnership Manager',1,3,'Disnaker, BLK, kampus, asosiasi'],['Marketing & Komunikasi',1,3,'Kampanye dan cerita dampak']]}
];
DIVS.forEach(d=>{d.f1=d.r.reduce((a,x)=>a+x[1],0);d.f2=d.r.reduce((a,x)=>a+x[2],0)});
const FN={
 seeker:{p:[-5,0,1.6],t:'Pencari kerja',s:'GRATIS'},
 engine:{p:[0,.6,1.6],t:'Lumina AI Engine',s:'CV · MATCHING'},
 company:{p:[5,0,1.6],t:'Perusahaan',s:'HR · REKRUTER'},
 saas:{p:[5,-.5,-2.2],t:'Lisensi B2B SaaS',s:'PENDAPATAN'},
 fund:{p:[0,-.6,-2.2],t:'Dana Abadi Sosial',s:'50 · 20 · 20 · 10'},
 donor:{p:[-5,-.5,-2.2],t:'Donatur',s:'SUKARELA'},
 support:{p:[-2.6,-1.2,-5.2],t:'Program dukungan',s:'70% IMBAL HASIL'},
 rnd:{p:[2.6,-1.2,-5.2],t:'Riset & pengembangan',s:'30% IMBAL HASIL'}
};
const FKEYS=Object.keys(FN);
const FE=[['seeker','engine','data',1],['engine','company','data',1],['company','seeker','impact',2.6],['company','saas','money',.8],['saas','fund','money',.9],['donor','fund','money',.9],['fund','support','money',.8],['fund','rnd','money',.8],['support','seeker','impact',1.4],['rnd','engine','data',1.6],['seeker','donor','impact',.9]];
const STEPS=[
 {t:'Pencari kerja daftar gratis',d:'Unggah CV atau isi profil dari HP. Tanpa biaya dan tanpa biaya tersembunyi. Data langsung dienkripsi sejak masuk.',n:['seeker','engine'],e:[0]},
 {t:'AI membaca dan mencocokkan',d:'Lumina AI Engine mengekstrak keahlian dari CV, lalu mencocokkannya secara semantik dengan lowongan. Identitas disamarkan selama penilaian.',n:['engine'],e:[0,1]},
 {t:'Perusahaan menerima shortlist',d:'Rekruter melihat kandidat anonim beserta skor dan alasannya. Profil lengkap terbuka setelah kandidat menyetujui.',n:['engine','company'],e:[1]},
 {t:'Kandidat diterima kerja',d:'Kandidat dan perusahaan bertemu. Setiap penempatan tercatat sebagai dampak di laporan publik Lumina.',n:['company','seeker'],e:[2]},
 {t:'Perusahaan membayar lisensi',d:'Fitur premium HR, seperti pencarian massal, analitik, dan integrasi ATS, dijual sebagai langganan B2B SaaS. Sebagian pendapatan disisihkan ke Dana Abadi.',n:['company','saas','fund'],e:[3,4]},
 {t:'Donasi sukarela masuk',d:'Individu, komunitas, dan program CSR boleh berdonasi berapa pun. Donasi tidak pernah menjadi syarat untuk memakai Lumina.',n:['donor','fund'],e:[5]},
 {t:'Dana abadi diinvestasikan',d:'Pokok dana dikelola dalam portofolio 50% saham dividen, 20% Bitcoin, 20% emas, dan 10% kas. Yang dibelanjakan hanya imbal hasilnya: 70% program dukungan, 30% riset dan pengembangan.',n:['fund','support','rnd'],e:[6,7]},
 {t:'Lingkaran berputar lagi',d:'Subsidi kuota, transport, dan beasiswa membantu pencari kerja berikutnya. Riset membuat AI makin akurat. Alumni yang sudah bekerja bisa menjadi kontributor.',n:['support','rnd','seeker','engine','donor'],e:[8,9,10]}
];
function bez(a,b,h){const m=[(a[0]+b[0])/2,Math.max(a[1],b[1])+h,(a[2]+b[2])/2];return t=>{const u=1-t;return[u*u*a[0]+2*u*t*m[0]+t*t*b[0],u*u*a[1]+2*u*t*m[1]+t*t*b[1],u*u*a[2]+2*u*t*m[2]+t*t*b[2]]}}
const FCURVE=FE.map(e=>bez(FN[e[0]].p,FN[e[1]].p,e[3]));
// Team: seven people standing in a shallow arc; each division's halo floats above its person
const TEAMFIG=DIVS.map((d,i)=>{const k=i-3;return{x:k*1.8,z:-Math.abs(k)*.55,base:-2.05,s:1.28*(1-Math.abs(k)*.025),pose:k===0?'up':(Math.abs(k)===3?'wave':'down'),side:k<0?-1:1}});
const DIVPOS=TEAMFIG.map(f=>[f.x,f.base+2.0*f.s+.55,f.z]);
const ADVS=[
 ['Influencer & perencana keuangan','Menyusun materi literasi keuangan untuk donatur dan penerima bantuan, serta mengkritisi kebijakan dana abadi. Diutamakan perencana keuangan bersertifikat.','#C9874A'],
 ['Kreator teknologi & AI','Menguji produk sebelum rilis, menjelaskan cara kerja AI Lumina secara terbuka, dan membawa masukan dari komunitas developer.','#F1E4C6'],
 ['Kreator karier & HR','Berbagi tips CV dan wawancara, serta menghubungkan Lumina dengan komunitas rekruter.','#D8B46A'],
 ['Akademisi ekonomi ketenagakerjaan','Memvalidasi metode pengukuran dampak dan cara Lumina membaca data BPS.','#B9C4D6'],
 ['Pakar hukum & privasi data','Meninjau kepatuhan UU Pelindungan Data Pribadi, kontrak B2B, dan aturan ketenagakerjaan.','#8FA9C9'],
 ['Penggerak komunitas & inklusi','Memastikan Lumina bisa dipakai penyandang disabilitas, warga daerah, dan pengguna HP kelas pemula.','#9DB5A0'],
 ['Mitra pemerintah & pelatihan','Disnaker dan Balai Latihan Kerja sebagai sumber lowongan resmi dan program pelatihan bersertifikat.','#E7C9C0']
];
const ADVFIG=ADVS.map((a,i)=>{const ang=i/ADVS.length*Math.PI*2+Math.PI/2+Math.PI/ADVS.length;return{ang,x:Math.cos(ang)*4.7,z:Math.sin(ang)*4.7,base:-1.75,s:1.12,pose:i%3===1?'wave':'down',side:1}});
const ADVPOS=ADVFIG.map(f=>[f.x,f.base+2.0*f.s+.5,f.z]);
// Human figure sampled from capsules (feet at y=0, ~1.95 tall)
function humanParts(pose,side){
  const P=[['s',[0,1.72,0],[0,1.72,0],.2],['c',[0,1.47,0],[0,1.58,0],.07],['c',[0,1.0,0],[0,1.36,0],.21,1.25],['c',[0,.86,0],[0,1.0,0],.18,1.15]];
  [-1,1].forEach(sx=>{const raise=pose==='up'||(pose==='wave'&&sx===side);
    const el=raise?[sx*.44,1.66,0]:[sx*.33,1.05,0],hand=raise?[sx*.52,2.0,0]:[sx*.36,.72,0];
    P.push(['c',[sx*.27,1.38,0],el,.065],['c',el,hand,.055],['c',[sx*.1,.86,0],[sx*.115,.46,0],.09],['c',[sx*.115,.46,0],[sx*.125,.05,0],.072])});
  const w=P.map(p=>p[0]==='s'?p[3]*p[3]*14:Math.hypot(p[2][0]-p[1][0],p[2][1]-p[1][1])*p[3]*6.5+.002);const tot=w.reduce((a,b)=>a+b,0);
  return()=>{let r=R()*tot,k=0;while(r>w[k]&&k<w.length-1){r-=w[k];k++}const p=P[k],t=R(),a=p[1],b=p[2];
    let dx=gauss(),dy=gauss(),dz=gauss();const l=Math.hypot(dx,dy,dz)||1;const xs=p[4]||1;
    return[a[0]+(b[0]-a[0])*t+dx/l*p[3]*xs,a[1]+(b[1]-a[1])*t+dy/l*p[3],a[2]+(b[2]-a[2])*t+dz/l*p[3]*.8]};
}

/* ---------- BUDGET (Rp miliar, proyeksi tahun pertama) ---------- */
const BUD={nodes:{
  b2b:{n:'Lisensi B2B SaaS',a:3.0,c:'#8FA9C9',col:0,d:'Langganan perusahaan untuk fitur HR premium seperti pencarian massal, analitik, dan integrasi ATS.'},
  hibah:{n:'Hibah & pendanaan awal',a:4.5,c:'#B9C4D6',col:0,d:'Program inkubasi, hibah dampak sosial, dan investor awal yang berorientasi dampak.'},
  sahabat:{n:'Sahabat Lumina',a:1.0,c:'#E7C9C0',col:0,d:'Dukungan bulanan sukarela dari masyarakat khusus untuk operasional. Dicatat dan dilaporkan terpisah dari donasi program.'},
  donasi:{n:'Donasi publik',a:2.0,c:'#D8B46A',col:0,d:'Donasi untuk program dan Dana Abadi, dihimpun yayasan dengan izin PUB dari Kemensos.'},
  csr:{n:'CSR program',a:1.5,c:'#9DB5A0',col:0,d:'Dana CSR perusahaan yang ditujukan langsung untuk program dukungan.'},
  pt:{n:'PT Lumina',a:8.5,c:'#F1E4C6',col:1,d:'Badan usaha yang menjalankan teknologi, server, dan menggaji tim.'},
  yys:{n:'Yayasan Lumina',a:3.5,c:'#D8B46A',col:1,d:'Menghimpun donasi, mengelola Dana Abadi, dan menyalurkan program dukungan.'},
  gaji:{n:'Gaji & tunjangan tim',a:5.6,c:'#F1E4C6',col:2,d:'28 orang di Fase 1, rata-rata sekitar Rp 16,7 juta per orang per bulan termasuk BPJS dan THR.'},
  cloud:{n:'Cloud, AI & lisensi',a:1.2,c:'#8FA9C9',col:2,d:'Server, GPU untuk model pencocokan, penyimpanan terenkripsi, dan perangkat lunak.'},
  aman:{n:'Keamanan, audit & legal',a:.6,c:'#B9C4D6',col:2,d:'Uji penetrasi, audit akuntan publik, dan kepatuhan UU PDP.'},
  pasar:{n:'Pemasaran & kemitraan',a:.7,c:'#E7C9C0',col:2,d:'Kampanye, job fair digital, dan kerja sama dengan Disnaker serta BLK.'},
  kantor:{n:'Kantor & umum',a:.4,c:'#9C9585',col:2,d:'Ruang kerja, internet, dan administrasi.'},
  yops:{n:'Biaya penghimpunan ≤10%',a:.2,c:'#D06A4E',col:2,d:'Biaya mengelola donasi, dibatasi paling banyak 10% dari donasi sesuai PP 29/1980.'},
  pokok:{n:'Pokok Dana Abadi',a:1.8,c:'#D8B46A',col:2,d:'Diinvestasikan dan tidak dibelanjakan. Hanya imbal hasilnya yang dipakai: 70% program, 30% R&D.'},
  prog:{n:'Program dukungan',a:1.5,c:'#9DB5A0',col:2,d:'Subsidi kuota dan transport, beasiswa sertifikasi, dan bantuan darurat.'}},
 order:[['b2b','hibah','sahabat','donasi','csr'],['pt','yys'],['gaji','cloud','aman','pasar','kantor','yops','pokok','prog']],
 links:[['b2b','pt',3.0],['hibah','pt',4.5],['sahabat','pt',1.0],['donasi','yys',2.0],['csr','yys',1.5],['pt','gaji',5.6],['pt','cloud',1.2],['pt','aman',.6],['pt','pasar',.7],['pt','kantor',.4],['yys','yops',.2],['yys','pokok',1.8],['yys','prog',1.5]].map(([f,t,a])=>({f,t,a}))};
const BK=.45,BGAP=.38,BX=[-6,0,6];
BUD.order.forEach((col,ci)=>{const H=col.reduce((a,k)=>a+BUD.nodes[k].a*BK,0)+BGAP*(col.length-1);let y=H/2;
  col.forEach(k=>{const nd=BUD.nodes[k];nd.h=nd.a*BK;nd.x=BX[ci];nd.y=y-nd.h/2;nd.oo=y;nd.io=y;y-=nd.h+BGAP})});
BUD.links.forEach(l=>{const s=BUD.nodes[l.f],t=BUD.nodes[l.t],w=l.a*BK;l.s=[s.oo,s.oo-w];s.oo-=w;l.e=[t.io,t.io-w];t.io-=w;l.x1=s.x+.2;l.x2=t.x-.2;l.c=s.col===0?s.c:t.c});
function ribbonAt(l,t){const e=t*t*(3-2*t);return[l.x1+(l.x2-l.x1)*t,l.s[0]+(l.e[0]-l.s[0])*e,l.s[1]+(l.e[1]-l.s[1])*e]}

/* ---------- LEDGER (simulated public blockchain) ---------- */
const WAL={
 donor:{n:'Donatur',p:[-6.2,-1.2,.4],c:'#F1E4C6'},
 pt:{n:'PT Lumina',p:[-6.2,-1.2,2.8],c:'#E7C9C0'},
 yayasan:{n:'Yayasan Lumina',p:[-3.7,-1.2,.4],c:'#D8B46A'},
 ops:{n:'Biaya penghimpunan',p:[-3.7,-1.2,2.8],c:'#D06A4E'},
 fund:{n:'Dana Abadi',p:[-1.1,-1.2,.4],c:'#D8B46A'},
 saham:{n:'Saham dividen',p:[1.4,-1.2,-1.5],c:'#D8B46A'},
 btc:{n:'Bitcoin',p:[1.4,-1.2,-.1],c:'#C9874A'},
 emas:{n:'Emas',p:[1.4,-1.2,1.3],c:'#F0D58C'},
 kas:{n:'Kas',p:[1.4,-1.2,2.7],c:'#9DB5A0'},
 yield:{n:'Imbal hasil',p:[3.8,-1.2,.4],c:'#9DB5A0'},
 program:{n:'Program dukungan',p:[6.2,-1.2,-.6],c:'#9DB5A0'},
 rnd:{n:'Riset & pengembangan',p:[6.2,-1.2,1.6],c:'#8FA9C9'}};
const TXT={donasi:['Donasi','#D8B46A'],sahabat:['Sahabat Lumina','#E7C9C0'],ops:['Biaya penghimpunan','#D06A4E'],alokasi:['Ke pokok Dana Abadi','#F1E4C6'],investasi:['Investasi','#8FA9C9'],imbal:['Imbal hasil','#9DB5A0'],salur:['Penyaluran','#9DB5A0']};
const ASSETS=[['saham',50],['btc',20],['emas',20],['kas',10]];
function SLOT(s){const x=-5.5+s*1.1;return[x,2.7+Math.sin(x*.6)*.25,-2.8]}
// Independent public watcher nodes holding copies of the ledger
const NETN=['Auditor publik','Kampus','Media','LSM antikorupsi','Komunitas donatur','OJK & regulator','Bank kustodian','Pengembang','Jurnalis data','Relawan','Perusahaan mitra','Warga'];
function NETPOS(i){const a=i/(NETN.length-1);return[-6.6+a*13.2,1.5+Math.sin(a*Math.PI)*2.5,-5.6]}
// Beneficiaries across 38 provinces, fanned out behind the program wallet
const BENPOS=Array.from({length:38},(_,i)=>{const a=-Math.PI*(.08+.84*i/37),r=1.1+((i*7)%5)*.22;return[6.2+Math.cos(a)*r,-1.25,-.6+Math.sin(a)*r]});
const LED={blocks:[],pending:null,txs:[],num:18240,donIn:0};
const receipts={};
function hex(n){let s='';for(let i=0;i<n;i++)s+='0123456789abcdef'[Math.floor(Math.random()*16)];return s}
function rp(v){return v>=1e9?'Rp '+(v/1e9).toFixed(2).replace('.',',')+' M':(v>=1e6?'Rp '+(v/1e6).toFixed(1).replace('.',',')+' jt':'Rp '+new Intl.NumberFormat('id-ID').format(Math.round(v)))}
function newPending(prev){LED.num++;LED.pending={num:LED.num,prev:prev||'0x'+hex(12),txs:[],hash:null,time:null}}
let onTx=null, onSeal=null;
function addTx(f,t,amt,type,code){LED.count=(LED.count||0)+1;const tx={id:'0x'+hex(16),f,t,amt:Math.round(amt),type,block:LED.pending.num,time:new Date(),code};LED.pending.txs.push(tx);LED.txs.unshift(tx);if(LED.txs.length>80)LED.txs.pop();if(type==='donasi'||type==='sahabat')LED.donIn+=amt;if(onTx)onTx(tx);return tx}
function sealBlock(){const b=LED.pending;b.hash='0x'+hex(12);b.time=new Date();LED.blocks.push(b);if(LED.blocks.length>10)LED.blocks.shift();newPending(b.hash);if(onSeal)onSeal(b)}
function randTx(){const r=Math.random(),u=(a,b)=>a+Math.random()*(b-a);
  if(r<.34)return addTx('donor','yayasan',Math.round(u(1,50))*10000,'donasi');
  if(r<.42)return addTx('donor','pt',Math.round(u(1,5))*10000,'sahabat');
  if(r<.54)return addTx('yayasan','fund',u(1e6,2e7),'alokasi');
  if(r<.59)return addTx('yayasan','ops',u(1e5,2e6),'ops');
  if(r<.75){const q=Math.random()*100;let acc=0,k='kas';for(const [a,p] of ASSETS){acc+=p;if(q<acc){k=a;break}}return addTx('fund',k,u(1e6,2e7),'investasi')}
  if(r<.85)return addTx(ASSETS[Math.floor(Math.random()*4)][0],'yield',u(2e5,3e6),'imbal');
  return Math.random()<.7?addTx('yield','program',u(1e5,2e6),'salur'):addTx('yield','rnd',u(1e5,1.5e6),'salur');
}
function recordDonation(code,amt,purpose){const txs=[];
  if(purpose==='ops'){txs.push(addTx('donor','pt',amt,'sahabat',code))}
  else{txs.push(addTx('donor','yayasan',amt,'donasi',code));txs.push(addTx('yayasan','ops',amt*.1,'ops',code));txs.push(addTx('yayasan','fund',amt*.9,'alokasi',code));
    ASSETS.forEach(([k,p])=>txs.push(addTx('fund',k,amt*.9*p/100,'investasi',code)))}
  receipts[code]={amt,purpose,txs};return txs}
newPending();
for(let b=0;b<10;b++){const n=3+Math.floor(Math.random()*5);for(let k=0;k<n;k++)randTx();if(b===6)recordDonation('LMN-DEMO',50000,'prog');sealBlock()}

/* ---------- VENTURES ROADMAP ---------- */
const PHASES=[
 {n:'Fase 1 · MVP & pilot',w:'BULAN 0–12',p:[-5.4,-2.1,1.4],d:'AI Matching gratis di dua kota, Dana Abadi mulai dihimpun, tim inti 28 orang.'},
 {n:'Fase 2 · Skala nasional',w:'BULAN 12–36',p:[-2.5,-1.4,.3],d:'Integrasi Karirhub dan portal mitra, program dukungan di banyak provinsi, ledger blockchain publik berjalan.'},
 {n:'Fase 3 · Lumina Ventures',w:'TAHUN 3–5',p:[.5,-.7,-.7],d:'Inkubator dan pendanaan untuk calon pebisnis dari komunitas Lumina. Pencari kerja yang berbakat usaha dibina menjadi pencipta kerja.'},
 {n:'Fase 4 · Ekosistem',w:'TAHUN 5+',p:[3.9,0,-1.8],d:'Usaha binaan tumbuh dan membuka lowongan lewat Lumina. Alumni yang sukses ikut menjadi investor dan donatur.'}];
const TREE_ROOT=[3.9,.1,-1.8];
const TREE=(function(){const segs=[],tips=[];
  function grow(p,dir,len,r,d){const e=[p[0]+dir[0]*len,p[1]+dir[1]*len,p[2]+dir[2]*len];segs.push([p,e,r,len]);if(d===0){tips.push(e);return}
    const n=d>3?2:3;for(let k=0;k<n;k++){const a=k/n*Math.PI*2+d*1.3+Math.sin(segs.length)*.8,tilt=.5+((segs.length*37)%10)/30;let nd=[dir[0]*.6+Math.cos(a)*tilt,dir[1]*.6+.35,dir[2]*.6+Math.sin(a)*tilt];const l=Math.hypot(...nd);nd=nd.map(v=>v/l);grow(e,nd,len*.72,r*.62,d-1)}}
  grow(TREE_ROOT,[0,1,0],1.5,.16,4);return{segs,tips}})();

/* ---------- STATE ---------- */
const N=7240, CH=['beranda','data','suara','match','dana','aman','visi','tim','alur','penasihat','lumina','anggaran','jejak','ventures'], NCH=CH.length;
const NAMES=[['Beranda','Beranda'],['Data 2016–2026','Data'],['Suara Warga','Suara'],['AI Matching','Match'],['Dana Abadi Sosial','Dana'],['Keamanan Data','Aman'],['Visi & Misi','Visi'],['Tim','Tim'],['Alur Bisnis','Alur'],['Penasihat & Mitra','Mitra'],['Lumina','Lumina'],['Anggaran & Biaya','Biaya'],['Jejak Dana','Jejak'],['Lumina Ventures','Ventures']];
const ORDER=[0,1,2,6,8,3,4,11,12,5,7,9,13,10];
const goldBase=new Float32Array(N);
let advSel=0, misiSel=0, divSel=0, phase=1, stepSel=0, stepPlay=!reduce, stepClock=0;
(function(){const rail=$('#rail');ORDER.forEach((c,k)=>{const b=document.createElement('button');b.dataset.go=c;b.innerHTML=`<span class="n">${String(k+1).padStart(2,'0')}</span><span class="bar"></span><span class="t">${NAMES[c][0]}</span><span class="s">${NAMES[c][1]}</span>`;rail.appendChild(b)})})();
function nav(d){const k=ORDER.indexOf(ch);setCh(ORDER[(k+d+ORDER.length)%ORDER.length])}
let ch=0, mode='jml', yearSel=10, newsSel=0, assetSel=0, layerSel=0, role='seeker';
let nodeScores=new Array(8).fill(0), nodeLabels=JOBS.map(j=>j.t), topNodes=[];
let pulse=0, layerAuto=true, lastLayerAuto=0, ingestBoost=0;

/* ---------- THREE ---------- */
let gl=null;
try{
  if(!window.THREE) throw new Error('no three');
  const r=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,powerPreference:'high-performance'});
  gl={r};
}catch(e){document.body.classList.add('no-gl');}

let scene,camera,stage,points,pgeo,targets,spd,gold,goldT,core,coreInner,coreWire,coreWire2,coreGlow,bars=[],barGroup,donut,donutSegs=[],vault,shells=[],matchGroup,nodes=[],lines=[],travelers=[];
const V3=(x,y,z)=>window.THREE?new THREE.Vector3(x,y,z):{set(){return this}};
const camPos=V3(0,0.6,11), camLook=V3(0,0,0), camTarget=V3(0,0.6,11), lookTarget=V3(0,0,0);
const vis={bars:0,donut:0,vault:0,match:0,visi:0,team:0,flow:0,adv:0,bud:0,led:0,ven:0}, visT={bars:0,donut:0,vault:0,match:0,visi:0,team:0,flow:0,adv:0,bud:0,led:0,ven:0};
let netNodes=[],pulsePool=[],confWave=null,benDots=[],benLit=0,
  venGroup,venPlats=[],venPool=[],venClock=0,phaseSel=2,
  budGroup,budTrav=[],budSel=null,ledGroup,chainGroup,blocks=[],txPool=[],chainSlide=0,blkSel=9,txClock=0,sealClock=0,
  srcNodes=[],srcTrav=[],advGroup,advNodes=[],visiGroup,monos=[],teamGroup,divNodes=[],flowGroup,fNodes={},fTubes=[],fTrav=[],portfolio=[];
let coreScale=1.25, coreScaleT=1.25, spin=0.05, dragRot=0, dragRotT=0, stageX=0, stageXT=0, stageY=0, stageYT=0, stageS=1;
const mouse={x:0,y:0,nx:9,ny:9};

function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const R=rng(11);
function gauss(){let u=0,v=0;while(!u)u=R();while(!v)v=R();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
function fib(i,n){const y=1-(i+.5)/n*2,r=Math.sqrt(1-y*y),th=i*2.399963;return[Math.cos(th)*r,y,Math.sin(th)*r]}
function make(fn){const a=new Float32Array(N*3);for(let i=0;i<N;i++){const p=fn(i);a[i*3]=p[0];a[i*3+1]=p[1];a[i*3+2]=p[2]}return a}
const SRCPOS=SOURCES.map((s,i)=>{const a=i/SOURCES.length*Math.PI*2+Math.PI/2;return[Math.cos(a)*6.6,2.3+Math.sin(i*2.1)*.5,Math.sin(a)*6.6]});
const NODEPOS=[];for(let i=0;i<8;i++){const a=i/8*Math.PI*2+.2;NODEPOS.push([Math.cos(a)*3.7,Math.sin(i*1.7)*1.1,Math.sin(a)*3.7])}

const F={};
F[0]=make(i=>{ if(i%4===0){const a=R()*Math.PI*2,r=4.3+Math.pow(R(),2)*2.4;return[Math.cos(a)*r,(R()-.5)*.18,Math.sin(a)*r]} const[x,y,z]=fib(i,N);const r=2.4+Math.pow(R(),3)*2.2;return[x*r,y*r,z*r]});
F[1]=make(i=>{const c=i%181,rw=Math.floor(i/181);return[-6.6+c/180*13.2,-2.08,-3.2+rw/39*6.4]});
F[2]=make(i=>{const th=R()*Math.PI*2,ph=R()*Math.PI*2,rr=.15+R()*.45,Rr=5.3;return[(Rr+rr*Math.cos(ph))*Math.cos(th),rr*Math.sin(ph)*.5-1.6,(Rr+rr*Math.cos(ph))*Math.sin(th)]});
F[3]=make(i=>{ if(i<N*.55){const k=i%9;const c=k===0?[0,0,0]:NODEPOS[k-1];const s=k===0?.75:.38;return[c[0]+gauss()*s,c[1]+gauss()*s,c[2]+gauss()*s]} const[x,y,z]=fib(i,N);const r=6.5+R()*3;return[x*r,y*r*.7,z*r]});
F[4]=make(i=>{const arm=i%4,t=R(),r=.6+Math.pow(t,.8)*6.2;const a=arm*Math.PI/2+r*.55+(R()-.5)*.6*(1-t*.4);return[Math.cos(a)*r,(R()-.5)*.3*(1-t)-.1,Math.sin(a)*r]});
F[5]=make(i=>{ if(i<N*.72){const[x,y,z]=fib(i,Math.floor(N*.72));return[x*4.35,y*4.35,z*4.35]} const[x,y,z]=fib(i,N);const r=5.2+R()*3.5;return[x*r,y*r,z*r]});
F[6]=make(i=>{const H=Math.floor(N*.62); if(i<H){const t=i/H,a=t*Math.PI*2*15+(i%5)*Math.PI*2/5,r=4.6+gauss()*.12+t*.6;return[Math.cos(a)*r,-3.4+t*7.2+gauss()*.05,Math.sin(a)*r]} const[x,y,z]=fib(i,N);const r=7+R()*3.5;return[x*r,y*r*.8,z*r]});
const TEAMS=TEAMFIG.map(f=>humanParts(f.pose,f.side)), ADVSAMP=ADVFIG.map(f=>humanParts(f.pose,f.side));
F[7]=make(i=>{ if(i<N*.86){const k=i%TEAMFIG.length,f=TEAMFIG[k],p=TEAMS[k]();return[f.x+p[0]*f.s,f.base+p[1]*f.s,f.z+p[2]*f.s]} const[x,y,z]=fib(i,N);const r=8+R()*3;return[x*r,y*r*.6,z*r-2]});
F[9]=make(i=>{ if(i<N*.82){const k=i%ADVFIG.length,f=ADVFIG[k],p=ADVSAMP[k]();const tx=-Math.sin(f.ang),tz=Math.cos(f.ang),nx=Math.cos(f.ang),nz=Math.sin(f.ang);
  return[f.x+(tx*p[0]+nx*p[2])*f.s,f.base+p[1]*f.s,f.z+(tz*p[0]+nz*p[2])*f.s]} if(i<N*.9){const t=R(),k=i%ADVPOS.length,a=ADVPOS[k];return[a[0]*t+gauss()*.04,a[1]*t+gauss()*.04,a[2]*t+gauss()*.04]} const[x,y,z]=fib(i,N);const r=8+R()*3;return[x*r,y*r*.6,z*r]});
F[10]=make(i=>{const[x,y,z]=fib(i,N);return[x*1.2,y*1.2,z*1.2]});
const TSW=TREE.segs.map(s=>s[3]*s[2]),TST=TSW.reduce((a,b)=>a+b,0);
F[13]=make(i=>{ if(i<N*.4){let r=R()*TST,k=0;while(r>TSW[k]&&k<TSW.length-1){r-=TSW[k];k++}const[a,b,rad]=TREE.segs[k],t=R();return[a[0]+(b[0]-a[0])*t+gauss()*rad*.6,a[1]+(b[1]-a[1])*t+gauss()*rad*.6,a[2]+(b[2]-a[2])*t+gauss()*rad*.6]}
  if(i<N*.82){const tp=TREE.tips[i%TREE.tips.length];return[tp[0]+gauss()*.32,tp[1]+gauss()*.26,tp[2]+gauss()*.32]}
  if(i<N*.92){const ph=PHASES[i%3].p,a=R()*Math.PI*2,r=Math.sqrt(R())*1.1;return[ph[0]+Math.cos(a)*r,ph[1]+.05,ph[2]+Math.sin(a)*r]}
  const[x,y,z]=fib(i,N);const r=9+R()*3;return[x*r,y*r*.7,z*r]});
const BLW=BUD.links.map(l=>l.a),BLT=BLW.reduce((a,b)=>a+b,0);
F[11]=make(i=>{ if(i<N*.8){let r=R()*BLT,k=0;while(r>BLW[k]&&k<BLW.length-1){r-=BLW[k];k++}const[x,top,bot]=ribbonAt(BUD.links[k],R());return[x,bot+(top-bot)*R(),gauss()*.1]} const[x,y,z]=fib(i,N);const r=9+R()*3;return[x*r,y*r*.7,z*r-3]});
F[12]=make(i=>{const G=151*29; if(i<G){const c=i%151,r=Math.floor(i/151);return[-7.5+c/150*15,-1.95,-3.4+r/28*7]} if(i<G+N*.22){const s=R()*10,p=SLOT(s);return[p[0]+gauss()*.18,p[1]+gauss()*.35,p[2]+gauss()*.35]} const[x,y,z]=fib(i,N);const r=9+R()*3;return[x*r,y*r*.7,z*r]});
function buildText(){
  try{const W=1400,H=420,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
    g.fillStyle='#fff';g.strokeStyle='#fff';g.lineWidth=14;g.lineJoin='round';g.font='600 250px "Bodoni Moda", "Didot", Georgia, serif';g.textBaseline='alphabetic';
    const word='LUMINA',sp=38,ws=[...word].map(ch=>g.measureText(ch).width),tw=ws.reduce((a,b)=>a+b,0)+sp*(word.length-1);
    let x=(W-tw)/2,iX=0;const base=H*.78;[...word].forEach((chr,k)=>{g.fillText(chr,x,base);g.strokeText(chr,x,base);if(chr==='I')iX=x+ws[k]/2;x+=ws[k]+sp});
    // four-point star above the I, as in the logo
    const sy=base-250*.86,R1=34,R2=6;g.beginPath();for(let k=0;k<8;k++){const a=k*Math.PI/4-Math.PI/2,r=k%2?R2:R1;g.lineTo(iX+Math.cos(a)*r,sy+Math.sin(a)*r)}g.closePath();g.fill();
    const d=g.getImageData(0,0,W,H).data,pix=[];for(let yy=0;yy<H;yy+=2)for(let xx=0;xx<W;xx+=2)if(d[(yy*W+xx)*4+3]>128)pix.push(xx,yy);
    if(pix.length<200)return;const sc=13.5/W,out=new Float32Array(N*3);
    for(let i=0;i<N;i++){if(i<N*.93){const k=Math.floor(R()*pix.length/2)*2;out[i*3]=(pix[k]-W/2)*sc+gauss()*.012;out[i*3+1]=-(pix[k+1]-H*.55)*sc+gauss()*.012;out[i*3+2]=gauss()*.12}
      else{const[x2,y2,z2]=fib(i,N);const r=8+R()*4;out[i*3]=x2*r;out[i*3+1]=y2*r;out[i*3+2]=z2*r-3}}
    F[10].set(out);
  }catch(e){}
}
F[8]=make(i=>{ if(i<N*.6){const c=FCURVE[i%FCURVE.length](R());return[c[0]+gauss()*.09,c[1]+gauss()*.09,c[2]+gauss()*.09]} const a=R()*Math.PI*2,r=Math.sqrt(R())*10;return[Math.cos(a)*r,-2.6+gauss()*.05,Math.sin(a)*r-1.6]});

function glowTex(){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(255,230,180,1)');gr.addColorStop(.25,'rgba(255,200,120,.45)');gr.addColorStop(1,'rgba(255,180,90,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);const t=new THREE.CanvasTexture(c);return t}

if(gl){
  const r=gl.r;
  r.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  r.setClearColor(0x06070a,1);
  scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x06070a,0.028);
  camera=new THREE.PerspectiveCamera(45,1,.1,120);
  stage=new THREE.Group();scene.add(stage);
  scene.add(new THREE.AmbientLight(0x5a4a33,.9));
  const l1=new THREE.PointLight(0xffd59a,2.2,40);l1.position.set(4,7,7);scene.add(l1);
  const l2=new THREE.PointLight(0x6d86c0,.9,40);l2.position.set(-7,-1,5);scene.add(l2);
  const l3=new THREE.PointLight(0xffc27a,1.2,30);l3.position.set(0,-4,-6);scene.add(l3);
  const GT=glowTex();

  // particles
  pgeo=new THREE.BufferGeometry();
  const start=new Float32Array(N*3);for(let i=0;i<N*3;i++)start[i]=F[0][i]*(2.2+R()*2);
  pgeo.setAttribute('position',new THREE.BufferAttribute(start,3));
  const seed=new Float32Array(N);spd=new Float32Array(N);gold=new Float32Array(N);goldT=new Float32Array(N);
  for(let i=0;i<N;i++){seed[i]=R();spd[i]=.35+R()*1.1}
  pgeo.setAttribute('aSeed',new THREE.BufferAttribute(seed,1));
  pgeo.setAttribute('aGold',new THREE.BufferAttribute(gold,1));
  const pmat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    uniforms:{uTime:{value:0},uSize:{value:64},uPR:{value:r.getPixelRatio()},uOp:{value:1},uDrift:{value:reduce?0:1}},
    vertexShader:`attribute float aSeed;attribute float aGold;uniform float uTime,uSize,uPR,uDrift;varying float vG;varying float vT;
      void main(){vec3 p=position;p.x+=sin(uTime*.6+aSeed*12.)*.05*uDrift;p.y+=cos(uTime*.5+aSeed*9.)*.05*uDrift;
      vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;vT=.55+.45*sin(uTime*1.6+aSeed*40.);vG=aGold;
      gl_PointSize=uSize*uPR*(.55+aSeed*.8)*(1.+aGold*.4)/-mv.z;}`,
    fragmentShader:`uniform float uOp;varying float vG;varying float vT;
      void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,0.,d);
      vec3 c=mix(vec3(.84,.82,.78),vec3(1.,.76,.38),vG);gl_FragColor=vec4(c,a*a*vT*uOp*(.75+vG*.5));}`});
  points=new THREE.Points(pgeo,pmat);stage.add(points);
  targets=F[0];

  // core
  core=new THREE.Group();stage.add(core);
  coreInner=new THREE.Mesh(new THREE.SphereGeometry(.95,48,48),new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    uniforms:{uP:{value:0}},
    vertexShader:`varying vec3 vN;varying vec3 vV;void main(){vN=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`uniform float uP;varying vec3 vN;varying vec3 vV;void main(){float f=pow(1.-max(dot(vN,vV),0.),2.2);vec3 c=mix(vec3(.32,.2,.07),vec3(1.,.83,.52),f);gl_FragColor=vec4(c*(.55+f*1.5+uP),.2+f*.8);}`}));
  core.add(coreInner);
  coreWire=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.18,1)),new THREE.LineBasicMaterial({color:0xD8B46A,transparent:true,opacity:.65}));core.add(coreWire);
  coreWire2=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.6,0)),new THREE.LineBasicMaterial({color:0xF1E4C6,transparent:true,opacity:.22}));core.add(coreWire2);
  coreGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:GT,color:0xffd08a,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.85}));coreGlow.scale.set(6,6,1);core.add(coreGlow);

  // bars
  barGroup=new THREE.Group();barGroup.position.y=-2.08;stage.add(barGroup);
  const bg=new THREE.BoxGeometry(.62,1,.62);bg.translate(0,.5,0);
  const eg=new THREE.EdgesGeometry(bg);
  YEARS.forEach((y,i)=>{
    const covid=i===4, latest=i===10;
    const m=new THREE.Mesh(bg,new THREE.MeshStandardMaterial({color:covid?0xB8563E:0xC9A35E,metalness:.55,roughness:.28,emissive:covid?0x5a1c10:0x4a3410,emissiveIntensity:.5,transparent:true,opacity:.92}));
    m.position.x=(i-5)*1.15;m.userData={i,h:0,hT:0};
    const e=new THREE.LineSegments(eg,new THREE.LineBasicMaterial({color:latest?0xffffff:0xF1E4C6,transparent:true,opacity:.35}));m.add(e);m.userData.edge=e;
    barGroup.add(m);bars.push(m);
  });

  // donut
  donut=new THREE.Group();donut.rotation.x=-Math.PI/2+.42;stage.add(donut);
  let acc=0;ALLOC.forEach((a,i)=>{const arc=a[1]/100*Math.PI*2;const g=new THREE.TorusGeometry(2.55,.34,24,120,arc-.06);
    const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:new THREE.Color(a[2]),metalness:.6,roughness:.25,emissive:new THREE.Color(a[2]),emissiveIntensity:.12}));
    m.rotation.z=acc*Math.PI*2/100;m.userData={i};acc+=a[1];donut.add(m);donutSegs.push(m)});

  // vault
  vault=new THREE.Group();stage.add(vault);
  [[1.35,1],[1.95,1],[2.55,2],[3.15,2],[3.75,3]].forEach((s,i)=>{const ls=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(s[0],s[1])),new THREE.LineBasicMaterial({color:0xD8B46A,transparent:true,opacity:.2}));ls.userData={i,o:.2};vault.add(ls);shells.push(ls)});

  // match network
  matchGroup=new THREE.Group();stage.add(matchGroup);
  NODEPOS.forEach((p,i)=>{
    const g=new THREE.Group();g.position.set(p[0],p[1],p[2]);
    const s=new THREE.Mesh(new THREE.SphereGeometry(.16,24,24),new THREE.MeshBasicMaterial({color:0xF1E4C6}));g.add(s);
    const hit=new THREE.Mesh(new THREE.SphereGeometry(.45,8,8),new THREE.MeshBasicMaterial({visible:false}));hit.userData={i};g.add(hit);
    const gl2=new THREE.Sprite(new THREE.SpriteMaterial({map:GT,color:0xffd08a,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.5}));gl2.scale.set(1.2,1.2,1);g.add(gl2);
    g.userData={i,sphere:s,glow:gl2,hit};matchGroup.add(g);nodes.push(g);
    const lg=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3(p[0],p[1],p[2])]);
    const ln=new THREE.Line(lg,new THREE.LineBasicMaterial({color:0xD8B46A,transparent:true,opacity:.08}));matchGroup.add(ln);lines.push(ln);
    const tr=new THREE.Sprite(new THREE.SpriteMaterial({map:GT,color:0xffe2a8,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0}));tr.scale.set(.5,.5,1);tr.userData={t:R()};matchGroup.add(tr);travelers.push(tr);
  });
}

if(gl){
  const GT2=glowTex();
  const glow=(c,o,s)=>{const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GT2,color:c,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:o}));sp.scale.set(s,s,1);return sp};
  // job sources: outer ring of portals streaming listings into the engine
  const og=new THREE.OctahedronGeometry(.26,0),oeg=new THREE.EdgesGeometry(og);
  SOURCES.forEach((s,i)=>{const p=SRCPOS[i],col=new THREE.Color(s[2]);
    const g=new THREE.Group();g.position.set(...p);
    const m=new THREE.LineSegments(oeg,new THREE.LineBasicMaterial({color:col,transparent:true}));g.add(m);
    const core2=new THREE.Mesh(new THREE.OctahedronGeometry(.12,0),new THREE.MeshBasicMaterial({color:col,transparent:true}));g.add(core2);
    const gw=glow(col,.5,1.2);g.add(gw);
    const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...p),new THREE.Vector3()]),new THREE.LineBasicMaterial({color:col,transparent:true,opacity:.12}));matchGroup.add(ln);
    g.userData={id:s[0],m,core2,gw,ln};matchGroup.add(g);srcNodes.push(g);
    for(let k=0;k<3;k++){const tr=glow(col,0,.35);tr.userData={i,t:k/3};matchGroup.add(tr);srcTrav.push(tr)}});
  // budget: 3D sankey of where each rupiah comes from and goes
  budGroup=new THREE.Group();stage.add(budGroup);
  Object.entries(BUD.nodes).forEach(([k,nd])=>{const col=new THREE.Color(nd.c);
    const m=new THREE.Mesh(new THREE.BoxGeometry(.38,nd.h,.75),new THREE.MeshStandardMaterial({color:col,metalness:.5,roughness:.3,emissive:col,emissiveIntensity:.25,transparent:true,opacity:.92}));
    m.position.set(nd.x,nd.y,0);m.userData={k};budGroup.add(m);nd.mesh=m;
    const e=new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),new THREE.LineBasicMaterial({color:0xF1E4C6,transparent:true,opacity:.35}));m.add(e);nd.edge=e});
  BUD.links.forEach((l,li)=>{const S=56,pos=new Float32Array((S+1)*6),idx=[],z=((li%3)-1)*.03;
    for(let s=0;s<=S;s++){const[x,top,bot]=ribbonAt(l,s/S);pos.set([x,top,z,x,bot,z],s*6);if(s<S){const a=s*2;idx.push(a,a+1,a+2,a+1,a+3,a+2)}}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setIndex(idx);
    const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:new THREE.Color(l.c),transparent:true,opacity:.26,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));m.userData={li};budGroup.add(m);l.mesh=m;
    const cnt=Math.max(2,Math.round(l.a*1.4));for(let k=0;k<cnt;k++){const tr=glow(new THREE.Color(l.c),0,.38);tr.userData={li,t:k/cnt,lane:.15+R()*.7};budGroup.add(tr);budTrav.push(tr)}});
  // ledger: wallets on the floor, chain of blocks overhead
  ledGroup=new THREE.Group();stage.add(ledGroup);
  const hx=new THREE.CylinderGeometry(.42,.42,.2,6);
  Object.entries(WAL).forEach(([k,w])=>{const col=new THREE.Color(w.c),g=new THREE.Group();g.position.set(...w.p);
    const m=new THREE.Mesh(hx,new THREE.MeshStandardMaterial({color:0x17140f,metalness:.85,roughness:.25,emissive:col,emissiveIntensity:.15}));m.userData={k};g.add(m);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.47,.016,6,6),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.6}));ring.rotation.x=Math.PI/2;ring.position.y=.11;g.add(ring);
    const gw=glow(col,.3,1.2);gw.position.y=.3;g.add(gw);g.userData={k,m,ring,gw,flash:0};ledGroup.add(g);w.g=g});
  chainGroup=new THREE.Group();ledGroup.add(chainGroup);
  const bgx=new THREE.BoxGeometry(.72,.72,.72),bex=new THREE.EdgesGeometry(bgx);
  for(let s=0;s<11;s++){const m=new THREE.Mesh(bgx,new THREE.MeshStandardMaterial({color:0x1d1810,metalness:.7,roughness:.3,emissive:0xD8B46A,emissiveIntensity:.15,transparent:true,opacity:.6}));m.position.set(...SLOT(s));m.userData={s,flash:0};
    const e=new THREE.LineSegments(bex,new THREE.LineBasicMaterial({color:0xD8B46A,transparent:true,opacity:.8}));m.add(e);m.userData.edge=e;chainGroup.add(m);blocks.push(m)}
  chainGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({length:11},(_,s)=>new THREE.Vector3(...SLOT(s)))),new THREE.LineBasicMaterial({color:0xD8B46A,transparent:true,opacity:.35})));
  for(let k=0;k<32;k++){const sp=glow(0xffffff,0,.5);sp.userData={busy:false};ledGroup.add(sp);txPool.push(sp)}
  // watcher network + broadcast pulses + confirmation wave
  const ig=new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(.22,0));
  NETN.forEach((n,i)=>{const g=new THREE.Group();g.position.set(...NETPOS(i));const w=new THREE.LineSegments(ig,new THREE.LineBasicMaterial({color:0xF1E4C6,transparent:true,opacity:.6}));g.add(w);const gw=glow(0xffe2a8,.25,.9);g.add(gw);g.userData={w,gw,flash:0};ledGroup.add(g);netNodes.push(g)});
  for(let k=0;k<64;k++){const sp=glow(0xffe2a8,0,.22);sp.userData={busy:false};ledGroup.add(sp);pulsePool.push(sp)}
  confWave=new THREE.Mesh(new THREE.TorusGeometry(1,.02,8,64),new THREE.MeshBasicMaterial({color:0xFFE2A0,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));confWave.userData={t:1};ledGroup.add(confWave);
  BENPOS.forEach(p=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.05,8,8),new THREE.MeshBasicMaterial({color:0x9DB5A0,transparent:true,opacity:.35}));m.position.set(...p);m.userData={flash:0};ledGroup.add(m);benDots.push(m)});
  // ventures: four phase platforms rising toward a tree of new businesses
  venGroup=new THREE.Group();stage.add(venGroup);
  const vpg=new THREE.CylinderGeometry(1.05,1.15,.16,6),vrg=new THREE.TorusGeometry(1.12,.02,6,6);
  PHASES.forEach((ph,i)=>{const g=new THREE.Group();g.position.set(...ph.p);
    const base=new THREE.Mesh(vpg,new THREE.MeshStandardMaterial({color:0x17140f,metalness:.85,roughness:.25,emissive:0xD8B46A,emissiveIntensity:.08}));base.userData={i};g.add(base);
    const ring=new THREE.Mesh(vrg,new THREE.MeshBasicMaterial({color:0xD8B46A,transparent:true,opacity:.5}));ring.rotation.x=Math.PI/2;ring.position.y=.09;g.add(ring);
    const gw=glow(0xffd08a,.3,2.2);gw.position.y=.3;g.add(gw);g.userData={i,base,ring,gw};venGroup.add(g);venPlats.push(g)});
  venGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(PHASES.map(ph=>new THREE.Vector3(ph.p[0],ph.p[1]+.1,ph.p[2]))),new THREE.LineBasicMaterial({color:0xD8B46A,transparent:true,opacity:.35})));
  for(let k=0;k<40;k++){const sp=glow(0xffe2a8,0,.4);sp.userData={busy:false};venGroup.add(sp);venPool.push(sp)}
  // vision: five mission monoliths
  visiGroup=new THREE.Group();stage.add(visiGroup);
  const mg=new THREE.BoxGeometry(.78,2.7,.07),meg=new THREE.EdgesGeometry(mg);
  MISI.forEach((m,i)=>{const a=i/MISI.length*Math.PI*2;
    const mesh=new THREE.Mesh(mg,new THREE.MeshStandardMaterial({color:0x4a3b22,metalness:.6,roughness:.2,emissive:0xD8B46A,emissiveIntensity:.25,transparent:true,opacity:.62,side:THREE.DoubleSide,depthWrite:false}));
    mesh.position.set(Math.cos(a)*3.5,0,Math.sin(a)*3.5);mesh.lookAt(0,0,0);mesh.userData={i,y:0};
    const ed=new THREE.LineSegments(meg,new THREE.LineBasicMaterial({color:0xF1E4C6,transparent:true,opacity:.35}));mesh.add(ed);mesh.userData.edge=ed;
    const g=glow(0xffd08a,.4,1.4);g.position.y=1.5;mesh.add(g);mesh.userData.glow=g;
    visiGroup.add(mesh);monos.push(mesh)});
  // team: division constellations
  teamGroup=new THREE.Group();stage.add(teamGroup);
  DIVS.forEach((d,i)=>{const p=DIVPOS[i],col=new THREE.Color(d.c);
    const g=new THREE.Group();g.position.set(p[0],p[1],p[2]);
    const s=new THREE.Mesh(new THREE.SphereGeometry(.13,28,28),new THREE.MeshBasicMaterial({color:col}));g.add(s);
    const hit=new THREE.Mesh(new THREE.SphereGeometry(.75,8,8),new THREE.MeshBasicMaterial({visible:false}));hit.userData={i};g.add(hit);
    const gw=glow(col,.6,1.6);g.add(gw);
    const sats=[];for(let k=0;k<d.f2;k++){const m=new THREE.Mesh(new THREE.SphereGeometry(.055,10,10),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:0}));m.userData={a:R()*Math.PI*2,r:.5+R()*.45,sp:.3+R()*.5,tl:(R()-.5)*1.2,o:0};g.add(m);sats.push(m)}
    const q=i<DIVPOS.length-1?DIVPOS[i+1]:p;
    const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(p[0],p[1],p[2]),new THREE.Vector3(q[0],q[1],q[2])]),new THREE.LineBasicMaterial({color:col,transparent:true,opacity:.2}));teamGroup.add(ln);
    g.userData={i,sphere:s,glow:gw,hit,sats,line:ln};teamGroup.add(g);divNodes.push(g)});
  // flow: business flowchart
  flowGroup=new THREE.Group();stage.add(flowGroup);
  const COL={data:0xF1E4C6,money:0xD8B46A,impact:0x9DB5A0};
  const pg=new THREE.CylinderGeometry(.62,.7,.16,56),rg=new THREE.TorusGeometry(.66,.018,8,80);
  FKEYS.forEach(k=>{const n=FN[k],g=new THREE.Group();g.position.set(...n.p);
    const base=new THREE.Mesh(pg,new THREE.MeshStandardMaterial({color:0x17140f,metalness:.85,roughness:.25,emissive:0xD8B46A,emissiveIntensity:.06}));base.userData={k};g.add(base);
    const ring=new THREE.Mesh(rg,new THREE.MeshBasicMaterial({color:0xD8B46A,transparent:true,opacity:.5}));ring.rotation.x=Math.PI/2;ring.position.y=.09;g.add(ring);
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(.02,.3,1.4,24,1,true),new THREE.MeshBasicMaterial({color:0xffd08a,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));beam.position.y=.8;g.add(beam);
    const gw=glow(0xffd08a,.3,1.8);gw.position.y=.25;g.add(gw);
    g.userData={k,base,ring,beam,glow:gw,lift:0};flowGroup.add(g);fNodes[k]=g});
  // advisors: halos above each outside figure, beams of light to the core
  advGroup=new THREE.Group();stage.add(advGroup);
  ADVS.forEach((a,i)=>{const p=ADVPOS[i],f=ADVFIG[i],col=new THREE.Color(a[2]);
    const g=new THREE.Group();g.position.set(p[0],p[1],p[2]);
    const s=new THREE.Mesh(new THREE.TorusGeometry(.22,.025,10,48),new THREE.MeshBasicMaterial({color:col,transparent:true}));s.rotation.x=Math.PI/2;g.add(s);
    const gw=glow(col,.5,1.3);g.add(gw);
    const hit=new THREE.Mesh(new THREE.SphereGeometry(.85,8,8),new THREE.MeshBasicMaterial({visible:false}));hit.position.set(0,-1.2,0);hit.userData={i};g.add(hit);
    const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(p[0],p[1],p[2]),new THREE.Vector3(0,0,0)]),new THREE.LineBasicMaterial({color:col,transparent:true,opacity:.15}));advGroup.add(ln);
    const tr=glow(col,0,.4);tr.userData={t:R()};advGroup.add(tr);
    g.userData={i,ring:s,glow:gw,hit,line:ln,tr};advGroup.add(g);advNodes.push(g)});
  ALLOC.forEach((a,i)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.09,16,16),new THREE.MeshBasicMaterial({color:new THREE.Color(a[2])}));m.userData={a:i/4*Math.PI*2,r:.95};fNodes.fund.add(m);portfolio.push(m)});
  FE.forEach((e,i)=>{const pts=[];for(let s=0;s<=40;s++)pts.push(new THREE.Vector3(...FCURVE[i](s/40)));
    const curve=new THREE.CatmullRomCurve3(pts);
    const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,64,.028,8,false),new THREE.MeshBasicMaterial({color:COL[e[2]],transparent:true,opacity:.2,depthWrite:false}));tube.userData={i};flowGroup.add(tube);fTubes.push(tube);
    for(let k=0;k<4;k++){const tr=glow(COL[e[2]],0,.45);tr.userData={e:i,t:k/4};flowGroup.add(tr);fTrav.push(tr)}});
}

/* ---------- LABELS ---------- */
const lgData=$('#lgData'), lgMatch=$('#lgMatch');
const yLbl=YEARS.map(y=>{const e=document.createElement('div');e.className='lbl';e.textContent=y;lgData.appendChild(e);return e});
const vLbl=YEARS.map(()=>{const e=document.createElement('div');e.className='lbl val';lgData.appendChild(e);return e});
const nLbl=NODEPOS.map(()=>{const e=document.createElement('div');e.className='lbl node';lgMatch.appendChild(e);return e});
const lgVisi=$('#lgVisi'),lgTeam=$('#lgTeam'),lgFlow=$('#lgFlow'),lgAdv=$('#lgAdv');
const aLbl=ADVS.map(a=>{const e=document.createElement('div');e.className='lbl node';e.textContent=a[0];lgAdv.appendChild(e);return e});
const mLbl=MISI.map((m,i)=>{const e=document.createElement('div');e.className='lbl misi';e.textContent='MISI '+(i+1);lgVisi.appendChild(e);return e});
const dLbl=DIVS.map(d=>{const e=document.createElement('div');e.className='lbl node';lgTeam.appendChild(e);return e});
const fLbl={};FKEYS.forEach(k=>{const e=document.createElement('div');e.className='lbl fn';e.textContent=FN[k].t;const s=document.createElement('small');s.textContent=FN[k].s;e.appendChild(s);lgFlow.appendChild(e);fLbl[k]=e});
const cocard=$('#cocard');
const lgBud=$('#lgBud'),lgLed=$('#lgLed'),lgVen=$('#lgVen');
const phLbl=PHASES.map(ph=>{const e=document.createElement('div');e.className='lbl fn';e.textContent=ph.n;const s=document.createElement('small');s.textContent=ph.w;e.appendChild(s);lgVen.appendChild(e);return e});
const treeLbl=document.createElement('div');treeLbl.className='lbl fn on';treeLbl.textContent='Usaha binaan';const tSm=document.createElement('small');tSm.textContent='MEMBUKA LOWONGAN BARU';treeLbl.appendChild(tSm);lgVen.appendChild(treeLbl);
const bLbl={};Object.entries(BUD.nodes).forEach(([k,nd])=>{const e=document.createElement('div');e.className='lbl bud';e.textContent=nd.n;const s=document.createElement('small');s.textContent='Rp '+dec(nd.a,1)+' M';e.appendChild(s);e.style.textAlign=nd.col===0?'right':(nd.col===2?'left':'center');lgBud.appendChild(e);bLbl[k]=e});
const wLbl={};Object.entries(WAL).forEach(([k,w])=>{const e=document.createElement('div');e.className='lbl fn';e.textContent=w.n;lgLed.appendChild(e);wLbl[k]=e});
const pendLbl=document.createElement('div');pendLbl.className='lbl misi on';lgLed.appendChild(pendLbl);
const netLbl=NETN.map(n=>{const e=document.createElement('div');e.className='lbl misi';e.textContent=n;lgLed.appendChild(e);return e});
const benLbl=document.createElement('div');benLbl.className='lbl fn';benLbl.textContent='Penerima di 38 provinsi';const benSm=document.createElement('small');benSm.textContent='PENYALURAN MENYEBAR';benLbl.appendChild(benSm);lgLed.appendChild(benLbl);
const sLbl=SOURCES.map(s=>{const e=document.createElement('div');e.className='lbl fn';e.textContent=s[1];const sm=document.createElement('small');sm.textContent='SUMBER';e.appendChild(sm);lgMatch.appendChild(e);return e});
function setNodeLabels(){nLbl.forEach((e,i)=>{e.innerHTML='';e.append(document.createTextNode(nodeLabels[i]));const b=document.createElement('b');b.textContent=nodeScores[i]?nodeScores[i]+'%':'';e.appendChild(b);e.classList.toggle('dim',topNodes.length&&!topNodes.includes(i))})}

/* ---------- CHAMBERS ---------- */
const CAM=[
  {p:[0,.8,11.5],l:[0,0,0],core:1.25,spin:.05},
  {p:[0,1.8,15.5],l:[0,-.2,0],core:0,spin:0},
  {p:[0,3.2,13.5],l:[0,-.4,0],core:.5,spin:.06},
  {p:[0,4.8,17],l:[0,.2,0],core:.42,spin:.03},
  {p:[0,5.6,13],l:[0,-.3,0],core:.62,spin:.05},
  {p:[0,.9,13.6],l:[0,0,0],core:.5,spin:.04},
  {p:[0,2.6,12.5],l:[0,.2,0],core:.6,spin:.04},
  {p:[0,.9,14.5],l:[0,-.4,0],core:0,spin:0},
  {p:[0,13,12.5],l:[0,-1.2,-1.8],core:0,spin:0},
  {p:[0,5.4,15],l:[0,-.6,0],core:.55,spin:0},
  {p:[0,.2,13],l:[0,.2,0],core:0,spin:0},
  {p:[0,1.6,21.5],l:[0,0,0],core:0,spin:0},
  {p:[0,6.4,15.5],l:[0,.7,-1],core:0,spin:0},
  {p:[.6,2.4,17.5],l:[.6,.7,-.4],core:0,spin:0}
];
function layout(){
  const w=innerWidth,h=innerHeight,narrow=w<=820,asp=w/h;
  if(gl){gl.r.setSize(w,h,false);camera.aspect=asp;camera.updateProjectionMatrix();points.material.uniforms.uPR.value=gl.r.getPixelRatio()}
  stageS=narrow?Math.max(.5,Math.min(1,asp*1.05)):1;
  if(ch===10)stageS=narrow?Math.min(stageS,.42):Math.min(1,asp*.75);
  // Shift the projection (not the scene) so objects sit beside the panel without perspective skew
  if(narrow){stageXT=0;stageYT=ch===0?h*.17:(ch===2?h*.27:h*.24)}
  else{const pw=w>1100?440:390;stageXT=ch===0?-w*.17:(ch===10?0:(pw+48)/2);stageYT=ch===0?h*.02:(ch===1?h*.1:(ch===8?h*.08:(ch===10?h*.1:0)))}
  if(gl){stage.scale.setScalar(stageS)}
}
function setCh(i,fromHash){
  i=((i%NCH)+NCH)%NCH;ch=i;
  $$('[data-ch]').forEach(e=>e.classList.toggle('is-active',+e.dataset.ch===i));
  $$('#rail button').forEach(b=>{const on=+b.dataset.go===i;b.setAttribute('aria-current',on?'true':'false');
    if(on&&innerWidth<=1100){const r=$('#rail');r.scrollTo({left:b.offsetLeft-r.clientWidth/2+b.offsetWidth/2,behavior:reduce?'auto':'smooth'})}});
  lgData.classList.toggle('on',i===1);lgMatch.classList.toggle('on',i===3);lgVisi.classList.toggle('on',i===6);lgTeam.classList.toggle('on',i===7);lgFlow.classList.toggle('on',i===8);lgAdv.classList.toggle('on',i===9);lgBud.classList.toggle('on',i===11);lgLed.classList.toggle('on',i===12);lgVen.classList.toggle('on',i===13);
  const c=CAM[i];camTarget.set(...c.p);lookTarget.set(...c.l);coreScaleT=c.core;spin=c.spin;
  visT.bars=i===1?1:0;visT.donut=i===4?1:0;visT.vault=i===5?1:0;visT.match=i===3?1:0;visT.visi=i===6?1:0;visT.team=i===7?1:0;visT.flow=i===8?1:0;visT.adv=i===9?1:0;visT.bud=i===11?1:0;visT.led=i===12?1:0;visT.ven=i===13?1:0;
  dragRotT=0;stepClock=0;if(i===12)renderLedger();
  if(gl){for(let k=0;k<N;k++)goldT[k]=i===10?1:goldBase[k]}
  if(gl){targets=F[i];if(c.spin===0){const k=Math.round(points.rotation.y/(Math.PI*2));points.userData.snap=k*Math.PI*2}else points.userData.snap=null}
  layout();
  if(!fromHash){try{history.replaceState(null,'','#'+CH[i])}catch(e){}}
  if(i===3&&!topNodes.length) runMatch(true);
  const hint=$('#hint');if(hint)hint.style.opacity=i===0?1:.6;
}

/* ---------- DATA UI ---------- */
const yearsEl=$('#years');
YEARS.forEach((y,i)=>{const b=document.createElement('button');b.textContent=i===10?'Feb ’26':y;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>setYear(i));yearsEl.appendChild(b)});
function setYear(i){yearSel=i;const v=mode==='jml'?JML[i]:TPT[i];$('#roVal').textContent=dec(v,2);$('#roUnit').textContent=mode==='jml'?'juta orang':'persen angkatan kerja';$('#roPer').textContent=PER[i]+(mode==='jml'?' · TPT '+dec(TPT[i],2)+'%':' · '+dec(JML[i],2)+' JUTA ORANG');$('#roNote').textContent=NOTE[i];
  $$('#years button').forEach((b,k)=>b.setAttribute('aria-pressed',k===i?'true':'false'));
  yLbl.forEach((e,k)=>e.classList.toggle('hot',k===i))}
function setMode(m){mode=m;$('#modeJml').setAttribute('aria-pressed',m==='jml');$('#modeTpt').setAttribute('aria-pressed',m==='tpt');
  bars.forEach((b,i)=>{b.userData.hT=m==='jml'?JML[i]/10*3.8:TPT[i]/7.5*3.8;vLbl[i].textContent=m==='jml'?dec(JML[i],2):dec(TPT[i],2)+'%'});setYear(yearSel)}
$('#modeJml').addEventListener('click',()=>setMode('jml'));$('#modeTpt').addEventListener('click',()=>setMode('tpt'));
if(!gl){bars=YEARS.map((y,i)=>({userData:{}}))}

/* ---------- NEWS UI ---------- */
const ring=$('#ring'), ringWrap=$('#ringWrap');let ringRy=0,ringT=0,ringIdle=0;
const cards=NEWS.map((n,i)=>{const c=document.createElement('button');c.className='card3d';c.type='button';c.style.transform=`rotateY(${i*60}deg) translateZ(var(--R))`;
  c.innerHTML=`<span class="d"></span><span class="h"></span><span class="f"></span><span class="fl"></span><span class="s"></span>`;
  c.querySelector('.d').textContent=n.d;c.querySelector('.h').textContent=n.h;c.querySelector('.f').textContent=n.f;c.querySelector('.fl').textContent=n.fl;c.querySelector('.s').textContent=n.src.map(s=>s[0]).join(' · ');
  c.dataset.i=i;ring.appendChild(c);return c});
function setNews(i,rotate){i=(i+NEWS.length)%NEWS.length;newsSel=i;const n=NEWS[i];
  $('#nwTitle').textContent=n.h;$('#nwDate').textContent=n.d;$('#nwBody').textContent=n.body;$('#nwWhy').textContent=n.why;$('#nwCount').textContent=(i+1)+' / '+NEWS.length;
  const ul=$('#nwSrc');ul.innerHTML='';n.src.forEach(s=>{const li=document.createElement('li');const a=document.createElement('a');a.href=s[1];a.target='_blank';a.rel='noopener';a.textContent=s[0]+' ↗';li.appendChild(a);ul.appendChild(li)});
  cards.forEach((c,k)=>c.classList.toggle('front',k===i));
  if(rotate){const base=-i*60;const k=Math.round((ringT-base)/360);ringT=base+k*360}}
$('#nwPrev').addEventListener('click',()=>setNews(newsSel-1,true));$('#nwNext').addEventListener('click',()=>setNews(newsSel+1,true));
let rd=null;
ringWrap.addEventListener('pointerdown',e=>{rd={x:e.clientX,t:ringT,moved:0,card:e.target.closest('.card3d')};ring.classList.add('drag');ringWrap.setPointerCapture(e.pointerId)});
ringWrap.addEventListener('pointermove',e=>{if(!rd)return;const dx=e.clientX-rd.x;rd.moved=Math.max(rd.moved,Math.abs(dx));ringT=rd.t+dx*.35});
function ringUp(){if(!rd)return;ring.classList.remove('drag');
  if(rd.moved<6&&rd.card){setNews(+rd.card.dataset.i,true)}else{const idx=Math.round(-ringT/60);ringT=-idx*60;setNews(((idx%6)+6)%6,false)}rd=null;ringIdle=0}
ringWrap.addEventListener('pointerup',ringUp);ringWrap.addEventListener('pointercancel',ringUp);
cards.forEach(c=>c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setNews(+c.dataset.i,true)}}));

/* ---------- MATCH UI ---------- */
const srcBtns=SOURCES.map(([id,n,c])=>{const b=document.createElement('button');b.innerHTML='<span style="display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:7px;vertical-align:1px"></span>';b.firstChild.style.background=c;b.append(n);b.setAttribute('aria-pressed','true');
  b.addEventListener('click',()=>{if(srcOn.has(id)){if(srcOn.size>1)srcOn.delete(id)}else srcOn.add(id);b.setAttribute('aria-pressed',srcOn.has(id));runMatch(false)});$('#srcs').appendChild(b);return b});
const sel=new Set(['excel','kom','gudang']);
const skillsEl=$('#skills');
SKILLS.forEach(([id,n])=>{const b=document.createElement('button');b.textContent=n;b.setAttribute('aria-pressed',sel.has(id));b.addEventListener('click',()=>{sel.has(id)?sel.delete(id):sel.add(id);b.setAttribute('aria-pressed',sel.has(id))});skillsEl.appendChild(b)});
const cityEl=$('#city');CITIES.forEach(c=>{const o=document.createElement('option');o.textContent=c;cityEl.appendChild(o)});cityEl.value='Bekasi';
const roleSel=$('#roleSel');JOBS.forEach((j,i)=>{const o=document.createElement('option');o.value=i;o.textContent=j.t+' · '+j.city;roleSel.appendChild(o)});
function score(skills,city,job,exp){const req=job.req;let tot=0,got=0;const hit=[],miss=[];for(const k in req){tot+=req[k];if(skills.has(k)){got+=req[k];hit.push(k)}else miss.push(k)}
  let s=got?28+62*got/tot:8+R()*6;if(city===job.city)s+=7;if(exp)s+=Math.min(exp,4)*.8;return{s:Math.max(5,Math.min(98,Math.round(s))),hit,miss,city:city===job.city}}
function setRole(r){role=r;$('#roleSeeker').setAttribute('aria-pressed',r==='seeker');$('#roleCompany').setAttribute('aria-pressed',r==='company');$('#seekerUI').hidden=r!=='seeker';$('#companyUI').hidden=r!=='company';
  $('#resHead').firstChild.textContent=r==='seeker'?'Lowongan paling cocok ':'Kandidat paling cocok ';runMatch(true)}
$('#roleSeeker').addEventListener('click',()=>setRole('seeker'));$('#roleCompany').addEventListener('click',()=>setRole('company'));
$('#runSeeker').addEventListener('click',()=>runMatch(false));$('#runCompany').addEventListener('click',()=>runMatch(false));
roleSel.addEventListener('change',()=>runMatch(false));
let matchTimer=[], coSel=null;
function coDetail(co){
  const w=document.createElement('div');w.className='co-d';
  const facts=[['Bentuk usaha',co.type==='PT'?'Perseroan Terbatas':(co.type==='CV'?'Persekutuan Komanditer (CV)':'Koperasi')],['Sektor',co.sector],['Berdiri',String(co.since)],['Ukuran',co.size],['Kantor',co.hq],['Gaji',co.sal]];
  const g=document.createElement('div');g.className='facts';facts.forEach(([k,v])=>{const a=document.createElement('span');a.textContent=k;const b=document.createElement('b');b.textContent=v;g.append(a,b)});
  const ab=document.createElement('p');ab.textContent=co.about;
  const bn=document.createElement('div');bn.className='why2';bn.textContent='Fasilitas: '+co.ben;
  const vs=document.createElement('div');vs.className='vchips';Object.keys(VERN).forEach(k=>{if(!(k in co.ver))return;const c=document.createElement('span');c.className=co.ver[k]?'ok':'no';c.textContent=(co.ver[k]?'✓ ':'⚠ ')+VERN[k]+(co.ver[k]?'':' belum terverifikasi');vs.appendChild(c)});
  if(co.warn){const c=document.createElement('span');c.className='no';c.textContent='⚠ '+co.warn;vs.appendChild(c)}
  const tr=document.createElement('div');tr.className='track';[[co.hired,'direkrut via Lumina'],[co.resp,'rata-rata respons'],[dec(co.rate,1)+' ★','ulasan karyawan']].forEach(([v,l])=>{const s=document.createElement('div');const b=document.createElement('b');b.textContent=v;s.append(b,l);tr.appendChild(s)});
  const src=document.createElement('div');src.className='small';src.textContent='Diisi otomatis dari NIB (OSS), data badan hukum, BPJS Ketenagakerjaan, profil resmi perusahaan, dan riwayat di Lumina. Nama dan angka di demo ini fiktif.';
  w.append(g,ab,bn,vs,tr,src);return w;
}
function setCompany(i){coSel=i;$$('#results .res.pick').forEach(r=>r.classList.toggle('open',+r.dataset.i===i));
  const c=$('#cocard');if(i==null){c.hidden=true;return}const co=COS[i];c.hidden=false;
  c.querySelector('.cc-n').textContent=co.n;c.querySelector('.cc-s').textContent=co.type+' · '+co.sector+' · sejak '+co.since;c.querySelector('.cc-j').textContent=JOBS[i].t+' · '+co.sal;
  const v=c.querySelector('.cc-v');v.innerHTML='';Object.keys(co.ver).forEach(k=>{const s=document.createElement('span');s.className=co.ver[k]?'ok':'no';s.textContent=(co.ver[k]?'✓ ':'⚠ ')+VERN[k];v.appendChild(s)});
  c.querySelector('.cc-r').textContent=dec(co.rate,1)+' ★ · '+co.hired+' orang direkrut via Lumina';pulse=.6}
function runMatch(instant){
  matchTimer.forEach(clearTimeout);matchTimer=[];
  const steps=$$('#steps div');const resEl=$('#results');
  const t0=performance.now();let list;
  const ing=$('#ingest');ing.hidden=role!=='seeker';ingestBoost=1;
  if(role==='seeker'){list=JOBS.map((j,i)=>({i,j,...score(sel,cityEl.value,j)})).filter(x=>x.j.src.some(s=>srcOn.has(s)));nodeLabels=JOBS.map(j=>j.t);
    const raw=list.reduce((a,x)=>a+x.j.src.filter(s=>srcOn.has(s)).length,0),scam=SCAMS.filter(s=>srcOn.has(s[0])).length;
    ing.innerHTML='';[['Lowongan masuk',raw+scam,''],['Duplikat digabung',raw-list.length,''],['Penipuan disaring',scam,'warn'],['Dinilai AI',list.length,'']].forEach(([l,v,c])=>{const d=document.createElement('div');d.className=c;const b=document.createElement('b');b.textContent=v;d.append(b,l);ing.appendChild(d)})}
  else{const job=JOBS[+roleSel.value];list=CANDS.map((c,i)=>({i,c,...score(new Set(c.sk),c.city,job,c.exp)}));nodeLabels=CANDS.map(c=>c.id)}
  const ms=(performance.now()-t0);
  list.sort((a,b)=>b.s-a.s);const top=list.slice(0,3);
  const show=()=>{
    nodeScores=new Array(8).fill(0);list.forEach(x=>nodeScores[x.i]=x.s);topNodes=top.map(x=>x.i);setNodeLabels();
    resEl.innerHTML='';
    top.forEach((x,rank)=>{const d=document.createElement('div');d.className='res';
      const ttl=role==='seeker'?x.j.t:`Kandidat ${x.c.id}`;
      const sub=role==='seeker'?`${x.j.city} · ${COS[x.i].warn?'kemitraan':'kontrak formal'}`:`${x.c.city} · pengalaman ${x.c.exp} th`;
      d.innerHTML=`<div class="row"><span class="ttl"></span><span class="pct"></span></div><div class="meter"><i></i></div><div class="why2"></div>`;
      d.querySelector('.ttl').textContent=ttl;d.querySelector('.pct').textContent=x.s+'%';d.querySelector('.meter i').style.width=x.s+'%';
      d.querySelector('.why2').textContent=sub+' · cocok: '+(x.hit.length?x.hit.map(k=>SKN[k]).join(', '):'belum ada')+(x.city?' · lokasi sama':'');
      if(role==='seeker'){const co=COS[x.i];d.dataset.i=x.i;d.tabIndex=0;d.classList.add('pick');
        const h=document.createElement('div');h.className='co-h';const nm=document.createElement('span');nm.className='co-n';nm.textContent=co.n;const tc=document.createElement('span');tc.className='tchip';tc.textContent=co.type;
        const vc=document.createElement('span');const okAll=Object.values(co.ver).every(Boolean);vc.className=okAll?'vok':'vwarn';vc.textContent=okAll?'✓ Terverifikasi':'⚠ Sebagian terverifikasi';h.append(nm,tc,vc);d.insertBefore(h,d.children[1]);
        d.appendChild(coDetail(co));
        d.addEventListener('click',e=>{if(e.target.closest('summary,a'))return;setCompany(x.i)});d.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();setCompany(x.i)}})}
      if(role==='seeker'){const s=document.createElement('div');s.className='srcl';const act=x.j.src.filter(k=>srcOn.has(k));s.textContent='via '+act.map(k=>SRCN[k]).join(' · ');
        if(act.length>1){const i2=document.createElement('i');i2.textContent=` · digabung dari ${act.length} sumber`;s.appendChild(i2)}d.appendChild(s)}
      if(x.miss.length&&role==='seeker'){const g=document.createElement('div');g.className='gap';g.textContent='Tutup celah: pelatihan '+x.miss.map(k=>SKN[k]).join(' & ')+' · dibiayai beasiswa Dana Abadi';d.appendChild(g)}
      if(role==='company'){const b=document.createElement('button');b.className='btn act';b.textContent='Minta buka profil';b.addEventListener('click',()=>{b.textContent='Menunggu persetujuan kandidat (simulasi)';b.disabled=true});d.appendChild(b)}
      resEl.appendChild(d)});
    $('#matchTime').textContent=`Mesin menilai ${list.length} ${role==='seeker'?'lowongan':'kandidat'} dalam ${ms<1?'<1':dec(ms,1)} md. Skor menjelaskan alasannya, dan keputusan tetap di tanganmu.`;
    steps.forEach(s=>s.classList.add('on'));pulse=1;
    setCompany(role==='seeker'&&top.length?top[0].i:null);
  };
  if(instant){show();return}
  steps.forEach(s=>s.classList.remove('on'));resEl.innerHTML='';topNodes=[];nodeScores=new Array(8).fill(0);setNodeLabels();
  [0,1,2,3].forEach(k=>matchTimer.push(setTimeout(()=>steps[k].classList.add('on'),220+k*360)));
  matchTimer.push(setTimeout(show,1600));
}

/* ---------- FUND UI ---------- */
let amount=50000;
const allocEl=$('#alloc');
const allocBtns=ALLOC.map((a,i)=>{const b=document.createElement('button');b.innerHTML=`<span class="sw"></span><span class="nm"></span><span class="pc"></span><span class="rp"></span>`;b.querySelector('.sw').style.background=a[2];b.querySelector('.nm').textContent=a[0];b.querySelector('.pc').textContent=a[1]+'%';
  b.addEventListener('mouseenter',()=>setAsset(i));b.addEventListener('focus',()=>setAsset(i));b.addEventListener('click',()=>setAsset(i));allocEl.appendChild(b);return b});
function setAsset(i){assetSel=i;allocBtns.forEach((b,k)=>b.classList.toggle('on',k===i))}
let purpose='prog';
function setPurpose(p){purpose=p;$('#pProg').setAttribute('aria-pressed',p==='prog');$('#pOps').setAttribute('aria-pressed',p==='ops');
  $('#purposeNote').textContent=p==='prog'?'Masuk ke Yayasan Lumina. Paling banyak 10% untuk biaya penghimpunan sesuai PP 29/1980, sisanya menjadi pokok Dana Abadi dengan alokasi di atas.':'Masuk ke PT Lumina untuk server, AI, dan gaji tim. Dicatat terpisah dan dilaporkan setiap bulan di ruang Anggaran & Biaya.';renderAlloc()}
$('#pProg').addEventListener('click',()=>setPurpose('prog'));$('#pOps').addEventListener('click',()=>setPurpose('ops'));
function renderAlloc(){const fx=purpose==='prog'?.9:0;allocBtns.forEach((b,i)=>b.querySelector('.rp').textContent=amount&&fx?'Rp '+fmt.format(Math.round(amount*fx*ALLOC[i][1]/100)):'—');$('#donate').textContent=amount?'Nyalakan cahaya':'Lanjut tanpa donasi'}
const AM=[0,10000,25000,50000,100000];
const amtBtns=AM.map(v=>{const b=document.createElement('button');b.textContent=v?'Rp '+fmt.format(v):'Tidak sekarang';b.addEventListener('click',()=>{amount=v;$('#amt').value='';syncAmt();renderAlloc()});$('#amts').appendChild(b);return b});
function syncAmt(){amtBtns.forEach((b,k)=>b.setAttribute('aria-pressed',AM[k]===amount&&!$('#amt').value))}
$('#amt').addEventListener('input',e=>{const d=e.target.value.replace(/\D/g,'').slice(0,10);e.target.value=d?fmt.format(+d):'';amount=d?+d:0;syncAmt();renderAlloc()});
let lights=+(store('lumina-lights')||0);
$('#donate').addEventListener('click',()=>{
  if(!amount){$('#thanks').textContent='Tidak apa-apa. Semua fitur Lumina tetap gratis untukmu.';return}
  lights++;store('lumina-lights',String(lights));
  const n=Math.max(30,Math.min(600,Math.round(amount/400)));
  if(gl){let c=0,guard=0;while(c<n&&guard<20000){const k=Math.floor(R()*N);if(!goldBase[k]){goldBase[k]=1;goldT[k]=1;c++}guard++}}
  burst(1.4);pulse=1.4;
  const code='LMN-'+hex(4).toUpperCase();recordDonation(code,amount,purpose);$('#trk').value=code;
  $('#thanks').textContent=`Terima kasih. ${fmt.format(n)} titik berubah emas sebagai tanda dukungan Rp ${fmt.format(amount)} (simulasi). Kode tanda terima ${code}: lacak pergerakannya di ruang Jejak Dana.`;
});

/* ---------- VAULT UI ---------- */
const layerBtns=LAYERS.map((l,i)=>{const b=document.createElement('button');b.innerHTML=`<span class="k"></span><span><span class="h"></span><span class="b"></span></span>`;b.querySelector('.k').textContent='L'+(i+1);b.querySelector('.h').textContent=l[0];b.querySelector('.b').textContent=l[1];
  b.addEventListener('click',()=>{layerAuto=false;setLayer(i)});$('#layers').appendChild(b);return b});
function setLayer(i){layerSel=i;layerBtns.forEach((b,k)=>b.classList.toggle('on',k===i))}

/* ---------- VISI UI ---------- */
const misiBtns=MISI.map((m,i)=>{const b=document.createElement('button');b.innerHTML=`<span class="k"></span><span><span class="h"></span><span class="b"></span></span>`;b.querySelector('.k').textContent='M'+(i+1);b.querySelector('.h').textContent=m[0];b.querySelector('.b').textContent=m[1];
  b.addEventListener('click',()=>setMisi(i));$('#misi').appendChild(b);return b});
function setMisi(i){misiSel=i;misiBtns.forEach((b,k)=>b.classList.toggle('on',k===i));mLbl.forEach((e,k)=>e.classList.toggle('on',k===i))}

/* ---------- TEAM UI ---------- */
const divBtns=DIVS.map((d,i)=>{const b=document.createElement('button');b.innerHTML=`<span class="sw"></span><span class="h"></span><span class="c"></span><div class="roles"></div>`;b.querySelector('.sw').style.background=d.c;b.querySelector('.h').textContent=d.n;
  b.addEventListener('click',()=>setDiv(i));$('#divs').appendChild(b);return b});
function renderTeam(){
  const tot=DIVS.reduce((a,d)=>a+(phase===1?d.f1:d.f2),0);
  $('#tmTotal').textContent=tot;$('#tmPer').textContent=phase===1?'FASE 1 · BULAN 0–12 · MVP & PILOT 2 KOTA':'FASE 2 · BULAN 12–36 · SKALA NASIONAL';
  $('#ph1').setAttribute('aria-pressed',phase===1);$('#ph2').setAttribute('aria-pressed',phase===2);
  divBtns.forEach((b,i)=>{const d=DIVS[i];b.querySelector('.c').textContent=(phase===1?d.f1:d.f2)+' org';const rl=b.querySelector('.roles');rl.innerHTML='';
    d.r.forEach(r=>{const x=document.createElement('div');x.className='role';x.innerHTML='<span class="rn"></span><span class="rc"></span><span class="rd"></span>';x.querySelector('.rn').textContent=r[0];x.querySelector('.rc').textContent=(phase===1?r[1]:r[2])+' org';x.querySelector('.rd').textContent=r[3];rl.appendChild(x)});
    dLbl[i].innerHTML='';dLbl[i].append(document.createTextNode(d.n));const bb=document.createElement('b');bb.textContent=phase===1?d.f1:d.f2;dLbl[i].appendChild(bb)});
}
function setDiv(i){divSel=i;divBtns.forEach((b,k)=>b.classList.toggle('on',k===i));dLbl.forEach((e,k)=>e.classList.toggle('dim',k!==i))}
$('#ph1').addEventListener('click',()=>{phase=1;renderTeam()});$('#ph2').addEventListener('click',()=>{phase=2;renderTeam();pulse=1});

/* ---------- ADVISOR UI ---------- */
const advBtns=ADVS.map((a,i)=>{const b=document.createElement('button');b.innerHTML=`<span class="k"></span><span><span class="h"></span><span class="b"></span></span>`;b.querySelector('.k').textContent='P'+(i+1);b.querySelector('.k').style.color=a[2];b.querySelector('.h').textContent=a[0];b.querySelector('.b').textContent=a[1];
  b.addEventListener('click',()=>setAdv(i));$('#advs').appendChild(b);return b});
function setAdv(i){advSel=i;advBtns.forEach((b,k)=>b.classList.toggle('on',k===i));aLbl.forEach((e,k)=>e.classList.toggle('dim',k!==i))}

/* ---------- FLOW UI ---------- */
const stDots=STEPS.map((s,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Langkah '+(i+1));b.addEventListener('click',()=>{setStep(i);setPlay(false)});$('#stDots').appendChild(b);return b});
function setStep(i){stepSel=(i+STEPS.length)%STEPS.length;stepClock=0;const s=STEPS[stepSel];
  $('#stNo').textContent='LANGKAH '+String(stepSel+1).padStart(2,'0')+' / '+String(STEPS.length).padStart(2,'0');$('#stT').textContent=s.t;$('#stD').textContent=s.d;
  stDots.forEach((b,k)=>b.classList.toggle('on',k===stepSel));FKEYS.forEach(k=>{fLbl[k].classList.toggle('on',s.n.includes(k));fLbl[k].classList.toggle('dim',!s.n.includes(k))})}
function setPlay(p){stepPlay=p;const b=$('#stPlay');b.textContent=p?'❚❚':'▶';b.setAttribute('aria-label',p?'Jeda animasi':'Putar animasi')}
$('#stPrev').addEventListener('click',()=>{setStep(stepSel-1);setPlay(false)});$('#stNext').addEventListener('click',()=>{setStep(stepSel+1);setPlay(false)});
$('#stPlay').addEventListener('click',()=>setPlay(!stepPlay));

/* ---------- VENTURES UI ---------- */
const phBtns=PHASES.map((ph,i)=>{const b=document.createElement('button');b.innerHTML=`<span class="k"></span><span><span class="h"></span><span class="b"></span></span>`;b.querySelector('.k').textContent='F'+(i+1);b.querySelector('.h').textContent=ph.n+' · '+ph.w.toLowerCase();b.querySelector('.b').textContent=ph.d;
  b.addEventListener('click',()=>setPhase(i));$('#phases').appendChild(b);return b});
function setPhase(i){phaseSel=i;phBtns.forEach((b,k)=>b.classList.toggle('on',k===i));phLbl.forEach((e,k)=>e.classList.toggle('on',k===i))}
function venSpawn(a,b,h,dur,col,end){const sp=venPool.find(s=>!s.userData.busy);if(!sp)return;sp.material.color.set(col);sp.userData={busy:true,a,b,h,dur,u:0,end}}
function venSeed(){if(!gl)return;const tip=TREE.tips[Math.floor(Math.random()*TREE.tips.length)],a=PHASES[2].p;
  venSpawn([a[0],a[1]+.2,a[2]],tip,1.8,1.6,'#FFE2A8',()=>{venPlats[3].userData.gw.material.opacity=1;
    for(let k=0;k<2;k++){const p1=PHASES[0].p;venSpawn(tip,[p1[0]+(Math.random()-.5)*1.4,p1[1]+.15,p1[2]+(Math.random()-.5)*1.4],2.2,1.9+k*.3,'#9DB5A0',()=>{venPlats[0].userData.gw.material.opacity=1})}})}

/* ---------- BUDGET UI ---------- */
function ctRows(el,keys,total){keys.forEach(k=>{const nd=BUD.nodes[k],b=document.createElement('button');b.dataset.k=k;b.innerHTML='<span class="sw"></span><span class="nm"></span><span class="am"></span><span class="pc"></span><span class="bar"><i></i></span>';
  b.querySelector('.sw').style.background=nd.c;b.querySelector('.nm').textContent=nd.n;b.querySelector('.am').textContent=dec(nd.a,1)+' M';const pc=nd.a/total*100;b.querySelector('.pc').textContent=Math.round(pc)+'%';const bi=b.querySelector('.bar i');bi.style.width=pc+'%';bi.style.background=nd.c;
  ['mouseenter','focus','click'].forEach(ev=>b.addEventListener(ev,()=>setBud({k})));el.appendChild(b)})}
ctRows($('#ctPT'),['gaji','cloud','aman','pasar','kantor'],8.5);ctRows($('#ctYY'),['yops','pokok','prog'],3.5);
function setBud(sel){budSel=sel;const val=$('#bdVal'),nm=$('#bdName'),note=$('#bdNote');
  if(!sel){val.textContent='12,0';nm.textContent='TOTAL ANGGARAN TAHUN PERTAMA';note.textContent='Rp 8,5 M dikelola PT Lumina untuk operasional, dan Rp 3,5 M dikelola Yayasan Lumina untuk program serta Dana Abadi.'}
  else if(sel.k){const nd=BUD.nodes[sel.k];val.textContent=dec(nd.a,1);let base=12,lab='TOTAL ANGGARAN';if(nd.col===2){const p=BUD.links.find(l=>l.t===sel.k).f;base=p==='pt'?8.5:3.5;lab=p==='pt'?'BIAYA PT LUMINA':'DANA YAYASAN'}
    nm.textContent=nd.n.toUpperCase()+' · '+Math.round(nd.a/base*100)+'% DARI '+lab;note.textContent=nd.d}
  else{const l=BUD.links[sel.li];val.textContent=dec(l.a,1);nm.textContent=(BUD.nodes[l.f].n+' → '+BUD.nodes[l.t].n).toUpperCase();note.textContent=BUD.nodes[BUD.nodes[l.t].col===2?l.t:l.f].d}
  $$('.ctable button').forEach(b=>b.classList.toggle('on',!!sel&&sel.k===b.dataset.k))}

/* ---------- LEDGER UI ---------- */
function setBlock(s){blkSel=s;renderBlock()}
function renderBlock(){const b=blkSel<10?LED.blocks[blkSel]:LED.pending,el=$('#blk');el.innerHTML='';if(!b)return;
  const row=(k,v,code)=>{const d=document.createElement('div');d.append(k+' ');const x=document.createElement(code?'code':'b');x.textContent=v;d.appendChild(x);el.appendChild(d)};
  row('Blok','#'+fmt.format(b.num)+' · '+b.txs.length+' transaksi · '+(b.hash?'final':'menunggu konfirmasi'));
  row('Konfirmasi',b.hash?`${NETN.length} dari ${NETN.length} node pemantau menyimpan salinan`:`sedang disebarkan ke ${NETN.length} node pemantau`);
  row('Hash',b.hash||'(dihitung saat blok ditutup)',true);row('Hash sebelumnya',b.prev,true);
  b.txs.slice(0,4).forEach(tx=>{const d=document.createElement('div');d.textContent=`${WAL[tx.f].n} → ${WAL[tx.t].n} · ${rp(tx.amt)}`;el.appendChild(d)});
  if(b.txs.length>4){const d=document.createElement('div');d.textContent=`+${b.txs.length-4} transaksi lain`;el.appendChild(d)}}
function renderLedger(){$('#lsBlock').textContent='#'+fmt.format(LED.pending.num);$('#lsTx').textContent=fmt.format(LED.count||0);$('#lsIn').textContent=rp(LED.donIn);
  const fd=$('#feed');fd.innerHTML='';LED.txs.slice(0,7).forEach(tx=>{const b=document.createElement('button');b.innerHTML='<span class="bn"></span><span class="ft"></span><span class="am"></span><span class="meta"></span>';
    b.querySelector('.bn').textContent='#'+fmt.format(tx.block);const ft=b.querySelector('.ft'),dt2=document.createElement('span');dt2.className='dot';dt2.style.background=TXT[tx.type][1];ft.append(dt2,WAL[tx.f].n+' → '+WAL[tx.t].n);
    b.querySelector('.am').textContent=rp(tx.amt);const c=document.createElement('code');c.textContent=tx.id.slice(0,14)+'…';b.querySelector('.meta').append(c,' · '+TXT[tx.type][0]+(tx.code?' · '+tx.code:''));
    b.addEventListener('click',()=>{spawnAnim(tx.f,tx.t,TXT[tx.type][1]);const s=LED.blocks.findIndex(x=>x.num===tx.block);setBlock(s>=0?s:10)});fd.appendChild(b)});
  renderBlock()}
function spawnAnim(f,t,col){if(!gl)return;const sp=txPool.find(s=>!s.userData.busy);if(!sp)return;sp.userData={busy:true,f,t,ph:0,u:0};sp.material.color.set(col);WAL[f].g.userData.flash=.8}
onTx=tx=>{if(ch===12){spawnAnim(tx.f,tx.t,TXT[tx.type][1]);renderLedger()}};
onSeal=()=>{chainSlide=1.1;if(blkSel<9)blkSel=Math.max(0,blkSel-1);if(confWave){confWave.userData.t=0;netNodes.forEach(n=>n.userData.flash=1)}if(ch===12)renderLedger()};
function spawnPulse(a,b,h,dur,end){const sp=pulsePool.find(s=>!s.userData.busy);if(!sp)return;sp.userData={busy:true,a,b,h,dur,u:0,end}}
function broadcast(){if(!gl)return;const b=SLOT(10),a=[b[0]+chainSlide,b[1],b[2]];NETN.forEach((n,i)=>spawnPulse(a,NETPOS(i),.7,.9+i*.03,()=>{netNodes[i].userData.flash=1}))}
function spreadBen(){if(!gl)return;for(let k=0;k<5;k++){const i=Math.floor(Math.random()*BENPOS.length);spawnPulse(WAL.program.p,BENPOS[i],.6,.8+k*.08,()=>{benDots[i].userData.flash=1})}}
function track(){const code=$('#trk').value.trim().toUpperCase(),rec=receipts[code],out=$('#trail');out.innerHTML='';
  const li=html=>{const e=document.createElement('li');e.innerHTML=html;out.appendChild(e)};
  if(!rec){li('Kode tidak ditemukan. Coba <code>LMN-DEMO</code>, atau berdonasi dulu di ruang Dana Abadi untuk mendapat kode sendiri.');return}
  const D={donasi:'Diterima Yayasan Lumina',sahabat:'Diterima PT Lumina untuk operasional',ops:'Biaya penghimpunan (10%)',alokasi:'Masuk pokok Dana Abadi (90%)'};
  const gap=reduce?0:650;
  rec.txs.forEach((tx,k)=>setTimeout(()=>{spawnAnim(tx.f,tx.t,TXT[tx.type][1]);li(`${D[tx.type]||'Diinvestasikan ke '+WAL[tx.t].n} · <b>${rp(tx.amt)}</b> · blok #${fmt.format(tx.block)} · <code>${tx.id.slice(0,12)}…</code>`)},k*gap));
  setTimeout(()=>li(rec.purpose==='ops'?'Dipakai untuk server, AI, dan gaji tim. Laporannya ada di ruang Anggaran &amp; Biaya.':'Pokoknya tetap diinvestasikan. Imbal hasilnya nanti dibagi 70% untuk program dukungan dan 30% untuk R&amp;D, dan tercatat di ledger yang sama.'),rec.txs.length*gap+200)}
$('#trkBtn').addEventListener('click',track);$('#trk').addEventListener('keydown',e=>{if(e.key==='Enter')track()});

/* ---------- INPUT ---------- */
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>setCh(+b.dataset.go)));
$('#brandBtn').addEventListener('click',()=>setCh(0));
let wheelLock=0;
addEventListener('wheel',e=>{if(e.target.closest('.panel'))return;const now=performance.now();if(now<wheelLock||Math.abs(e.deltaY)<18)return;wheelLock=now+1000;nav(e.deltaY>0?1:-1)},{passive:true});
addEventListener('keydown',e=>{if(e.target.closest('input,select,textarea'))return;
  if(e.key==='ArrowRight'||e.key==='PageDown'){nav(1)}else if(e.key==='ArrowLeft'||e.key==='PageUp'){nav(-1)}
  else if(/^[1-9]$/.test(e.key)){setCh(ORDER[+e.key-1])}});
const cursor=$('#cursor');
let drag=null,hover=null;
addEventListener('pointermove',e=>{mouse.x=e.clientX/innerWidth*2-1;mouse.y=e.clientY/innerHeight*2-1;cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
  if(e.target.id==='gl'){mouse.nx=mouse.x;mouse.ny=-mouse.y}else{mouse.nx=9;mouse.ny=9}
  if(drag){const dx=e.clientX-drag.x;drag.m=Math.max(drag.m,Math.abs(dx));dragRotT=drag.r+dx*.006}});
const glc=$('#gl');
glc.addEventListener('pointerdown',e=>{drag={x:e.clientX,r:dragRotT,m:0};try{glc.setPointerCapture(e.pointerId)}catch(_){}
  mouse.nx=e.clientX/innerWidth*2-1;mouse.ny=-(e.clientY/innerHeight*2-1);});
glc.addEventListener('pointerup',e=>{const click=drag&&drag.m<6;drag=null;if(!click)return;
  mouse.nx=e.clientX/innerWidth*2-1;mouse.ny=-(e.clientY/innerHeight*2-1);pick(true)});
addEventListener('hashchange',()=>{const k=CH.indexOf(location.hash.slice(1));if(k>=0&&k!==ch)setCh(k,true)});
addEventListener('resize',layout);

/* ---------- PICKING ---------- */
const ray=gl?new THREE.Raycaster():null, ndc=gl?new THREE.Vector2():null;
function pick(click){
  if(!gl)return;ndc.set(mouse.nx,mouse.ny);ray.setFromCamera(ndc,camera);let hit=null;
  if(ch===1){const h=ray.intersectObjects(bars,false)[0];if(h){hit='bar';if(h.object.userData.i!==yearSel)setYear(h.object.userData.i)}}
  else if(ch===4){const h=ray.intersectObjects(donutSegs,false)[0];if(h){hit='seg';if(h.object.userData.i!==assetSel)setAsset(h.object.userData.i)}}
  else if(ch===3){const h=ray.intersectObjects(nodes.map(n=>n.userData.hit),false)[0];if(h){hit='node';if(click){pulse=1;const i=h.object.userData.i;if(role==='seeker'&&nodeScores[i])setCompany(i)}}}
  else if(ch===6){const h=ray.intersectObjects(monos,false)[0];if(h){hit='mono';if(h.object.userData.i!==misiSel)setMisi(h.object.userData.i)}}
  else if(ch===7){const h=ray.intersectObjects(divNodes.map(n=>n.userData.hit),false)[0];if(h){hit='div';if(h.object.userData.i!==divSel)setDiv(h.object.userData.i)}}
  else if(ch===8){const h=ray.intersectObjects(FKEYS.map(k=>fNodes[k].userData.base),false)[0];if(h){hit='flow';if(click){const k=h.object.userData.k;const s=STEPS.findIndex(st=>st.n[0]===k);setStep(s>=0?s:STEPS.findIndex(st=>st.n.includes(k)));setPlay(false)}}}
  else if(ch===9){const h=ray.intersectObjects(advNodes.map(n=>n.userData.hit),false)[0];if(h){hit='adv';if(h.object.userData.i!==advSel)setAdv(h.object.userData.i)}}
  else if(ch===11){const h=ray.intersectObjects([...Object.values(BUD.nodes).map(n=>n.mesh),...BUD.links.map(l=>l.mesh)],false)[0];if(h){hit='bud';const d=h.object.userData,sel=d.k?{k:d.k}:{li:d.li};if(!budSel||budSel.k!==sel.k||budSel.li!==sel.li)setBud(sel)}}
  else if(ch===12){const h=ray.intersectObjects(blocks,false)[0];if(h){hit='blk';if(click)setBlock(h.object.userData.s)}}
  else if(ch===13){const h=ray.intersectObjects(venPlats.map(g=>g.userData.base),false)[0];if(h){hit='phase';if(h.object.userData.i!==phaseSel)setPhase(h.object.userData.i)}}
  if(ch===0||ch===3||ch===4||ch===5||ch===6||ch===9){const h=ray.intersectObject(coreInner,false)[0];if(h&&coreScale>.3){hit=hit||'core';if(click&&hit==='core'){burst(1);pulse=1.2}}}
  cursor.classList.toggle('hot',!!hit);glc.style.cursor=hit?'pointer':(drag?'grabbing':'grab');
}
function burst(f){if(!gl)return;const P=pgeo.attributes.position.array;for(let i=0;i<N;i++){const j=i*3,x=P[j],y=P[j+1],z=P[j+2],l=Math.hypot(x,y,z)||1,k=(.6+R()*1.4)*f;P[j]+=x/l*k;P[j+1]+=y/l*k;P[j+2]+=z/l*k}}

/* ---------- LOOP ---------- */
const v3=gl?new THREE.Vector3():null;
function proj(x,y,z){v3.set(x,y,z);stage.localToWorld(v3);v3.project(camera);return[(v3.x*.5+.5)*innerWidth,(-v3.y*.5+.5)*innerHeight,v3.z]}
let last=performance.now(),T=0,hoverTick=0;
function tick(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;T+=dt;
  const e=k=>1-Math.pow(k,dt);
  // particles morph
  const P=pgeo.attributes.position.array,Tg=targets,ms=dt*1.7;
  for(let i=0;i<N;i++){const s=Math.min(1,ms*spd[i]),j=i*3;P[j]+=(Tg[j]-P[j])*s;P[j+1]+=(Tg[j+1]-P[j+1])*s;P[j+2]+=(Tg[j+2]-P[j+2])*s}
  pgeo.attributes.position.needsUpdate=true;
  let gd=false;for(let i=0;i<N;i++){if(gold[i]!==goldT[i]){gold[i]+=(goldT[i]-gold[i])*Math.min(1,dt*1.2*spd[i]);if(Math.abs(goldT[i]-gold[i])<.01)gold[i]=goldT[i];gd=true}}
  if(gd)pgeo.attributes.aGold.needsUpdate=true;
  points.material.uniforms.uTime.value=T;
  const us=points.material.uniforms.uSize;us.value+=((ch===10?42:(ch===7||ch===9?54:64))-us.value)*e(.1);
  if(points.userData.snap!=null){points.rotation.y+=(points.userData.snap-points.rotation.y)*e(.05)}else points.rotation.y+=spin*dt*(reduce?.3:1);
  // stage
  dragRot+=(dragRotT-dragRot)*e(.02);stageX+=(stageXT-stageX)*e(.06);stageY+=(stageYT-stageY)*e(.06);
  stage.rotation.y=dragRot;camera.setViewOffset(innerWidth,innerHeight,stageX,stageY,innerWidth,innerHeight);
  // camera
  const narrow=innerWidth<=820,far=narrow?(ch===1?1.4:1.22):1;
  camPos.lerp(new THREE.Vector3(camTarget.x,camTarget.y,camTarget.z*far),e(.08));camLook.lerp(lookTarget,e(.08));
  camera.position.set(camPos.x+mouse.x*.55,camPos.y-mouse.y*.35,camPos.z);camera.lookAt(camLook);
  // core
  coreScale+=(coreScaleT-coreScale)*e(.03);pulse*=Math.pow(.12,dt);
  const cs=Math.max(.001,coreScale*(1+pulse*.18+Math.sin(T*1.4)*.015));core.scale.setScalar(cs);core.visible=coreScale>.02;
  coreWire.rotation.y+=dt*.25;coreWire.rotation.x+=dt*.1;coreWire2.rotation.y-=dt*.12;coreWire2.rotation.z+=dt*.05;
  coreInner.material.uniforms.uP.value=pulse*.8;coreGlow.material.opacity=.7+pulse*.3;
  for(const k in vis)vis[k]+=(visT[k]-vis[k])*e(.03);
  // bars
  barGroup.visible=vis.bars>.01;
  if(barGroup.visible){bars.forEach((b,i)=>{const u=b.userData;u.h+=(u.hT-u.h)*e(.04);const hh=Math.max(.001,u.h*vis.bars*Math.min(1,Math.max(0,vis.bars*1.6-i*.05)));b.scale.y=hh;
      const on=i===yearSel;b.material.emissiveIntensity+=((on?1.4:.45)-b.material.emissiveIntensity)*e(.02);u.edge.material.opacity=on?.95:.3;b.material.opacity=.92*vis.bars;
      const [x,y]=proj(b.position.x,-2.08-.35,0);yLbl[i].style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;
      const [x2,y2]=proj(b.position.x,-2.08+hh+.32,0);vLbl[i].style.transform=`translate(${x2}px,${y2}px) translate(-50%,-50%)`;vLbl[i].style.opacity=on?1:.55})}
  // donut
  donut.visible=vis.donut>.01;
  if(donut.visible){donut.scale.setScalar(Math.max(.001,vis.donut));donut.rotation.z+=dt*.12*(reduce?.3:1);donutSegs.forEach((m,i)=>{const on=i===assetSel;const s=m.scale.x+((on?1.09:1)-m.scale.x)*e(.02);m.scale.setScalar(s);m.position.z+=((on?.25:0)-m.position.z)*e(.02);m.material.emissiveIntensity+=((on?.55:.12)-m.material.emissiveIntensity)*e(.02)})}
  // vault
  vault.visible=vis.vault>.01;
  if(vault.visible){vault.scale.setScalar(Math.max(.001,.6+vis.vault*.4));
    if(layerAuto&&ch===5&&now-lastLayerAuto>3800){lastLayerAuto=now;setLayer((layerSel+1)%5)}
    shells.forEach((s,i)=>{const on=i===layerSel;s.rotation.y+=dt*(.05+i*.03)*(i%2?-1:1);s.rotation.x+=dt*.02*(i%2?1:-1);s.userData.o+=((on?.95:.16)-s.userData.o)*e(.02);s.material.opacity=s.userData.o*vis.vault;s.material.color.setHex(on?0xFFE2A0:0xC9A35E);const sc=s.scale.x+((on?1.04:1)-s.scale.x)*e(.05);s.scale.setScalar(sc)})}
  // match
  matchGroup.visible=vis.match>.01;
  if(matchGroup.visible){matchGroup.scale.setScalar(Math.max(.001,vis.match));
    nodes.forEach((g,i)=>{const sc=nodeScores[i]/100,top=topNodes.includes(i);const tgt=.7+sc*1.1+(top?.4:0);const s=g.userData.sphere.scale.x+(tgt-g.userData.sphere.scale.x)*e(.03);g.userData.sphere.scale.setScalar(s);
      g.userData.glow.material.opacity=(top?.85:.25+sc*.3)*vis.match;g.userData.glow.scale.setScalar(top?1.8:1.1);
      lines[i].material.opacity+=(((top?.75:.06+sc*.18))*vis.match-lines[i].material.opacity)*e(.05);
      const tr=travelers[i];if(top){tr.userData.t=(tr.userData.t+dt*(.45+sc*.4))%1;const p=NODEPOS[i],t=tr.userData.t;tr.position.set(p[0]*t,p[1]*t,p[2]*t);tr.material.opacity=Math.sin(t*Math.PI)*vis.match}else tr.material.opacity=0;
      const [x,y,z]=proj(p0(i,0),p0(i,1)+.55*stageS,p0(i,2));nLbl[i].style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;nLbl[i].style.visibility=z<1?'visible':'hidden';
      if(i===coSel){const pw=innerWidth>820?(innerWidth>1100?440:390)+60:0,cx=Math.min(x+34,innerWidth-pw-250);cocard.style.transform=`translate(${cx}px,${y+16}px) perspective(900px) rotateY(${-mouse.x*14}deg) rotateX(${mouse.y*10}deg)`}})}
  // job sources streaming into the engine
  if(matchGroup.visible){ingestBoost*=Math.pow(.35,dt);
    srcNodes.forEach((g,i)=>{const u=g.userData,on=srcOn.has(u.id)&&role==='seeker';g.rotation.y+=dt*.7;g.position.y=SRCPOS[i][1]+Math.sin(T+i)*.08;
      const op=(on?1:.25)*vis.match;u.m.material.opacity=op;u.core2.material.opacity=op;u.gw.material.opacity=(on?.55+ingestBoost*.4:.1)*vis.match;u.ln.material.opacity=(on?.18+ingestBoost*.4:.04)*vis.match;
      const [x,y,z]=proj(SRCPOS[i][0],SRCPOS[i][1]+.5,SRCPOS[i][2]);sLbl[i].style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;sLbl[i].style.visibility=z<1?'visible':'hidden';sLbl[i].classList.toggle('dim',!on)});
    srcTrav.forEach(tr=>{const q=tr.userData,on=srcOn.has(SOURCES[q.i][0])&&role==='seeker',p=SRCPOS[q.i];q.t=(q.t+dt*(.25+ingestBoost*.9))%1;const t=q.t;tr.position.set(p[0]*(1-t),p[1]*(1-t),p[2]*(1-t));tr.material.opacity=on?Math.sin(t*Math.PI)*vis.match:0})}
  // vision monoliths
  visiGroup.visible=vis.visi>.01;
  if(visiGroup.visible){visiGroup.scale.setScalar(Math.max(.001,vis.visi));visiGroup.rotation.y+=dt*.08*(reduce?.3:1);
    monos.forEach((m,i)=>{const on=i===misiSel,u=m.userData;u.y+=((on?.45:0)-u.y)*e(.03);m.position.y=u.y+Math.sin(T*.8+i)*.06;
      m.material.emissiveIntensity+=((on?1.1:.22)-m.material.emissiveIntensity)*e(.03);u.edge.material.opacity=(on?1:.3)*vis.visi;u.glow.material.opacity=(on?.95:.3)*vis.visi;u.glow.scale.setScalar(on?2.6:1.3);
      m.getWorldPosition(v3);v3.y+=1.75*stageS;v3.project(camera);mLbl[i].style.transform=`translate(${(v3.x*.5+.5)*innerWidth}px,${(-v3.y*.5+.5)*innerHeight}px) translate(-50%,-50%)`;mLbl[i].style.visibility=v3.z<1?'visible':'hidden'})}
  // team constellations
  teamGroup.visible=vis.team>.01;
  if(teamGroup.visible){teamGroup.scale.setScalar(Math.max(.001,vis.team));
    divNodes.forEach((g,i)=>{const d=DIVS[i],on=i===divSel,u=g.userData,cnt=phase===1?d.f1:d.f2;
      const s=u.sphere.scale.x+((on?1.5:1)-u.sphere.scale.x)*e(.03);u.sphere.scale.setScalar(s);u.glow.material.opacity=(on?.9:.4)*vis.team;u.glow.scale.setScalar(on?1.7:1);u.line.material.opacity=(on?.7:.15)*vis.team;
      u.sats.forEach((m,k)=>{const q=m.userData;q.a+=dt*q.sp*(reduce?.3:1);const rr=q.r*(on?1.25:1);m.position.set(Math.cos(q.a)*rr,Math.sin(q.a+q.tl)*rr*.45,Math.sin(q.a)*rr);q.o+=((k<cnt?(on?1:.55):0)-q.o)*e(.05);m.material.opacity=q.o*vis.team;m.visible=q.o>.02});
      const [x,y]=proj(DIVPOS[i][0],DIVPOS[i][1]+1.05,DIVPOS[i][2]);dLbl[i].style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`})}
  // ventures roadmap
  venGroup.visible=vis.ven>.01;
  if(venGroup.visible){venGroup.scale.setScalar(Math.max(.001,vis.ven));
    if(ch===13){venClock+=dt;if(venClock>1.3){venClock=0;venSeed()}}
    venPlats.forEach((g,i)=>{const u=g.userData,on=i===phaseSel;g.position.y=PHASES[i].p[1]+(on?.18:0)+Math.sin(T*1.1+i)*.04;u.ring.material.opacity=(on?1:.4)*vis.ven;u.base.material.emissiveIntensity+=((on?.45:.08)-u.base.material.emissiveIntensity)*e(.03);
      u.gw.material.opacity+=(((on?.8:.25))*vis.ven-u.gw.material.opacity)*e(.05);u.gw.scale.setScalar(on?3:2.2);
      const p=PHASES[i].p,[x,y,z]=proj(p[0],p[1]-.35,p[2]);phLbl[i].style.transform=`translate(${x}px,${y}px) translate(-50%,0)`;phLbl[i].style.visibility=z<1?'visible':'hidden'});
    {const[x,y]=proj(TREE_ROOT[0],TREE_ROOT[1]+4.9,TREE_ROOT[2]);treeLbl.style.transform=`translate(${x}px,${y}px) translate(-50%,-100%)`}
    venPool.forEach(sp=>{const q=sp.userData;if(!q.busy){sp.material.opacity=0;return}q.u+=dt/q.dur;const p=bez(q.a,q.b,q.h)(Math.min(1,q.u));sp.position.set(p[0],p[1],p[2]);sp.material.opacity=Math.min(1,Math.sin(Math.min(1,q.u)*Math.PI)*1.5)*vis.ven;if(q.u>=1){q.busy=false;if(q.end)q.end()}})}
  // budget sankey
  budGroup.visible=vis.bud>.01;
  if(budGroup.visible){budGroup.scale.setScalar(Math.max(.001,vis.bud));
    const lon=li=>!budSel?null:(budSel.k?(BUD.links[li].f===budSel.k||BUD.links[li].t===budSel.k):budSel.li===li);
    const rel=k=>!budSel||BUD.links.some((l,li)=>lon(li)&&(l.f===k||l.t===k))||budSel.k===k;
    BUD.links.forEach((l,li)=>{const on=lon(li),tg=on===null?.26:(on?.6:.05);l.mesh.material.opacity+=(tg*vis.bud-l.mesh.material.opacity)*e(.02)});
    Object.entries(BUD.nodes).forEach(([k,nd])=>{const r=rel(k);nd.mesh.material.emissiveIntensity+=((budSel&&budSel.k===k?.9:(r?.3:.06))-nd.mesh.material.emissiveIntensity)*e(.02);nd.mesh.material.opacity=(r?.92:.3)*vis.bud;
      const lx=nd.col===0?nd.x-.35:(nd.col===2?nd.x+.35:nd.x),ly=nd.col===1?nd.y+nd.h/2+.2:nd.y,[x,y]=proj(lx,ly,0);
      bLbl[k].style.transform=`translate(${x}px,${y}px) `+(nd.col===0?'translate(-100%,-50%)':(nd.col===2?'translate(0,-50%)':'translate(-50%,-100%)'));bLbl[k].classList.toggle('dim',!r)});
    budTrav.forEach(tr=>{const q=tr.userData,l=BUD.links[q.li],on=lon(q.li);q.t=(q.t+dt*.16)%1;const[x,top,bot]=ribbonAt(l,q.t);tr.position.set(x,bot+(top-bot)*q.lane,.06);tr.material.opacity=Math.sin(q.t*Math.PI)*(on===false?.1:.9)*vis.bud})}
  // ledger
  ledGroup.visible=vis.led>.01;
  if(ledGroup.visible){ledGroup.scale.setScalar(Math.max(.001,vis.led));
    if(ch===12){txClock+=dt;sealClock+=dt;if(txClock>1.1){txClock=0;randTx()}if(sealClock>5.5){sealClock=0;sealBlock()}}
    chainSlide+=(0-chainSlide)*e(.03);chainGroup.position.x=chainSlide;
    blocks.forEach((m,s)=>{const u=m.userData,pend=s===10,sl=s===blkSel;u.flash*=Math.pow(.1,dt);
      m.material.emissiveIntensity=(pend?.25+Math.sin(T*4)*.15:.15)+u.flash*1.2+(sl?.35:0);m.material.opacity=(pend?.35:.6)*vis.led;
      u.edge.material.opacity=(sl?1:(pend?.5+Math.sin(T*4)*.3:.7))*vis.led;u.edge.material.color.setHex(sl?0xFFF1CC:0xD8B46A);m.rotation.y=pend?T*.8:0});
    Object.entries(WAL).forEach(([k,w])=>{const u=w.g.userData;u.flash*=Math.pow(.15,dt);u.gw.material.opacity=(.3+u.flash*.7)*vis.led;u.gw.scale.setScalar(1.2+u.flash*1.2);u.ring.material.opacity=(.5+u.flash*.5)*vis.led;u.m.material.emissiveIntensity=.15+u.flash*.8;
      const[x,y,z]=proj(w.p[0],w.p[1]-.35,w.p[2]);wLbl[k].style.transform=`translate(${x}px,${y}px) translate(-50%,0)`;wLbl[k].style.visibility=z<1?'visible':'hidden'});
    const pp=SLOT(10),[px,py]=proj(pp[0]+chainSlide,pp[1]+.7,pp[2]);pendLbl.textContent='#'+fmt.format(LED.pending.num)+' · MENUNGGU';pendLbl.style.transform=`translate(${px}px,${py}px) translate(-50%,-100%)`;
    txPool.forEach(sp=>{const q=sp.userData;if(!q.busy){sp.material.opacity=0;return}
      if(q.ph===0){q.u+=dt/1.2;const p=bez(WAL[q.f].p,WAL[q.t].p,1)(Math.min(1,q.u));sp.position.set(p[0],p[1]+.2,p[2]);if(q.u>=1){WAL[q.t].g.userData.flash=1;if(q.t==='program')spreadBen();q.ph=1;q.u=0}}
      else{q.u+=dt/1;const b=SLOT(10),p=bez(WAL[q.t].p,[b[0]+chainSlide,b[1],b[2]],1.2)(Math.min(1,q.u));sp.position.set(p[0],p[1],p[2]);if(q.u>=1){blocks[10].userData.flash=1;q.busy=false;broadcast()}}
      sp.material.opacity=.95*vis.led;sp.scale.setScalar(q.ph===0?.55:.32)});
    pulsePool.forEach(sp=>{const q=sp.userData;if(!q.busy){sp.material.opacity=0;return}q.u+=dt/q.dur;const p=bez(q.a,q.b,q.h)(Math.min(1,q.u));sp.position.set(p[0],p[1],p[2]);sp.material.opacity=Math.min(1,Math.sin(Math.min(1,q.u)*Math.PI)*1.6)*vis.led;if(q.u>=1){q.busy=false;if(q.end)q.end()}});
    netNodes.forEach((g,i)=>{const u=g.userData;u.flash*=Math.pow(.2,dt);u.w.material.opacity=(.4+u.flash*.6)*vis.led;u.gw.material.opacity=(.2+u.flash*.8)*vis.led;u.gw.scale.setScalar(.8+u.flash*1.2);u.w.rotation.y+=dt*.6;
      const p=NETPOS(i),up=i%2===0,[x,y,z]=proj(p[0],p[1]+(up?.4:-.38),p[2]);netLbl[i].style.transform=`translate(${x}px,${y}px) translate(-50%,${up?'-100%':'0'})`;netLbl[i].classList.toggle('on',u.flash>.3)});
    benDots.forEach(m=>{const u=m.userData;u.flash*=Math.pow(.3,dt);m.material.opacity=(.3+u.flash*.7)*vis.led;m.scale.setScalar(1+u.flash*2)});
    {const[bx,by]=proj(7.2,-1.25,-2.9);benLbl.style.transform=`translate(${bx}px,${by}px) translate(-50%,0)`}
    const cw=confWave.userData;cw.t=Math.min(1,cw.t+dt*.55);const s9=SLOT(9);confWave.position.set(s9[0]+chainSlide,s9[1],s9[2]);confWave.scale.setScalar(.4+cw.t*7);confWave.material.opacity=(1-cw.t)*.7*vis.led}
  // advisors
  advGroup.visible=vis.adv>.01;
  if(advGroup.visible){advGroup.scale.setScalar(Math.max(.001,vis.adv));
    advNodes.forEach((g,i)=>{const u=g.userData,on=i===advSel,p=ADVPOS[i];g.position.y=p[1]+Math.sin(T*1.2+i)*.06;g.rotation.y+=dt*.6;
      const s=u.ring.scale.x+((on?1.6:1)-u.ring.scale.x)*e(.03);u.ring.scale.setScalar(s);u.ring.material.opacity=(on?1:.55)*vis.adv;u.glow.material.opacity=(on?.95:.35)*vis.adv;u.glow.scale.setScalar(on?2.2:1.2);
      u.line.material.opacity=(on?.6:.12)*vis.adv;const tr=u.tr;tr.userData.t=(tr.userData.t+dt*(on?.5:.2))%1;const t=tr.userData.t;tr.position.set(p[0]*(1-t),p[1]*(1-t),p[2]*(1-t));tr.material.opacity=Math.sin(t*Math.PI)*(on?1:.35)*vis.adv;
      const [x,y,z]=proj(p[0],p[1]+.45,p[2]);aLbl[i].style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;aLbl[i].style.visibility=z<1?'visible':'hidden'})}
  // business flow
  flowGroup.visible=vis.flow>.01;
  if(flowGroup.visible){flowGroup.scale.setScalar(Math.max(.001,vis.flow));
    if(stepPlay&&ch===8){stepClock+=dt;if(stepClock>4.6)setStep(stepSel+1)}
    const st=STEPS[stepSel];
    FKEYS.forEach(k=>{const g=fNodes[k],u=g.userData,on=st.n.includes(k);u.lift+=((on?.35:0)-u.lift)*e(.03);g.position.y=FN[k].p[1]+u.lift;
      u.ring.material.opacity=(on?1:.35)*vis.flow;u.ring.scale.setScalar(1+(on?Math.sin(T*3)*.05+.05:0));u.beam.material.opacity=(on?.28+Math.sin(T*2.5)*.06:0)*vis.flow;u.glow.material.opacity=(on?.9:.2)*vis.flow;u.base.material.emissiveIntensity+=((on?.35:.05)-u.base.material.emissiveIntensity)*e(.03);
      const [x,y,z]=proj(FN[k].p[0],FN[k].p[1]+u.lift-.55,FN[k].p[2]);fLbl[k].style.transform=`translate(${x}px,${y}px) translate(-50%,0)`;fLbl[k].style.visibility=z<1?'visible':'hidden'});
    portfolio.forEach((m,i)=>{const q=m.userData;q.a+=dt*.8;m.position.set(Math.cos(q.a)*q.r,.25+Math.sin(q.a*2)*.08,Math.sin(q.a)*q.r)});
    fTubes.forEach((tb,i)=>{const on=st.e.includes(i);tb.material.opacity+=(((on?.85:.14))*vis.flow-tb.material.opacity)*e(.03)});
    fTrav.forEach(tr=>{const q=tr.userData,on=st.e.includes(q.e);q.t=(q.t+dt*(on?.42:.12))%1;const p=FCURVE[q.e](q.t);tr.position.set(p[0],p[1],p[2]);tr.material.opacity=(on?.95:.22)*Math.sin(q.t*Math.PI)*vis.flow;tr.scale.setScalar(on?.6:.32)})}
  // news ring
  if(ch===2){ringIdle+=dt;const sway=reduce?0:Math.sin(T*.5)*2.5;ringRy+=(ringT-ringRy)*e(.004);ring.style.transform=`translateZ(calc(var(--R) * -1)) rotateX(-7deg) rotateY(${ringRy+sway}deg)`}
  // hover picking (throttled)
  if((hoverTick+=dt)>.06){hoverTick=0;if(!drag)pick(false)}
  gl.r.render(scene,camera);
  requestAnimationFrame(tick);
}
function p0(i,k){return NODEPOS[i][k]}
// rotate node positions with matchGroup? matchGroup is in stage, label uses stage-local coords (matchGroup has no own rotation)

/* ---------- BOOT ---------- */
setMode('jml');setYear(10);setNews(0,false);setAsset(0);renderAlloc();syncAmt();setLayer(0);setNodeLabels();
setMisi(0);renderTeam();setDiv(0);setStep(0);setPlay(stepPlay);setAdv(0);setBud(null);setPurpose('prog');renderLedger();setPhase(2);
if(document.fonts&&document.fonts.load){document.fonts.load('600 250px "Bodoni Moda"').then(buildText,buildText)}else buildText();
const startCh=Math.max(0,CH.indexOf(location.hash.slice(1)));
setCh(startCh,true);
if(gl){layout();requestAnimationFrame(t=>{last=t;tick(t)})}
else{
  // Fallback: still drive the news ring without WebGL
  (function loop(){ringRy+=(ringT-ringRy)*.12;ring.style.transform=`translateZ(calc(var(--R) * -1)) rotateX(-7deg) rotateY(${ringRy}deg)`;requestAnimationFrame(loop)})();
}
setTimeout(()=>$('#loader').classList.add('gone'),reduce?100:1100);
})();
