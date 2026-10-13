import { locale } from '@/stores/locale.js'

export const projects = [
  {
    slug: 'aqms',
    title: 'AQMS',
    text: 'Sistem pemantauan kualitas udara berbasis data sensor.',
    textEn: 'Sensor-based air quality monitoring system.',
    tags: [],
    image: '',
  },
  {
    slug: 'wqms',
    title: 'WQMS',
    text: 'Sistem pemantauan kualitas air berbasis data sensor.',
    textEn: 'Sensor-based water quality monitoring system.',
    tags: [],
    image: '',
  },
  {
    slug: 'report-data',
    title: 'Report Data',
    text: 'Pelaporan data untuk memantau nilai hasil pengukuran.',
    textEn: 'Data reporting to monitor measurement results.',
    tags: [],
    image: '',
  },
  {
    slug: 'pemantauan-ispu',
    title: 'Pemantauan ISPU',
    text: 'Grafik untuk memantau Indeks Standar Pencemar Udara (ISPU).',
    textEn: 'Charts for monitoring the Air Pollutant Standard Index (ISPU).',
    tags: [],
    image: '',
  },
  {
    slug: 'bot-discord',
    title: 'Bot Discord',
    text: 'Bot Discord untuk membantu otomatisasi aktivitas server.',
    textEn: 'Discord bot for automating server activities.',
    tags: [],
    image: '',
  },
  {
    slug: 'cqms',
    title: 'CQMS',
    text: 'Sistem pemantauan dan manajemen kualitas berbasis data.',
    textEn: 'Data-driven quality monitoring and management system.',
    tags: [],
    image: '',
  },
  {
    slug: 'frontend-oil-content',
    title: 'Frontend Oil Content',
    text: 'Tampilan frontend untuk memantau data oil content.',
    textEn: 'Frontend for monitoring oil content data.',
    tags: [],
    image: '',
  },
  {
    slug: 'cais-absen',
    title: 'CAIS Absen',
    text: 'Fitur absensi pada sistem CAIS.',
    textEn: 'Attendance feature in the CAIS system.',
    tags: [],
    image: '',
  },
  {
    slug: 'rtm',
    title: 'RTM',
    text: 'Sistem pemantauan RTM.',
    textEn: 'RTM monitoring system.',
    tags: [],
    image: '',
  },
  {
    slug: 'bot-hub',
    title: 'Bot Hub',
    text: 'Hub untuk mengelola dan memantau bot.',
    textEn: 'Hub for managing and monitoring bots.',
    tags: [],
    image: '',
  },
  {
    slug: 'status-alarm',
    title: 'Status Alarm',
    text: 'Tampilan status alarm untuk memantau kondisi peringatan.',
    textEn: 'Alarm status display for monitoring warning conditions.',
    tags: [],
    image: '',
  },
  {
    slug: 'statistik-sensor',
    title: 'Statistik Sensor',
    text: 'Statistik untuk melihat data sensor.',
    textEn: 'Statistics for viewing sensor data.',
    tags: [],
    image: '',
  },
]

// shortcut: image masih placeholder ('') sampai file asli ada di public/projects/
export const getProject = (slug) => projects.find((p) => p.slug === slug)

export const projText = (project) =>
  locale.value === 'en' && project.textEn ? project.textEn : project.text
