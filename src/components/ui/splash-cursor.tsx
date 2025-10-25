'use client';
import React, { useEffect, useRef } from 'react';

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- WebGL Setup ---
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float dist = distance(st, u_mouse);
        
        // Glowing blue color, brighter closer to the cursor
        vec3 color = vec3(0.1, 0.7, 1.0) / (dist * 5.0 + 0.05);
        
        // Fade out alpha based on distance
        gl_FragColor = vec4(color, 0.8 - dist * 0.5);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error linking program:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // --- State and Animation ---
    let mouseX = -1;
    let mouseY = -1;
    let animationFrameId: number;

    function resizeCanvas() {
      if (!canvas || !gl) return;
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    function handleMouseMove(e: MouseEvent) {
       // Correctly update mouse coordinates for the shader
       mouseX = e.clientX / window.innerWidth;
       mouseY = 1.0 - (e.clientY / window.innerHeight);
    }
    
    window.addEventListener('mousemove', handleMouseMove);

    function render() {
      if (!gl || !program) return;

      resizeCanvas();

      // --- Drawing Logic ---
      gl.useProgram(program);

      // This is the key for the fade-out trail effect.
      // It clears the canvas but with a very low alpha, leaving previous frames visible.
      gl.clearColor(0.0, 0.0, 0.0, 0.05);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Enable blending for transparency
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      // Pass uniforms to the shader
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      if (mouseX > 0) { // Only draw if mouse has moved into the viewport
          gl.uniform2f(mouseUniformLocation, mouseX, mouseY);
      } else {
          gl.uniform2f(mouseUniformLocation, -1.0, -1.0); // Don't draw off-screen
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    }

    render(); // Start the continuous animation loop

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="splash-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999, // keeps it visible above all elements
        pointerEvents: 'none', // ensures it doesn't block clicks
        background: 'transparent',
        display: 'block'
      }}
    />
  );
}