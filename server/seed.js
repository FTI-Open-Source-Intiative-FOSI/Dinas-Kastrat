const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockStudies = [
  {
    title: 'Kajian Politik Kampus: Dinamika Partisipasi Mahasiswa',
    excerpt: 'Analisis partisipasi dan peran mahasiswa dalam pengambilan keputusan kampus.',
    content: 'Isi detail kajian politik kampus...',
    author: 'Tim Kastrat',
    tags: JSON.stringify(['politik', 'kampus', 'partisipasi']),
    category: 'Politik',
    classification: 'Arsip Terbuka'
  },
  {
    title: 'Aksi Strategis untuk Isu Lingkungan Hidup',
    excerpt: 'Rencana aksi terstruktur terkait advokasi lingkungan di lingkungan kampus.',
    content: 'Isi detail tentang lingkungan...',
    author: 'Tim Kastrat',
    tags: JSON.stringify(['lingkungan', 'aksi']),
    category: 'Lingkungan',
    classification: 'Arsip Terbuka'
  },
  {
    title: 'Kajian Kebijakan Pendidikan Tinggi',
    excerpt: 'Telaah kebijakan dan rekomendasi untuk meningkatkan kualitas pembelajaran.',
    content: 'Isi detail kebijakan...',
    author: 'Tim Kastrat',
    tags: JSON.stringify(['kebijakan', 'pendidikan']),
    category: 'Pendidikan',
    classification: 'Arsip Terbuka'
  }
];

async function main() {
  for (const study of mockStudies) {
    await prisma.study.create({ data: study });
  }
  console.log('Seeded database with mock studies.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
