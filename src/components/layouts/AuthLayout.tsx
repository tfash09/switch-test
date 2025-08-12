import React from "react";
import { Outlet } from "react-router-dom";
import { FadeIn } from "../custom/Animation";
import BackgroundImage from "@/assets/images/bgImg.jpg";
import LogoImage from "@/assets/images/interswitch_logo.svg";

const AuthLayout: React.FC = () => {
  return (
    <div className="w-full h-screen m-0 p-0 bg-white grid grid-cols-2">
      <div className="hidden lg:col-span-1 lg:block p-2">
        <div
          className="relative rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat h-full flex flex-col"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/65 z-0"></div>
          <div className="m-auto flex flex-col w-full">
            <FadeIn direction="down" delay={0.6}>
              <img src={`${LogoImage}`} className="relative z-10 w-64 m-auto" />
            </FadeIn>
            <div>
              <FadeIn direction="down" delay={0.4}>
                <p className="relative w-[70%] z-10 m-auto mt-30 text-white text-center text-xl">
                  The Gateway to Africa's Payment Ecosystem
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <p className="relative w-[70%] z-10 m-auto mt-1 text-white text-center text-sm">
                  We create and sustain a payment ecosystem that helps commerce
                  evolve, businesses grow and individuals thrive.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1 flex flex-col h-full">
        <div className="flex justify-end mt-2 p-3">
          <FadeIn direction="right" delay={0.2}>
            <img src={LogoImage} alt="logo" className="w-40" />
          </FadeIn>
        </div>

        <div className="m-auto w-full p-4 md:w-[55%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
