import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-200 py-20">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-col">
        <Link
          to="/"
          className="flex gap-3 tracking-tight text-3xl text-dark-01 font-bold items-center"
        >
          <img className="w-10" src="/logo.png" alt="" />
          TechX
        </Link>
        <p className="mt-4">&copy; 2024 | All right reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
