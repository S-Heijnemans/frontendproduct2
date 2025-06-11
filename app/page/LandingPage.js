'use client'
import Image from 'next/image';
import logo from "../assets/logo.png";
function LandingPage() {
    return(
  <>
      <header 
        className="bg-[rgba(200,200,150,0.6)] px-20 py-8 flex justify-end gap-20 items-center">
      <Image src={logo} alt="Logo" width={100} height={100} margin-right={200} />
        <button className="bg-[#ff928f] rounded-full px-20 py-8 "></button>
        <button className="bg-[#ff928f] rounded-full px-20 py-8"></button>
        <button className="bg-[#ff928f] rounded-full px-8 py-8 border border-black">
          <span>👤</span>
        </button>
        <button className="bg-[#ff928f] rounded-full p-8">
          <span>⚙️</span>
        </button>
      </header>

      <main className="flex flex-col md:flex-row p-6 gap-6">
        <section className="bg-teal-700/70 border-2 border-teal-400 rounded-xl p-4 w-full md:w-64 text-white">
          <h2 className="text-lg font-semibold mb-4">Favorite Circl’s</h2>
          <div className="flex items-center justify-between bg-gray-100 text-black rounded-lg px-3 py-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              Circl 1
            </div>
            <span>★</span>
          </div>
          <div className="flex items-center justify-between bg-gray-100 text-black rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-pink-500 rounded-full"></span>
              Circl 5
            </div>
            <span>★</span>
          </div>
        </section>

        <section className="bg-white/30 rounded-3xl p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-black">Top Circl’s</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-500 rounded-full"></span>
                  <span className="font-semibold">Circl 1</span>
                </div>
                <span>★</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white rounded-full"></div>
                <div className="h-4 bg-white/70 rounded-full"></div>
                <div className="h-4 bg-white/40 rounded-full"></div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-teal-500 rounded-full"></span>
                  <span className="font-semibold">Circl 2</span>
                </div>
                <span>☆</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white rounded-full"></div>
                <div className="h-4 bg-white/70 rounded-full"></div>
                <div className="h-4 bg-white/40 rounded-full"></div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-sky-500 rounded-full"></span>
                  <span className="font-semibold">Circl 3</span>
                </div>
                <span>☆</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white rounded-full"></div>
                <div className="h-4 bg-white/70 rounded-full"></div>
                <div className="h-4 bg-white/40 rounded-full"></div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-800 rounded-full"></span>
                  <span className="font-semibold">Circl 4</span>
                </div>
                <span>☆</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white rounded-full"></div>
                <div className="h-4 bg-white/70 rounded-full"></div>
                <div className="h-4 bg-white/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
  </>

    )
}

export default LandingPage