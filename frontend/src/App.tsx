import { useEffect, useState } from 'react'

type Category = {
  id: number
  name: string
  slug: string
  is_active: boolean
}

type ProductImage = {
  id: number
  image_url: string
  cloudinary_public_id: string
  is_primary: boolean
  product: number
}

type Product = {
  id: number
  name: string
  slug: string
  description: string
  price: string
  stock: number
  is_active: boolean
  is_featured: boolean
  created_at: string
  category: Category
  images: ProductImage[]
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
  fetch('http://127.0.0.1:8001/api/categories/')
    .then((res) => res.json())
    .then((data) => {
      console.log('CATEGORIAS:', data)
      setCategories(data)
    })
    .catch((err) => console.error('Erro ao carregar categorias:', err))
}, [])

useEffect(() => {
  const url = selectedCategory
    ? `http://127.0.0.1:8001/api/products/?category=${selectedCategory}`
    : 'http://127.0.0.1:8001/api/products/'

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log('PRODUTOS:', data)
      setProducts(data)
    })
    .catch((err) => console.error('Erro ao carregar produtos:', err))
}, [selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">Loja de Artesanato</h1>
          <button className="rounded-lg bg-black px-4 py-2 text-white">
            Carrinho
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Nossos produtos</h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('')}
              className={`rounded-full border px-4 py-2 text-sm ${
                selectedCategory === ''
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              }`}
            >
              Todos
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  selectedCategory === category.slug
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex h-48 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                Sem imagem
              </div>

              <p className="mb-1 text-sm text-gray-500">{product.category.name}</p>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{product.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <strong className="text-lg">R$ {product.price}</strong>
                <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">
                  Ver produto
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}