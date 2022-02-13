import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";
import "../styles/globals.css";
import stars from "../public/assets/stars.svg";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        AOS.init();
    });

    return (
        <div className="bg-slate-800 selection:bg-sky-300/[0.15] relative text-white min-h-screen">
            <div className="hidden lg:block">
                <Image layout="fill" objectFit="cover" src={stars}/>
            </div>
            <Component {...pageProps}/>
        </div>
    );
}
