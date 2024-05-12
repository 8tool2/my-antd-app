import React, { useState } from 'react';
import { Button, Input } from 'antd';
import './Add.css'; // Import Ant Design CSS

function DynamicAreas() {
  const [contents, setContents] = useState([{ type: 'text', content: '', images: [] }]); // State to hold contents and their types
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track the index of the hovered block

  // Function to handle adding a new content block
  const addContent = () => {
    setContents([...contents, { type: 'text', content: '', images: [] }]);
  };

  // Function to handle changing content type
  const changeContentType = (index, type) => {
    const newContents = [...contents];
    newContents[index].type = type;

    // Clear images for the current content block if the type is changed to 'picture'
    if (type === 'picture') {
      newContents[index].images = [];
    }

    setContents(newContents);
  };

  // Function to handle changing content value
  const handleContentChange = (index, event) => {
    const newContents = [...contents];
    newContents[index].content = event.target.value;
    setContents(newContents);
  };

  // Function to handle image upload
  const handleImageUpload = (event, index) => {
    const selectedFiles = event.target.files;
    const newImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const reader = new FileReader();
      const file = selectedFiles[i];

      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === selectedFiles.length) {
          const newContents = [...contents];
          newContents[index].images = [...newContents[index].images, ...newImages];
          setContents(newContents);
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  // Function to handle dragging content
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('index', index);
  };

  // Function to handle dropping content
  const handleDrop = (event, dropIndex) => {
    const dragIndex = parseInt(event.dataTransfer.getData('index'));
    const newContents = [...contents];
    const draggedItem = newContents[dragIndex];
    newContents.splice(dragIndex, 1);
    newContents.splice(dropIndex, 0, draggedItem);
    setContents(newContents);
  };

  // Function to prevent default behavior
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle hover over a block
  const handleBlockHover = (index) => {
    setHoveredIndex(index);
  };

  // Function to handle leaving a block
  const handleBlockLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div style={{ height: '80vh', overflowY: 'auto', margin: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button onClick={addContent}>Add</Button>
        {contents.map((content, index) => (
          <div
            key={index}
            className="Hero"
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDrop={(event) => handleDrop(event, index)}
            onDragOver={handleDragOver}
            onMouseEnter={() => handleBlockHover(index)}
            onMouseLeave={handleBlockLeave}
            style={{ marginBottom: '10px', position: 'relative' }}
          >
            {hoveredIndex === index && (
              <div style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1 }}>
                {/* Render editing tools only when hovered */}
                <Button type="link" icon={<b>B</b>} />
                <Button type="link" icon={<i>I</i>} />
              </div>
            )}
            <div className='HeroTwo'>
              <Button onClick={() => changeContentType(index, 'text')} type={content.type === 'text' ? 'primary' : 'default'}>Text</Button>
              <Button onClick={() => changeContentType(index, 'picture')} type={content.type === 'picture' ? 'primary' : 'default'}>Picture</Button>
            </div>
            {content.type === 'text' && (
              <Input.TextArea
                value={content.content}
                onChange={(event) => handleContentChange(index, event)}
                style={{ marginLeft: '10px', width: '500px', height: '200px', margin: "20px" }}
              />
            )}
            {content.type === 'picture' && (
              <div >
                < div className = "HeroImage">
                <input 
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleImageUpload(event, index)}
                />
                </div>
                <div  className = "HeroImage" style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {content.images.map((image, imageIndex) => (
                    <div key={imageIndex} style={{ marginRight: '10px', marginBottom: '10px' }}>
                      <img src={image} alt={`Uploaded ${imageIndex}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DynamicAreas;
