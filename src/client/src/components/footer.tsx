export default function Footer() {
  return (
    <footer className="bg-gray-50 shadow-inner mt-16 px-4 sm:px-6 py-8 text-xs text-gray-600/80">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-12 md:flex-row md:justify-between md:items-start">
        
        {/* LEFT: Contact */}
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-bold text-purple-800/90">Fluffer's House</h3>
          <p>📞 +45 12 34 56 78</p>
          <p>📧 woof@fluffershouse.com</p>
          <p>🏠 Hulgårdsvej 134, 2400 Kbh NV</p>
        </div>

        {/* CENTER */}
        <div className="text-center leading-relaxed max-w-md mx-auto px-2">
          <p>
            ⚠️ Adopting a pet may result in excessive tail wags,<br />
            zoomies, and unconditional love.<br />
            Proceed with caution (and treats). 🐶🐱
          </p>
        </div>

        {/* RIGHT: Social Media */}
        <div className="space-y-1 text-center md:text-left">
          <h4 className="font-semibold">🐾 Follow us</h4>
          <p>
            📷 <a href="#" className="hover:text-purple-800">Instagram</a>
          </p>
          <p>
            📘 <a href="#" className="hover:text-purple-800">Facebook</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
