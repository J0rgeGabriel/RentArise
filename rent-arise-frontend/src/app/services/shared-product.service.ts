import { Injectable } from '@angular/core';
import { Product } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedProductService {
  private readonly STORAGE_KEY = 'saved_products';

  get savedProducts(): Product[] {
    const storedProducts = localStorage.getItem(this.STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  addProduct(product: Product): void {
    const currentProducts = this.savedProducts;
    // Verifica se o produto já existe na lista
    const produtoExiste = currentProducts.some(p => p.id === product.id);
    if (!produtoExiste) {
      currentProducts.push(product);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentProducts));
    }
  }

  clearProducts(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
