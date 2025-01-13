import express,{ Router } from "express";
import morgan from "morgan";

interface Option {
    port: number,
    routes: Router
}

export class Server {
    private readonly app = express()
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Option){
        this.port = options.port;
        this.routes = options.routes
    }

    async start(){
        this.app.use( express.json())
        this.app.use( express.urlencoded({ extended: true }))

        this.app.use(morgan("dev"));

        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port} 🫠`);
        })
    }
}