export const master = {
    welcome: (req, res) => {
        res.send({ message: 'Welcome to server!' })
    },
    getMenu: (req, res) => {
        res.send({ message: 'get-menu works!' })
    },
}