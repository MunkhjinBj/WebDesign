import express from "express";
import { datravels } from "../db/da.mjs";

export default class Travels {
  constructor() {}
  /**
   * @openapi
   * /api/travels:
   *   get:
   *     tags:
   *       - Travels
   *     summary: Get all travels
   *     responses:
   *     200:
   *        description: Fetched Successfully
   *      400:
   *        description: Bad Request
   *      404:
   *        description: Not Found
   *      500:
   *        description: Server Error
   */
  async get(req, res) {
    await datravels.getAllTravels(req, res);
  }
  /**
   * @openapi
   * /api/travels:
   *   post:
   *     tags:
   *       - Travels
   *     summary: Add a new travel
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Travel'
   *     responses:
   *       201:
   *         description: Travel added successfully
   */
  async post(req, res) {
    await datravels.addTravel(req, res);
  }
}
const travel = new Travels();
export { travel };
// const router = express.Router();
// const daTravels = new DaTravels();

// /**
//  * @openapi
//  * /api/travels:
//  *   get:
//  *     tags:
//  *       - Travels
//  *     summary: Get all travels
//  *     responses:
//  *       200:
//  *         description: Returns a list of travels
//  */
// router.get("/", (req, res) => daTravels.getAllTravels(req, res));
// console.log("sdgsagasdg");
// /**
//  * @openapi
//  * /api/travels:
//  *   post:
//  *     tags:
//  *       - Travels
//  *     summary: Add a new travel
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Travel'
//  *     responses:
//  *       201:
//  *         description: Travel added successfully
//  */
// router.post("/", (req, res) => daTravels.addTravel(req, res));

// export default router;
