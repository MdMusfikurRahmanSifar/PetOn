import React from 'react'
import Title from '../components/Title'
import { assets, dummyPetData } from '../assets/assets'
import { useState } from 'react'
import PetCard from '../components/PetCard'


const Pets = () => {
  const [input, setInput] = useState('');
  return (
    <div className="">
      <div
        className="flex flex-col items-center text-black mt-5 py-20 bg-[#eab53a] rounded-[250px] max-md:px-4">
        <Title
          title="Available Pets"
          subTitle="Find the perfect companion for your next break"
          titleColor='text-black'
          subTitleColor='text-black'
        />
        <div
          className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img
            src={assets.search}
            alt="search-icon"
            className="w-4.5 h-4.5 mr-2 cursor-pointer"
            title="Search"
          />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search by make, model or features"
            className="w-full h-full outline-none text-gray-500"
          />
          <img
            src={assets.filter}
            alt="filter-icon"
            className="w-4.5 h-4.5 ml-2 cursor-pointer"
            title="Filter"
          />
        </div>
      </div>
      <div
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <h3 className="text-gray-300 xl:px-20 max-w-7xl mx-auto">
          Showing {dummyPetData.length} Pets.
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {dummyPetData.map((p, idx) => (
            <div key={idx}>
              <PetCard pet={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pets