import StrainCard from '@/components/StrainCard'

const mockCore = [
  {
    name: 'Emerald Cloud',
    type: 'Indoor' as const,
    thcAPercent: 27.3,
    pricePerLb: 950,
    quantity: 42,
    description: 'Dense frosty buds with bright pine and citrus. Clean smooth burn.',
    imageUrl: 'https://images.unsplash.com/photo-1670950865321-35cb201306aa?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    coaUrl: '#',
    available: true
  },
  {
    name: 'River Sage',
    type: 'Greenhouse' as const,
    thcAPercent: 23.9,
    pricePerLb: 780,
    quantity: 65,
    description: 'Herbal earth and gas with a balanced uplifting effect.',
    imageUrl: 'https://images.unsplash.com/photo-1616400619175-5beda3a1788b?q=80&w=1200&auto=format&fit=crop',
    available: true
  }
]

const mockRotating = [
  {
    name: 'Suncrest Gelato',
    type: 'Outdoor' as const,
    thcAPercent: 21.5,
    pricePerLb: 520,
    quantity: 0,
    description: 'Limited harvest drop with creamy berry notes and bright finish.',
    imageUrl: 'https://images.unsplash.com/photo-1534801022022-6e319a11f249?q=80&w=1200&auto=format&fit=crop',
    available: false
  }
]

export default function CatalogPage() {
  return (
    <main className="container py-10 space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Catalog</h1>
          <p className="text-white/60">Invite-only selections for approved buyers</p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5">Logout</button>
        </form>
      </header>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-medium">Core Selections (Available Regularly)</h2>
          <p className="text-sm text-white/60">Staples you can rely on</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCore.map((item) => (
            <StrainCard key={item.name} {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-medium">Rotating Harvests (Limited)</h2>
          <p className="text-sm text-white/60">Small batch limited drops</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRotating.map((item) => (
            <StrainCard key={item.name} {...item} />
          ))}
        </div>
      </section>
    </main>
  )
}