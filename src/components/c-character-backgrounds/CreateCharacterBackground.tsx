"use client";
import React from "react";
import Select from "react-select";
export const CreateCharacterBackground = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const characterBGOptions = [
    {
      label: "Character",
      value: 0,
    },
    {
      label: "Background",
      value: 1,
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-3 block font-medium text-sm text-black dark:text-white">
              Character or Background Type
            </label>
            <Select options={characterBGOptions} />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Title
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <div>
              <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={6}
                placeholder="Default textarea"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block font-medium text-sm text-black dark:text-white">
              Attach file
            </label>
            <input
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter dark:file:bg-white/30 dark:file:text-white file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block font-medium text-sm text-black dark:text-white">
              Theme Type
            </label>
            <Select options={options} />
          </div>

          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-10">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
