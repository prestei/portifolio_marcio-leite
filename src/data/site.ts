export const SITE = {
  name: 'Márcio Leite',
  tagline: 'Vem se Apaixonar!',
  headline: 'MÁRCIO LEITE — VEM SE APAIXONAR!',
  subheadline:
    'O Arrocha Romântico que arrasta multidões nos maiores palcos, micaretas e festas da Bahia.',
  base: 'Santo Estevão · Bahia · Desde 2007',
  whatsapp: '5575981136855',
  phones: ['(75) 98113-6855', '(75) 99146-2168', '(75) 9840-7622'],
  emails: [
    'marcioleitesimplesmenteromantico@hotmail.com',
    'myllalleite@hotmail.com',
  ],
  address: 'Av. Plínio da Silva Gomes, 443 — Centro, Santo Estevão - BA',
  company: 'Márcio de Oliveira Leite MEI',
  socials: {
    instagram: 'https://www.instagram.com/marcioleiteofficial/',
    youtube: 'https://www.youtube.com/@marcioleiteofficial',
    facebook: 'https://www.facebook.com/marcioleiteofficial',
    suamusica: 'https://www.suamusica.com.br/marcioleiteoficials',
    // TODO: substituir pelo link oficial do Spotify do artista quando disponível
    spotify: 'https://open.spotify.com/search/M%C3%A1rcio%20Leite',
  },
};

