'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  MapPin, Phone, Clock, ChevronDown,
  Leaf, Flame, Menu, X, ArrowRight, ExternalLink,
} from 'lucide-react'

function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function FbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.273h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
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
  tags?: string[]
}

const SANDWICHES: MenuItem[] = [
  { id:1,  name:'Meatball',       desc:'Meatballs, marinara sauce and pepper jack cheese',                                              price:14,   toasted:true },
  { id:2,  name:'Vegi',           desc:'Choice of cheese, avocado, sprouts, cucumber',                                                  price:12,   veg:true },
  { id:3,  name:'Tony Soprano',   desc:'Salami, ham, mortadella, provolone cheese & Italian dressing',                                  price:14 },
  { id:4,  name:'Tom Tom',        desc:'Turkey, bacon and swiss cheese',                                                                 price:15 },
  { id:5,  name:'Diyana',         desc:'Pastrami, swiss and thousand island on rye',                                                     price:14,  toasted:true },
  { id:6,  name:'House Combo',    desc:'Turkey, salami, ham and american cheese',                                                        price:14 },
  { id:7,  name:'Dog House',      desc:'Pastrami, bacon and swiss cheese',                                                               price:15 },
  { id:8,  name:'Porky Pig',      desc:'Ham, bacon and american cheese',                                                                 price:15 },
  { id:9,  name:"Speedy's Special",desc:'Chicken breast marinated in honey mustard, BBQ with bacon & cheddar cheese',                   price:15.5 },
  { id:10, name:'The Bear',       desc:'Roast beef with BBQ sauce and cheddar cheese',                                                   price:14,  toasted:true },
  { id:11, name:'B.L.T.',         desc:'Triple decker of bacon, lettuce and tomatoes',                                                   price:15,  toasted:true, veg:true },
  { id:12, name:'Illers',         desc:'Hot link with BBQ sauce and cheddar cheese',                                                     price:14,  toasted:true },
  { id:13, name:'Cesar Chavez',   desc:'Chicken breast, bacon, avocado and jack cheese on sourdough roll',                               price:15.5, toasted:true, veg:true },
  { id:14, name:'Chef Curry',     desc:'Salami, pastrami and roast beef with cheddar cheese',                                            price:15.5 },
  { id:15, name:'Maui',           desc:'Ham, marinara, pineapple, provolone on a sweet roll',                                            price:14,  toasted:true },
  { id:16, name:'Mercy Me',       desc:'Chicken breast, marinara sauce and provolone cheese',                                            price:14 },
  { id:17, name:'SFSU Gators',    desc:'Chicken breast with BBQ sauce and cheddar cheese',                                               price:14,  toasted:true, veg:true },
  { id:18, name:'Slickster',      desc:'Turkey, choice of cheese and cranberry',                                                         price:14.5, toasted:true },
  { id:19, name:'Station 7',      desc:'Chicken breast marinated in honey mustard with pepper jack cheese and avocado on dutch crunch',  price:15.5, toasted:true, veg:true },
  { id:20, name:'Gaucho',         desc:"Chicken breast marinated in Frank's Red Hot buffalo wing sauce with ranch or bleu cheese on sourdough roll", price:14, toasted:true },
  { id:21, name:'USF Dons',       desc:'Chicken breast, teriyaki sauce and swiss',                                                       price:14,  toasted:true, veg:true },
  { id:22, name:'Boilermaker',    desc:'Chicken breast, ranch dressing, bacon and cheddar',                                              price:15.5, toasted:true, veg:true },
  { id:23, name:'Go Green',       desc:'Chicken breast, pesto sauce and provolone',                                                      price:14,  toasted:true, veg:true },
  { id:24, name:'Silly Philly',   desc:'Sliced roast beef, hot & sweet peppers and provolone (served as is)',                            price:14 },
  { id:25, name:'Sweet Pea',      desc:'Hot & sweet peppers, provolone & pepper jack. Add tofu +$1.50',                                  price:13,  toasted:true },
  { id:26, name:'Hipster',        desc:'Chicken breast, teriyaki sauce, peanut sauce, pepper jack, sprouts, red onions, tomato and mayo', price:15,  toasted:true, veg:true },
  { id:27, name:'Golden Gate',    desc:'Chicken breast, teriyaki sauce, pineapple and provolone',                                         price:14.5, toasted:true, veg:true },
  { id:28, name:'Junior',         desc:'Grilled cheese with your choice of bread (served as is)',                                         price:6.5, toasted:true },
  { id:29, name:'PBJ',            desc:'Chunky peanut butter and strawberry jam toasted on your choice of bread',                         price:6.5, toasted:true },
  { id:30, name:'Ooey Gooey',     desc:'Chunky peanut butter, honey, nutella and marshmallows toasted on a sweet roll',                   price:8,   toasted:true },
  { id:31, name:'Peak Special',   desc:'Pastrami, bacon, avocado with cream cheese',                                                      price:15.5 },
  { id:32, name:'The Mission',    desc:'Turkey, bacon, avocado with pepper jack cheese and honey mustard',                                price:15.5 },
]

