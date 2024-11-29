import "../App.css";
function Home() {
  return (
    <>
     <div className="w-screen ">
        <div className="relative h-[80vh] w-full">
          <img
            src="./hero.webp"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Logo"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <h1 className="text-4xl w-fit font-bold text-gray-800 dark:text-white">
              Welcome to Eventify
            </h1>
            <p className="text-lg w-fit text-gray-600 dark:text-gray-400">
              A modern and responsive web application template
            </p>
          </div>
        </div>
     </div>
    </>
  );
}
export default Home;
