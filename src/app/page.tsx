import dynamic from "next/dynamic"
const Map = dynamic(() => import('@/components/Map/Map'), {ssr:false});

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      <div className='w-screen h-screen'>
        <Map />
      </div>
    </main>
  )
}
