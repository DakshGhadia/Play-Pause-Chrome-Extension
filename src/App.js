import React from "react";
import { useState, useEffect } from "react";
function App() {
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["checked"], (result) => {
      setChecked(result.checked ?? false);
    });
  }, []);

  function toggleChecked() {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;
      chrome.storage.local.set({ checked: newChecked }).then(() => {
        console.log("Value is set");
      });

      chrome.runtime.sendMessage({ isChecked: newChecked });

      return newChecked;
    });
  }

  return (
    <>
      <div className="h-96 w-96 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-white mt-3 text-4xl font-semibold tracking-wide">
          Play Pause Assist
        </h1>
        <div className="flex items-center mt-8 justify-center w-auto">
          <label className="text-white text-2xl mr-2">Auto Play/Pause</label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={toggleChecked}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
