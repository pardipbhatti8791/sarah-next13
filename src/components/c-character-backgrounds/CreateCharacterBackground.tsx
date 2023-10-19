"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "@/store/store";
import { ICreateStoryCharacter } from "@/store/storyCharacter/storyCharacterInterface";
import { toast } from "react-hot-toast";
import StoryCharacterService from "@/services/StoryCharacterService";
import StoryThemesService from "@/services/StoryThemesService";

const StoryCharacterSchema = Yup.object({
  title: Yup.string().required("* Title is required field"),
  description: Yup.string().required("*Description is required field"),
  attachment: Yup.mixed().required("*Attachment is required"),
  story_theme_id: Yup.object()
    .shape({
      value: Yup.string().required("*Story theme is required field"),
      label: Yup.string().required("*Story theme is required field"),
    })
    .required("*Theme type is required field"),
  type: Yup.object()
    .shape({
      value: Yup.string().required("*Character or Background is required"),
      label: Yup.string().required("*Character or Background is required"),
    })
    .required("*Character or Background is required"),
});

export const CreateCharacterBackground = (props: any) => {
  const [attachmentId, setAttachmentId] = useState<string | null>(null);

  const [themeOption, setThemeOption] = useState([]);
  const store = useStore((state) => state);

  enum Type {
    Character = "0",
    Background = "1",
  }

  const typeOptions = Object.keys(Type).map((key) => ({
    label: key,
    value: Type[key],
  }));

  let isFormSubmitted = false;

  const handleAttachmentChange = async (formData: FormData) => {
    if (formData) {
      try {
        const response = await StoryCharacterService.uploadAttachment(formData);
        const attachmentId = String(response.data.id);

        setAttachmentId(attachmentId);

        formik.setFieldValue("attachment", attachmentId);
        console.log("images", setAttachmentId(attachmentId));
      } catch (error) {
        console.error("Error in uploading attachment: ", error);
      }
    }
  };

  useEffect(() => {
    StoryThemesService.getStoryThemes({ page: 1, limit: 15 }).then((res) => {
      const StoryThemeData =
        res.data.rows.map((items: any) => ({
          value: items.id,
          label: items.title,
        })) || [];

      setThemeOption(StoryThemeData);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: Type.Character,
      attachment: "",
      story_theme_id: { value: "", label: "" },
    },
    validationSchema: StoryCharacterSchema,

    onSubmit: async (values: any, { resetForm }) => {
      const { story_theme_id, type, ...rest } = values;
      try {
        const nValues: ICreateStoryCharacter = rest;
        nValues.story_theme_id = story_theme_id.value;
        nValues.type = type;
        await store.createStoryCharacter(nValues);
        isFormSubmitted = true;
        resetForm();
      } catch (error) {
        toast.error("Error");
      }

      if (isFormSubmitted) {
        const formData = new FormData();
        formData.append("file", values.formData[0]);
        await handleAttachmentChange(formData);
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
              options={typeOptions}
              value={formik.values.type}
              onChange={(value: any) => {
                formik.setFieldValue("type", value);
              }}
            />

            <div className="text-red-600">
              {formik.touched.type?.value && formik.errors.type?.value ? (
                <div>{formik.errors.type.value}</div>
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
                value={formik.values.description}
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
              onChange={handleAttachmentChange}
            />
            <div className="text-red-400">{formik?.errors?.attachment}</div>
          </div>
          <div className="mb-4.5">
            <label className="block mb-3 text-sm font-medium text-black dark:text-white">
              Story Theme
            </label>

            <Select
              options={themeOption}
              value={formik.values.story_theme_id}
              onChange={(value: any) => {
                formik.setFieldValue("story_theme_id", value);
              }}
            />
            <div className="text-red-600">
              {formik.touched.story_theme_id?.value &&
              formik.errors.story_theme_id?.value ? (
                <div>{formik.errors.story_theme_id.value}</div>
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
