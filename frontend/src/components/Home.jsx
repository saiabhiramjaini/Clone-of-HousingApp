

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Home</h1>
      <a href="/admin/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg">Realtor Signup</a>
      <br />
      <a href="/user/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg">User Signup</a>
    </div>
  );
}

export default Home;
