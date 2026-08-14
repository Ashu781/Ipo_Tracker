const ipoService = require("../services/ipoService");

async function listIpos(req, res, next) {
  try {
    const ipos = await ipoService.getAllIpos({
      status: req.query.status
    });

    res.json(ipos);
  } catch (error) {
    next(error);
  }
}

async function getIpo(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid IPO id" });
    }

    const ipo = await ipoService.getIpoById(id);

    if (!ipo) {
      return res.status(404).json({ error: "IPO not found" });
    }

    res.json(ipo);
  } catch (error) {
    next(error);
  }
}

async function getGmpHistory(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid IPO id" });
    }

    const ipo = await ipoService.getIpoById(id);

    if (!ipo) {
      return res.status(404).json({ error: "IPO not found" });
    }

    const history = await ipoService.getGmpHistory(id);
    res.json(history);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listIpos,
  getIpo,
  getGmpHistory
};
