import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1c1e] py-8 px-6 sm:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        
        {/* Bản quyền bên trái */}
        <div className="mb-4 md:mb-0">
          © 2026 All Rights Reserved
        </div>

        {/* Các liên kết pháp lý bên phải */}
        <div className="flex space-x-8">
          <Link 
            href="/privacy" 
            className="hover:text-white transition-colors duration-200 underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms" 
            className="hover:text-white transition-colors duration-200 underline underline-offset-4"
          >
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;