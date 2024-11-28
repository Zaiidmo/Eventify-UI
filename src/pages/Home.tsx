import "../App.css";
function Home() {

  return (
    <>
      <div className="flex h-screen w-screen justify-center flex-col items-center">
        <img src="./hero.png" className="w-full h-2/3 absolute top-0 bg-black" alt="Logo" />
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
          Welcome to Vlpha
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400">
          A modern and responsive web application template
        </p>
      </div>
    </>
  );
}
export default Home;
