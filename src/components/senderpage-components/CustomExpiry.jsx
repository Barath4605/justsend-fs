import React from 'react';

const CustomExpiry = ({totalDays, setTotalDays}) => {
  return (
      <div>
          <h1 className="text-sm text-gray-600 mt-2">Desired days before Expiry</h1>
          {[3,7,10,14,21,30].map(day => (
              <button key={day} onClick={() => {setTotalDays(day)}}
                      className={` w-20 px-1 p-0.5 my-1 mr-2 cursor-pointer bg-linear-to-tr
                                    border  rounded-md 
                                    transition-all duration-200 ease-in delay-100
                                    ${day === totalDays ? 'bg-linear-to-br from-zinc-900/50 via-zinc-950/15 to-zinc-800/50 backdrop-blur-2xl border-t-white/20 border-r-white/20 border-gray-500/20 w-25 text-start hover-border-transparent' : 'bg-zinc-700/30 hover:border-white/80 border-white/20 px-2'}`}>
                  {day === totalDays ? `${day} days` : day}
              </button>
          ))}
      </div>
  );
};

export default CustomExpiry;
