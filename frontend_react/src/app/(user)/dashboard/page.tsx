import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";

export default function Dashboard() {
  return (
    <div className="bg-background mx-auto flex h-full w-[90%] flex-col p-1 md:w-[80%] md:p-2">
      <div className="w-full pt-10 text-right">
        <h1 className="text-page text-text-dark mr-4 font-extrabold sm:ml-12 md:ml-24 lg:ml-48">
          UOL Project Collab
        </h1>
      </div>

      <Header
        title="Welcome, User"
        message="Always stay updated in your student grades."
      />
      <Navbar />
      
    </div>
  );
}
