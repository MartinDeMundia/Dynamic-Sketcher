const Line = ({ dimensions, onResize }) => (
    <div
      style={{
        width: dimensions.width + 'px',
        height: '2px',
        background: 'black',
        transform: `rotate(${dimensions.rotation || 0}deg)`,
        position: 'relative',
      }}
      onMouseDown={(e) => {
        const startX = e.clientX;
        const startY = e.clientY;
  
        const handleMouseMove = (e) => {
          const newWidth = Math.sqrt((e.clientX - startX) ** 2 + (e.clientY - startY) ** 2);
          const newRotation = (Math.atan2(e.clientY - startY, e.clientX - startX) * 180) / Math.PI;
          onResize({ width: newWidth, rotation: newRotation });
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

export default Line;