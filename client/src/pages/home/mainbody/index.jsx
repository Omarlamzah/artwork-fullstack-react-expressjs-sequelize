import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FcNext, FcPrevious } from 'react-icons/fc';
import React, { useEffect, useState } from 'react';
import Card from '../../../componants/card';
import { motion } from 'framer-motion';
import { searchworks } from '../../../store/slices/home/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../../hookes/cookiesfun';
import { createProduct } from '../../../store/slices/shoping/slice';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Mainbody = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { worksearch } = useSelector((state) => state.getworksearch);
  const { products } = useSelector((state) => state.shopingslice);
  const [isopenpanel, setisopenpanel] = useState(false);

  useEffect(() => {
    const data = { page: currentPage, keyword: 'all', token: getCookie('usertoken') };
    dispatch(searchworks(data));
   }, [dispatch, currentPage]);

  const getworkspagination = (operation) => {
    if (operation === '+') {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (operation === '-') {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    }
  };

  const [productinfo, setproductinfo] = useState({
    artworkid: '',
    isowner: false,
    price: '00',
    oldprice: '00',
    Commentcount: 0,
  });

  const openpanel = (infoproduct) => {
     setisopenpanel(true);
    setproductinfo({
      artworkid: infoproduct.artworkid,
      desc: infoproduct.desc,
      name: infoproduct.name,
      isowner: infoproduct.isowner,
      price: infoproduct.price,
      oldprice: infoproduct.oldprice,
    });
  };

  const adddtocart = () => {
    const data = { artworkid: productinfo.artworkid, userid: parseInt(getCookie('userid')) };
    console.log(productinfo);
    dispatch(createProduct(data));
  };

  return (
    <div>
      <Modal open={isopenpanel} onClose={ ()=>{setisopenpanel(false)}} center>
     <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
  
 
             <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                           {productinfo.name}                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                             { productinfo.desc}                </p>
            </div>
 
             <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={adddtocart} data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800">
                  add to carte <HiOutlineShoppingCart /> </button>
                <button  onClick={()=>{setisopenpanel(false)}} data-modal-hide="default-modal" type="button" class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"> choose other product</button>
            </div>
        </div></Modal>

      <section className="md:mt-[60px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Object.values(worksearch).map((artwork, index) => {
          const pics = [];
          if (artwork.media_of_artwork && Array.isArray(artwork.media_of_artwork)) {
            artwork.media_of_artwork.forEach((img) => {
              pics.push({ url: 'http://localhost:8000/' + img.url });
            });
            return (
              <motion.div
                initial={{ opacity: 0, transform: 'rotateY(90deg)' }}
                whileInView={{ opacity: 1, transform: 'rotateY(0deg)' }}
                transition={{
                  duration: 2,
                }}
              >
                <article className="  ">
                  <Card
                    openpanel={openpanel}
                    isowner={false}
                    price={artwork.price}
                    oldprice={artwork.oldprice}
                    Commentcount={artwork.comments_of_artwork.length}
                    artworkid={artwork.id}
                    createdAt={artwork.createdAt}
                    key={artwork.id}
                    name={artwork.name}
                    desc={artwork.desc}
                    imagesartis={pics}
                    photos={null}
                    id={artwork.id}
                    removeWorkclick={null}
                  ></Card> 
                </article>
              </motion.div>
            );
          }
        })}
      </section>

      <div className="flex justify-center mt-3 items-center">
        <button
          className="cursor-pointer hover:bg-yellow-400"
          onClick={() => getworkspagination('-')}
          disabled={currentPage === 1}
        >
          <FcPrevious />
        </button>
        <span className="mx-4">Page {currentPage}</span>
        <button
          className="cursor-pointer hover:bg-yellow-400"
          onClick={() => getworkspagination('+')}
          disabled={worksearch.length === 0}
        >
          <FcNext />
        </button>
      </div>
    </div>
  );
};

export default Mainbody;
