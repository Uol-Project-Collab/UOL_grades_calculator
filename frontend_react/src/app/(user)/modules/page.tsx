export default function Modules() {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      <div className="flex w-fit flex-row">
        <button
          type="button"
          className="text-sub mr-6 ml-4 font-semibold underline"
        >
          Level 4
        </button>
        <button
          type="button"
          className="text-sub mr-6 font-semibold text-gray-400"
        >
          Level 5
        </button>
        <button
          type="button"
          className="text-sub mr-6 font-semibold text-gray-400"
        >
          Level 6
        </button>
      </div>
      <div className="w-fit">
        <button type="button" className="flex flex-row items-center">
          <span className="material-symbols-outlined mr-2">add</span>Add Module
        </button>
      </div>
    </div>
  );
}
