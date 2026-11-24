import HeroImage from "/assets/hero-img.webp";

const Image = {
  HeroImage,
};

export default Image;

import Tools1 from "/assets/tools/vscode.png";
import Tools2 from "/assets/tools/reactjs.png";
// import Tools3 from "/assets/tools/nextjs.png";
import Tools4 from "/assets/tools/tailwind.png";
import Tools5 from "/assets/tools/bootstrap.png";
import Tools6 from "/assets/tools/js.png";
import Tools7 from "/assets/tools/nodejs.png";
import Tools8 from "/assets/tools/github.png";
// import Tools9 from "/assets/tools/ai.png";
import Tools10 from "/assets/tools/canva.png";
import Tools11 from "/assets/tools/figma.png";
// import Tools12 from "/assets/tools/kotlin.png";
import Tools13 from "/assets/tools/firebase.png";
import Tools14 from "/assets/tools/html.png";
import Tools15 from "/assets/tools/css.png";
import Tools16 from "/assets/tools/ts.png";
import Tools17 from "/assets/tools/php.png";
import Tools18 from "/assets/tools/vite.png";
import Tools19 from "/assets/tools/mysql.png";


export const listTools = [
  {
    id: 1,
    gambar: Tools1,
    nama: "Visual Studio Code",
    ket: "Code Editor",
    dad: "100",
  },
  {
    id: 2,
    gambar: Tools2,
    nama: "React JS",
    ket: "Framework",
    dad: "200",
  },
  // {
  //   id: 3,
  //   gambar: Tools3,
  //   nama: "Next JS",
  //   ket: "Framework",
  //   dad: "300",
  // },
  {
    id: 4,
    gambar: Tools4,
    nama: "Tailwind CSS",
    ket: "Framework",
    dad: "400",
  },
  {
    id: 5,
    gambar: Tools5,
    nama: "Bootstrap",
    ket: "Framework",
    dad: "500",
  },
  {
    id: 6,
    gambar: Tools6,
    nama: "Javascript",
    ket: "Language",
    dad: "600",
  },
  {
    id: 7,
    gambar: Tools7,
    nama: "Node JS",
    ket: "Javascript Runtime",
    dad: "700",
  },
  {
    id: 8,
    gambar: Tools8,
    nama: "Github",
    ket: "Repository",
    dad: "800",
  },
  // {
  //   id: 9,
  //   gambar: Tools9,
  //   nama: "Adobe Illustrator",
  //   ket: "Design App",
  //   dad: "900",
  // },
  {
    id: 10,
    gambar: Tools10,
    nama: "Canva",
    ket: "Design App",
    dad: "1000",
  },
  {
    id: 11,
    gambar: Tools11,
    nama: "Figma",
    ket: "Design App",
    dad: "1100",
  },
  // {
  //   id: 12,
  //   gambar: Tools12,
  //   nama: "Kotlin",
  //   ket: "Language",
  //   dad: "1200",
  // },
  {
    id: 13,
    gambar: Tools13,
    nama: "Firebase",
    ket: "Framework",
    dad: "1300",
  },
  {
    id: 14,
    gambar: Tools14,
    nama: "HTML",
    ket: "Language",
    dad: "1400",
  },
  {
    id: 15,
    gambar: Tools15,
    nama: "CSS",
    ket: "Language",
    dad: "1500",
  },
  {
    id: 16,
    gambar: Tools16,
    nama: "TypeScript",
    ket: "Language",
    dad: "1600",
  },
  {
    id: 17,
    gambar: Tools17,
    nama: "PHP",
    ket: "Language",
    dad: "1700",
  },
  {
    id: 18,
    gambar: Tools18,
    nama: "Vite",
    ket: "Framework",
    dad: "1800",
  },
  {
    id: 19,
    gambar: Tools19,
    nama: "MySql",
    ket: "Framework",
    dad: "1900",
  },
];

import Proyek1 from "/assets/proyek/proyek1.png";
import Proyek2 from "/assets/proyek/proyek2.png";
import Proyek3 from "/assets/proyek/proyek3.png";
import Proyek4 from "/assets/proyek/proyek4.png";

