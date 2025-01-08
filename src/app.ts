import { envs } from "./config"
import { PostgresDataBase } from "./data"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"
import "reflect-metadata"
process.loadEnvFile()

async function main() {
    //Iniciamos la base de datos
    const postgres = new PostgresDataBase({
        username: envs.DB_USERNAME,
        password: envs.DB_PASSWORD,
        host: envs.DB_HOST,
        database: envs.DB_DATABASE,
        port: envs.DB_PORT
    })
    await postgres.connect()


    //Iniciamos el servidor
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
    await server.start()
}

main()