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
      precision mediump float;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      uniform float u_time;

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        float dist = distance(st, u_mouse / u_resolution);

        // softer falloff for longer gradient
        float intensity = smoothstep(0.3, 0.0, dist * 1.5);

        // gradient blue with dynamic hue shift
        vec3 color = mix(
          vec3(0.0, 0.3, 0.8),
          vec3(0.2, 0.8, 1.0),
          intensity + 0.1 * sin(u_time * 0.5)
        );

        gl_FragColor = vec4(color, intensity * 0.4);
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
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // --- State and Animation ---
    let target = { x: -1000, y: -1000 };
    let mouse = { x: -1000, y: -1000 };
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
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // initial sizing

    function handleMouseMove(e: MouseEvent) {
       target.x = e.clientX;
       target.y = e.clientY;
    }
    
    window.addEventListener('mousemove', handleMouseMove);

    function render(time: number) {
      animationFrameId = requestAnimationFrame(render);
      if (!gl || !program) return;
      
      resizeCanvas();
      
      // Interpolate for smoother movement
      mouse.x += (target.x - mouse.x) * 0.15;
      mouse.y += (target.y - mouse.y) * 0.15;

      // --- Drawing Logic ---
      
      // Instead of clearing, draw a semi-transparent black rectangle
      // to slowly fade old frames (creates a smooth trail)
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      // WebGL doesn't have fillRect, so we use clearColor with a low alpha
      // to achieve a similar fading trail effect.
      gl.clearColor(0.0, 0.0, 0.0, 0.08);
      gl.clear(gl.COLOR_BUFFER_BIT);


      gl.useProgram(program);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      // Pass uniforms to the shader
      const dpr = window.devicePixelRatio || 1;
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform2f(mouseUniformLocation, mouse.x * dpr, (gl.canvas.height - mouse.y * dpr));
      gl.uniform1f(timeUniformLocation, time * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

    }

    render(0); // Start the continuous animation loop

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
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
