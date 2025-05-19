import Header from "../(components)/Header";
import Navbar from "../(components)/Navbar";
export default function Result() {
  return (
    <>
          {/* Header - Full width */}
          <div className="w-full">
            <Header
              title="Welcome, User"
              message="Always stay updated in your student grades."
            />
          </div>
          
          {/* Main content area - Navbar on left, Content on right */}
          <div className="flex flex-row flex-1">
            {/* Navbar */}
            <div className="flex-shrink-0">
              <Navbar />
            </div>
            
            {/* Content area */}
            <div className="flex-1 flex flex-col">
              <p>Results will be implemented here</p>
            </div>
          </div>
        </>
  );
}
