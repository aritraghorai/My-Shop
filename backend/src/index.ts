import app from './app'
import http from 'http'
import { PORT } from './utils/config'

const port = PORT || 4000

const Server = http.createServer(app)

Server.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})