export const NAV_LINKS = [
  { href: '#topo', label: 'Topo' },
  { href: '#destaques', label: 'Destaques' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#trajetoria', label: 'Trajetória' },
  { href: '#discografia', label: 'Discografia' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#contato', label: 'Contato' },
];

export const STATS = [
  { value: 2007, suffix: '', label: 'Início da trajetória musical', prefix: '' },
  { value: 10, suffix: '', label: 'Álbuns & DVDs gravados', prefix: '+' },
  { value: 50, suffix: '', label: 'Cidades pela Bahia e Brasil', prefix: '+' },
  { value: 18, suffix: '', label: 'Anos de estrada', prefix: '' },
];

export const RECOGNITIONS = [
  'Prêmio Cantor Destaque (opinião popular)',
  'Registro de Marca Oficial no INPI',
  'Mapeamento Cultural de Santo Estevão - BA',
];

export type TrajetoriaItem = {
  year: string;
  title: string;
  desc: string;
  /** Portrait photo path. When null/empty, the info panel is shown instead. */
  image: string | null;
  /** Longer copy for the info panel; falls back to `desc` when omitted. */
  infoText?: string;
  /** Optional highlight quote shown on the info panel. */
  highlight?: string;
};

/** Portrait assets for the sticky Trajetória storytelling experience. */
export const TRAJETORIA: TrajetoriaItem[] = [
  {
    year: '2007',
    title: 'Os primeiros acordes',
    desc: 'Início da carreira musical, passando por várias bandas até a decisão de seguir como artista solo — vendendo CDs em festivais e feiras livres da Chapada Diamantina.',
    image: null,
    infoText:
      'Início da carreira musical, passando por várias bandas até a decisão de seguir como artista solo — vendendo CDs em festivais e feiras livres da Chapada Diamantina.',
    highlight: 'Toda grande trajetória começa com o primeiro acorde.',
  },
  {
    year: '2008',
    title: 'Cantor Destaque',
    desc: 'Recebe em Santo Estevão-BA o certificado "Cantor Destaque", do prêmio Empresas e Profissionais de Sucesso, reconhecendo o trabalho pela opinião popular.',
    image: 'images/trajetoria/cantor-destaque.jpg',
  },
  {
    year: '2013–2015',
    title: 'A vitrine de Feira de Santana',
    desc: 'Sobe ao palco no São João de Santo Estevão e se torna destaque fixo do projeto "Quinta na Praça" da TV Subaé, animando o Jardim Cruzeiro com arrocha e pagode de mesa.',
    image: 'images/trajetoria/vitrine-feira.jpg',
  },
  {
    year: '2017',
    title: 'De camelô a cantor de arrocha',
    desc: 'Matéria de jornal registra a virada de chave: de camelô em Barra da Estiva e outras cidades da Chapada, Márcio Leite se dedica em tempo integral à carreira musical e lança novo álbum.',
    image: 'images/trajetoria/camelo-arrocha.jpg',
  },
  {
    year: '2018',
    title: 'Um ano em movimento',
    desc: 'Shows ao vivo em Riacho de Santana, na Cavalgada da Caatinguinha (Santo Estevão), lançamento do DVD "A Voz Cigana" em São Roque de Ipirá e apresentação no São Pedro de Humildes, além do Projeto Beneficente Quinta na Praça.',
    image: 'images/trajetoria/ano-movimento.jpg',
  },
  {
    year: '2019',
    title: 'Estreia na Micareta de Feira',
    desc: '"Tenho mil motivos para agradecer" — Márcio Leite estreia na Micareta de Feira de Santana, abrilhantando a tarde de domingo e lançando o CD volume 10. Quem nunca cantou na Micareta, não é batizado.',
    image: 'images/trajetoria/micareta-2019.jpg',
  },
  {
    year: '2020',
    title: 'Certificado Cultural & lives beneficentes',
    desc: 'Márcio de Oliveira Leite é cadastrado no Mapeamento Cultural de Santo Estevão. Durante a pandemia, realiza uma série de lives beneficentes para manter viva a conexão com o público.',
    image: 'images/trajetoria/certificado-cultural.jpg',
  },
  {
    year: '2020–2021',
    title: 'Réveillon & Festa de Reis',
    desc: 'Show de virada de ano em Santa Teresinha-BA e Festa de Reis no Distrito de Tiquaruçu, em Feira de Santana — celebrações que marcam a retomada gradual dos palcos.',
    image: null,
    infoText:
      'Show de virada de ano em Santa Teresinha-BA e Festa de Reis no Distrito de Tiquaruçu, em Feira de Santana — celebrações que marcam a retomada gradual dos palcos.',
    highlight: 'A música manteve viva a conexão com o público.',
  },
  {
    year: '2022',
    title: 'Repertório novo, "Vem se Apaixonar"',
    desc: 'Lançamento do repertório novo e apresentação no São Pedro do Serrote, em Ipecaetá-BA — "hoje, após dois anos de pandemia, está sendo concretizado", celebrou o artista.',
    image: null,
    infoText:
      'Lançamento do repertório novo e apresentação no São Pedro do Serrote, em Ipecaetá-BA — após dois anos de pandemia, o retorno aos palcos se concretiza.',
    highlight: 'Hoje, após dois anos de pandemia, está sendo concretizado.',
  },
  {
    year: '2023',
    title: 'Marca registrada & ao vivo',
    desc: 'A marca "Márcio Leite" é oficialmente registrada no INPI. No mesmo ano, dois CDs são gravados ao vivo: em Ipecaetá-BA e na Micareta de Feira de Santana, além da Festa de Reis em Ipecaetá.',
    image: 'images/trajetoria/micareta-2023.jpg',
  },
  {
    year: 'Hoje',
    title: 'Carreira solo consolidada',
    desc: 'Gravação do Audiovisual no Hangar 5.0 com convidados especiais e agenda aberta para todo o Brasil.',
    image: 'images/trajetoria/carreira-atual.jpg',
  },
];

/** True when the marco has a usable image path. */
export function hasTrajetoriaImage(item: TrajetoriaItem): item is TrajetoriaItem & { image: string } {
  return typeof item.image === 'string' && item.image.trim().length > 0;
}

export const ALBUMS = [
  {
    year: '2013',
    title: 'CD Vol. 06 — A Voz Cigana',
    desc: 'O álbum que marcou a consolidação do estilo romântico.',
    image: 'images/extracted/img-03.jpg',
  },
  {
    year: '2019–2020',
    title: 'CD Vol. 10 — Vem Se Apaixonar',
    desc: 'Hits como Na Cama Que Eu Paguei, Fake News, Choque Térmico, Decida, Ferida Curada, Supera e Ednalva.',
    image: 'images/extracted/img-06.jpg',
  },
  {
    year: '2023',
    title: 'Ao Vivo em Ipecaetá',
    desc: 'Gravação ao vivo capturando a energia pura do show de praça pública.',
    image: 'images/extracted/img-08.jpg',
  },
  {
    year: '2023',
    title: 'Ao Vivo na Micareta de Feira',
    desc: 'Registro emocionante em cima do trio elétrico no maior carnaval fora de época do Brasil.',
    image: 'images/extracted/img-09.jpg',
  },
  {
    year: '2023/2024',
    title: 'Audiovisual Hangar 5.0',
    desc: 'Projeto especial “Márcio Leite e Amigos” gravado em Santo Estevão.',
    image: 'images/hero/cartaz.jpg',
  },
];

export const GALLERY = [
  { src: 'images/extracted/img-01.jpg', title: 'Show ao vivo', cat: 'Shows' },
  { src: 'images/gallery/show-01.jpg', title: 'Quinta na Praça · TV Subaé', cat: 'Público' },
  { src: 'images/gallery/show-02.jpg', title: 'Praça lotada', cat: 'Público' },
  { src: 'images/extracted/img-07.jpg', title: 'Micareta 2019', cat: 'Trio Elétrico' },
  { src: 'images/gallery/micareta1.jpg', title: 'Micareta de Feira', cat: 'Trio Elétrico' },
  { src: 'images/gallery/micareta2.jpg', title: 'Trio Porradão · 2023', cat: 'Shows' },
  { src: 'images/about/retrato.jpg', title: 'Retrato · Vem se Apaixonar', cat: 'Estúdio' },
  { src: 'images/extracted/img-12.jpg', title: 'Hangar 5.0', cat: 'Bastidores' },
];

export const PRESS = [
  {
    source: 'TV Subaé (Globo)',
    text: 'Destaque no projeto Quinta na Praça.',
  },
  {
    source: 'Portal De Olho na Cidade',
    text: 'Cobertura dos shows de São Pedro e Micareta.',
  },
  {
    source: 'Portal Viva Feira',
    text: 'Repercussão de praça pública lotada.',
  },
  {
    source: 'Blog do Rocha',
    text: 'Destaque para o grande fã-clube do cantor.',
  },
];

export const CLIENTS = [
  'Prefeitura de Feira de Santana (Micareta / Arraiá / Humildes)',
  'Prefeitura de Santo Estevão (São João / Hangar 5.0)',
  'Prefeitura de Ipecaetá (São Pedro do Serrote / Forró do Pato)',
  'Prefeitura de Santa Teresinha (Réveillon)',
  'Cavalgadas, eventos corporativos e festas em Ipirá, Heliópolis e Riacho de Santana',
];

export const TESTIMONIAL = {
  quote:
    'Gostei muito do público que veio prestigiar... o show esquentou a noite e trouxe alegria para a população.',
  author: 'Prefeito Júnior Piaggio',
  role: 'Prefeitura de Ipecaetá - BA',
};

export const PLATFORMS = [
  { name: 'YouTube', href: 'https://www.youtube.com/@marcioleiteofficial', icon: 'youtube' },
  { name: 'Instagram', href: 'https://www.instagram.com/marcioleiteofficial/', icon: 'instagram' },
  { name: 'Facebook', href: 'https://www.facebook.com/marcioleiteofficial', icon: 'facebook' },
  { name: 'Sua Música', href: 'https://www.suamusica.com.br/marcioleiteoficials', icon: 'music' },
  // TODO: substituir SITE.socials.spotify pelo link oficial do artista no Spotify
  { name: 'Spotify', href: SITE.socials.spotify, icon: 'spotify' },
];
