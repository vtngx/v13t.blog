import React from "react";
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const HOST = 'http://localhost:3001/api/files';
const UPLOAD_ENDPOINT = 'upload';

const Editor = props => {
  const { handleChange, data } = props;

  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("file", file);
            fetch(`${HOST}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${HOST}/${res.data.data}`
                })
              })
              .catch((err) => reject(err));
          });
        });
      }
    };
  }

  const initAdapter = editor => {
    editor.plugins.get("FileRepository").createUploadAdapter = loader => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div className="">
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onReady={editor => initAdapter(editor)}
        onChange={(event, editor) => handleChange(editor.getData())}
      />
    </div>
  );
}

Editor.propTypes = {
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
};

export default Editor