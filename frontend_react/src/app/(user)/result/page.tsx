import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
export default function Result() {
  return (
    <>
      <Header title="Your Current Result" message="Your are doing great." />

      <div className="flex h-full w-full flex-row">
        <Navbar />
        <div className="w-full">
          <h1>Hello, Next.js!</h1>
          <h1 className="text-3xl font-bold underline">Result</h1>
        </div>
      </div>
    </>
  );
}
