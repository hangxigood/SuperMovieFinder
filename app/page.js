



export default function Page() {








  return (
<div className="flex flex-col h-dvh">
    <nav className="flex bg-gray-900  h-16 justify-between">
      <p className="pt-3 pl-3 text-3xl">Super Movie Finder</p>
      <div className="flex items-center ">
        <p className="mr-14">User Name</p>
        <p className="mr-10">Logout button</p>
      </div>
      
    </nav>

    <div className="flex flex-1 justify-around ">
        <div className="bg-cyan-600 m-5 rounded-xl w-1/2 ">searcher</div>
        <div className=" bg-indigo-600 m-5 rounded-xl w-1/2 ">Favourites</div>
    </div>



</div>


  );


}
