import React from 'react'
import ImageUploading from 'react-images-uploading'

function FileUpload({ setImages, images, setFormData, formData }) {
  const maxNumber = 69

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList)
    // setFormData({ ...formData, imageList: imageList })
  }

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              onChange={onchangeHandler}
              className="border text-gray-50 mr-5 "
              style={{
                backgroundColor: isDragging ? 'green' : '#fff',
                borderRadius: '10px',
                padding: '50px',
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
                height: '150px',
              }}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop Images Here
            </button>

            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="400" />
                <div
                  style={{
                    display: 'flex',
                    marginTop: '50px',
                  }}
                  className="image-item__btn-wrapper"
                >
                  <button
                    style={{
                      backdropFilter: 'none',
                      backgroundColor: 'green',
                      borderRadius: '10px',
                      marginBottom: '10px',
                    }}
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      backdropFilter: 'none',
                      backgroundColor: 'red',
                      borderRadius: '10px',
                      marginBottom: '10px',
                    }}
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default FileUpload

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
  },
}
