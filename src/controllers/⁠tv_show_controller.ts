import fetch from "node-fetch";
import { Response } from "express";
import { AuthRequest } from "../common/auth_middleware";

class TvShowController {
  async search(req: AuthRequest, res: Response) {
    const searchTerm = req.params.search;

    try {
      const response = await fetch(
        `${process.env.TVSHOW_API_URL}/search/tv?query="${searchTerm}"`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TVSHOW_API_APP_KEY}`,
          },
        }
      );
      const data = await response.json();
      res.status(200).send(data.results);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req: AuthRequest, res: Response) {
    const tvShowId = req.params.tvShowId;

    try {
      const response = await fetch(
        `${process.env.TVSHOW_API_URL}/tv/${tvShowId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TVSHOW_API_APP_KEY}`,
          },
        }
      );
      const data = await response.json();

      res.status(200).send(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new TvShowController();
