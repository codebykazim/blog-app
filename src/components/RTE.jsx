import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"
import conf from "../conf/conf"

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="mb-6">
      {label && <label className="block mb-2 text-sm font-medium text-[#335145]">{label}</label>}

      <div
        className="border border-[#828C51] rounded-xl overflow-hidden
      shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              initialValue={defaultValue}
              apiKey={conf.tinyMceKey}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Inter,system-ui,-apple-system,sans-serif; font-size:16px }",
                skin: window.matchMedia("(prefers-color-scheme: dark)").matches ? "oxide-dark" : "oxide",
                content_css: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  )
}