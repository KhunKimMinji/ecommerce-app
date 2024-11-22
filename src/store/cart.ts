interface Product {
  name: string;
  quantity: number;
  price: number;
  sum?: number;
}

export class ShoppingCartStore {
  store: Product[] = [];

  private findProductByProductName(productName: string): Product | undefined {
    return this.store.find((product) => product.name === productName);
  }

  // ถ้าหาไม่เจอจะเท่ากับ -1
  private findProductIndexByProductName(productName: string): number {
    return this.store.findIndex((product) => product.name === productName);
  }

  private calculateSum(product: Product): number {
    return product.price * product.quantity;
  }

  set(product: Product): void {
    const isProductExisted: Product | undefined = this.findProductByProductName(
      product.name
    );

    // ถ้าไม่เคยมี product name นี่อยู่ใน store
    if (isProductExisted === undefined) {
      product.sum = this.calculateSum(product);
      this.store.push(product);
    }

    // ถ้าเคยมี product name นี่อยู่ใน store
    // จะ update count ของ product name นั้นๆ
    if (isProductExisted) {
      const productIndex: number = this.findProductIndexByProductName(
        product.name
      );
      product.sum = this.calculateSum(product);
      this.store[productIndex].quantity += product.quantity;
    }
  }

  get(productName: string): Product | undefined {
    return this.findProductByProductName(productName);
  }

  increase(productName: string): void {
    const productIndex = this.findProductIndexByProductName(productName);
    if (productIndex >= 0) {
      // Create local product variable and mutate
      const product = this.store[productIndex];
      product.quantity += 1;
      product.sum = this.calculateSum(product);

      // Update specific product in store
      this.store[productIndex] = product;
    } else {
      console.warn('Product not found');
    }
  }

  decrease(productName: string): void {
    const product = this.findProductIndexByProductName(productName);
    if (product >= 0) {
      this.store[product].quantity -= 1;
    } else {
      console.warn('Product not found');
    }
  }

  remove(productName: string): void {
    // Filter
    const newStore = this.store.filter((product) => {
      return product.name !== productName;
    });

    // Update current store value
    this.store = [...newStore];
  }

  reset(): void {
    this.store = [];
  }
}

/**
 * @deprecated
 * Object style
 */
export class ShoppingCartStoreObject {
  store: { [productName: string]: number } = {};

  set(productName: string, count: number): void {
    const checkExistedKey: boolean = Object.hasOwn(this.store, productName);

    // ถ้าไม่เคยมี product name นี่อยู่ใน store
    // จะ initial value ของ product name นั้นเท่ากับ count ที่ส่งมา
    if (checkExistedKey === false && count >= 0) {
      this.store[productName] = count;
    }

    // ถ้าเคยมี product name นี่อยู่ใน store
    // จะ update count ของ product name นั้นๆ
    if (checkExistedKey && count >= 0) {
      this.store[productName] += count;
    }
  }

  get(productName: string): number | undefined {
    return this.store[productName] || undefined;
  }

  increase(productName: string): void {
    this.store[productName] += 1;
  }

  decrease(productName: string): void {
    this.store[productName] -= 1;
  }

  remove(productName: string): void {
    delete this.store[productName];
  }

  reset(): void {
    this.store = {};
  }
}
