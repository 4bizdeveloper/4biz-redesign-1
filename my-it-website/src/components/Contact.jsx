import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">Let's Secure Your Growth.</h2>
          <p className="text-zinc-400 text-center mb-12">Submit your requirements and our team will get back to you within 24 hours.</p>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-cyan-500 outline-none transition-all"
            />
            <input 
              type="email" 
              placeholder="Corporate Email" 
              className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-cyan-500 outline-none transition-all"
            />
            <textarea 
              placeholder="How can we help you?" 
              className="md:col-span-2 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 h-32 focus:border-cyan-500 outline-none transition-all"
            />
            <button className="md:col-span-2 py-5 bg-white text-black font-bold rounded-2xl hover:bg-cyan-400 transition-all uppercase tracking-widest text-sm">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;