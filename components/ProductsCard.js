import Link from "next/link";
import Rupee from "./Rupee";

function ProductsCard({ product, handleSelectProduct }) {
  return (
    <>
      {product && product.quantity !== 0 ? (
        <Link href={`/product/${product._id}`} replace>
          <div
            className="w-[150px] h-[200px] ml-6 lg:ml-5 mt-5 lg:rounded-md cursor-pointer shadow-md hover:shadow-xl bg-white lg:w-[300px] lg:h-[300px]"
            key={product.name}
            onClick={() => handleSelectProduct(product)}
          >
            <div className="w-[150px] h-[100px] mt-2 flex justify-center lg:w-[300px] lg:h-[200px]">
              <img
                loading="lazy"
                src={`${product.productPictures[0].img}`}
                className="rounded-lg mt-2 h-[100px] lg:h-[200px] object-cover"
              />
            </div>
            <p className="font-bold capitalize text-center ml-2 mt-3 font-body truncate">
              {product.name}
            </p>
            <div className="flex gap-x-2 lg:gap-x-10 mt-5 font-light pl-2 justify-center">
              {product.originalPrice !== product.storePrice && (
                <p className="line-through font-body flex">
                  <Rupee /> {product.originalPrice}
                </p>
              )}

              <p className="font-semibold font-body flex">
                <Rupee />
                {product.storePrice}
              </p>
              {product.originalPrice !== product.storePrice && (
                <p className="text-orange-400 font-bold font-body">
                  {product.discount}%
                </p>
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div
          className="w-[150px] h-[200px] ml-6 lg:ml-5 mt-5 lg:rounded-md cursor-pointer shadow-md hover:shadow-xl bg-gray-200 lg:w-[300px] lg:h-[300px]"
          key={product.productId}
          onClick={() => handleSelectProduct(product)}
        >
          <div className="w-[150px] h-[100px] mt-2 flex justify-center lg:w-[300px] lg:h-[200px]">
            <img
              loading="lazy"
              src={`${product.productPictures[0].img}`}
              className="rounded-lg h-[100px] lg:h-[200px] object-cover relative grayscale"
            />
            <div className="bg-red-600 mt-14 lg:mt-20 absolute h-6 lg:h-10">
              <p className="text-white font-bold text-md lg:text-2xl text-center">
                OUT OF STOCK
              </p>
            </div>
          </div>
          <p className="font-bold capitalize text-center ml-2 mt-2 font-body truncate grayscale">
            {product.name}
          </p>
          <div className="flex gap-x-2 lg:gap-x-10 mt-5 font-light pl-2 justify-center grayscale">
            <p className="line-through font-body flex">
              <Rupee />
              {product.originalPrice}
            </p>
            <p className="font-semibold font-body flex">
              <Rupee />
              {product.storePrice}
            </p>
            <p className="text-orange-400 font-bold font-body">
              {product.discount}%
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsCard;
