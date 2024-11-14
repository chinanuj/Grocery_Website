const mongoose = require('mongoose');
const Product = require('../models/Product');

class InventoryService {
  static async validateAndReserveStock(userId, productId, requestedQuantity) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const product = await Product.findById(productId).session(session);
      if (!product) {
        throw new Error('Product not found');
      }

      if (product.stock < requestedQuantity) {
        throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}`);
      }

      product.stock -= requestedQuantity;
      await product.save({ session });

      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async releaseStock(productId, quantity) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const product = await Product.findById(productId).session(session);
      if (!product) {
        throw new Error('Product not found');
      }

      product.stock += quantity;
      await product.save({ session });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async validateCartStock(cart) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const stockValidations = await Promise.all(
        cart.items.map(async (item) => {
          const product = await Product.findById(item.product_id).session(session);
          if (!product) {
            throw new Error(`Product ${item.product_id} not found`);
          }
          if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
          }
          return { product, quantity: item.quantity };
        })
      );

      await Promise.all(
        stockValidations.map(async ({ product, quantity }) => {
          product.stock -= quantity;
          await product.save({ session });
        })
      );

      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

module.exports = InventoryService;