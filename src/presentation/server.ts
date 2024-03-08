import express, { type Router } from "express";
import morgan from "morgan";

interface Options {
  port: number;
  routes: Router;
}
export class Server {
  private readonly app = express();
  private readonly logger = morgan;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(this.logger("dev"));
    this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/api", this.routes);

    this.app.listen(this.port, () => {
      console.log(`App running on port ${this.port}`);
    });
  }
}
