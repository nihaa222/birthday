import './App.css';
import { gsap } from "gsap";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [newUrl, setNewUrl] = useState("");
  const [shadow, setShadow] = useState(() => JSON.parse(localStorage.getItem("shadow")) || false);
  const [formInputs, setFormInputs] = useState({
    name: "",
    age: "",
    message: "",
    identity: "",
  });

  useEffect(() => {
    localStorage.setItem("shadow", JSON.stringify(false))
    setShadow(false)
  },[])

  

  useEffect(() => {
    const uniqueId = uuidv4().slice(0, 6);
    setFormInputs((prev) => ({
      ...prev,
      identity: uniqueId
    }));
    const url = `http://13.49.244.5:3002/${uniqueId}`;
    setNewUrl(url);
  }, []);

  useEffect(() => {
    

    if (shadow) {
    
      document.body.style.overflow = "hidden";

      // Create a GSAP timeline to sequence animations
      const timeline = gsap.timeline();

      // 1. Animate the card appearing
      timeline.fromTo(
        '.card',
        { y: '100vh', opacity: 0 },
        { y: '20vh', opacity: 1, duration: 1 }
      );

      // 2. Animate the envelope appearing after the cars
      timeline.fromTo(
        '.envelope',
        { y: '-100vh', opacity: 0 }, // Start offscreen
        { y: '50vh', opacity: 1, duration: 1 }
      );

      // 3. Animate the card rotating and becoming horizontal after the envelope
      timeline.to(
        '.card',
        { rotation: 90, y: 0, duration: 1 }
      );
    }
  }, [shadow]);

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    const newValue = name === 'age' ? Number(value) : value;
    setFormInputs((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleForm = (e) => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop()
    e.preventDefault();
    console.log(formInputs);
    const postData = async () => {
      const res = await fetch("http://13.49.244.5:3002/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });
      console.log(res);
      if (res.ok) {
        console.log("Hello")
        localStorage.setItem("shadow", true);
        setShadow(true);

      }
    };
    postData();
  };

  return (
    <>
      {shadow && <div className='absolute z-10 inset-0  bg-white/30 backdrop-blur-lg border border-white/50 rounded-lg'></div>}
      {shadow && <div className="card w-2/3 h-1/2 md:h-1/2 md:w-1/4 bg-yellow-300 z-20 absolute left-1/2 transform -translate-x-1/2 "></div>}



      {shadow && <div className='envelope  absolute left-1/2 transform -translate-x-1/2 z-50 '></div>}


      <div className="relative  w-full">
        <img className='absolute left-20 top-10 -z-50' src='balloon.png' alt="balloon" />
        <img className='absolute  -z-50  left-10 bottom-12' src='cake.png' alt="cake" />
        <img className='absolute -z-50 right-20 bottom-3/4' src='gift.png' alt="gift" />
        <img className='absolute -z-50 right-4 bottom-12 ' src="party.png" alt="party" />
        <div className="lg:pl-32 pt-24 grid grid-cols-1 xl:grid-cols-2 place-items-center">
          <div>
            <div className='relative mb-2'>
              <div className=' h-32  w-80 bg-yellow-600 rotate-6'></div>
              <p className=' top-2 pl-2 absolute text-7xl  font-bold text-black'>CREATE A</p>
            </div>

            <div className='relative'>
              <div className=' h-32 w-[350px] bg-red-500 -rotate-6'></div>
              <p className=' top-5 pl-2 absolute text-7xl font-bold text-black'>BIRTHDAY</p>
            </div>

            <div className='relative'>
              <div className=' h-32  w-72 bg-blue-300 rotate-6'></div>
              <p className=' top-4 pl-3 absolute b0ttom-5 text-7xl  font-bold text-black'>CARD !</p>
            </div>
          </div>

          <div className='bg-white mb-10 sm:w-1/2 px-12 rounded-md mt-5 mx-6 py-12'>
            <form action="" className="">
              <p className='pb-2'>Enter the birthday person's name, age, and a custom message that will appear after they blow out their candles</p>
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                  <label>Name</label>
                  <input name='name' onChange={handleChange} value={formInputs.name} className='border-2 border-black p-2' type='text' placeholder='name' />
                </div>
                <div className='flex flex-col gap-1'>
                  <label>Age</label>
                  <input name='age' onChange={handleChange} value={formInputs.age} className='border-2 border-black p-2' type='number' placeholder='Age' />
                </div>
                <div className='flex flex-col gap-1'>
                  <label>Message</label>
                  <textarea name="message" onChange={handleChange} value={formInputs.message} className='border-2 border-black p-2' type='Message' placeholder='Message' />
                </div>
                <button type='button' onClick={handleForm} className='mt-3 font-mono bg-purple-600 text-white font-12 py-2 rounded-xl'>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
