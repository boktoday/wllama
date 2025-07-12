export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-base-content/70">
        <div className="mb-2 sm:mb-0">
          Distincto Apps ©2025. ABN: 21 672 202 612. Made in Melbourne and Penang.
        </div>
        <div>
          <a 
            href="#" 
            className="hover:text-base-content transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              // This will be handled by the parent component
              window.dispatchEvent(new CustomEvent('navigate-to-legal'));
            }}
          >
            Legal & Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}