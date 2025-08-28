import Image from 'next/image'
import { clsx } from 'clsx'

type Props = {
  name: string
  type: 'Indoor' | 'Outdoor' | 'Greenhouse'
  thcAPercent: number
  pricePerLb: number
  quantity: number
  description: string
  imageUrl: string
  videoUrl?: string
  coaUrl?: string
  available: boolean
}

export default function StrainCard(props: Props) {
  const {
    name,
    type,
    thcAPercent,
    pricePerLb,
    quantity,
    description,
    imageUrl,
    videoUrl,
    coaUrl,
    available
  } = props

  return (
    <div className={clsx('card overflow-hidden group transition-colors', !available && 'opacity-60')}> 
      <div className="relative aspect-[4/3]">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-wide">
            {type}
          </span>
        </div>
        {!available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="rounded bg-white/10 px-3 py-1 text-sm">Sold Out</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-sm text-white/70">{thcAPercent}% THCa</span>
        </div>
        <p className="text-sm text-white/70 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <span className="font-medium">${pricePerLb.toLocaleString()}/lb</span>
            <span className="text-white/60">{quantity} lbs</span>
          </div>
          <div className="flex items-center gap-2">
            {coaUrl && (
              <a className="button-primary px-3 py-1 text-sm" href={coaUrl} target="_blank" rel="noreferrer">
                COA
              </a>
            )}
            {videoUrl && (
              <a className="rounded-lg border border-white/10 px-3 py-1 text-sm hover:bg-white/5" href={videoUrl} target="_blank" rel="noreferrer">
                Video
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}