export const listProyek = [
  {
    id: 1,
    image: Proyek1,
    title: "Sistem Informasi BUMDes",
    subtitle: "Sistem web BUMDes yang dikembangkan sebagai proyek skripsi.",
    fullDescription: "Proyek skripsi berupa sistem informasi berbasis web untuk mendukung kebutuhan digital BUMDes. Sistem ini dirancang dengan memperhatikan alur dan kebutuhan pengelolaan BUMDes, sekaligus menjadi penerapan kemampuan saya dalam menganalisis kebutuhan dan membangun aplikasi web.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Adisaputra555",
    dad: "100",
  },
  {
    id: 2,
    image: Proyek2,
    title: "Sistem Informasi Apotek",
    subtitle: "Proyek sistem web apotek yang saat ini masih dalam pengembangan.",
    fullDescription: "Sistem berbasis web yang sedang saya kembangkan untuk mendukung kebutuhan operasional apotek. Pengembangan proyek ini berfokus pada penyusunan alur dan fitur sesuai kebutuhan apotek, dengan tujuan menghadirkan sistem yang mudah digunakan dan membantu pengelolaan aktivitas sehari-hari.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Adisaputra555",
    dad: "200",
  },
  {
    id: 3,
    image: Proyek3,
    title: "Website Portfolio Pribadi",
    subtitle: "Website untuk menampilkan profil, proyek, dan karya kreatif saya.",
    fullDescription: "Website portfolio pribadi yang saya buat sebagai tempat untuk memperkenalkan diri dan menampilkan proyek web, karya editing foto dan video, serta pencapaian saya. Tampilannya dirancang responsif agar nyaman diakses melalui berbagai perangkat, dengan navigasi yang membantu pengunjung menjelajahi setiap bagian dan menghubungi saya.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Adisaputra555",
    dad: "300",
  },
  {
    id: 4,
    image: Proyek4,
    title: "Automasi Data BPJS & CKG",
    subtitle: "Otomasi pengumpulan dan rekapitulasi data BPJS serta CKG menggunakan UI.Vision RPA untuk pekerjaan freelance.",
    fullDescription: "Workflow freelance untuk mengotomatisasi pengumpulan dan rekapitulasi data layanan BPJS dan Cek Kesehatan Gratis (CKG) menggunakan skrip JSON pada ekstensi UI.Vision RPA di Chrome. Otomasi ini membantu membuat alur pengambilan data lebih terstruktur dan berulang. Penggunaan dilakukan sesuai izin dan kebijakan akses dari sumber data.",
    borderColor: "#10B981",
    gradient: "linear-gradient(145deg, #10B981, #12251F)",
    dad: "400",
  },
];

export const listEditing = [
  {
    id: 1,
    image: "/assets/BGZ_9183.jpg",
    title: "Graduation Portrait",
    subtitle: "A refined portrait edit capturing a graduate’s proud milestone.",
    fullDescription: "This photo edit features a graduate at an important milestone. I focused on refining the portrait while keeping the person and the significance of the occasion at the center.",
    thumbnailPosition: "center 42%",
    borderColor: "#A855F7",
    gradient: "linear-gradient(145deg, #A855F7, #171526)",
    media: [
      {
        type: "image",
        src: "/assets/BGZ_9183.jpg",
        thumbnail: "/assets/Thumbnail_BGZ_9183.jpg",
        alt: "Edited portrait of a graduate",
      },
    ],
  },
  {
    id: 2,
    image: "/assets/IMG_20260921_145329_727.jpg",
    title: "Nature in a New Light",
    subtitle: "A nature-inspired photo edit with a calm, atmospheric finish.",
    fullDescription: "A nature-themed photo edit shaped around the atmosphere of the scene. The color and tone are adjusted to bring out its calm, natural mood.",
    thumbnailPosition: "center 72%",
    borderColor: "#34D399",
    gradient: "linear-gradient(145deg, #34D399, #12251F)",
    media: [
      {
        type: "image",
        src: "/assets/IMG_20260921_145329_727.jpg",
        thumbnail: "/assets/Thumbnail_IMG_20260921_145329_727.jpg",
        alt: "Nature photo with a calm, atmospheric edit",
      },
    ],
  },
  {
    id: 3,
    title: "22 Januari — Film Group Identity",
    subtitle: "A film edit made in vocational school to represent our filmmaking group.",
    fullDescription: "Edited during a film project in vocational high school, this video was created as the identity piece for our filmmaking group. The edit gives the group a shared visual presence as we worked on the film.",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(145deg, #8B5CF6, #171526)",
    media: [
      {
        type: "video",
        src: "/assets/_22_Januari_.mp4",
        thumbnail: "/assets/Thumbnail_Screenshot 2026-11-23 173104.png",
        alt: "Film group identity video edited during vocational school",
      },
    ],
  },
  {
    id: 4,
    title: "Life After Breakup",
    subtitle: "A somber video about life after a relationship comes to an end.",
    fullDescription: "A melancholic video edit portraying the quiet emotional aftermath of a relationship ending. I shaped the mood to express the feeling of life after a breakup.",
    borderColor: "#F472B6",
    gradient: "linear-gradient(145deg, #F472B6, #271724)",
    media: [
      {
        type: "video",
        src: "/assets/1002(1).mp4",
        thumbnail: "/assets/Thumbnail_Screenshot 2026-11-23 172953.png",
        alt: "A melancholic edit about life after a breakup",
      },
    ],
  },
];

export const listAchievements = [
  {
    id: 1,
    title: "Seminar UIUX",
    image: "/assets/Seminar UIUX.jpg",
  },
  {
    id: 2,
    title: "Serkom Program Analyst",
    image: "/assets/Serkom Program Analyst.jpg",
  },
  {
    id: 3,
    title: "Sertifikasi Aplikasi Perkantoran",
    image: "/assets/SERTIFIKASI APLIKASI PERKANTORAN.jpg",
  },
  {
    id: 4,
    title: "Sertifikat TOEFL",
    image: "/assets/Sertifikat Toefl.jpg",
  },
  {
    id: 5,
    title: "Piagam LKS",
    image: "/assets/PIAGAM LKS.jpg",
  },
];
