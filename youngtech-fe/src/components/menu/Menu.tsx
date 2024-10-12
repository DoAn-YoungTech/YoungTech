"use client"
import { useRouter } from 'next/navigation'

// Dữ liệu categories đã được khai báo
const categories = [
  {
    id: 1,
    name: "Tivi",
    subcategories: [
      {
        id: 1.1,
        name: "LG",
        products: [
          { id: 1.11, name: "LG OLED 55 inch", price: 12000000 },
          { id: 1.12, name: "LG NanoCell 65 inch", price: 15000000 },
        ],
      },
      {
        id: 1.2,
        name: "Samsung",
        products: [
          { id: 1.21, name: "Samsung QLED 50 inch", price: 13000000 },
          { id: 1.22, name: "Samsung 4K UHD 70 inch", price: 18000000 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "dienthoai",
    subcategories: [
      {
        id: 2.1,
        name: "Oppo",
        products: [
          { id: 2.11, name: "Oppo Reno 6", price: 8000000 },
          { id: 2.12, name: "Oppo Find X3", price: 10000000 },
        ],
      },
      {
        id: 2.2,
        name: "iPhone",
        products: [
          { id: 2.21, name: "iPhone 13", price: 20000000 },
          { id: 2.22, name: "iPhone 14 Pro Max", price: 30000000 },
        ],
      },
    ],
  },
];

const Menu = () => {
  const router = useRouter()

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => router.push(`/product/${category.name.toLowerCase()}`)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu
