export class ShoppingCartStore {
  store: { [key: string]: number } = {};

  set(key: string, count?: number): void {
    const checkExistedKey: boolean = Object.hasOwn(this.store, key);

    if (checkExistedKey === false && count === undefined) {
      this.store[key] = 0;
    }

    if (checkExistedKey === false && count && count >= 0) {
      this.store[key] = count;
    }

    if (checkExistedKey && count && count >= 0) {
      this.store[key] += count;
    }
  }

  get(key: string): number | undefined {
    return this.store[key] || undefined;
  }

  increase(key: string): void {
    this.store[key] += 1;
  }

  decrease(key: string): void {
    this.store[key] -= 1;
  }
}
