export interface PetItem {
  id: string
  name: string
  breed: string
  gender: 'male' | 'female'
  birthday: string
  weight: number
  image: string
  description?: string
  color?: string
  favoriteFood?: string
  favoriteToy?: string
  healthStatus?: string
  vaccinationStatus?: string
  ownerNotes?: string
  age?: string
}

const pets: PetItem[] = [
  {
    id: '1',
    name: '囧囧',
    breed: '玳瑁猫',
    gender: 'female',
    birthday: '2022-09-10',
    weight: 8.6,
    image: 'https://cdn.atao.cyou/Web/web_250830_222130.jpg',
    description: '小时候很丑，现在开始好看了!💜💜💜',
    color: '黄黑色',
    healthStatus: '良好',
    vaccinationStatus: '已完成',
    ownerNotes: '老大'
  },
  {
    id: '2',
    name: '闹闹',
    breed: '狸花猫',
    gender: 'male',
    birthday: '2023-08-15',
    weight: 8.5,
    image: 'https://cdn.atao.cyou/Web/web_250830_232324.jpg',
    description: '胆子很小很小👻👻👻',
    color: '花色',
    healthStatus: '良好',
    vaccinationStatus: '已完成',
    ownerNotes: '老二'
  },
    {
    id: '3',
    name: '小不点',
    breed: '高地长毛猫',
    gender: 'male',
    birthday: '2024/12/10',
    weight: 10.2,
    image: 'https://cdn.atao.cyou/Web/web_250830_232356.jpg',
    description: '越来越大个了，和小狗一样🐕🐕🐕',
    color: '白色',
    healthStatus: '良好',
    vaccinationStatus: '已完成',
    ownerNotes: '老三'
  }
]

export default pets