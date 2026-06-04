'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  MapPin, Phone, Clock, ChevronDown, Star,
  Leaf, Flame, Menu, X, ArrowRight, ExternalLink,
} from 'lucide-react'

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    const startTime = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return count
}


// ─── DATA ───────────────────────────────────────────────────────────────────

const HOURS = [
  { days: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
  { days: 'Saturday',        hours: '10:00 AM – 6:00 PM' },
  { days: 'Sunday',          hours: '11:00 AM – 5:00 PM' },
]

type MenuItem = {
  id: number
  name: string
  desc: string
  price: number
  toasted?: boolean
  veg?: boolean
}

const SANDWICHES: MenuItem[] = [
  { id:1,  name:'Meatball',        desc:'Meatballs, marinara sauce and pepper jack cheese',                                               price:16.5, toasted:true },
  { id:2,  name:'Vegi',            desc:'Choice of cheese, avocado, sprouts, cucumber',                                                   price:13.5, veg:true },
  { id:3,  name:'Tony Soprano',    desc:'Salami, ham, mortadella, provolone cheese & Italian dressing',                                   price:16.5 },
  { id:4,  name:'Tom Tom',         desc:'Turkey, bacon and swiss cheese',                                                                  price:16.5 },
  { id:5,  name:'Diyana',          desc:'Pastrami, swiss and thousand island on rye',                                                      price:16,   toasted:true },
  { id:6,  name:'House Combo',     desc:'Turkey, salami, ham and american cheese',                                                         price:16.5 },
  { id:7,  name:'Dog House',       desc:'Pastrami, bacon and swiss cheese',                                                                price:16.5 },
  { id:8,  name:'Porky Pig',       desc:'Ham, bacon and american cheese',                                                                  price:16.5 },
  { id:9,  name:"Speedy's Special",desc:'Chicken breast marinated in honey mustard, BBQ with bacon & cheddar cheese',                    price:17 },
  { id:10, name:'The Bear',        desc:'Roast beef with BBQ sauce and cheddar cheese',                                                    price:16,   toasted:true },
  { id:11, name:'B.L.T.',          desc:'Triple decker of bacon, lettuce and tomatoes',                                                    price:16.5, toasted:true, veg:true },
  { id:12, name:'Illers',          desc:'Hot link with BBQ sauce and cheddar cheese',                                                      price:16,   toasted:true },
  { id:13, name:'Cesar Chavez',    desc:'Chicken breast, bacon, avocado and jack cheese on sourdough roll',                                price:17,   toasted:true, veg:true },
  { id:14, name:'Chef Curry',      desc:'Salami, pastrami and roast beef with cheddar cheese',                                             price:16.5 },
  { id:15, name:'Maui',            desc:'Ham, marinara, pineapple, provolone on a sweet roll',                                             price:16.5, toasted:true },
  { id:16, name:'Mercy Me',        desc:'Chicken breast, marinara sauce and provolone cheese',                                             price:16,   veg:true },
  { id:17, name:'SFSU Gators',     desc:'Chicken breast with BBQ sauce and cheddar cheese',                                                price:16,   toasted:true, veg:true },
  { id:18, name:'Slickster',       desc:'Turkey, choice of cheese and cranberry',                                                          price:16,   toasted:true },
  { id:19, name:'Station 7',       desc:'Chicken breast marinated in honey mustard with pepper jack cheese and avocado on dutch crunch',   price:17,   toasted:true, veg:true },
  { id:20, name:'Gaucho',          desc:"Chicken breast marinated in Frank's Red Hot buffalo wing sauce with ranch or bleu cheese on sourdough roll", price:16, toasted:true, veg:true },
  { id:21, name:'USF Dons',        desc:'Chicken breast, teriyaki sauce and swiss',                                                        price:16,   toasted:true, veg:true },
  { id:22, name:'Boilermaker',     desc:'Chicken breast, ranch dressing, bacon and cheddar',                                               price:16.5, toasted:true, veg:true },
  { id:23, name:'Go Green',        desc:'Chicken breast, pesto sauce and provolone',                                                       price:16,   toasted:true, veg:true },
  { id:24, name:'Silly Philly',    desc:'Sliced roast beef, hot & sweet peppers and provolone (served as is)',                             price:16 },
  { id:25, name:'Sweet Pea',       desc:'Hot & sweet peppers, provolone & pepper jack. Add tofu +$1.50',                                   price:14.5, toasted:true },
  { id:26, name:'Hipster',         desc:'Chicken breast, teriyaki sauce, peanut sauce, pepper jack, sprouts, red onions, tomato and mayo', price:16.5, toasted:true, veg:true },
  { id:27, name:'Golden Gate',     desc:'Chicken breast, teriyaki sauce, pineapple and provolone',                                         price:16.5, toasted:true, veg:true },
  { id:28, name:'Junior',          desc:'Grilled cheese with your choice of bread (served as is)',                                         price:8,    toasted:true },
  { id:29, name:'PBJ',             desc:'Chunky peanut butter and strawberry jam toasted on your choice of bread',                         price:8,    toasted:true },
  { id:30, name:'Ooey Gooey',      desc:'Chunky peanut butter, honey, nutella and marshmallows toasted on a sweet roll',                   price:9,    toasted:true },
  { id:31, name:'Peak Special',    desc:'Pastrami, bacon, avocado with cream cheese',                                                      price:17 },
  { id:32, name:'The Mission',     desc:'Turkey, bacon, avocado with pepper jack cheese and honey mustard',                                price:17 },
]

const SALADS = [
  { name:'Green Salad',          desc:'Lettuce, tomatoes, red onion, pickles, peppers, cucumbers and sprouts with your choice of dressing',          price:13 },
  { name:'Chef Salad',           desc:'Lettuce, pickle, peppers, tomatoes, red onions, sprouts, cucumbers + your choice of two meats & two cheeses', price:16.5 },
  { name:'Tuna or Chicken Salad',desc:'Green salad plus our homemade tuna salad or fresh chicken salad on a bed of greens',                          price:16.5 },
  { name:'Macaroni Salad',       desc:'½ pint of our classic macaroni salad',                                                                         price:4.5 },
  { name:'Potato Salad',         desc:'½ pint of our homemade potato salad',                                                                          price:6.5 },
]

const FAVORITES = [
  { id: 9,  label: 'Most Ordered' },
  { id: 13, label: 'Staff Pick'   },
  { id: 19, label: 'Fan Favorite' },
  { id: 26, label: 'Customer Love'},
  { id: 32, label: 'Must Try'     },
].map(f => ({ ...SANDWICHES.find(s => s.id === f.id)!, label: f.label }))

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Badge({ type }: { type: 'veg' | 'toasted' }) {
  if (type === 'veg') return (
    <span className="inline-flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
      <Leaf className="w-2.5 h-2.5" /> VEG
    </span>
  )
  return (
    <span className="inline-flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
      <Flame className="w-2.5 h-2.5" /> TOASTED
    </span>
  )
}

function SandwichIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* top bun dome */}
      <path d="M7 22 C7 10 41 10 41 22 L41 26 L7 26 Z" fill="#e8a020"/>
      <path d="M7 22 C7 11 41 11 41 22" stroke="#c8881a" strokeWidth="1.2" fill="none"/>
      {/* sesame seeds */}
      <ellipse cx="17" cy="17" rx="2" ry="1" fill="#c8881a" transform="rotate(-20 17 17)"/>
      <ellipse cx="26" cy="15" rx="2" ry="1" fill="#c8881a" transform="rotate(10 26 15)"/>
      <ellipse cx="34" cy="18" rx="1.6" ry="0.9" fill="#c8881a" transform="rotate(-5 34 18)"/>
      {/* lettuce ruffle */}
      <path d="M5 26 Q10 23 15 25 Q20 23 25 25 Q30 23 35 25 Q40 23 43 26 L43 29 Q38 26 33 28 Q28 26 23 28 Q18 26 13 28 Q8 26 5 29 Z" fill="#4caf24"/>
      {/* tomato slice */}
      <rect x="6" y="29" width="36" height="3" rx="1.5" fill="#e03030"/>
      <line x1="14" y1="29" x2="14" y2="32" stroke="#c02020" strokeWidth="0.8"/>
      <line x1="24" y1="29" x2="24" y2="32" stroke="#c02020" strokeWidth="0.8"/>
      <line x1="34" y1="29" x2="34" y2="32" stroke="#c02020" strokeWidth="0.8"/>
      {/* cheese (melting corner) */}
      <path d="M5 32 L43 32 L45 35.5 L3 35.5 Z" fill="#f0c040"/>
      {/* meat patty */}
      <rect x="6" y="35.5" width="36" height="4.5" rx="2" fill="#6b2e10"/>
      <path d="M6 37 Q14 36 24 37.5 Q34 36 42 37" stroke="#7d3815" strokeWidth="0.8" fill="none"/>
      {/* bottom bun */}
      <path d="M5 40 L43 40 L43 43 Q24 46 5 43 Z" fill="#e8a020"/>
      <path d="M5 40 L43 40" stroke="#c8881a" strokeWidth="0.8"/>
    </svg>
  )
}

