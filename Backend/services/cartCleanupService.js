const Cart = require('../models/Cart');
const InventoryService = require('./inventoryService');

class CartCleanupService {
  static async cleanupExpiredItems() {
    try {
      const carts = await Cart.find({}).populate('items.product_id');

      for (const cart of carts) {
        const expiredItems = await cart.removeExpiredItems();

        if (expiredItems.length > 0) {
          // Release stock for expired items
          for (const item of expiredItems) {
            await InventoryService.releaseStock(
              item.product_id,
              item.quantity
            );
          }

          await cart.save();
        }
      }
    } catch (error) {
      console.error('Cart cleanup error:', error);
    }
  }
}

module.exports = CartCleanupService;