const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockComplaints = [
  {
    type: 'Umum',
    headline: 'Fasilitas Kamar Mandi Gedung FTI Rusak',
    excerpt: 'Terdapat 3 keran air yang mati di kamar mandi lantai 2 dan belum diperbaiki sejak bulan lalu.',
    category: 'Fasilitas',
    classification: 'Biasa',
    status: 'Diproses'
  },
  {
    type: 'Umum',
    headline: 'Jadwal Kuliah Bentrok untuk Angkatan 2024',
    excerpt: 'Banyak mahasiswa angkatan 2024 yang mengalami bentrok jadwal antara kelas Algoritma dan Basis Data.',
    category: 'Akademik',
    classification: 'Penting',
    status: 'Selesai'
  },
  {
    type: 'Perempuan',
    headline: 'Pelecehan Verbal di Kantin Fakultas',
    excerpt: 'Terdapat laporan pelecehan verbal secara berulang (catcalling) oleh oknum tertentu di sekitar area kantin.',
    category: 'Kemahasiswaan',
    classification: 'Kritis',
    status: 'Terkirim'
  },
  {
    type: 'Umum',
    headline: 'Proyektor Ruang 304 Redup',
    excerpt: 'Proyektor di ruang 304 sangat redup sehingga materi dosen tidak terbaca dari barisan belakang.',
    category: 'Fasilitas',
    classification: 'Biasa',
    status: 'Terkirim'
  }
];

async function main() {
  for (const complaint of mockComplaints) {
    await prisma.complaint.create({ data: complaint });
  }
  console.log('Seeded database with mock complaints.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
