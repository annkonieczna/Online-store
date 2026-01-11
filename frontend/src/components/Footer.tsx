export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-4">
        
        <h2 className="text-2xl tracking-[0.3em] font-light">
          ANONYMOUS
        </h2>

        {/* Line*/}
        <div className="w-50 h-px bg-white/30" />

        {/* Links */}
        <div className="flex gap-8 text-sm text-white/70">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/40 mt-4">
          © 2026 ANONYMOUS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}