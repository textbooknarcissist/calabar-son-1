import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const QualitySpotlight: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        {/* Left Side: Visuals - Macro focus */}
        <div className="w-full md:w-1/2 relative overflow-hidden h-[50vh] md:h-auto border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5">
            <img 
              src="/assets/images/features/craftmanship-detail.webp" 
              alt="Craftsmanship Close-up" 
              className="w-full h-full object-cover contrast-125 dark:contrast-100 dark:opacity-80 transition-all duration-1000"
            />
          <div className="absolute inset-0 bg-white/10 dark:bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border border-black/10 dark:border-white/20 p-8 md:p-12 backdrop-blur-md bg-white/30 dark:bg-black/20">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block text-blue-500">Macro Detail Series</span>
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black dark:text-white">THE STITCH <br /> OF PERFECTION</h4>
            </div>
          </div>
        </div>

        {/* Right Side: Details - Engineering focus */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
          <div className="max-w-md">
            <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Engineered Excellence</span>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 font-heading text-black dark:text-white">
              CRAFTED <br /> FOR THE ELITE
            </h3>
            <p className="text-black/60 dark:text-white/60 mb-12 leading-relaxed text-sm md:text-base">
              Every Calabar Son piece undergoes a rigorous 32-point inspection process. We utilize military-grade structured cotton and sustainable merino wool to ensure your silhouette never loses its architectural form.
            </p>
            
            <ul className="space-y-8">
              <QualityItem 
                title="Perfect Fit" 
                description="Custom adjustable hardware designed for multi-diameter comfort and zero-slip wear." 
              />
              <QualityItem 
                title="Breathable Tech" 
                description="Inner silk-mesh lining for advanced moisture wicking and active temperature regulation." 
              />
              <QualityItem 
                title="Durable Brim" 
                description="Pre-curved memory shape technology that resists deformation and high-impact pressure." 
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const QualityItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <li className="flex items-start gap-5 group">
    <div className="mt-1 transition-transform duration-300 group-hover:scale-110">
      <CheckCircle2 className="w-6 h-6 text-blue-500" />
    </div>
    <div>
      <h5 className="font-black uppercase tracking-tight text-lg text-black dark:text-white mb-1">{title}</h5>
      <p className="text-xs md:text-sm text-black/40 dark:text-white/40 leading-snug font-medium uppercase tracking-wider">{description}</p>
    </div>
  </li>
);

export default QualitySpotlight;
