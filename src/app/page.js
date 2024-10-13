"use client";

import image from "./image.png";
import Image from "next/image";
import image2 from "../graphics/image 4.png";
import image3 from "../graphics/image 1.png";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="min-h-screen flex font-[family-name:var(--font-satoshi-variable)]">
        <div className=" bg-white w-[34%] flex flex-col justify-center  px-[3.5rem] gap-4">
          <h1 className="font-[family-name:var(--font-satoshi-variable)] text-[10rem] text-red leading-none ">
            Datch
          </h1>
          <h1 className=" text-4xl text-red pb-4">
            The more you share, the more you save
          </h1>
          <a
            href="/api/auth/login"
            className="w-full rounded-xl bg-red text-white text-2xl p-4"
          >
            Get started
          </a>
        </div>
        <Image src={image} className="w-[66%] object-cover" />
      </div>
      <div className="w-full bg-red">
        <div className="flex justify-between pl-8 py-8">
          <Image src={image2} className="object-cover w-[33%]" />
          <div className="w-[65%] bg-white flex items-center pl-8">
            <div className="flex flex-col p-8 gap-8">
              <h1 className="font-[family-name:var(--font-satoshi-variable)] text-6xl text-red">
                Expensive delivery?
              </h1>
              <p className="font-[family-name:var(--font-satoshi-medium)] text-red text-3xl">
                Craving late-night takeout, but don't want to spend fees? Datch
                allows you to save by organizing group online orders.
              </p>
              <p className="font-[family-name:var(--font-satoshi-medium)] text-red text-3xl">
                Only pay for what you need
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between pr-8 pb-8">
          <div className="w-[65%] bg-white flex items-center pl-8">
            <div className="flex flex-col p-8 gap-8">
              <h1 className="font-[family-name:var(--font-satoshi-variable)] text-6xl text-red">
                Connect over your favorite foods.
              </h1>
              <p className="font-[family-name:var(--font-satoshi-medium)] text-red text-3xl">
                Datch brings communities and campuses together.
              </p>
              <p className="font-[family-name:var(--font-satoshi-medium)] text-red text-3xl">
                Meet new friends when trying new food, or reconnect with
                classmates over your favorite local spots.
              </p>
            </div>
          </div>
          <Image src={image3} className="object-contain w-[33%]" />
        </div>
      </div>
    </div>
  );
}
