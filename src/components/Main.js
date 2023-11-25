import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

import Triangle from './Triangle';
import Line from './Line';
import Circle from './Circle';
import Rectangle from './Rectangle';

const Main = () => {
  const [shapes, setShapes] = useState([]);
  const [newshape, setNewshape] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [formData, setFormData] = useState({
        length: '400',
        width: '400',
    });

    
const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

  const handleSave = () => { 
    console.log(formData);
    setShapes([...shapes, { type: newshape, id: Date.now(), dimensions: { width: formData.width, height: formData.length }, position: { left: 0, top: 0 } }]);  
    toast.success(`Created a ${newshape}`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setInputValue('');
    handleCloseModal();
  };

  const addShape = (shapeType) => {
    setNewshape(shapeType);
    handleShowModal();
  };

  const handleDrag = (index, newPosition) => {
    setShapes((prevShapes) => {
      const updatedShapes = [...prevShapes];
      updatedShapes[index].position = newPosition;
      return updatedShapes;
    });
  };

  const handleResize = (index, dimensions) => {
    setShapes((prevShapes) => {
      const updatedShapes = [...prevShapes];
      updatedShapes[index].dimensions = dimensions;
      return updatedShapes;
    });
  };

  const handleEditShape = (index, oldimensions ,dimensions) => {
     console.log(oldimensions);
  
  };

  const renderShapes = () => {
    return shapes.map((shape, index) => {
      const { type, id, position, dimensions } = shape;
      const ShapeComponent = shapeComponents[type];

      return (
        <Draggable key={id} onDrag={(e, data) => handleDrag(index, data)}>
          <div style={{ position: 'absolute', ...position }}>
            <ShapeComponent dimensions={dimensions} onResize={(newDimensions) => handleResize(index, newDimensions)} />
            <div style={{ position: 'absolute', top: '-20px', left: '0', color: 'white',background: 'grey' , cursor: 'pointer', marginLeft:"50%",opacity:"0.5" }}   onClick={(newDimensions) => {
                        handleEditShape(index, newDimensions ,dimensions)
                }}>
              Position: {position.left},{position.top}
              <br />
              Measurements: {dimensions.width} x {dimensions.height}
            </div>
          </div>
        </Draggable>
      );
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '150px', padding: '10px', borderRight: '1px solid #ccc' }}>
        <SidebarButton shapeType="Rectangle" onClick={() => addShape('Rectangle')} />
        <SidebarButton shapeType="Circle" onClick={() => addShape('Circle')} />
        <SidebarButton shapeType="Line" onClick={() => addShape('Line')} />
        <SidebarButton shapeType="Triangle" onClick={() => addShape('Triangle')} />
      </div>
      <div style={{ position: 'relative', width: '500px', height: '100vh' }}>  
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter parameters of your {newshape}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Length</Form.Label>
                    <Form.Control type="text" name="length" id="length" placeholder="Length" value={formData.length} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Width</Form.Label>
                    <Form.Control type="text" name="width" id="width" placeholder="Width" value={formData.width} onChange={handleInputChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                    Save
                    </Button>
                </Modal.Footer>
                </Modal>      
        {renderShapes()}
        <ToastContainer />
      </div>
    </div>
  );
};

const SidebarButton = ({ shapeType, onClick }) => {
  const getIcon = (shapeType) => {
    switch (shapeType) {
      case 'Rectangle':
        return '▭';
      case 'Circle':
        return '◯';
      case 'Line':
        return '─';
      case 'Triangle':
        return '△';
      default:
        return '';
    }
  };

  return (
    <button style={{ marginBottom: '10px', width: '120px' }} onClick={onClick}>
      {getIcon(shapeType)}&nbsp;{shapeType}
    </button>
  );
};

const shapeComponents = {
  Rectangle,
  Circle,
  Line,
  Triangle,
};
export default Main;