function SandwichCard({ item }: { item: MenuItem }) {
  return (
    <div className="menu-card bg-white rounded-2xl border border-[#e8e0cc] cursor-default overflow-hidden">
      <div className="flex items-stretch">
        {/* icon column */}
        <div className="w-14 bg-[#1e3a1e] flex flex-col items-center justify-center gap-1 shrink-0 py-4">
          <SandwichIcon className="w-9 h-9" />
          <span className="text-[9px] font-black text-[#f0c040]/60 tracking-wide">#{item.id}</span>
        </div>
        {/* content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-black text-[#1e3a1e] text-base leading-tight">{item.name}</h3>
            <span className="font-black text-xl text-[#1e3a1e] shrink-0">${item.price}</span>
          </div>
          <div className="flex gap-1 mb-2 flex-wrap">
            {item.veg     && <Badge type="veg" />}
            {item.toasted && <Badge type="toasted" />}
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </div>
  )
}

const REVIEWS = [
  { name: 'Emily R.',   rating: 5, date: '2 weeks ago',  text: "Best sandwich shop in San Francisco! The Cesar Chavez is absolutely incredible — avocado, bacon and jack cheese on sourdough. I've been coming here for years and it never disappoints. Huge portions, super friendly staff." },
  { name: 'Marcus L.',  rating: 5, date: '1 month ago',  text: "The Station 7 changed my life. Honey mustard chicken with pepper jack and avocado on Dutch Crunch... perfection. Lines move fast, food is always fresh. This is my go-to lunch spot in the Mission." },
  { name: 'Sofia M.',   rating: 5, date: '3 weeks ago',  text: "Hidden gem! The Hipster sandwich with peanut sauce is surprisingly amazing. Love that they have great vegetarian options too. The Dutch Crunch bread alone is worth coming for. 10/10 will always recommend." },
  { name: 'David K.',   rating: 5, date: '1 month ago',  text: "Tony Soprano is my order every single time — salami, ham, mortadella and provolone with Italian dressing. Tastes like a real Italian deli. Quick service even during lunch rush. Definitely a Mission District staple." },
  { name: 'Anna T.',    rating: 5, date: '2 months ago', text: "I've tried almost half the menu and every sandwich has been incredible. The Meatball with marinara and pepper jack is so good when toasted. Prices are fair for the portion size. Such a great neighborhood spot!" },
  { name: 'Carlos V.',  rating: 5, date: '3 weeks ago',  text: "Hands down the best sandwiches in SF. The Peak Special with pastrami, bacon, avocado and cream cheese is next level. Fast, friendly, and consistently delicious. I recommend Mr. Pickle's to everyone I know." },
]

function GoogleStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-[#fbbc04]' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  )
}

function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)
  const [fading, setFading]   = useState(false)

  const go = (next: number) => {
    setFading(true)
    setTimeout(() => {
      setCurrent((next + REVIEWS.length) % REVIEWS.length)
      setFading(false)
    }, 200)
  }

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(current + 1), 5000)
    return () => clearInterval(id)
  }, [current, paused])

  const r = REVIEWS[current]
  const initials = r.name.split(' ').map(w => w[0]).join('')

  return (
    <div
      className="relative max-w-2xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Card */}
      <div className={`bg-white rounded-2xl shadow-xl border border-[#e8e0cc] p-7 transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Google branding row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4a7c3f] to-[#1e3a1e] flex items-center justify-center text-white font-black text-sm shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-[#1e3a1e] text-sm">{r.name}</p>
              <p className="text-slate-400 text-[11px]">{r.date} · Google Review</p>
            </div>
          </div>
          <svg viewBox="0 0 48 48" className="w-7 h-7 shrink-0" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
        </div>

        <GoogleStars rating={r.rating} />

        <p className="text-slate-600 text-sm leading-relaxed mt-3 min-h-[80px]">"{r.text}"</p>
      </div>

      {/* Prev / Next */}
      <button onClick={() => go(current - 1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-white border border-[#e8e0cc] rounded-full shadow-md flex items-center justify-center text-[#1e3a1e] hover:bg-[#1e3a1e] hover:text-[#f0c040] transition-all">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button onClick={() => go(current + 1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-white border border-[#e8e0cc] rounded-full shadow-md flex items-center justify-center text-[#1e3a1e] hover:bg-[#1e3a1e] hover:text-[#f0c040] transition-all">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {REVIEWS.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-[#1e3a1e]' : 'w-2 h-2 bg-[#1e3a1e]/25 hover:bg-[#1e3a1e]/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState<'specialty' | 'salads' | 'build'>('specialty')
  const [filter, setFilter]       = useState<'all' | 'veg' | 'toasted'>('all')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sandwichCount = useCountUp(32)
  const yearsCount    = useCountUp(30)
  const saladCount    = useCountUp(6)

  const filtered = SANDWICHES.filter(s => {
    if (filter === 'veg')     return s.veg
    if (filter === 'toasted') return s.toasted
    return true
  })

  const scrollToMenu = () => menuRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1e3a1e]/97 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Image src="/logo.png" alt="Mr. Pickle's" width={80} height={66} className="h-10 w-auto object-contain" priority />

          <div className="hidden md:flex items-center gap-6">
            {(['#menu','#salads','#build','#location'] as const).map((href, i) => (
              <a key={href} href={href} className="text-white/80 hover:text-[#f0c040] text-sm font-semibold transition-colors">
                {['Menu','Salads','Build Your Own','Location'][i]}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+14158260143" className="flex items-center gap-2 bg-[#f0c040] hover:bg-[#d4a820] text-[#1e3a1e] font-black text-sm px-4 py-2 rounded-xl transition-colors">
              <Phone className="w-3.5 h-3.5" /> Order Now
            </a>
          </div>

          <button className="md:hidden text-white p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#1e3a1e] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
            {['#menu','#salads','#build','#location'].map((href, i) => (
              <a key={href} href={href} className="text-white/80 text-sm font-semibold py-2 border-b border-white/8"
                onClick={() => setMobileOpen(false)}>
                {['🥪 Menu','🥗 Salads','🛠️ Build Your Own','📍 Location'][i]}
              </a>
            ))}
            <a href="tel:+14158260143" className="flex items-center justify-center gap-2 bg-[#f0c040] text-[#1e3a1e] font-black text-sm px-4 py-3 rounded-xl mt-1">
              <Phone className="w-4 h-4" /> Call to Order
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero-bg.jpg" alt="Delicious sandwiches" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a1e]/80 via-[#1e3a1e]/60 to-[#1e3a1e]/85" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="float mb-6">
            <Image src="/logo.png" alt="Mr. Pickle's" width={140} height={116} className="mx-auto h-28 w-auto drop-shadow-2xl" priority />
          </div>
          <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-4" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>
            Mr. Pickle's<br />
            <span className="text-[#f0c040]">Sandwich Shop</span>
          </h1>
          <p className="text-white/75 text-lg sm:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
            Handcrafted sandwiches made fresh daily in the heart of San Francisco's Mission District.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={scrollToMenu}
              className="flex items-center justify-center gap-2 bg-[#f0c040] hover:bg-[#d4a820] text-[#1e3a1e] font-black text-base px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl">
              View Full Menu <ArrowRight className="w-5 h-5" />
            </button>
            <a href="tel:+14158260143"
              className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-base px-8 py-4 rounded-2xl backdrop-blur-sm transition-all">
              <Phone className="w-5 h-5" /> (415) 826-0143
            </a>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { n: sandwichCount, label: 'Specialty Sandwiches', suffix: '+' },
              { n: saladCount,    label: 'Fresh Salads',          suffix: '' },
              { n: yearsCount,    label: 'Years in the Mission',  suffix: '+' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-4xl text-[#f0c040]" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>
                  {s.n}{s.suffix}
                </p>
                <p className="text-white/60 text-xs font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={scrollToMenu} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* ── ORDER SECTION ── */}
      <div className="bg-[#faf7ee] border-b border-[#e8e0cc] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#1e3a1e] text-2xl mb-6" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>
            Order Your Way
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* ── PICKUP (PRINCIPAL) ── */}
            <div className="sm:col-span-2 relative bg-[#1e3a1e] rounded-2xl p-6 overflow-hidden shadow-xl">
              {/* decorative background circles */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#f0c040]/10 rounded-full pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#f0c040]/8 rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#f0c040] text-[#1e3a1e] text-[10px] font-black px-2.5 py-1 rounded-full tracking-widest uppercase">
                    Recomendado
                  </span>
                </div>
                <h3 className="text-white text-2xl mt-2" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>
                  Pickup en tienda
                </h3>
                <p className="text-white/60 text-sm mt-1 mb-5">
                  Listo en ~10 minutos · Sin cargos adicionales · Siempre fresco
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+14158260143"
                    className="flex items-center justify-center gap-2.5 bg-[#f0c040] hover:bg-[#d4a820] text-[#1e3a1e] font-black text-base px-6 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg">
                    <Phone className="w-5 h-5" />
                    (415) 826-0143
                  </a>
                  <a href="#location"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-all">
                    <MapPin className="w-4 h-4 text-[#f0c040]" />
                    3380 20th St, SF
                  </a>
                </div>
              </div>
            </div>

            {/* ── DELIVERY APPS ── */}
            <div className="flex flex-col gap-3">
              <a href="https://www.doordash.com/search/store/mr%20pickles%20san%20francisco/"
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center gap-3 bg-white border border-[#e8e0cc] hover:border-[#ff3008] hover:shadow-md rounded-2xl px-5 py-4 transition-all group">
                <div className="w-10 h-10 bg-[#ff3008] rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 4.5c4.14 0 7.5 3.36 7.5 7.5s-3.36 7.5-7.5 7.5S4.5 16.14 4.5 12 7.86 4.5 12 4.5z"/></svg>
                </div>
                <div>
                  <p className="font-bold text-[#1e3a1e] text-sm">DoorDash</p>
                  <p className="text-slate-400 text-xs">Delivery a domicilio</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#ff3008] ml-auto transition-colors" />
              </a>

              <a href="https://www.ubereats.com/search?q=mr+pickles+san+francisco"
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center gap-3 bg-white border border-[#e8e0cc] hover:border-[#142328] hover:shadow-md rounded-2xl px-5 py-4 transition-all group">
                <div className="w-10 h-10 bg-[#142328] rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.75 17.25H6v-1.5h5.25V7.5H6V6h6.75v11.25z"/></svg>
                </div>
                <div>
                  <p className="font-bold text-[#1e3a1e] text-sm">Uber Eats</p>
                  <p className="text-slate-400 text-xs">Delivery a domicilio</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#142328] ml-auto transition-colors" />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ── FAN FAVORITES ── */}
      <div className="bg-[#1e3a1e] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#f0c040] text-[#f0c040]" />
              ))}
            </div>
            <h2 className="text-white text-2xl" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>
              Fan Favorites
            </h2>
            <span className="text-white/35 text-sm hidden sm:block">— most ordered by our customers</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {FAVORITES.map((item, i) => (
              <div key={item.id} className="fav-card shrink-0 w-56 bg-white/5 border border-[#f0c040]/25 rounded-2xl overflow-hidden fade-up"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="bg-[#f0c040]/10 border-b border-[#f0c040]/20 px-4 py-2 flex items-center gap-2">
                  <Star className="w-3 h-3 fill-[#f0c040] text-[#f0c040]" />
                  <span className="text-[#f0c040] text-[10px] font-black tracking-widest uppercase">{item.label}</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="text-white font-bold text-sm leading-tight">{item.name}</h3>
                    <span className="text-[#f0c040] font-black text-base shrink-0 ml-2">${item.price}</span>
                  </div>
                  <div className="flex gap-1 mb-2 flex-wrap">
                    {item.veg     && <Badge type="veg" />}
                    {item.toasted && <Badge type="toasted" />}
                  </div>
                  <p className="text-white/50 text-[11px] leading-relaxed line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MENU ── */}
      <div ref={menuRef} id="menu" className="bg-[#faf7ee]">

        {/* Sticky tabs */}
        <div className="sticky top-16 z-40 bg-[#1e3a1e] shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center overflow-x-auto scrollbar-none gap-1 py-1">
              {([
                { key: 'specialty', label: '🥪 Specialty Sandwiches' },
                { key: 'salads',    label: '🥗 Salads' },
                { key: 'build',     label: '🛠️ Build Your Own' },
              ] as const).map(tab => (
                <button key={tab.key} onClick={() => { setActiveTab(tab.key); setFilter('all') }}
                  className={`shrink-0 px-5 py-3.5 text-sm font-bold transition-all rounded-none border-b-3 ${
                    activeTab === tab.key
                      ? 'text-[#f0c040] border-[#f0c040] border-b-[3px]'
                      : 'text-white/60 hover:text-white border-transparent border-b-[3px]'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── SPECIALTY SANDWICHES ── */}
        {activeTab === 'specialty' && (
          <section key="specialty" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#1e3a1e] rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                  <SandwichIcon className="w-9 h-9" />
                </div>
                <div>
                  <h2 className="text-3xl text-[#1e3a1e]" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>Specialty Sandwiches</h2>
                  <p className="text-slate-500 text-sm mt-1">All sandwiches come with your choice of condiments</p>
                </div>
              </div>
              {/* Filter */}
              <div className="flex gap-2">
                {(['all','veg','toasted'] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      filter === f
                        ? 'bg-[#1e3a1e] text-[#f0c040]'
                        : 'bg-white border border-[#e8e0cc] text-slate-600 hover:border-[#1e3a1e]'
                    }`}>
                    {f === 'all' ? 'All' : f === 'veg' ? '🌿 Veg' : '🔥 Toasted'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item, i) => (
                <div key={item.id} className="fade-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <SandwichCard item={item} />
                </div>
              ))}
            </div>

            <div className="mt-6 bg-[#1e3a1e]/5 border border-[#1e3a1e]/15 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-2">
              <span className="text-base">ℹ️</span>
              <span>Chicken breast may be substituted with tofu. Meatball may be substituted with falafel. Bacon may be substituted with veggie bacon. <strong>If you have a food allergy, please notify us.</strong></span>
            </div>
          </section>
        )}

        {/* ── SALADS ── */}
        {activeTab === 'salads' && (
          <section key="salads" id="salads" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 slide-up">
            <div className="mb-8">
              <h2 className="text-3xl text-[#1e3a1e]" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>Fresh Salads</h2>
              <p className="text-slate-500 text-sm mt-1">Made fresh daily with crisp, quality ingredients</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {SALADS.map((s, i) => (
                <div key={s.name} className="menu-card bg-white rounded-2xl p-5 border border-[#e8e0cc] fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="font-black text-[#1e3a1e] text-base leading-tight">{s.name}</h3>
                    <span className="font-black text-xl text-[#1e3a1e] shrink-0">${s.price}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Dressing options */}
            <div className="bg-[#1e3a1e] rounded-2xl p-6 text-white">
              <h3 className="font-black text-[#f0c040] text-lg mb-3">Choice of Dressing</h3>
              <div className="flex flex-wrap gap-2">
                {['Ranch','Honey Mustard','Thousand Island','Bleu Cheese','Italian','Oil & Vinegar'].map(d => (
                  <span key={d} className="bg-white/10 border border-white/20 text-white/85 text-xs font-semibold px-3 py-1.5 rounded-full">{d}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BUILD YOUR OWN ── */}
        {activeTab === 'build' && (
          <section key="build" id="build" className="max-w-5xl mx-auto px-4 sm:px-6 py-10 slide-up">
            <div className="mb-8 flex items-end gap-4">
              <div>
                <h2 className="text-3xl text-[#1e3a1e]" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>Build Your Own</h2>
                <p className="text-slate-500 text-sm mt-1">Start with a base and customize to your taste</p>
              </div>
              <div className="bg-[#f0c040] text-[#1e3a1e] font-black text-2xl px-5 py-2 rounded-2xl mb-0.5">$12</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Choice of Meat */}
              <BuildSection title="Choice of Meat" color="green" items={[
                { name:'Turkey' }, { name:'Roast Beef' }, { name:'Ham' }, { name:'Pastrami' },
                { name:'Tuna Salad' }, { name:'Salami', note:'+$0.50' }, { name:'Chicken Breast', note:'+$0.50' },
                { name:'Mortadella' }, { name:'Chicken Salad' },
              ]} />

              {/* Cheese */}
              <BuildSection title="Add Cheese" color="yellow" subtitle="$1.50 each" items={[
                { name:'American' }, { name:'Jack' }, { name:'Pepper Jack' },
                { name:'Cheddar' }, { name:'Swiss' }, { name:'Provolone' },
              ]} />

              {/* Bread */}
              <BuildSection title="Choice of Bread" color="green" items={[
                { name:'Dutch Crunch' }, { name:'Wheat Roll' }, { name:'Sliced Wheat' }, { name:'Sweet Roll' },
                { name:'Sliced Rye' }, { name:'Sliced Sourdough' }, { name:'Sourdough Roll' }, { name:'Gluten-Free Bread' },
              ]} />

              {/* Condiments */}
              <BuildSection title="Condiments" color="yellow" subtitle="Included with every sandwich" items={[
                { name:'Mayo' }, { name:'Mustard' }, { name:'Tomatoes' }, { name:'Pepperoncini' },
                { name:'Pesto' }, { name:'Pickles' }, { name:'Lettuce' }, { name:'Red Onions' },
              ]} />
            </div>

            {/* Add Extras */}
            <div className="mt-5 bg-white border border-[#e8e0cc] rounded-2xl p-6">
              <h3 className="font-black text-[#1e3a1e] text-lg mb-4">Add Extras</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  { name:'Extra Meat', price:'$5.00' }, { name:'Bacon', price:'$3.00' },
                  { name:'Avocado', price:'$3.00' }, { name:'Blue Cheese', price:'$0.75' },
                  { name:'Pineapple', price:'$1.50' }, { name:'Cucumber', price:'$0.75' },
                  { name:'Sprouts', price:'$0.75' }, { name:'BBQ Sauce', price:'$0.75' },
                  { name:'Ranch', price:'$0.75' }, { name:'Honey Mustard', price:'$0.75' },
                  { name:'Cranberry Sauce', price:'$1.00' }, { name:"Frank's Hot Sauce", price:'$0.75' },
                  { name:'Hot & Sweet Peppers', price:'$0.75' }, { name:'Thousand Island', price:'$0.75' },
                  { name:'Oil & Vinegar', price:'FREE' }, { name:'Dijon Mustard', price:'FREE' },
                  { name:'Jalapeños', price:'FREE' },
                ].map(e => (
                  <div key={e.name} className="flex items-center justify-between bg-[#faf7ee] rounded-xl px-3 py-2 border border-[#e8e0cc]">
                    <span className="text-slate-700 text-xs font-medium">{e.name}</span>
                    <span className={`text-xs font-black ml-2 shrink-0 ${e.price === 'FREE' ? 'text-green-600' : 'text-[#1e3a1e]'}`}>{e.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-[#f0c040]/20 border border-[#f0c040]/50 rounded-2xl p-4 text-center">
              <p className="font-black text-[#1e3a1e] text-base">🔥 Would you like your sandwich toasted?</p>
              <p className="text-slate-600 text-sm mt-1">Just ask when you order — no extra charge!</p>
            </div>
          </section>
        )}
      </div>

      {/* ── REVIEWS ── */}
      <section className="bg-[#faf7ee] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <GoogleStars rating={5} />
              <span className="text-[#1e3a1e] font-bold text-sm">4.7 · 200+ Google Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl text-[#1e3a1e]" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>
              What Our Customers Say
            </h2>
            <p className="text-slate-500 text-sm mt-1">Real reviews from our regulars in the Mission</p>
          </div>

          <ReviewCarousel />

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <a href="https://maps.app.goo.gl/rkXJxKVHLMWjKxAU7"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-white border-2 border-[#e8e0cc] hover:border-[#1e3a1e] text-[#1e3a1e] font-bold text-sm px-6 py-3 rounded-xl transition-all hover:shadow-md">
              <svg viewBox="0 0 48 48" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Ver en Google
            </a>
            <a href="https://maps.app.goo.gl/rkXJxKVHLMWjKxAU7"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#1e3a1e] hover:bg-[#2d5a27] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all hover:shadow-md">
              <Star className="w-4 h-4 fill-[#f0c040] text-[#f0c040]" />
              Dejar Reseña
            </a>
          </div>
        </div>
      </section>

      {/* ── LOCATION & HOURS ── */}
      <section id="location" className="bg-[#1e3a1e] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-white mb-2" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700 }}>Find Us</h2>
            <p className="text-white/60">Come visit us in the heart of the Mission District</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-72 lg:h-96 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.5!2d-122.4194!3d37.7595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e3c6b9c1a1d%3A0x0!2s3380+20th+St%2C+San+Francisco%2C+CA+94110!5e0!3m2!1sen!2sus!4v1"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Mr. Pickle's Location"
              />
            </div>

            {/* Info */}
            <div className="space-y-5">
              <div className="bg-white/8 border border-white/12 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#f0c040] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#1e3a1e]" />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg">San Francisco</p>
                    <p className="text-white/70 text-sm mt-1">3380 20th Street<br />San Francisco, CA 94110</p>
                    <a href="https://maps.google.com/?q=3380+20th+St+San+Francisco+CA"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#f0c040] text-xs font-bold mt-2 hover:underline">
                      Get Directions <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/8 border border-white/12 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#f0c040] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#1e3a1e]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-white text-lg mb-3">Hours</p>
                    {HOURS.map(h => (
                      <div key={h.days} className="flex justify-between items-center border-b border-white/10 py-2 last:border-0">
                        <span className="text-white/70 text-sm">{h.days}</span>
                        <span className="font-bold text-[#f0c040] text-sm">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/8 border border-white/12 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#f0c040] rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#1e3a1e]" />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg">Contact</p>
                    <a href="tel:+14158260143" className="text-[#f0c040] text-xl font-black hover:underline block mt-1">(415) 826-0143</a>
                    <p className="text-white/50 text-xs mt-1">Call ahead for large orders</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0f2010] py-10 px-4 text-center">
        <Image src="/logo.png" alt="Mr. Pickle's" width={70} height={58} className="mx-auto h-14 w-auto mb-4 opacity-80" />
        <p className="text-white/40 text-sm">© 2024 Mr. Pickle's Sandwich Shop · San Francisco, CA</p>
        <p className="text-white/25 text-xs mt-1">3380 20th Street · (415) 826-0143</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#menu"     className="text-white/40 hover:text-[#f0c040] text-xs transition-colors">Menu</a>
          <a href="#location" className="text-white/40 hover:text-[#f0c040] text-xs transition-colors">Location</a>
          <a href="tel:+14158260143" className="text-white/40 hover:text-[#f0c040] text-xs transition-colors">Call Us</a>
        </div>
      </footer>

    </div>
  )
}

// ─── BUILD SECTION COMPONENT ─────────────────────────────────────────────────

function BuildSection({
  title, subtitle, color, items,
}: {
  title: string
  subtitle?: string
  color: 'green' | 'yellow'
  items: { name: string; note?: string }[]
}) {
  return (
    <div className={`rounded-2xl p-5 border ${color === 'green' ? 'bg-[#1e3a1e] border-[#2d5a27]' : 'bg-[#f0c040]/10 border-[#f0c040]/30'}`}>
      <div className="mb-3">
        <h3 className={`font-black text-base ${color === 'green' ? 'text-[#f0c040]' : 'text-[#1e3a1e]'}`}>{title}</h3>
        {subtitle && <p className={`text-xs mt-0.5 ${color === 'green' ? 'text-white/50' : 'text-slate-500'}`}>{subtitle}</p>}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map(item => (
          <span key={item.name} className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
            color === 'green'
              ? 'bg-white/10 text-white/85'
              : 'bg-[#1e3a1e]/10 text-[#1e3a1e]'
          }`}>
            {item.name}{item.note && <span className="ml-1 opacity-70">{item.note}</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
