

const Historial = {
    id: 'historial',
    title: 'historial',
    caption: 'historial Caption',
    type: 'group',

    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',

            Children: [
                {
                    id: 'historial',
                    title: 'historial',
                    type: 'item',
                    url: '/pages/historial/historial',
                    target: true
                }

            ]
        }
    ]
}
export default Historial;