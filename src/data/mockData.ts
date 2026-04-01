// Mock data layer — replaces Supabase queries with static data
// This file will be replaced by real API calls when the backend is connected

import { ContentBlock, PageSection } from "@/hooks/usePageContent";

// ──────────── PAGE SECTIONS & CONTENT BLOCKS ────────────

const mockSections: PageSection[] = [
  // ── HOME ──
  {
    id: "home-hero", page: "home", section_key: "hero",
    title_fr: "Solutions Numériques Innovantes pour Votre Entreprise",
    title_en: "Innovative Digital Solutions for Your Business",
    subtitle_fr: "Nous concevons et développons des solutions technologiques sur mesure pour propulser votre croissance.",
    subtitle_en: "We design and develop custom technology solutions to drive your growth.",
    sort_order: 0, is_visible: true, bg_variant: "hero",
    blocks: [
      { id: "home-hero-badge", section_id: "home-hero", block_type: "text", content_fr: "Leader en Innovation", content_en: "Innovation Leader", media_url: null, metadata: { variant: "badge" }, sort_order: 0, is_visible: true },
      { id: "home-hero-cta1", section_id: "home-hero", block_type: "cta", content_fr: "Découvrir Nos Services", content_en: "Discover Our Services", media_url: null, metadata: { link: "/services", variant: "primary" }, sort_order: 1, is_visible: true },
      { id: "home-hero-cta2", section_id: "home-hero", block_type: "cta", content_fr: "Nous Contacter", content_en: "Contact Us", media_url: null, metadata: { link: "/contact", variant: "outline" }, sort_order: 2, is_visible: true },
    ],
  },
  {
    id: "home-about", page: "home", section_key: "about",
    title_fr: "Qui Sommes-Nous", title_en: "Who We Are",
    subtitle_fr: null, subtitle_en: null,
    sort_order: 1, is_visible: true, bg_variant: "default",
    blocks: [
      { id: "home-about-text", section_id: "home-about", block_type: "text", content_fr: "Depuis plus de 10 ans, nous accompagnons les entreprises dans leur transformation numérique avec des solutions innovantes et personnalisées.", content_en: "For over 10 years, we have been supporting businesses in their digital transformation with innovative and customized solutions.", media_url: null, metadata: {}, sort_order: 0, is_visible: true },
      { id: "home-about-features", section_id: "home-about", block_type: "feature_list", content_fr: null, content_en: null, media_url: null, metadata: { items_fr: ["Expertise technique avancée", "Solutions sur mesure", "Support 24/7", "Méthodologie agile"], items_en: ["Advanced technical expertise", "Custom solutions", "24/7 Support", "Agile methodology"] }, sort_order: 1, is_visible: true },
      { id: "home-about-stat1", section_id: "home-about", block_type: "stat", content_fr: "150+", content_en: "150+", media_url: null, metadata: { label_fr: "Projets Réalisés", label_en: "Completed Projects", icon: "Briefcase" }, sort_order: 2, is_visible: true },
      { id: "home-about-stat2", section_id: "home-about", block_type: "stat", content_fr: "50+", content_en: "50+", media_url: null, metadata: { label_fr: "Clients Satisfaits", label_en: "Happy Clients", icon: "Users" }, sort_order: 3, is_visible: true },
      { id: "home-about-stat3", section_id: "home-about", block_type: "stat", content_fr: "10+", content_en: "10+", media_url: null, metadata: { label_fr: "Années d'Expérience", label_en: "Years of Experience", icon: "Award" }, sort_order: 4, is_visible: true },
      { id: "home-about-stat4", section_id: "home-about", block_type: "stat", content_fr: "99%", content_en: "99%", media_url: null, metadata: { label_fr: "Satisfaction Client", label_en: "Client Satisfaction", icon: "Star" }, sort_order: 5, is_visible: true },
    ],
  },
  {
    id: "home-services", page: "home", section_key: "services_preview",
    title_fr: "Nos Services", title_en: "Our Services",
    subtitle_fr: "Des solutions complètes pour tous vos besoins numériques", subtitle_en: "Complete solutions for all your digital needs",
    sort_order: 2, is_visible: true, bg_variant: "accent",
    blocks: [],
  },
  {
    id: "home-testimonials", page: "home", section_key: "testimonials",
    title_fr: "Ce Que Disent Nos Clients", title_en: "What Our Clients Say",
    subtitle_fr: null, subtitle_en: null,
    sort_order: 3, is_visible: true, bg_variant: "default",
    blocks: [
      { id: "home-test1", section_id: "home-testimonials", block_type: "testimonial", content_fr: "TechCorp a transformé notre présence en ligne. Leur équipe est professionnelle et réactive.", content_en: "TechCorp transformed our online presence. Their team is professional and responsive.", media_url: null, metadata: { name: "Marie Dupont", role_fr: "Directrice Marketing, Acme SA", role_en: "Marketing Director, Acme SA" }, sort_order: 0, is_visible: true },
      { id: "home-test2", section_id: "home-testimonials", block_type: "testimonial", content_fr: "Un partenaire de confiance pour notre transformation digitale. Résultats au-delà de nos attentes.", content_en: "A trusted partner for our digital transformation. Results beyond our expectations.", media_url: null, metadata: { name: "Jean Martin", role_fr: "PDG, Startup Innovation", role_en: "CEO, Startup Innovation" }, sort_order: 1, is_visible: true },
      { id: "home-test3", section_id: "home-testimonials", block_type: "testimonial", content_fr: "Excellente qualité de développement et un suivi impeccable du projet.", content_en: "Excellent development quality and impeccable project follow-up.", media_url: null, metadata: { name: "Sophie Bernard", role_fr: "CTO, Digital Corp", role_en: "CTO, Digital Corp" }, sort_order: 2, is_visible: true },
    ],
  },
  {
    id: "home-cta", page: "home", section_key: "cta",
    title_fr: "Prêt à Démarrer Votre Projet ?", title_en: "Ready to Start Your Project?",
    subtitle_fr: "Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.", subtitle_en: "Contact us to discuss your needs and get a personalized quote.",
    sort_order: 4, is_visible: true, bg_variant: "hero",
    blocks: [],
  },

  // ── PRESENTATION ──
  {
    id: "pres-hero", page: "presentation", section_key: "hero",
    title_fr: "Notre Histoire & Notre Vision", title_en: "Our Story & Vision",
    subtitle_fr: "Découvrez l'équipe passionnée derrière vos solutions numériques.", subtitle_en: "Discover the passionate team behind your digital solutions.",
    sort_order: 0, is_visible: true, bg_variant: "hero",
    blocks: [],
  },
  {
    id: "pres-mission", page: "presentation", section_key: "mission",
    title_fr: "Notre Mission", title_en: "Our Mission",
    subtitle_fr: null, subtitle_en: null,
    sort_order: 1, is_visible: true, bg_variant: "default",
    blocks: [
      { id: "pres-mission-text", section_id: "pres-mission", block_type: "text", content_fr: "Fournir des solutions technologiques innovantes qui permettent aux entreprises de se transformer et de prospérer dans l'ère numérique.", content_en: "Provide innovative technology solutions that enable businesses to transform and thrive in the digital era.", media_url: null, metadata: {}, sort_order: 0, is_visible: true },
    ],
  },
  {
    id: "pres-vision", page: "presentation", section_key: "vision",
    title_fr: "Notre Vision", title_en: "Our Vision",
    subtitle_fr: null, subtitle_en: null,
    sort_order: 2, is_visible: true, bg_variant: "default",
    blocks: [
      { id: "pres-vision-text", section_id: "pres-vision", block_type: "text", content_fr: "Devenir le partenaire technologique de référence en Afrique, reconnu pour notre excellence et notre innovation.", content_en: "Become the reference technology partner in Africa, recognized for our excellence and innovation.", media_url: null, metadata: {}, sort_order: 0, is_visible: true },
    ],
  },
  {
    id: "pres-values", page: "presentation", section_key: "values",
    title_fr: "Nos Valeurs", title_en: "Our Values",
    subtitle_fr: null, subtitle_en: null,
    sort_order: 3, is_visible: true, bg_variant: "accent",
    blocks: [
      { id: "pres-val1", section_id: "pres-values", block_type: "card", content_fr: "Nous repoussons les limites pour créer des solutions uniques.", content_en: "We push boundaries to create unique solutions.", media_url: null, metadata: { title_fr: "Innovation", title_en: "Innovation", icon: "Zap" }, sort_order: 0, is_visible: true },
      { id: "pres-val2", section_id: "pres-values", block_type: "card", content_fr: "La qualité est au cœur de chaque ligne de code.", content_en: "Quality is at the heart of every line of code.", media_url: null, metadata: { title_fr: "Excellence", title_en: "Excellence", icon: "Star" }, sort_order: 1, is_visible: true },
      { id: "pres-val3", section_id: "pres-values", block_type: "card", content_fr: "Nous travaillons main dans la main avec nos clients.", content_en: "We work hand in hand with our clients.", media_url: null, metadata: { title_fr: "Collaboration", title_en: "Collaboration", icon: "Users" }, sort_order: 2, is_visible: true },
      { id: "pres-val4", section_id: "pres-values", block_type: "card", content_fr: "Transparence et honnêteté dans chaque interaction.", content_en: "Transparency and honesty in every interaction.", media_url: null, metadata: { title_fr: "Intégrité", title_en: "Integrity", icon: "Shield" }, sort_order: 3, is_visible: true },
    ],
  },
  {
    id: "pres-team", page: "presentation", section_key: "team",
    title_fr: "Notre Équipe", title_en: "Our Team",
    subtitle_fr: null, subtitle_en: null,
    sort_order: 4, is_visible: true, bg_variant: "default",
    blocks: [
      { id: "pres-team1", section_id: "pres-team", block_type: "team_member", content_fr: null, content_en: null, media_url: null, metadata: { name: "Alexandre Dupont", initials: "AD", role_fr: "Directeur Général", role_en: "CEO" }, sort_order: 0, is_visible: true },
      { id: "pres-team2", section_id: "pres-team", block_type: "team_member", content_fr: null, content_en: null, media_url: null, metadata: { name: "Claire Martin", initials: "CM", role_fr: "Directrice Technique", role_en: "CTO" }, sort_order: 1, is_visible: true },
      { id: "pres-team3", section_id: "pres-team", block_type: "team_member", content_fr: null, content_en: null, media_url: null, metadata: { name: "Thomas Bernard", initials: "TB", role_fr: "Lead Developer", role_en: "Lead Developer" }, sort_order: 2, is_visible: true },
      { id: "pres-team4", section_id: "pres-team", block_type: "team_member", content_fr: null, content_en: null, media_url: null, metadata: { name: "Fatou Diallo", initials: "FD", role_fr: "Designer UX/UI", role_en: "UX/UI Designer" }, sort_order: 3, is_visible: true },
    ],
  },

  // ── SOLUTIONS ──
  {
    id: "sol-hero", page: "solutions", section_key: "hero",
    title_fr: "Solutions Sur Mesure", title_en: "Custom Solutions",
    subtitle_fr: "Des solutions adaptées à chaque secteur d'activité.", subtitle_en: "Solutions tailored to every industry.",
    sort_order: 0, is_visible: true, bg_variant: "hero",
    blocks: [],
  },
  {
    id: "sol-grid", page: "solutions", section_key: "grid",
    title_fr: null, title_en: null, subtitle_fr: null, subtitle_en: null,
    sort_order: 1, is_visible: true, bg_variant: "default",
    blocks: [
      { id: "sol-card1", section_id: "sol-grid", block_type: "card", content_fr: "Plateforme e-commerce complète avec gestion des stocks et paiements.", content_en: "Complete e-commerce platform with inventory and payment management.", media_url: null, metadata: { title_fr: "E-Commerce", title_en: "E-Commerce", icon: "Globe", tag_fr: "Commerce", tag_en: "Commerce" }, sort_order: 0, is_visible: true },
      { id: "sol-card2", section_id: "sol-grid", block_type: "card", content_fr: "Solutions ERP pour optimiser vos processus métier.", content_en: "ERP solutions to optimize your business processes.", media_url: null, metadata: { title_fr: "ERP", title_en: "ERP", icon: "Layers", tag_fr: "Gestion", tag_en: "Management" }, sort_order: 1, is_visible: true },
      { id: "sol-card3", section_id: "sol-grid", block_type: "card", content_fr: "Applications mobiles natives et cross-platform performantes.", content_en: "High-performance native and cross-platform mobile apps.", media_url: null, metadata: { title_fr: "Applications Mobiles", title_en: "Mobile Apps", icon: "Smartphone", tag_fr: "Mobile", tag_en: "Mobile" }, sort_order: 2, is_visible: true },
    ],
  },
  {
    id: "sol-cta", page: "solutions", section_key: "cta",
    title_fr: "Une Idée de Projet ?", title_en: "Have a Project Idea?",
    subtitle_fr: "Discutons ensemble de votre vision.", subtitle_en: "Let's discuss your vision together.",
    sort_order: 2, is_visible: true, bg_variant: "hero",
    blocks: [],
  },

  // ── CONTACT ──
  {
    id: "contact-hero", page: "contact", section_key: "hero",
    title_fr: "Contactez-Nous", title_en: "Contact Us",
    subtitle_fr: "Nous sommes à votre écoute pour toute question ou demande.", subtitle_en: "We are here to answer any question or request.",
    sort_order: 0, is_visible: true, bg_variant: "hero",
    blocks: [],
  },
  {
    id: "contact-info", page: "contact", section_key: "info",
    title_fr: null, title_en: null, subtitle_fr: null, subtitle_en: null,
    sort_order: 1, is_visible: true, bg_variant: "default",
    blocks: [
      { id: "contact-phone", section_id: "contact-info", block_type: "contact_info", content_fr: "+33 1 23 45 67 89", content_en: "+33 1 23 45 67 89", media_url: null, metadata: { label_fr: "Téléphone", label_en: "Phone", icon: "Phone" }, sort_order: 0, is_visible: true },
      { id: "contact-email", section_id: "contact-info", block_type: "contact_info", content_fr: "contact@techcorp.com", content_en: "contact@techcorp.com", media_url: null, metadata: { label_fr: "Email", label_en: "Email", icon: "Mail" }, sort_order: 1, is_visible: true },
      { id: "contact-address", section_id: "contact-info", block_type: "contact_info", content_fr: "123 Boulevard de l'Innovation, 75001 Paris", content_en: "123 Innovation Boulevard, 75001 Paris", media_url: null, metadata: { label_fr: "Adresse", label_en: "Address", icon: "MapPin" }, sort_order: 2, is_visible: true },
    ],
  },
];

