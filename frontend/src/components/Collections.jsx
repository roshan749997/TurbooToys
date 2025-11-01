import React from 'react';

const Collections = () => {
  const collections = [
    {
      title: 'BANARASI SAREES',
      image: 'https://i.pinimg.com/736x/30/b4/38/30b43832c6ca100c54fc22ffbaf88461.jpg'
    },
    {
      title: 'LINEN SAREE',
      image: 'https://i.pinimg.com/564x/8c/9e/3d/8c9e3d3e0c1e9c4f7d8b5a6c9e8f3d2a.jpg'
    },
    {
      title: 'BENGALI SAREES',
      image: 'https://i.pinimg.com/564x/a1/b2/c3/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.jpg'
    },
    {
      title: 'BRIDAL SILK SAREES',
      image: 'https://i.pinimg.com/564x/d4/e5/f6/d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9.jpg'
    },
    {
      title: 'HANDLOOM SAREE',
      image: 'https://i.pinimg.com/564x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p.jpg'
    },
    {
      title: 'MAHESHWARI SAREES',
      image: 'https://i.pinimg.com/564x/7h/8i/9j/7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w.jpg'
    },
    {
      title: 'KANJIVARAM SILK SAREE',
      image: 'https://i.pinimg.com/564x/3x/4y/5z/3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m.jpg'
    },
    {
      title: 'SOFT SILK SAREE',
      image: 'https://i.pinimg.com/564x/9n/0o/1p/9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c.jpg'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-light text-gray-800 tracking-wide mb-3">
            CHOOSE YOUR SAREE ONLINE
          </h2>
          <p className="text-gray-500 text-sm">Discover our exclusive collection of handpicked sarees</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <button className="bg-white text-gray-800 p-2 shadow-lg hover:bg-gray-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-white">
                <h3 className="text-sm font-medium tracking-wide text-gray-800 text-center">
                  {item.title}
                </h3>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;