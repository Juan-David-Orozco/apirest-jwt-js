import { Router } from 'express'
const router = Router()

import * as productsController from '../controllers/products.controller'

router.get('/', productsController.getProducts)

router.post('/', productsController.createProduct)

router.get('/:productId', productsController.getProduct)

router.delete('/:productId', productsController.deleteProduct)

router.put('/:productId', productsController.updateProduct)

export default router