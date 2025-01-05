// Хүсэлтийг хүлээн авч бизнес логик руу дамжуулах
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
   *       200:
   *         description: List of travels retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Travel'
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Server Error
   */
  //2. travel.get(req, res) функц ажиллаад DaTravels доторх getAllTravels функцыг дуудна.ирсэн хариуг clinet-руу  илгээнэ.
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
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Server Error
   */
  async post(req, res) {
    await datravels.addTravel(req, res);
  }
}

const travel = new Travels();
export { travel };
