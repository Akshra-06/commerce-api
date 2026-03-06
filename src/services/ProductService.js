import ProductRepository from '../repositories/ProductRepository.js';

export default class ProductService {

  static async createProduct(data) {
    return ProductRepository.create(data);
  }

  static async getProduct(id) {
    const product = await ProductRepository.findById(id);

    if (!product) return null;

    // Calculate average rating
    let avgRating = null;

    if (product.reviews && product.reviews.length > 0) {
      const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
      avgRating = total / product.reviews.length;
    }

    // convert mongoose doc to object
    const result = product.toObject();

    result.avgRating = avgRating;

    return result;
  }

  static async updateProduct(id, data) {
    return ProductRepository.update(id, data);
  }

  static async deleteProduct(id) {
    return ProductRepository.delete(id);
  }

  static async listProducts(filter) {
    return ProductRepository.list(filter);
  }
}