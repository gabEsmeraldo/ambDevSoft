export default function AppFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-dark text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">Calculadora de MDC © {currentYear}</p>
      </div>
    </footer>
  );
}
