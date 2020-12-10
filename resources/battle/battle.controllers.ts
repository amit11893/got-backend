import { Battle } from './battle.model';

async function getAll(req, res) {
  try {
    const battles = await Battle.find();
    res.status(200).json({ data: battles });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

async function getCount(req, res) {
  try {
    const counts = await Battle.count().exec();
    res.status(200).json({ counts });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

async function query(req, res) {
  const query1 = {};
  let isKing = false;
  if (req.query.king) {
    query1['attacker_king'] = req.query.king;
    var query2 = {};
    query2['defender_king'] = req.query.king;
    isKing = true;
  }
  if (req.query.name) {
    query1['name'] = req.query.name;
    if (isKing) {
      query2['name'] = req.query.name;
    }
  }
  if (req.query.type) {
    query1['battle_type'] = req.query.type;
    if (isKing) {
      query2['battle_type'] = req.query.type;
    }
  }
  if (req.query.location) {
    query1['location'] = req.query.location;
    if (isKing) {
      query2['location'] = req.query.location;
    }
  }
  try {
    console.log('Query: ', query1, query2);
    const battles = await Battle.find({ $or: [query1] });
    res.status(200).json({ data: battles });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

export default { getAll, getCount, query };
