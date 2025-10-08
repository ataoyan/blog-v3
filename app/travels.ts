export interface TravelAttraction {
  name: string
  color: string
}

export interface TravelItem {
  id: string
  year: string
  location: string
  province: string
  date: string
  transportation: string
  duration: string
  weather: string
  rating: number
  coverImage: string
  photos: string[]
  attractions: TravelAttraction[]
}

const travels: TravelItem[] = [
  {
    id: '1',
    year: '2020',
    location: '南京',
    province: '江苏',
    date: '2020-12-31',
    transportation: '高铁',
    duration: '2天',
    weather: '晴朗',
    rating: 5,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250919_224943.jpg',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250919_224943.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224942.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224941.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224939.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224938.jpg',
    ],
    attractions: [
    ]
  },
  {
    id: '2',
    year: '2021',
    location: '衡阳',
    province: '湖南',
    date: '2021-03-04',
    transportation: '高铁',
    duration: '2天',
    weather: '小雨',
    rating: 5,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250919_224946.jpg',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250919_224946.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224945.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224934.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224933.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224932.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224931.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224947.jpg',
    ],
    attractions: [
      { name: '剧本杀', color: '#93a08d' },
    ]
  },
  {
    id: '3',
    year: '2021',
    location: '武汉',
    province: '湖北',
    date: '2021-05-01',
    transportation: '高铁',
    duration: '5天',
    weather: '晴朗',
    rating: 4,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250907_185312.JPG',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250907_185312.JPG',
      'https://cdn.atao.cyou/Travel/travel_250907_185313.JPG',
      'https://cdn.atao.cyou/Travel/travel_250907_185314.JPG',
      'https://cdn.atao.cyou/Travel/travel_250919_224928.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224927.jpg',
    ],
    attractions: [
    ]
  },
  {
    id: '4',
    year: '2021',
    location: '宁波',
    province: '浙江',
    date: '2021-06-14',
    transportation: '地铁',
    duration: '1天',
    weather: '晴朗',
    rating: 4,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250919_224921.jpg',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250919_224926.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224925.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224924.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224923.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224922.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224921.jpg',
    ],
    attractions: [
      { name: '电影院', color: '#55742c' },
    ]
  },
  {
    id: '5',
    year: '2022',
    location: '厦门',
    province: '福建',
    date: '2022-08-04',
    transportation: '高铁',
    duration: '3天',
    weather: '晴朗',
    rating: 4,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250907_185352.JPEG',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250907_185352.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_185353.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_185354.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_185355.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_185356.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_185357.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_185358.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250919_224918.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224917.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224916.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224914.jpg',
    ],
    attractions: [
      { name: '植物园', color: '#FF6B6B' },
      { name: '普陀寺', color: '#4ECDC4' },
    ]
  },
  {
    id: '6',
    year: '2022',
    location: '宁波-象山',
    province: '浙江',
    date: '2022-09-12',
    transportation: '自驾',
    duration: '2天',
    weather: '晴/多云',
    rating: 4.5,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250907_202914.JPEG',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250919_224913.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224912.jpg',
      'https://cdn.atao.cyou/Travel/travel_250907_202914.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202915.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202916.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202917.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202918.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202919.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202920.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202921.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202922.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202923.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202924.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202925.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202926.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202927.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202928.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202929.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_202930.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250919_224908.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224907.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224903.jpg',
    ],
    attractions: [
      { name: '象山影视城', color: '#FF9F1C' },
      { name: '石浦渔港', color: '#2EC4B6' },
    ]
  },
  {
    id: '7',
    year: '2023',
    location: '宁波-余姚',
    province: '浙江',
    date: '2023-05-01',
    transportation: '自驾',
    duration: '0.5天',
    weather: '晴',
    rating: 3.5,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250907_204912.JPEG',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250919_224906.jpg',
      'https://cdn.atao.cyou/Travel/travel_250907_204912.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_204913.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_204914.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250919_224905.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224904.jpg',
    ],
    attractions: [
      { name: '河姆渡遗址', color: '#5D5C61' },
      { name: '天下玉苑', color: '#557A95' }
    ]
  },
  {
    id: '8',
    year: '2023',
    location: '宁波-余姚',
    province: '浙江',
    date: '2023-10-04',
    transportation: '自驾',
    duration: '0.5天',
    weather: '晴',
    rating: 4.5,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250907_210149.JPEG',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250907_210149.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_210150.JPEG',
    ],
    attractions: [
      { name: '慈城', color: '#E84855' },
    ]
  },
  {
    id: '9',
    year: '2023',
    location: '杭州',
    province: '浙江',
    date: '2023-12-30',
    transportation: '高铁',
    duration: '2天',
    weather: '阴',
    rating: 4.5,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250907_214649.JPEG',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250919_224902.jpg',
      'https://cdn.atao.cyou/Travel/travel_250907_214648.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_214649.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_214650.MP4'
    ],
    attractions: [
      { name: '西湖', color: '#E84855' },
    ]
  },
  {
    id: '10',
    year: '2025',
    location: '苏州',
    province: '江苏',
    date: '2025-03-29',
    transportation: '自驾',
    duration: '2天',
    weather: '晴',
    rating: 4.5,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_250907_222045.JPEG',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_250907_222042.JPG',
      'https://cdn.atao.cyou/Travel/travel_250907_222043.JPG',
      'https://cdn.atao.cyou/Travel/travel_250907_222044.JPG',
      'https://cdn.atao.cyou/Travel/travel_250919_224901.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224859.jpg',
      'https://cdn.atao.cyou/Travel/travel_250919_224900.jpg',
      'https://cdn.atao.cyou/Travel/travel_250907_222045.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_222046.JPEG',
      'https://cdn.atao.cyou/Travel/travel_250907_222047.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222048.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222049.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222050.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222051.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222052.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222053.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222054.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222055.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222056.MP4',
      'https://cdn.atao.cyou/Travel/travel_250907_222057.JPEG',
    ],
    attractions: [
      { name: '演唱会', color: '#E84855' },
    ]
  },
  {
    id: '11',
    year: '2025',
    location: '绍兴',
    province: '浙江',
    date: '2025-10-03',
    transportation: '自驾',
    duration: '3天',
    weather: '晴',
    rating: 4.7,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_251008_224612.jpg',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_251008_224612.jpg',
      'https://cdn.atao.cyou/Travel/travel_251008_224610.jpg',
      'https://cdn.atao.cyou/Travel/travel_251008_224611.jpg',
      'https://cdn.atao.cyou/Travel/travel_251008_224613.jpg',
      'https://cdn.atao.cyou/Travel/travel_251008_224618.jpg',
      'https://cdn.atao.cyou/Travel/travel_251008_224620.jpg',
    ],
    attractions: [
      { name: '鲁迅故居', color: '#4d78cc' },
    ]
  },
  {
    id: '12',
    year: '2025',
    location: '宁波',
    province: '浙江',
    date: '2025-10-05',
    transportation: '自驾',
    duration: '0.5天',
    weather: '晴',
    rating: 4.2,
    coverImage: 'https://cdn.atao.cyou/Travel/travel_251008_224614.jpg',
    photos: [
      'https://cdn.atao.cyou/Travel/travel_251008_224614.jpg',
      'https://cdn.atao.cyou/Travel/travel_251008_224616.jpg',
      'https://cdn.atao.cyou/Travel/travel_251008_224603.jpg',
      'https://cdn.atao.cyou/Travel/travel_251008_224606.jpg',
      'https://cdn.atao.cyou/Travel/travel_251008_224608.jpg',
    ],
    attractions: [
      { name: '天一广场', color: '#a878d2' },
      { name: '东钱湖', color: '#61afef' },
    ]
  },
]

// 按日期降序排序（时间最近的在前）
const sortedTravels = travels.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})

export default sortedTravels