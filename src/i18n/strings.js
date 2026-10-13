import { computed } from 'vue'
import { locale } from '@/stores/locale.js'

const dict = {
  id: {
    headline: ['Halo,', 'saya', 'Haikal.'],
    heroAria: 'Halo, saya Haikal.',
    intro:
      'Saya full-stack developer di sekitar Bandung, paling suka merancang frontend dan UI. Saya membangun aplikasi web dan mobile, dari antarmuka sampai layanan backend.',
    projectsTitle: 'Proyek',
    techTitle: 'Teknologi yang saya pakai',
    skipAnimation: 'Lewati animasi',
    seeAll: 'Lihat semua proyek →',
    back: '← Kembali',
    pickTitle: 'Pilih Proyek',
    pickHint: 'Klik kartu, atau pakai tombol panah + Enter.',
    notFound: 'Project tidak ditemukan.',
    backHome: 'Kembali ke beranda',
    contact: 'Hubungi saya',
    copyIdle: 'Salin email',
    copyDone: 'Tersalin',
    copyFail: 'Gagal, salin manual',
    sendEmail: 'Kirim email',
    openEmailApp: 'Buka aplikasi email',
    waHint: 'Kirim pesan langsung',
    emailCopied: 'Email tersalin',
    waMessage: 'Halo Haikal, saya melihat portofoliomu dan ingin berdiskusi.',
  },
  en: {
    headline: ['Hello,', "I'm", 'Haikal.'],
    heroAria: "Hello, I'm Haikal.",
    intro:
      "I'm a full-stack developer around Bandung, most passionate about crafting frontend and UI. I build web and mobile apps, from interface to backend services.",
    projectsTitle: 'Projects',
    techTitle: 'Technologies I use',
    skipAnimation: 'Skip animation',
    seeAll: 'See all projects →',
    back: '← Back',
    pickTitle: 'Choose a Project',
    pickHint: 'Click a card, or use arrow keys + Enter.',
    notFound: 'Project not found.',
    backHome: 'Back to home',
    contact: 'Contact me',
    copyIdle: 'Copy email',
    copyDone: 'Copied',
    copyFail: 'Failed, copy manually',
    sendEmail: 'Send email',
    openEmailApp: 'Open email app',
    waHint: 'Chat directly',
    emailCopied: 'Email copied',
    waMessage: 'Hi Haikal, I saw your portfolio and would like to discuss.',
  },
}

export const strings = computed(() => dict[locale.value] ?? dict.id)
