import { SettingsModel } from '@libs/shared'

export const master = {
    welcome: (req, res) => {
        res.send({ message: 'Welcome to server!' })
    }
}