export const getPageSections = (page: string): PageSection[] => {
  return mockSections
    .filter(s => s.page === page && s.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);
};

// ──────────── SERVICES ────────────

export interface MockService {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  features: string[] | null;
  sort_order: number | null;
  is_active: boolean | null;
}

export const mockServices: MockService[] = [
  { id: "svc-1", title: "Développement Web", description: "Sites web modernes et applications web performantes avec les dernières technologies.", icon: "Globe", category: "web-app", features: ["React / Vue.js", "Node.js / Express", "Sites responsifs", "SEO optimisé"], sort_order: 1, is_active: true },
  { id: "svc-2", title: "Applications Mobiles", description: "Applications natives et cross-platform pour iOS et Android.", icon: "Smartphone", category: "mobile-app", features: ["React Native", "Flutter", "iOS / Android natif", "Publication sur stores"], sort_order: 2, is_active: true },
  { id: "svc-3", title: "Infogérance IT", description: "Gestion et maintenance complète de votre infrastructure informatique.", icon: "Server", category: "it-management", features: ["Monitoring 24/7", "Maintenance préventive", "Support technique", "Sauvegardes automatiques"], sort_order: 3, is_active: true },
  { id: "svc-4", title: "Cybersécurité", description: "Protection de vos données et systèmes contre les menaces numériques.", icon: "Shield", category: "other", features: ["Audit de sécurité", "Protection des données", "Conformité RGPD", "Formation sécurité"], sort_order: 4, is_active: true },
];

