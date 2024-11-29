import { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);

  interface Node {
    x: number;
    y: number;
    connections: Node[];
    speed: number;
    angle: number;
    size: number;
  }

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 0.8 },
    config: { duration: 2000 },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodesRef.current = [];
      const numberOfNodes = Math.floor((canvas.width * canvas.height) / 40000);
      
      for (let i = 0; i < numberOfNodes; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          connections: [],
          speed: 0.2 + Math.random() * 0.3,
          angle: Math.random() * Math.PI * 2,
          size: 1 + Math.random() * 2,
        });
      }
    };

    const drawCircuit = (x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = '#58a6ff';
      ctx.fill();

      // Draw circuit extensions
      const extensions = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < extensions; i++) {
        const angle = (i * Math.PI * 2) / extensions;
        const length = size * 3;
        
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        ctx.lineTo(
          x + Math.cos(angle) * (size + length),
          y + Math.sin(angle) * (size + length)
        );
        ctx.strokeStyle = 'rgba(88, 166, 255, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    const connectNodes = () => {
      const maxDistance = 150;
      nodesRef.current.forEach(node => {
        node.connections = [];
        nodesRef.current.forEach(otherNode => {
          if (node === otherNode) return;
          
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            node.connections.push(otherNode);
          }
        });
      });
    };

    const updateNodes = () => {
      nodesRef.current.forEach(node => {
        node.x += Math.cos(node.angle) * node.speed;
        node.y += Math.sin(node.angle) * node.speed;

        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        // Slightly change direction
        node.angle += (Math.random() - 0.5) * 0.1;
      });
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(13, 17, 23, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodesRef.current.forEach(node => {
        node.connections.forEach(connectedNode => {
          const dx = node.x - connectedNode.x;
          const dy = node.y - connectedNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const opacity = 1 - (distance / 150);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.strokeStyle = `rgba(88, 166, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      });

      // Draw nodes and circuits
      nodesRef.current.forEach(node => {
        drawCircuit(node.x, node.y, node.size);
      });

      updateNodes();
      connectNodes();
      requestAnimationFrame(draw);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    draw();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
      />
      <animated.div
        style={props}
        className="fixed inset-0 -z-9 bg-gradient-radial from-transparent via-aurora-bg/40 to-aurora-bg"
      />
    </>
  );
}