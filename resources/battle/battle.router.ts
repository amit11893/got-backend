import { Router } from 'express';
import controllers from './battle.controllers';

const router = Router();

router.route('/list').get(controllers.getAll);
router.route('/count').get(controllers.getCount);
router.route('/search').get(controllers.query);

export default router;
