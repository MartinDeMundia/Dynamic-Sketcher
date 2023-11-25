const Rectangle = ({ dimensions, onResize }) => (
    <div
      style={{ width: dimensions.width + 'px', height: dimensions.height + 'px', background: 'blue', position: 'relative' }}
      onMouseDown={(e) => {
        const startX = e.clientX;
        const startY = e.clientY;
  
        const handleMouseMove = (e) => {
          const newWidth = dimensions.width + e.clientX - startX;
          const newHeight = dimensions.height + e.clientY - startY;
          onResize({ width: newWidth, height: newHeight });
        };
  
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
  
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }}
    ></div>
  );

export default Rectangle;