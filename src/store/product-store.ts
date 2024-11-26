import _ from 'lodash'

// โครงสร้างข้อมูลของสินค้าแต่ละรายการ
type ProductDetail = {
  name: string // ชื่อสินค้า (รูปแบบ kebab-case)
  price: number // ราคาต่อชิ้น
  quantity: number // จำนวนสินค้า
  total: number // ราคารวม (quantity * price)
}

// โครงสร้างของ store ที่ใช้เก็บสินค้า โดย key เป็นชื่อสินค้า และ value เป็นข้อมูลสินค้า
type ProductStoreType = {
  [productName: string]: ProductDetail
}

export class ProductStore {
  // ตัวแปร store ที่ใช้เก็บข้อมูลสินค้าในระบบ
  store: ProductStoreType = {}

  // ฟังก์ชันแปลงชื่อสินค้าให้เป็น kebab-case เพื่อให้เป็นมาตรฐาน
  private convertKey(productName: string): string {
    return _.kebabCase(productName) // ใช้ lodash ในการแปลง
  }

  // ฟังก์ชันอัปเดตรายละเอียดสินค้าตามชื่อสินค้า, จำนวน, และราคา
  private getUpdateProduct(
    productName: string,
    price: number,
    quantity: number
  ): ProductDetail {
    const updateProduct = this.store[this.convertKey(productName)] // ดึงข้อมูลสินค้าจาก store
    updateProduct.price = price // อัปเดตราคาสินค้า
    updateProduct.quantity = quantity // อัปเดตจำนวนสินค้า
    updateProduct.total = quantity * price // อัปเดตราคารวม
    return updateProduct // คืนค่าข้อมูลสินค้าที่อัปเดตแล้ว
  }

  // ฟังก์ชันเพิ่มหรืออัปเดตสินค้าใน store
  set(productName: string, price: number, quantity: number): void {
    const checkExistedKey: boolean = Object.hasOwn(
      this.store,
      this.convertKey(productName) // ตรวจสอบว่าสินค้าชื่อนี้มีใน store หรือไม่
    )

    // กรณีสินค้าใหม่ที่ยังไม่มีใน store และจำนวนมากกว่าหรือเท่ากับ 0
    if (checkExistedKey === false && quantity >= 0) {
      this.store[this.convertKey(productName)] = {
        name: this.convertKey(productName),
        price,
        quantity,
        total: price * quantity // คำนวณราคารวม
      }
    }

    // กรณีสินค้ามีอยู่แล้วใน store และจำนวนมากกว่าหรือเท่ากับ 0
    if (checkExistedKey && quantity >= 0) {
      this.increase(productName, quantity) // เพิ่มจำนวนสินค้า
    }
  }

  // ฟังก์ชันดึงข้อมูลสินค้าโดยใช้ชื่อสินค้า
  get(productName: string): ProductDetail | undefined {
    return this.store[this.convertKey(productName)] || undefined // คืนค่าข้อมูลสินค้าหรือ undefined หากไม่พบ
  }

  // ฟังก์ชันเพิ่มจำนวนสินค้าใน store
  increase(productName: string, amount: number): void {
    const product = this.store[this.convertKey(productName)] // ดึงข้อมูลสินค้าจาก store
    const newQuantity = product.quantity + amount // คำนวณจำนวนใหม่
    const updatedProduct = this.getUpdateProduct(
      productName,
      product.price, // ใช้ราคาสินค้าเดิม
      newQuantity
    )
    this.store[this.convertKey(productName)] = updatedProduct // อัปเดตข้อมูลสินค้าใน store
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
      .entries()
      .map(([key, value]) => value.total)
      .sum()

    // const productList = Object.entries(this.store);
    // const totalList = productList.map(
    //   ([key, value]) => value.total
    // );
    // const sum = _.sum(totalList);
    // return sum;
  }
}
