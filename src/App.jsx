import React, { useEffect,useState } from "react";

import axios from "axios";
const App = () => {
  
    const [cartData, setCartData] = useState([]);
    const [addCart, setAddCart] = useState([]);
    const [favorites, setFavorites] = useState({});

    const toggleFavorite = (id) => {
      setFavorites((prev) => ({
        ...prev,
        [id]: !prev[id], // Toggle the favorite state for the clicked product
      }));
    };

    const getData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      // const {data} = await axios.get("https://fakestoreapi.com/products/1"); directly getting data by destructuring
      setCartData(response.data);
      console.log("helo ")
    };

    useEffect(() => { //api will be automatically called 
      getData();
    }, []);
  

  const AddtoCart = (idx) => {
    const copyArr = [...addCart, cartData[idx]];
    setAddCart(copyArr);
  };

  const truncateDescription = (description , wordLimit) =>{
    const words = description.split(" ");
    return words.length > wordLimit ? words.slice(0,wordLimit).join(" ")+'...' : description;
  }

  const removeFromCart = (idx)=>{
      const updatedArr = [...addCart];
      updatedArr.splice(idx,1);
      setAddCart(updatedArr);
  }

  return (
    <div>
      <div className="flex p-20 bg-[#F5F8FE]">
        <div className=" w-3/4 flex flex-wrap gap-5  ">
           {
            cartData.map(function(elem,idx){
              return <div className="mb-10 px-5 py-3 w-[35vh] bg-[#FfFFFF] shadow-lg rounded-2xl flex flex-col gap-1">
                  <div className="p-4  flex justify-center relative"><img className=" object-cover h-36 rounded-lg" src={elem.image} alt="" />
                  <i
                  onClick={() => toggleFavorite(elem.id)}
                  className={`absolute left-[25vh] top-2 text-slate-700 text-3xl cursor-pointer ${
                    favorites[elem.id] ? "ri-heart-fill" : "ri-heart-line"
                  }`}
                ></i>
                  </div>
                  <h1 className="font-bold line-clamp-1">{elem.title}</h1>
                  {/* <p className="line-clamp-2">{elem.description}</p>  */}
                 <h1 className="font-bold text-xl">${elem.price}</h1> 
                 <button onClick={()=>{
                  AddtoCart(idx);
                 }} className="w-full bg-slate-700 py-2 mt-2 text-white rounded-xl">Add to Cart</button>
                 {/* <p>{truncateDescription(elem.description,10)}</p> */}
                 {/* <p className="truncate">{elem.description}</p>*/}
              </div>
            })
           }
        </div>


        {/* add cart */}
        <div className="w-2/6 px-2 ">
        <h1 className="text-center capitalize font-bold text-2xl">Cart</h1>
          {addCart.map(function (elem ,idx) {
            return <div className="flex mt-3 bg-[#eef4ff] shadow-lg p-5 justify-between gap-5 rounded-xl items-center">
               <img className="w-24 object-cover rounded-xl" src={elem.image} alt="" />
               <div className="flex flex-col gap-2">
                <h1 className="text-xl  font-semibold">{elem.title}</h1> 
                <p className="text-sm capitalize line-clamp-2">{elem.description}</p>
                <div className="flex justify-between "><h1 className="text-xl font-bold">${elem.price}</h1>
                {/* <span><i class="p-[0.5vh] rounded-full bg-[#334155] text-xl text-white ri-add-line"></i> 1 <i class="p-[0.4vh] rounded-full bg-[#334155] text-xl text-white ri-subtract-line"></i>  </span> */}
                <button onClick={()=>{
                  removeFromCart(idx)
                }} className="bg-[#36465c] text-sm px-2 rounded text-white shadow-lg">romove</button>
                </div>
               </div>
            </div> 
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
