import express from "express";
const router = express.Router();
import authMiddleware from "../common/auth_middleware";
import TvShowController from "../controllers/⁠tv_show_controller";

/**
 * @swagger
 * tags:
 *   name: TV Shows
 *   description: The TV Shows API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      TvShow:
 *        type: object
 *        properties:
 *          tvShowId:
 *            type: string
 *            description: The tv show Id
 *          title:
 *             type: string
 *             description: The tv show title
 *          description:
 *            type: string
 *            description: The tv show description
 *        example:
 *          TvShowId: '123456'
 *          title: 'The Vampire diaries'
 *          description: 'It follows the life of Elena Gilbert, a teenage girl who has just lost both parents in a car crash, 
 *                        as she falls in love with a 161-year-old vampire named Stefan Salvatore, who she thinks is just a normal human.'
 */

/**
 * @swagger
 * /tvshows/search/{search}:
 *   get:
 *     summary: Search for a TV Show
 *     tags: [TV Shows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for the show
 *     responses:
 *       200:
 *         description: Search results matching criteria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TvShow'
 *       401:
 *         description: Unauthorized, user needs to be signed in
 *       500:
 *         description: Unexpected error
 */

router.get(
  "/search/:search",
  authMiddleware,
  TvShowController.search.bind(TvShowController)
);

/**
 * @swagger
 * /tvshows/{tvShowId}:
 *   get:
 *     summary: Get a TV Show by ID
 *     tags: [TV Shows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tvShowId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the show to retrieve
 *     responses:
 *       200:
 *         description: Show data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TvShow'
 *       401:
 *         description: Unauthorized, user needs to be signed in
 *       404:
 *         description: tv show not found
 *       500:
 *         description: Unexpected error
 */

router.get(
  "/:tvShowId",
  authMiddleware,
  TvShowController.getById.bind(TvShowController)
);

export default router;
