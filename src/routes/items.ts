import { Router } from 'express';
import { deleteItem, getItem, getItems, postItem, putItem } from '../components/items';

const router = Router();

//* Routes:

router.get('/', getItems);
router.get('/id', getItem);
router.post('/', postItem);
router.put('/:id', putItem);
router.delete('/:id', deleteItem);

export default router;