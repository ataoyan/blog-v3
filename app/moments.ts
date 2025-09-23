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
        createdAt: '2025-09-08 18:15'
    },
    {
        id: '2',
        content: '小刘鸭小刘鸭🦆',
        images: [
            'https://cdn.atao.cyou/Web/web_250909_085623.jpg',
            'https://cdn.atao.cyou/Web/web_250909_085624.jpg'
        ],
        location: '宁波',
        createdAt: '2025-09-08 22:46'
    },
    {
        id: '3',
        content: '还能再红吗，能的能的',
        images: [
            'https://cdn.atao.cyou/Web/web_250909_210134.jpg',
        ],
        location: '宁波',
        createdAt: '2025-09-09 21:04'
    },
    {
        id: '3',
        content: '面包节🍞',
        images: [
            'https://cdn.atao.cyou/Web/web_250920_205648.jpg',
            'https://cdn.atao.cyou/Web/web_250920_205649.jpg',
            'https://cdn.atao.cyou/Web/web_250920_205650.jpg',
        ],
        location: '宁波',
        createdAt: '2025-09-20 20:58'
    },
    {
        id: '4',
        content: '像素小人🎊',
        images: [
            'https://cdn.atao.cyou/Web/web_250922_093223.png',
            'https://cdn.atao.cyou/Web/web_250922_211434.png',
            'https://cdn.atao.cyou/Web/web_250922_213023.png',
            'https://cdn.atao.cyou/Web/web_250922_215322.png',
            'https://cdn.atao.cyou/Web/web_250922_220530.png',
            'https://cdn.atao.cyou/Web/web_250922_230254.png',
            'https://cdn.atao.cyou/Web/web_250923_085738.png',
            'https://cdn.atao.cyou/Web/web_250923_085739.png',
            'https://cdn.atao.cyou/Web/web_250923_085740.png',
            'https://cdn.atao.cyou/Web/web_250923_085741.png',
        ],
        location: '宁波',
        createdAt: '2025-09-22 22:10'
    }
]

// 按创建时间降序排序（最新的在前）
const sortedMoments = moments.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
})

export default sortedMoments