export const artworks = [
  {
    id: 1,
    title: "Solidão Náutica",
    filename: "Solidão Náutica.jpg",
    description:
      "Na imensidão turquesa de São Bento, uma embarcação repousa em silêncio. A obra principal da coleção.",
    category: "Minimalismo",
    orientation: "landscape",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "São Bento, Maragogi — AL",
    },
  },
  {
    id: 2,
    title: "Arquitetura de Coral",
    filename: "Arquitetura de Coral.jpg",
    description:
      "Visto de cima, o recife deixa de ser pedra e vira mapa. Tons de ocre e dourado esculpidos por séculos de marés.",
    category: "Textura",
    orientation: "portrait",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "Maragogi — AL",
    },
  },
  {
    id: 3,
    title: "Fronteira de Sal",
    filename: "1-DJI_20260202095408_0440_D.jpg",
    description:
      "A textura complexa onde o recife encontra a areia, criando uma fronteira natural visível apenas do céu.",
    category: "Abstrato",
    orientation: "landscape",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "Maragogi — AL",
    },
  },
  {
    id: 4,
    title: "Caminho do Mar",
    filename: "2-DJI_20260202095431_0442_D.jpg",
    description:
      "O movimento de uma embarcação traçando seu curso ao longo da barreira de corais.",
    category: "Movimento",
    orientation: "landscape",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "Maragogi — AL",
    },
  },
  {
    id: 5,
    title: "Porto Seguro",
    filename: "3-DJI_20260202095824_0450_D.jpg",
    description:
      "Uma vista panorâmica da costa, onde as águas calmas protegem a vida marinha.",
    category: "Paisagem",
    orientation: "landscape",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "Maragogi — AL",
    },
  },
  {
    id: 6,
    title: "Esmeralda Bruta",
    filename: "4-DJI_20260202095848_0452_D.jpg",
    description:
      "A intensidade pura do turquesa alagoano, dividido pela linha orgânica dos recifes.",
    category: "Cor",
    orientation: "landscape",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "Maragogi — AL",
    },
  },
  {
    id: 7,
    title: "Aquarela Costeira",
    filename: "5-DJI_20260202095913_0453_D.jpg",
    description:
      "Pequenos barcos coloridos ancorados sobre a areia dourada, como pinceladas em uma tela.",
    category: "Cultura",
    orientation: "landscape",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "Maragogi — AL",
    },
  },
  {
    id: 8,
    title: "Divisa Natural",
    filename: "6-DJI_20260202100022_0456_D.jpg",
    description:
      "Um banco de areia extenso que divide o mar em dois tons, criando uma passarela natural.",
    category: "Geometria",
    orientation: "landscape",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "Maragogi — AL",
    },
  },
  {
    id: 9,
    title: "Oásis de Areia",
    filename: "7-DJI_20260202100117_0457_D.jpg",
    description:
      "A maré baixa revela caminhos efêmeros onde barcos repousam à espera do oceano.",
    category: "Aéreo",
    orientation: "landscape",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "Maragogi — AL",
    },
  },
  {
    id: 10,
    title: "Constelação Náutica",
    filename: "8-DJI_20260202151332_0473_D.jpg",
    description:
      "Visto de cima, as embarcações espalhadas pelo mar lembram estrelas em um céu líquido.",
    category: "Top Down",
    orientation: "landscape",
    details: {
      drone: "DJI Air 3S",
      sensor: '1" CMOS 50MP',
      resolution: "8064 × 6048 px",
      format: "JPEG",
      location: "Maragogi — AL",
    },
  },
]

export const getImageSrc = (filename) => encodeURI(`/Maragogi Secret/${filename}`)
