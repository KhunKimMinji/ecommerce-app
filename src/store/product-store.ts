type ProductDetail = {
  quantity: number;
  price: number;
  total: number;
};
type ProductStoreType = {
  [productName: string]: ProductDetail;
};

export class ProductStore {
  store: ProductStoreType = {};

  private convertKey(productName: string): string {
    return productName.trim().replace(" ", "_");
  }

  private getUpdateProduct(
    productName: string,
    quantity: number,
    price: number
  ): ProductDetail {
    const updateProduct = this.store[this.convertKey(productName)];
    updateProduct.quantity = quantity;
    updateProduct.price = price;
    updateProduct.total = quantity * price;
    return updateProduct;
  }

  set(productName: string, quantity: number, price: number): void {
    const checkExistedKey: boolean = Object.hasOwn(
      this.store,
      this.convertKey(productName)
    );

    // ถ้าไม่เคยมี product name นี่อยู่ใน store
    // จะ initial value ของ product name นั้นเท่ากับ count ที่ส่งมา
    if (checkExistedKey === false && quantity >= 0) {
      this.store[this.convertKey(productName)] = {
        quantity,
        price,
        total: price * quantity,
      };
    }

    // ถ้าเคยมี product name นี่อยู่ใน store
    // จะ update count ของ product name นั้นๆ
    if (checkExistedKey && quantity >= 0) {
      this.increase(productName, quantity);
    }
  }

  get(productName: string): ProductDetail | undefined {
    return this.store[this.convertKey(productName)] || undefined;
  }

  increase(productName: string, amount: number): void {
    const product = this.store[this.convertKey(productName)];
    const newQuantity = product.quantity + amount;
    const updatedProduct = this.getUpdateProduct(
      productName,
      newQuantity,
      product.price
    );
    console.log("increase:", updatedProduct);
    this.store[this.convertKey(productName)] = updatedProduct;
  }

  remove(productName: string): void {
    delete this.store[this.convertKey(productName)];
  }

  reset(): void {
    this.store = {};
  }
}
