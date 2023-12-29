"use client";
import Image from "next/image";
import NavBar from "@/components/nav/NavBar";
import { productData } from "./productData";
export default function page() {
  return (
    <>
      <NavBar />
      <main className="sm:flex grid justify-center items-center h-screen">
        {productData.map((item) => {
          return (
            <div
              key={item.product_name}
              className="card w-96 bg-base-100 shadow-xl m-10"
            >
              <figure className="p-10">
                <Image
                  src={item.img_link}
                  width={250}
                  height={250}
                  alt=""
                  style={{ borderRadius: 18 }}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-2xl text-black">
                  {item.product_name}
                </h2>
                <p className="text-sm  font-sans">{item.shop_store}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary  bg-green-300 font-bold text-black font-sans">
                    <a href={item.shopee_link}>Buy Now</a>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}
