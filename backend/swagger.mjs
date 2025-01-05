import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel API",
      description: "API endpoints for managing travels and users",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000", description: "Local server" }],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            email: {
              type: "string",
              example: "john.doe@example.com",
            },
            full_name: {
              type: "string",
              example: "John Doe",
            },
            phone_number: {
              type: "string",
              example: "+1234567890",
            },
            date_of_birth: {
              type: "string",
              format: "date",
              example: "1990-01-01",
            },
            gender: {
              type: "string",
              example: "Male",
            },
          },
        },
        UserRegister: {
          type: "object",
          required: ["email", "password", "full_name"],
          properties: {
            email: {
              type: "string",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "securepassword123",
            },
            full_name: {
              type: "string",
              example: "John Doe",
            },
            phone_number: {
              type: "string",
              example: "+1234567890",
            },
            date_of_birth: {
              type: "string",
              format: "date",
              example: "1990-01-01",
            },
            gender: {
              type: "string",
              example: "Male",
            },
          },
        },
        UserLogin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "password123",
            },
          },
        },
        Travel: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            destination: { type: "string", example: "Paris, France" },
            price: { type: "number", example: 250.0 },
            availableSeats: { type: "integer", example: 50 },
          },
        },
        Booking: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            travelId: { type: "integer", example: 1 },
            userId: { type: "integer", example: 2 },
            date: { type: "string", format: "date", example: "2025-01-01" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.mjs"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
