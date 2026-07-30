import { useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { TESTIMONIALS } from '../../data/site';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function TestimonialsCarousel() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const multi = TESTIMONIALS.length > 1;

  return (
    <div className="relative">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h3 className="font-display text-3xl md:text-4xl tracking-wide text-accent">O Que Falam</h3>
        {multi ? (
          <div className="flex items-center gap-2">
            <button
              ref={prevRef}
              type="button"
              className="
                w-11 h-11 rounded-full border border-[var(--border-gold)] bg-surface
                text-accent-light inline-flex items-center justify-center
                transition-[transform,background-color,box-shadow] duration-[250ms]
                hover:bg-accent/10 hover:shadow-[var(--shadow-soft)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
              "
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
            </button>
            <button
              ref={nextRef}
              type="button"
              className="
                w-11 h-11 rounded-full border border-[var(--border-gold)] bg-surface
                text-accent-light inline-flex items-center justify-center
                transition-[transform,background-color,box-shadow] duration-[250ms]
                hover:bg-accent/10 hover:shadow-[var(--shadow-soft)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
              "
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>
        ) : null}
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y, Keyboard]}
        slidesPerView={1}
        spaceBetween={20}
        grabCursor
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        loop={multi}
        breakpoints={{
          768: {
            slidesPerView: 1.15,
            spaceBetween: 24,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 1.25,
            spaceBetween: 28,
            centeredSlides: true,
          },
        }}
        onBeforeInit={(swiper: SwiperInstance) => {
          const nav = swiper.params.navigation;
          if (nav && typeof nav !== 'boolean') {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
            swiper.navigation?.destroy();
            swiper.navigation?.init();
            swiper.navigation?.update();
          });
        }}
        className="testimonials-swiper !pb-12"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos e menções"
      >
        {TESTIMONIALS.map((item) => (
          <SwiperSlide key={`${item.author}-${item.quote.slice(0, 24)}`} className="!h-auto">
            <article
              className="
                h-full min-h-[16rem]
                bg-surface border border-[var(--border-gold)]
                rounded-xl p-6 md:p-8
                shadow-[var(--shadow-soft)]
                flex flex-col
              "
            >
              <Quote className="w-8 h-8 text-accent/50 mb-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-base md:text-lg leading-relaxed text-support/90 italic flex-1">
                “{item.quote}”
              </p>
              <footer className="mt-6 flex items-center gap-3 pt-5 border-t border-[var(--border-gold)]">
                <span
                  className="
                    w-11 h-11 rounded-full shrink-0
                    bg-accent/12 border border-[var(--border-gold)]
                    text-accent-light font-display text-sm
                    flex items-center justify-center tracking-wide
                  "
                  aria-hidden="true"
                >
                  {initials(item.author)}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-support text-sm truncate">{item.author}</p>
                  <p className="text-xs text-support-muted truncate">{item.role}</p>
                </div>
              </footer>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
