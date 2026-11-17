export interface Editor {
  id: number
  studio: string
  name: string
  role: string
  cover: "one" | "two" | "three"
  chip: string
  tags: string[]
  price: string
  rating: string
  reviews: number
  search: string
  category: string
  budget: "low" | "mid" | "high"
  turnaround: "fast" | "standard" | "relaxed"
}

export const editors: Editor[] = [
  {
    id: 1,
    studio: "Alya Studio",
    name: "Alya Prameswari",
    role: "Beauty & lifestyle video editor · Jakarta",
    cover: "one",
    chip: "Top Match",
    tags: ["Beauty", "Reels", "Soft Aesthetic"],
    price: "Rp650K",
    rating: "4.9",
    reviews: 38,
    search: "alya studio beauty reels soft aesthetic",
    category: "beauty reels",
    budget: "mid",
    turnaround: "standard",
  },
  {
    id: 2,
    studio: "Raka Motion",
    name: "Raka Mahendra",
    role: "Commercial & cinematic editor · Surabaya",
    cover: "two",
    chip: "Cinematic",
    tags: ["Cinematic", "Product", "Ads"],
    price: "Rp1.2M",
    rating: "4.8",
    reviews: 27,
    search: "raka motion cinematic product ads",
    category: "cinematic ads",
    budget: "high",
    turnaround: "relaxed",
  },
  {
    id: 3,
    studio: "Nadia Cut",
    name: "Nadia Putri",
    role: "Short-form social editor · Bandung",
    cover: "three",
    chip: "Fast Delivery",
    tags: ["TikTok Ads", "Reels", "UGC"],
    price: "Rp350K",
    rating: "4.7",
    reviews: 51,
    search: "nadia cut tiktok reels social content",
    category: "reels ads",
    budget: "low",
    turnaround: "fast",
  },
]
