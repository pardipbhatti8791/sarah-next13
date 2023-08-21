"use client";
import { themeOptions } from "@/lib/utils";
import React from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "@/store/store";
import { ICreateStoryCharacter } from "@/store/storyCharacter/storyCharacterInterface";
import StoryCharacterService from "@/services/StoryCharacterService";
import { toast } from "react-hot-toast";

const StoryCharacterSchema = Yup.object({
  title: Yup.string().required("* Title is required field"),
  description: Yup.string().required("*Description is required field"),
  attachment_id: Yup.mixed().required("*Attachment is required"),
  themeType: Yup.object()
    .shape({
      value: Yup.string().required("*Theme type is required field"),
      label: Yup.string().required("*Theme type is required field"),
    })
    .required("*Theme type is required field"),
  CharacterBackgroundType: Yup.object()
    .shape({
      value: Yup.string().required("*Character or Background is required"),
      label: Yup.string().required("*Character or Background is required"),
    })
    .required("*Character or Background is required"),
});

export const CreateCharacterBackground = (props: any) => {
  const CharacterBackgroundType = [
    {
      label: "Character",
      value: 0,
    },
    {
      label: "Background",
      value: 1,
    },
  ];

  const store = useStore((state) => state);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      themeType: { value: "", label: "" },
      CharacterBackgroundType: { value: "", label: "" },
      attachment_id: 0,
      story_theme_id: 0,
      type: 0,
    },
    validationSchema: StoryCharacterSchema,

    onSubmit: async (values: any, { resetForm }) => {
      const { themeType, CharacterBackgroundType, ...rest } = values;
      const formData = new FormData();
      formData.append("file", values.attachment_id[0]);
      try {
        //@ts-ignore
        store.createUploadAttachment(formData);
        const nValues: ICreateStoryCharacter = rest;
        nValues.themeType = themeType.value;
        nValues.CharacterBackgroundType = CharacterBackgroundType.value;
        store.createStoryCharacter(nValues);
      } catch (error) {
        toast.error("Error uploading attachment");
      }
    },
  });

  return (
    <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="block mb-3 text-sm font-medium text-black dark:text-white">
              Character or Background Type
            </label>
            <Select
              options={CharacterBackgroundType}
              onChange={(value: any) => {
                formik.setFieldValue("CharacterBackgroundType", value);
              }}
            />
            <div className="text-red-600">
              {formik.touched.CharacterBackgroundType?.value &&
              formik.errors.CharacterBackgroundType?.value ? (
                <div>{formik.errors.CharacterBackgroundType.value}</div>
              ) : null}
            </div>
          </div>

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
              ></textarea>
              <div className="text-red-400">{formik?.errors?.description}</div>
            </div>
          </div>

          <div className="mb-4.5">
            <label className="block mb-3 text-sm font-medium text-black dark:text-white">
              Attach file
            </label>
            <input
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter dark:file:bg-white/30 dark:file:text-white file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:focus:border-primary"
              onChange={(e) =>
                formik.setFieldValue("attachment_id", e.target.files)
              }
            />
            <div className="text-red-400">{formik?.errors?.attachment_id}</div>
          </div>
          <div className="mb-4.5">
            <label className="block mb-3 text-sm font-medium text-black dark:text-white">
              Theme Type
            </label>
            <Select
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
              }}
            />
            <div className="text-red-600">
              {formik.touched.themeType?.value &&
              formik.errors.themeType?.value ? (
                <div>{formik.errors.themeType.value}</div>
              ) : null}
            </div>
          </div>

          <button
            className="flex justify-center w-full p-3 mt-10 font-medium rounded bg-primary text-gray"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
