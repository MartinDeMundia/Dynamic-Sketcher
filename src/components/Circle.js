const Circle = ({ dimensions, onResize }) => (
    <div
      style={{
        width: dimensions.width + 'px',
        height: dimensions.height + 'px',
        borderRadius: '50%',
        background: 'red',
        position: 'relative',
      }}
      onMouseDown={(e) => {
        const startX = e.clientX;
        const startY = e.clientY;
  
        const handleMouseMove = (e) => {
          const newDiameter = Math.max(dimensions.width + e.clientX - startX, dimensions.height + e.clientY - startY);
          onResize({ width: newDiameter, height: newDiameter });
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
export default Circle;