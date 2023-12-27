import { INews } from "shared/interfaces/news.interface";

export const newsData: INews[] = [
    {
        id: 1,
        price: 41.15, 
        isGrowing: false,
        date: new Date('2023-11-12T08:30:00Z'),
        title: ' Fivamus sagittis lacus vel augue laoreet rutrum faucibus dolor',
        source: 'Some source',
        tags: [
            {
                id: 2, 
                tag: '#Message',
            },
            {
                id: 3, 
                tag: '#Message',
            },
            {
                id: 4, 
                tag: '#Message',
            },
            {
                id: 5, 
                tag: '#Message',
            },
        ],
    },

    {
        id: 2,
        price: 41.19, 
        isGrowing: true,
        date: new Date('2023-11-12T08:30:00Z'),
        title: ' Fivamus sagittis lacus vel augue laoreet rutrum faucibus dolor',
        source: 'Some source',
        tags: [
            {
                id: 6, 
                tag: '#Message',
            },
            {
                id: 7, 
                tag: '#Message',
            },
            {
                id: 8, 
                tag: '#Message',
            },
        ],
    },

    {
        id: 3,
        price: 41.13, 
        isGrowing: false,
        date: new Date('2023-11-12T08:30:00Z'),
        title: ' Fivamus sagittis lacus vel augue laoreet rutrum faucibus dolor',
        source: 'Some source',
        tags: [
            {
                id: 9, 
                tag: '#Message',
            },
            {
                id: 10, 
                tag: '#Message',
            },
        ],
    },

    {
        id: 4,
        price: 41.23, 
        isGrowing: true,
        date: new Date('2023-11-12T08:30:00Z'),
        title: ' Fivamus sagittis lacus vel augue laoreet rutrum faucibus dolor',
        source: 'Some source',
        tags: [
            {
                id: 11, 
                tag: '#Message',
            },
            {
                id: 12, 
                tag: '#Message',
            },
        ],
    },

    {
        id: 5,
        price: 41.19, 
        isGrowing: true,
        date: new Date('2023-11-12T08:30:00Z'),
        title: ' Fivamus sagittis lacus vel augue laoreet rutrum faucibus dolor',
        source: 'Some source',
        tags: [
            {
                id: 13, 
                tag: '#Message',
            },
        ],
    },
];