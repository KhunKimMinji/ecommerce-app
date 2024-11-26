import _ from 'lodash'

// โครงสร้างข้อมูลของสินค้าแต่ละรายการ
type ProductDetail = {
  name: string
  price: number
  quantity: number
  total: number
}

// โครงสร้างของ store ที่ใช้เก็บสินค้า โดย key เป็นชื่อสินค้า และ value เป็นข้อมูลสินค้า
type ProductStoreType = {
  [productName: string]: ProductDetail
}

export class ProductStore {
  // ตัวแปร store ที่ใช้เก็บข้อมูลสินค้าในระบบ
  store: ProductStoreType = {}

  private convertKey(productName: string): string {
    return _.kebabCase(productName)
  }

  // ฟังก์ชันอัปเดตรายละเอียดสินค้าตามชื่อสินค้า, จำนวน, และราคา กรณีที่มี key อยู่แล้ว
  private getUpdateProduct(
    productName: string,
    price: number,
    quantity: number
  ): ProductDetail {
    const updateProduct = this.store[this.convertKey(productName)] // ดึงข้อมูลสินค้าจาก store
    updateProduct.price = price
    updateProduct.quantity = quantity
    updateProduct.total = quantity * price
    return updateProduct // คืนค่าข้อมูลสินค้าที่อัปเดตแล้ว
  }

  // ฟังก์ชันเพิ่มหรืออัปเดตสินค้าใน store
  set(productName: string, price: number, quantity: number): void {
    // ตรวจสอบว่าสินค้าชื่อนี้มีใน store หรือไม่
    const checkExistedKey: boolean = Object.hasOwn(
      this.store,
      this.convertKey(productName)
    )

    // กรณีสินค้าใหม่ที่ยังไม่มีใน store และจำนวนมากกว่าหรือเท่ากับ 0
    if (checkExistedKey === false && quantity >= 0) {
      this.store[this.convertKey(productName)] = {
        name: this.convertKey(productName),
        price,
        quantity,
        total: price * quantity
      }
    }

    // กรณีสินค้ามีอยู่แล้วใน store และจำนวนมากกว่าหรือเท่ากับ 0
    if (checkExistedKey && quantity >= 0) {
      this.increase(productName, quantity)
    }
  }

  // ฟังก์ชันดึงข้อมูลสินค้าโดยใช้ชื่อสินค้า
  get(productName: string): ProductDetail | undefined {
    return this.store[this.convertKey(productName)] || undefined // คืนค่าข้อมูลสินค้าหรือ undefined หากไม่พบ
  }

  // ฟังก์ชันเพิ่มจำนวนสินค้าใน store
  increase(productName: string, quantityAdded: number): void {
    const product = this.store[this.convertKey(productName)]
    const newQuantity = product.quantity + quantityAdded
    const updatedProduct = this.getUpdateProduct(
      productName,
      product.price,
      newQuantity
    )
    this.store[this.convertKey(productName)] = updatedProduct
  }

  // ฟังก์ชันลบสินค้าออกจาก store
  remove(productName: string): void {
    delete this.store[this.convertKey(productName)] // ใช้ delete ลบ key ใน store
  }

  // ฟังก์ชันรีเซ็ต store (ลบข้อมูลสินค้าทั้งหมด)
  reset(): void {
    this.store = {} // ตั้งค่า store ให้เป็น object ว่าง
  }

  sum(): number {
    return _(this.store)
      .entries() //ทำ array จาก object ให้เป็น tuple
      .map(([key, value]) => value.total)
      .sum()
  }
}
