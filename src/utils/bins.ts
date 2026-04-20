export type BankTheme = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  bins: string[];
  logoType: 'text' | 'icon';
};

export const NIGERIAN_BANKS: BankTheme[] = [
  // --- TIER 1 (FUGAZ) ---
  {
    id: 'firstbank',
    name: 'First Bank',
    primaryColor: '#003B5C', // Deep Blue
    secondaryColor: '#FFB81C', // Gold
    textColor: '#FFFFFF',
    bins: ['506100', '402237'],
    logoType: 'text',
  },
  {
    id: 'uba',
    name: 'UBA',
    primaryColor: '#D32F2F', // Red
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    bins: ['506104', '519911'],
    logoType: 'text',
  },
  {
    id: 'gtb',
    name: 'GTBank',
    primaryColor: '#E45D25', // Orange
    secondaryColor: '#333333',
    textColor: '#FFFFFF',
    bins: ['506109', '537010'],
    logoType: 'text',
  },
  {
    id: 'access',
    name: 'Access Bank',
    primaryColor: '#004A99', // Blue
    secondaryColor: '#FF6600',
    textColor: '#FFFFFF',
    bins: ['506101', '405383'],
    logoType: 'text',
  },
  {
    id: 'zenith',
    name: 'Zenith',
    primaryColor: '#E11B22', // Red
    secondaryColor: '#000000',
    textColor: '#FFFFFF',
    bins: ['506114', '405368'],
    logoType: 'text',
  },

  // --- DIGITAL / NEOBANKS ---
  {
    id: 'kuda',
    name: 'Kuda',
    primaryColor: '#40196D', // Dark Purple
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    bins: ['506146', '507851'],
    logoType: 'text',
  },
  {
    id: 'opay',
    name: 'OPay',
    primaryColor: '#00B894', // Mint Green
    secondaryColor: '#1A1A1A',
    textColor: '#FFFFFF',
    bins: ['506164', '650004'],
    logoType: 'text',
  },
  {
    id: 'palmpay',
    name: 'PalmPay',
    primaryColor: '#6236FF', // Indigo
    secondaryColor: '#FFD700',
    textColor: '#FFFFFF',
    bins: ['506188', '606010'],
    logoType: 'text',
  },
  {
    id: 'moniepoint',
    name: 'Moniepoint',
    primaryColor: '#003399', // Royal Blue
    secondaryColor: '#00D1FF',
    textColor: '#FFFFFF',
    bins: ['506199', '507802'],
    logoType: 'text',
  },

  // --- COMMERCIAL ---
  {
    id: 'stanbic',
    name: 'Stanbic IBTC',
    primaryColor: '#0033A0', // Blue
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    bins: ['506111', '523982'],
    logoType: 'text',
  },
  {
    id: 'fcmb',
    name: 'FCMB',
    primaryColor: '#5E2363', // Purple
    secondaryColor: '#F7E018',
    textColor: '#FFFFFF',
    bins: ['506110', '521251'],
    logoType: 'text',
  },
  {
    id: 'wema',
    name: 'Wema / Alat',
    primaryColor: '#9D2235', // Deep Red
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    bins: ['506105', '507822'],
    logoType: 'text',
  },
  {
    id: 'fidelity',
    name: 'Fidelity',
    primaryColor: '#002E6D', // Navy Blue
    secondaryColor: '#6FCF97',
    textColor: '#FFFFFF',
    bins: ['506115', '405372'],
    logoType: 'text',
  },
  {
    id: 'union',
    name: 'Union Bank',
    primaryColor: '#00A1E1', // Sky Blue
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    bins: ['506103', '527513'],
    logoType: 'text',
  },
  {
    id: 'ecobank',
    name: 'Ecobank',
    primaryColor: '#005A96', // Mid Blue
    secondaryColor: '#00A499',
    textColor: '#FFFFFF',
    bins: ['506108', '521090'],
    logoType: 'text',
  },
  {
    id: 'polaris',
    name: 'Polaris',
    primaryColor: '#4E2A84', // Purple
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    bins: ['506112', '534212'],
    logoType: 'text',
  },
  {
    id: 'sterling',
    name: 'Sterling',
    primaryColor: '#ED1C24', // Red
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    bins: ['506107', '521045'],
    logoType: 'text',
  },
  {
    id: 'providus',
    name: 'Providus',
    primaryColor: '#1A1A1A', // Black
    secondaryColor: '#C5A059', // Gold
    textColor: '#FFFFFF',
    bins: ['506155', '539983'],
    logoType: 'text',
  },
  {
    id: 'keystone',
    name: 'Keystone',
    primaryColor: '#003366', // Dark Blue
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    bins: ['506113', '522434'],
    logoType: 'text',
  },
  {
    id: 'standardchartered',
    name: 'StanChart',
    primaryColor: '#0070BA', // Blue
    secondaryColor: '#1FBE24', // Green
    textColor: '#FFFFFF',
    bins: ['506116', '405367'],
    logoType: 'text',
  }
];