export default function AddModules() {
  return (
    <>
      <p className="text-center">Please select level for modules you want to add. (If you are not sure then select each level to see all of the modules)</p>
      <div className="flex flex-col w-fit mt-10 ml-10 p-10">
        <label>
          <input type="checkbox" /> Level 4
        </label>
        <label>
          <input type="checkbox" /> Level 5
        </label>
        <label>
          <input type="checkbox" /> Level 6
        </label>
      </div>
    </>
  );
}
