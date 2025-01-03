import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel API",
      description: "API endpoints for managing travels",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3002", description: "Local server" }],
  },
  apis: ["./routes/*.mjs"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => res.json(swaggerSpec));
}

export default swaggerDocs;
