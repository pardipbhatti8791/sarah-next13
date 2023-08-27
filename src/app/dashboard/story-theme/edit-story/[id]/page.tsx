"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "@/store/store";
import {
  ICreateStoryTheme,
  IStoryTheme,
} from "@/store/storyTheme/storyThemeInterface";
import { themeOptions } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

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

const EditThemeStory = (props: any) => {
  const router = useRouter();
  const { status, data } = useSession();
  const store = useStore((state) => state);
  const [storyTheme, setStoryTheme] = useState<IStoryTheme[]>([]);

  useEffect(() => {
    const titleData = store.storyThemes.rows.filter(
      (titleDat) => titleDat.id === +props.params.id
    );
    setStoryTheme(titleData.length > 0 ? titleData : []);
  }, [store.storyThemes]);
  const formik = useFormik({
    initialValues: {
      status: storyTheme.length > 0 ? storyTheme[0].status : "",
      title: storyTheme.length > 0 ? storyTheme[0].title : "",
      description: storyTheme.length > 0 ? storyTheme[0].description : "",
      themeType: {
        label: storyTheme.length > 0 ? storyTheme[0].themeType : "",
        value: storyTheme.length > 0 ? storyTheme[0].themeType : "",
      },
    },
    validationSchema: StoryThemeSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      const { themeType, status, ...rest } = values;
      const nValues: IStoryTheme = rest;
      nValues.themeType = themeType.value;
      nValues.status = status;

      try {
        await store.updateStoryTheme({ id: +props.params.id }, nValues, router);
      } catch (error) {
        console.error("Error updating story theme:", error);
      }
    },
  });

  return (
    <div
      style={{
        width: "40%",
        alignSelf: "center",
        marginTop: 18,
      }}
      className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Edit Title
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
                Edit Description
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
              Edit Theme Type
            </label>
            <Select
              options={themeOptions}
              onChange={(value: any) => {
                formik.setFieldValue("themeType", value);
              }}
              value={formik.values.themeType}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditThemeStory;
