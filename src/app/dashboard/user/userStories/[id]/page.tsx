"use client";
import StoriesModuleService from "@/services/StoriesModuleService";
import UsersService from "@/services/UsersService";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const UsersDataPage = (props: any) => {
  const [users, setUsers] = useState([]);
  const store = useStore((state) => state);
  const router = useRouter();

  return (
    <div
      style={{
        width: "40%",
        alignSelf: "center",
        marginTop: 18,
      }}
      className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <form
      // onSubmit={formik.handleSubmit}
      >
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Edit First Name
            </label>
            <input
              type="first name"
              placeholder="Enter first name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              // onChange={(e) => formik.setFieldValue("title", e.target.value)}
              // value={formik.values.title}
            />
            {/* <div className="text-red-400">{formik.errors?.title}</div> */}
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Edit Last Name
            </label>
            <input
              type="Last name"
              placeholder="Enter first name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              // onChange={(e) => formik.setFieldValue("title", e.target.value)}
              // value={formik.values.title}
            />
            {/* <div className="text-red-400">{formik.errors?.title}</div> */}
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Edit Password
            </label>
            <input
              type="Password"
              placeholder="Edit Password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              // onChange={(e) => formik.setFieldValue("title", e.target.value)}
              // value={formik.values.title}
            />
            {/* <div className="text-red-400">{formik.errors?.title}</div> */}
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Edit Avatar
            </label>
            <input
              type="Avatar"
              placeholder="Edit Avatar"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              // onChange={(e) => formik.setFieldValue("title", e.target.value)}
              // value={formik.values.title}
            />
            {/* <div className="text-red-400">{formik.errors?.title}</div> */}
          </div>

          <button
            className="flex justify-center w-full p-3 mt-10 font-medium rounded bg-primary text-gray"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersDataPage;
