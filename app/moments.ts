export interface MomentItem {
    id: string
    author?: {
        name: string
        avatar: string
        badges?: string[]
    }
    content: string
    images?: string[]
    location?: string
    createdAt: string
}

const moments: MomentItem[] = [
    {
        id: '1',
        content: '测试',
        location: '宁波',
        createdAt: '2025-09-08T18:15:00Z'
    },
    {
        id: '2',
        content: '小刘鸭小刘鸭🦆',
        images: [   
            'https://cdn.atao.cyou/Web/web_250909_085623.jpg',
            'https://cdn.atao.cyou/Web/web_250909_085624.jpg'
        ],
        location: '宁波',
        createdAt: '2025-09-08T22:46:00Z'
    }
]

// 按创建时间降序排序（最新的在前）
const sortedMoments = moments.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
})

export default sortedMoments