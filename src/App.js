// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// export default function App() {
//   return (
//     <div className='App'>
//       <h2>CKEditor 5 React App</h2>
//       <CKEditor
//         editor={ ClassicEditor }
//         data="<p></p>"
//         onReady={ ( editor ) => {
//           console.log( "CKEditor5 React Component is ready to use!", editor );
//         } }
//         onChange={ ( event, editor ) => {
//           const data = editor.getData();
//           console.log( { event, editor, data } );
//         } }
//       />
//     </div>
//   );
// }

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useRef } from 'react';
import './App.css';

const App = () => {
  const editorInstanceRef = useRef(null);

  const uploadImageToServer = async (file) => {
    // Implement image upload logic to the server
  };

  const handleImageUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.click();

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = await uploadImageToServer(file);

        const editor = editorInstanceRef.current;
        const model = editor.model;

        model.change((writer) => {
          const imageElement = writer.createElement('image', {
            src: imageUrl,
          });

          editor.model.insertContent(imageElement, editor.model.document.selection);
        });
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) {
      const imageUrl = await uploadImageToServer(file);

      const editor = editorInstanceRef.current;
      const model = editor.model;

      model.change((writer) => {
        const imageElement = writer.createElement('image', {
          src: imageUrl,
        });

        editor.model.insertContent(imageElement, editor.model.document.selection);
      });
    }
  };

  const handleChooseFile = () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.click();
  };

  const handleAddContent = () => {
    // Implement additional content logic here
  };

  return (
    <div className='app-container'>
      <h2 className='app-title'>Daftar Kandidat</h2>

      {/* Container div with box-shadow */}
      <div className='editor-container container-with-shadow'>
        {/* Custom-styled drag-and-drop file upload button */}
        <div
          className='custom-upload-button'
          onClick={handleImageUpload}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className='button-content'>
            <div>Drag &amp; Drop</div>
            <div className='or-text'>or</div>
            <div className='choose-file-button' onClick={handleChooseFile}>
              Choose File
            </div>
          </div>
        </div>

        {/* Added div with box-shadow and title "Visi Misi" */}
        <div className='ckeditor-container container-with-shadow'>
          <div className='visi-misi-container'>
            <h3 className='visi-misi-title'>Visi Misi</h3>
            <CKEditor
              editor={ClassicEditor}
              data="<p></p>"
              onReady={(editor) => {
                console.log("Komponen CKEditor5 React sudah siap digunakan!", editor);
                editorInstanceRef.current = editor;
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
            />
          </div>
        </div>

        <button className='add-content-button' onClick={handleAddContent}>
          Tambahkan
        </button>
      </div>
    </div>
  );
};

export default App;