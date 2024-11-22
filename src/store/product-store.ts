export class ProductStore {
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
