import { Image as ImageIcon, ShieldCheck, Search, Heart, Code2, Bell, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Rich Visual Portfolios",
    description: "Upload high-quality thumbnails and media to make your project stand out to visiting recruiters.",
    icon: ImageIcon,
    colSpan: "md:col-span-2 md:row-span-2",
    visual: (
      <div className="w-full h-32 mt-4 flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="w-2/3 h-full rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-indigo-500/10" />
           <ImageIcon className="w-8 h-8 text-zinc-600" />
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <div className="w-full h-1/2 rounded-xl bg-zinc-800/50 border border-zinc-700/50" />
          <div className="w-full h-1/2 rounded-xl bg-zinc-800/50 border border-zinc-700/50" />
        </div>
      </div>
    )
  },
  {
    title: "Project Management",
    description: "Easily create, edit, and delete your project posts.",
    icon: Code2,
    colSpan: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="w-full mt-4 space-y-2 opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="w-3/4 h-2 bg-indigo-500/40 rounded-full" />
        <div className="w-1/2 h-2 bg-zinc-700 rounded-full" />
        <div className="w-full h-2 bg-zinc-700 rounded-full" />
      </div>
    )
  },
  {
    title: "Discover Innovation",
    description: "Browse through an extensive gallery of projects.",
    icon: Search,
    colSpan: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="w-full mt-4 flex justify-end opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
      </div>
    )
  },
  {
    title: "Engage & Connect",
    description: "Recruiters can 'Like' and 'Follow' to track progress.",
    icon: Heart,
    colSpan: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="w-full mt-4 flex gap-[-10px] opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center z-20"><Heart className="w-4 h-4 text-red-400" /></div>
        <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center -ml-2 z-10"><Bell className="w-4 h-4 text-blue-400" /></div>
      </div>
    )
  },
  {
    title: "Platform Moderation",
    description: "Administrative tools to manage users and ensure quality.",
    icon: ShieldCheck,
    colSpan: "md:col-span-2 md:row-span-1",
    visual: (
      <div className="w-full mt-4 flex justify-between items-end opacity-40 group-hover:opacity-100 transition-opacity h-16">
        {[40, 70, 45, 90, 60, 100, 30].map((h, i) => (
          <div key={i} className="w-8 rounded-t-sm bg-indigo-500/20 border-t border-indigo-500/50 transition-all duration-500 group-hover:bg-indigo-500/40" style={{ height: `${h}%` }} />
        ))}
      </div>
    )
  },
  {
    title: "Live Notifications",
    description: "Instantly know when your project receives a like.",
    icon: Bell,
    colSpan: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="w-full mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
         <div className="w-full bg-zinc-800/80 rounded-lg p-3 border border-zinc-700/50 flex gap-3 items-center">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <div className="w-16 h-1.5 bg-zinc-600 rounded-full" />
         </div>
      </div>
    )
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
            Everything you need in one portal
          </h2>
          <p className="text-zinc-400 text-lg">
            A seamless experience tailored for students to showcase their work and recruiters to find their next star.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-800/70 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 ${feature.colSpan}`}
              >
                {/* Subtle gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-zinc-800/50 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-indigo-400" />
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Visual Element */}
                {feature.visual && (
                  <div className="absolute bottom-6 right-6 left-6 pointer-events-none flex justify-end">
                     {/* The visual content is positioned over the text if needed, but since it's just decorative, we can place it below the icon. Actually, let's inject it into the flow. */}
                  </div>
                )}
                {/* Let's adjust layout to put visual in the middle */}
                <div className="absolute inset-0 pt-24 px-6 pb-28 pointer-events-none flex items-center justify-center">
                   {feature.visual}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
