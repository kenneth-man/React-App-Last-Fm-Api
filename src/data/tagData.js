export const infoTypes = [
    {
        title: 'Description',
        query: 'getinfo',
        dataProp: 'tag',
        componentType: 'desc'
    },
    {
        title: 'Similar Tags',
        query: 'getSimilar',
        dataProp: 'similartags',
        componentType: 'tag'
    },
    {
        title: 'Top Tags',
        query: 'getTopTags',
        dataProp: 'toptags',
        componentType: 'tag'
    },
    {
        title: 'Top Albums with this tag',
        query: 'gettopalbums',
        dataProp: 'albums',
        componentType: 'result'
    },
    {
        title: 'Top Artists with this tag',
        query: 'gettopartists',
        dataProp: 'topartists',
        componentType: 'result'
    }
]