const SALADS = [
  { name:'Green Salad',    desc:'Lettuce, tomatoes, red onion, pickles, peppers, cucumbers and sprouts with your choice of dressing',           price:12 },
  { name:'Chef Salad',     desc:'Lettuce, pickle, peppers, tomatoes, red onions, sprouts, cucumbers + your choice of two meats & two cheeses',  price:15.5 },
  { name:'Tuna Salad',     desc:'Green salad plus our homemade tuna salad',                                                                      price:15.5 },
  { name:'Chicken Salad',  desc:'Fresh chicken salad on a bed of greens',                                                                        price:14 },
  { name:'Macaroni Salad', desc:'½ pint of our classic macaroni salad',                                                                          price:4 },
  { name:'Potato Salad',   desc:'½ pint of our homemade potato salad',                                                                           price:6 },
]

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

function SandwichCard({ item }: { item: MenuItem }) {
  return (
    <div className="menu-card bg-white rounded-2xl p-5 border border-[#e8e0cc] group cursor-default">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            <span className="text-[11px] font-black text-[#4a7c3f] mr-0.5">#{item.id}</span>
            <h3 className="font-black text-[#1e3a1e] text-base leading-tight">{item.name}</h3>
          </div>
          <div className="flex gap-1 mb-2 flex-wrap">
            {item.veg     && <Badge type="veg" />}
            {item.toasted && <Badge type="toasted" />}
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
        </div>
        <div className="shrink-0 text-right">
          <span className="font-black text-xl text-[#1e3a1e]">${item.price}</span>
        </div>
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
          <h1 className="text-white font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none mb-4">
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
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { n: '32', label: 'Specialty Sandwiches' },
              { n: '6',  label: 'Fresh Salads' },
              { n: '∞',  label: 'Build Your Own' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-black text-3xl text-[#f0c040]">{s.n}</p>
                <p className="text-white/60 text-xs font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={scrollToMenu} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

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
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-black text-3xl text-[#1e3a1e]">Specialty Sandwiches</h2>
                <p className="text-slate-500 text-sm mt-1">All sandwiches come with your choice of condiments</p>
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
          <section id="salads" className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-8">
              <h2 className="font-black text-3xl text-[#1e3a1e]">Fresh Salads</h2>
              <p className="text-slate-500 text-sm mt-1">Made fresh daily with crisp, quality ingredients</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {SALADS.map((s, i) => (
                <div key={s.name} className="menu-card bg-white rounded-2xl p-5 border border-[#e8e0cc] fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="font-black text-[#1e3a1e] text-base">{s.name}</h3>
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
          <section id="build" className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-8 flex items-end gap-4">
              <div>
                <h2 className="font-black text-3xl text-[#1e3a1e]">Build Your Own</h2>
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

      {/* ── LOCATION & HOURS ── */}
      <section id="location" className="bg-[#1e3a1e] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-black text-3xl sm:text-4xl text-white mb-2">Find Us</h2>
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

              {/* Social */}
              <div className="flex gap-3">
                <a href="https://www.instagram.com/mrpicklessf" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity">
                  <IgIcon className="w-4 h-4" /> Instagram
                </a>
                <a href="https://www.facebook.com/mrpicklessf" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1877f2] text-white font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity">
                  <FbIcon className="w-4 h-4" /> Facebook
                </a>
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
