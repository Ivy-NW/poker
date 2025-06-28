// components/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-primary-dark-blue-gray text-secondary-white p-4 mt-8 border-t border-gray-700">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} RoyaltyMusic Platform. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy-policy" className="hover:text-primary-gold mx-2">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-primary-gold mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
