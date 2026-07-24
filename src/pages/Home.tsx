import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/sections/HeroSection';
import { HighlightsSection } from '../components/sections/HighlightsSection';
import { VideoSection } from '../components/sections/VideoSection';
import { AboutSection } from '../components/sections/AboutSection';
import { TrajetoriaSection } from '../components/sections/TrajetoriaSection';
import { MusicSection } from '../components/sections/MusicSection';
import { GallerySection } from '../components/sections/GallerySection';
import { PressSection } from '../components/sections/PressSection';
import { AgendaSection } from '../components/sections/AgendaSection';
import { ContactSection } from '../components/sections/ContactSection';

export function Home() {
  return (
    <div>
      <Helmet>
        <title>Márcio Leite — Vem se Apaixonar | Arrocha Romântico</title>
        <meta
          name="description"
          content="Portfólio oficial de Márcio Leite. Arrocha romântico da Bahia — trajetória, discografia, galeria e contratação de shows."
        />
      </Helmet>
      <HeroSection />
      <HighlightsSection />
      <VideoSection />
      <AboutSection />
      <TrajetoriaSection />
      <MusicSection />
      <GallerySection />
      <PressSection />
      <AgendaSection />
      <ContactSection />
    </div>
  );
}
