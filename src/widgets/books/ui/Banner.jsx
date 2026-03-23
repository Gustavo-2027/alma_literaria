import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../../../shared/ui/Reveal";

import { books } from "../../../entities/book/model/booksData";
import bannerImageOne from "../../../shared/assets/img/l.jpeg";
import bannerImageTwo from "../../../shared/assets/img/livross.jpg";

const BANNER_IMAGES = [bannerImageOne, bannerImageTwo];
const SLIDE_INTERVAL = 30000;

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredBook = useMemo(() => {
    if (!books?.length) return null;

    const randomIndex = Math.floor(Math.random() * books.length);
    return books[randomIndex];
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNER_IMAGES.length);
    }, SLIDE_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  if (!featuredBook) return null;

  return (
    <section
      id="banner"
      className="relative mt-16 h-[32rem] overflow-hidden sm:h-[40rem] lg:h-[46rem]"
      aria-label="Banner principal da Alma Literária"
    >
      {BANNER_IMAGES.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1800ms] ease-out ${
            currentIndex === index
              ? "scale-100 opacity-100"
              : "scale-[1.04] opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden={currentIndex !== index}
        />
      ))}

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_45%)]" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <Reveal
          as="div"
          preset="fade"
          duration={900}
          threshold={0.08}
          className="max-w-3xl text-white"
        >
          <Reveal
            as="div"
            preset="fade"
            duration={800}
            delay={0}
            threshold={0.08}
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-white/75 sm:text-xs">
              Curadoria de clássicos
            </p>
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={1000}
            delay={70}
            distance={18}
            blur
            threshold={0.08}
          >
            <h1 className="text-4xl font-light uppercase leading-[1.05] tracking-[0.16em] sm:text-5xl lg:text-7xl">
              Alma Literária
            </h1>
          </Reveal>

          <Reveal
            as="div"
            preset="fade"
            duration={850}
            delay={130}
            threshold={0.08}
          >
            <div className="mx-auto my-8 h-px w-16 bg-white/40" />
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={950}
            delay={180}
            distance={14}
            blur
            threshold={0.08}
          >
            <p className="mx-auto max-w-2xl text-sm leading-7 text-white/85 sm:text-base lg:text-lg lg:leading-8">
              Descubra clássicos atemporais que moldaram a literatura mundial em
              uma experiência mais elegante, contemplativa e inspiradora.
            </p>
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={900}
            delay={250}
            distance={12}
            threshold={0.08}
          >
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to={`/book/${featuredBook.id}`}
                className="inline-flex min-h-[54px] items-center justify-center border border-white px-8 text-xs uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                aria-label={`Explorar ${featuredBook.name}`}
              >
                Explorar agora
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 flex items-center justify-center gap-3">
            {BANNER_IMAGES.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  currentIndex === index
                    ? "h-[2px] w-10 bg-white"
                    : "h-[2px] w-5 bg-white/45 hover:bg-white/80"
                }`}
                aria-label={`Ir para banner ${index + 1}`}
                aria-pressed={currentIndex === index}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default React.memo(Banner);