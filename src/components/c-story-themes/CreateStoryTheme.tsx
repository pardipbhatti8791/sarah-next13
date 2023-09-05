"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "@/store/store";
import { ICreateStoryTheme } from "@/store/storyTheme/storyThemeInterface";
import { themeOptions } from "@/lib/utils";

const StoryThemeSchema = Yup.object({
  title: Yup.string().required("*Title is required field"),
  description: Yup.string().required("*Description is required field"),
  themeType: Yup.object()
    .shape({
      value: Yup.string().required("*Theme type is required field"),
      label: Yup.string().required("*Theme type is required field"),
    })
    .required("*Theme type is required"),
});

export const CreateStoryTheme = () => {
  const store = useStore((state) => state);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      themeType: { value: "", label: "" },
    },
    validationSchema: StoryThemeSchema,
    onSubmit: (values: any, { resetForm }) => {
      const { themeType, ...rest } = values;
      const nValues: ICreateStoryTheme = rest;
      nValues.themeType = themeType.value;
      store.createStoryTheme(nValues);

      formik.resetForm({
        values: {
          title: "",
          description: "",
          themeType: { value: "", label: "" },
        },
      });
      setSelectedTheme(null);
    },
  });

  return (
    <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Title
            </label>
            <input
              type="title"
              placeholder="Enter title"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              onChange={(e) => formik.setFieldValue("title", e.target.value)}
              value={formik.values.title}
            />
            <div className="text-red-400">{formik.errors?.title}</div>
          </div>
          <div className="mb-4.5">
            <div>
              <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={6}
                placeholder="Enter Description"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onChange={(e) =>
                  formik.setFieldValue("description", e.target.value)
                }
                value={formik.values.description}
              ></textarea>
              <div className="text-red-400">{formik?.errors?.description}</div>
            </div>
          </div>
          <div className="mb-4.5">
            <label className="block mb-3 text-sm font-medium text-black dark:text-white">
              Theme Type
            </label>
            <Select
              isClearable={true}
              options={
                themeOptions.map((user) => {
                  return {
                    value: user.value,
                    label: user.label,
                  };
                }) || []
              }
              onChange={(value: any) => {
                formik.setFieldValue("themeType", value);
                setSelectedTheme(value);
              }}
              value={selectedTheme}
            />

            <div className="text-red-600">
              {formik.touched.themeType?.value &&
              formik.errors.themeType?.value ? (
                <div>{formik.errors.themeType.value}</div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="flex justify-center w-full p-3 mt-10 font-medium rounded bg-primary text-gray"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
