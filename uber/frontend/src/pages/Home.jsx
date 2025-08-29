import React from "react";

const Home = () => {
  return (
    <div className="flex h-screen pt-5  flex-col justify-between w-full bg-red-400">
      <img className="w-34 ml-9" src="https://imgs.search.brave.com/pxnVl2e6h7DzoUB7XLGfhK_uQEKE-fiyU6gf4lAe_k4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L3ViZXItbG9nby10/ZXh0LXBuZy0xLnBu/Zw" alt="" />
      <div className="bg-white py-5 px-10">
        <h2 >Get Started</h2>
        <button>Continue</button>
      </div>
    </div>
  );
};

export default Home;