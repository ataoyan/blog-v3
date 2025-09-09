export interface PetStatusItem {
  id: string
  petId: string
  date: string
  type: 'image' | 'text'
  content: string
  description?: string
}

export const petStatusData: PetStatusItem[] = [
  // 囧囧的状态 (ID: '1')
  {
    id: '11',
    petId: '1',
    date: '2025-08-30',
    type: 'image',
    content: 'https://cdn.atao.cyou/Web/web_250903_221722.jpg',
    description: '疑惑的表情'
  },
  // {
  //   id: '12',
  //   petId: '1',
  //   date: '2025-08-29',
  //   type: 'text',
  //   content: '今天吃了很多猫粮，精神状态很好',
  //   description: '饮食记录'
  // },
  
  // 闹闹的状态 (ID: '2')
  {
    id: '21',
    petId: '2',
    date: '2025-08-30',
    type: 'image',
    content: 'https://cdn.atao.cyou/Web/web_250903_221732.jpg',
    description: '好像在说：我好饿，快给我吃鱼🐟'
  },
  // 小不点的状态 (ID: '3')
  {
    id: '31',
    petId: '3',
    date: '2025-08-31',
    type: 'image',
    content: 'https://cdn.atao.cyou/Web/web_250903_221712.jpg',
    description: '倒头就睡'
  },
]

export const getPetStatus = (petId: string): PetStatusItem[] => {
  return petStatusData.filter(status => status.petId === petId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}