import React from "react";
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

function RTE({name, control, label, defaultValue=""}){
   //   return(
   //      <Editor
   //      initialValue="default value" //default value
   //      init={
   //          {branding: false,
   //           height: 500,
   //           menubar: true,
   //           plugins:[
   //              'advlist autolink lists link image charmap print preview anchor',
   //              'searchplace visualblocks code fullscreen',
   //              'insertdatetime media table paste code help wordcount'
   //           ],
   //           toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
   //          }
   //      }  //value just after initializing the page using useEffect
   //      />
   //   )

   return (
      <div className="w-full"> 
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
      name={name|| "content"}
      control={control}
      render={({field: {onChange}})=>(
         <Editor
              initialValue={defaultValue} //default value
              init={
                  {branding: false,
                   height: 500,
                   menubar: true,
                   plugins:[
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
                   toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                   content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                  }
              }  //value just after initializing the page using useEffect
              onEditorChange={onChange}
              />
      )}
      />
      </div>
   )
}

export default RTE;