export default function HeaderNav(props) {
  const { setShowForm } = props;
  return (
    <>
      <div className="w-full p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Fido.</div>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <a href="#" className="text-white hover:text-blue-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-300">
                  Services
                </a>
              </li>
              <li>
                <a
                  onClick={() => setShowForm(true)}
                  href="#"
                  className="text-white hover:text-blue-300"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
