export interface Expedition {
  id: number
  destination: string
  coords: string
  region: string
  date: string
  status: 'Em planejamento' | 'Confirmada' | 'Concluída'
}

export const expeditions: Expedition[] = [
  {
    id: 1,
    destination: 'Lençóis Maranhenses',
    coords: '2°29\'S  43°07\'W',
    region: 'Maranhão, BR',
    date: 'Jul 2026',
    status: 'Em planejamento',
  },
  {
    id: 2,
    destination: 'Chapada dos Veadeiros',
    coords: '14°07\'S  47°41\'W',
    region: 'Goiás, BR',
    date: 'Set 2026',
    status: 'Em planejamento',
  },
]
