const Triangle = ({ dimensions, onResize }) => (
    <div
      style={{
        width: '0',
        height: '0',
        borderLeft: `${dimensions.width / 2}px solid transparent`,
        borderRight: `${dimensions.width / 2}px solid transparent`,
        borderBottom: `${dimensions.height}px solid green`,
        position: 'relative',
      }}
      onMouseDown={(e) => {
        const startX = e.clientX;
        const startY = e.clientY;
  
        const handleMouseMove = (e) => {
          const newWidth = Math.abs(e.clientX - startX) * 2;
          const newHeight = Math.abs(e.clientY - startY);
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

export default Triangle;