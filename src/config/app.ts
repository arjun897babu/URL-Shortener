  
 import { logger } from '@/_default';
import express, { Express } from 'express'  

export default class Server {
    private server: Express
    constructor() {
        this.server = express();
    }

    async startServer() {

        this.server.use(express.json()); 

        this.server.listen(5000, () => {
            logger.success('server running')
        })
    }

}