// ──────────── CONTACT MESSAGES ────────────

export interface MockMessage {
  id: string;
  company: string | null;
  name: string;
  position: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  subject: string | null;
  message: string;
  is_read: boolean | null;
  created_at: string;
}

export const mockMessages: MockMessage[] = [
  { id: "msg-1", company: "Acme SA", name: "Marie Dupont", position: "Directrice Marketing", email: "marie@acme.com", phone: "+33 6 12 34 56 78", address: null, subject: "Demande de devis site web", message: "Bonjour, nous souhaitons refaire notre site web corporate. Pourriez-vous nous proposer un devis ?", is_read: true, created_at: "2026-03-28T10:30:00Z" },
  { id: "msg-2", company: null, name: "Jean Martin", position: null, email: "jean.martin@email.com", phone: null, address: null, subject: "Question sur vos services", message: "Bonjour, je souhaiterais en savoir plus sur vos services de développement mobile.", is_read: false, created_at: "2026-03-30T14:15:00Z" },
];

// ──────────── SITE CONTENT (legacy) ────────────

export interface MockSiteContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_type: string;
  sort_order: number | null;
}

export const mockSiteContent: MockSiteContent[] = [
  { id: "sc-1", page: "home", section: "hero", content_key: "title", content_value: "Solutions Numériques Innovantes", content_type: "text", sort_order: 0 },
  { id: "sc-2", page: "home", section: "hero", content_key: "subtitle", content_value: "Nous concevons des solutions sur mesure", content_type: "text", sort_order: 1 },
];

// ──────────── MOCK AUTH USER ────────────

export interface MockUser {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  username: string;
  telephone: string | null;
  role: string;
  photo_profil: string | null;
}

export const mockAdminUser: MockUser = {
  id: "admin-001",
  nom: "Admin",
  prenom: "TechCorp",
  email: "admin@techcorp.com",
  username: "admin",
  telephone: null,
  role: "ADMIN",
  photo_profil: null,
};
