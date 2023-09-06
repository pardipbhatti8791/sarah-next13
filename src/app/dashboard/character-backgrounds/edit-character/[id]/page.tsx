"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "@/store/store";
import { IStoryCharacter } from "@/store/storyCharacter/storyCharacterInterface";
import StoryCharacterService from "@/services/StoryCharacterService";
import StoryThemesService from "@/services/StoryThemesService";
import { useRouter } from "next/navigation";

const StoryCharacterSchema = Yup.object({
  title: Yup.string().required("* Title is required field"),
  description: Yup.string().required("*Description is required field"),
  attachment_id: Yup.mixed().required("*Attachment is required"),
  story_theme: Yup.object()
    .shape({
      value: Yup.string().required("*Story theme is required field"),
      label: Yup.string().required("*Story theme is required field"),
    })
    .required("*Story theme is required field"),
  type: Yup.object()
    .shape({
      value: Yup.string().required("*Type is required"),
      label: Yup.string().required("*Type is required"),
    })
    .required("*Type is required"),
});

const EditCreateCharacterBackground = (props: any) => {
  const [attachmentId, setAttachmentId] = useState<number | null>(null);
  const router = useRouter();
  const store = useStore((state) => state);
  const [themeOption, setThemeOption] = useState([]);

  const InitialData = store.storyCharacters.rows.filter(
    (items) => items.id === +props.params.id
  );

  const type = [
    {
      label: "Character",
      value: 0,
    },
    {
      label: "Background",
      value: 1,
    },
  ];

  const handleAttachmentChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const response = await StoryCharacterService.uploadAttachment(formData);
      setAttachmentId(response.data.id);
      formik.setFieldValue("attachment_id", response.data.id);
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
      title: InitialData[0]?.title || "",
      description: InitialData[0]?.description || "",
      story_theme_id: {
        value: InitialData[0]?.story_theme_id || 0,
        label: InitialData[0]?.story_theme_id || "",
      },

      type: {
        value: InitialData[0]?.type || 0,
        label: InitialData[0]?.type || "",
      },
      attachment_id: InitialData[0]?.attachment_id || 0,
    },

    validationSchema: StoryCharacterSchema,

    onSubmit: async (values: any, { resetForm }) => {
      const { story_theme_id, type, ...rest } = values;
      const nValues: IStoryCharacter = rest;
      nValues.story_theme_id = story_theme_id.value;
      nValues.type = type.value;
      try {
        //@ts-ignore
        await store.updateStoryCharacter(
          { id: +props.params.id },
          nValues,
          router
        );
        resetForm();
      } catch (error) {
        console.log("error", error);
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
            <label className="block mb-3 text-sm font-medium text-black dark:text-white">
              Change Character or Background Type
            </label>
            <Select
              options={type}
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
              Change Attachment file
            </label>
            <input
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter dark:file:bg-white/30 dark:file:text-white file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:focus:border-primary"
              onChange={handleAttachmentChange}
            />
            <div className="text-red-400">{formik?.errors?.attachment_id}</div>
          </div>
          <div className="mb-4.5">
            <label className="block mb-3 text-sm font-medium text-black dark:text-white">
              Edit Theme Type
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreateCharacterBackground;
