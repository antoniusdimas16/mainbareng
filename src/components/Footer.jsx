export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 py-4 mt-20 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <span className="text-xs text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Team Fortha Batch 9 Devscale
        </span>
      </div>
    </footer>
  );
}
