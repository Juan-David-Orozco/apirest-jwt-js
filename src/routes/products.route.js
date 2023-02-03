import { Router } from 'express'
const router = Router()

import * as productsController from '../controllers/products.controller'
import { authJwt } from '../middlewares'

router.get('/', productsController.getProducts)

router.get('/:productId', productsController.getProduct)

router.post('/', [
    authJwt.verifyToken,
    authJwt.isModerator,
    authJwt.isAdmin, // Debe tener ambos roles para crear
    //authJwt.verifyRole
  ], productsController.createProduct
)

router.delete('/:productId', [
    authJwt.verifyToken,
    authJwt.isAdmin,
    //authJwt.verifyRole
  ], productsController.deleteProduct
)

router.put('/:productId', [
    authJwt.verifyToken,
    authJwt.isModerator
    //authJwt.verifyRole
  ], productsController.updateProduct
)

export default router