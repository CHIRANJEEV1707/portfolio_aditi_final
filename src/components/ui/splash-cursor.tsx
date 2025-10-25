
"use client";
import { useEffect, useRef } from "react";

function SplashCursor({
  // Add whatever props you like for customization
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0, g: 0, b: 0 },
  TRANSPARENT = true,
}) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function pointerPrototype() {
      this.id = -1;
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.down = false;
      this.moved = false;
      this.color = [0, 0, 0];
    }

    let config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    let pointers = [new pointerPrototype()];
    let splatStack = [];

    const { gl, ext } = getWebGLContext(canvas);
    if (gl && !ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvas) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };
      let gl = canvas.getContext("webgl2", params);
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl =
          canvas.getContext("webgl", params) ||
          canvas.getContext("experimental-webgl", params);
      let halfFloat;
      let supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float");
        supportLinearFiltering = gl.getExtension(
          "OES_texture_half_float_linear"
        );
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      const halfFloatTexType = isWebGL2
        ? gl.HALF_FLOAT
        : halfFloat && halfFloat.HALF_FLOAT_OES;
      let formatRGBA;
      let formatRG;
      let formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(
          gl,
          gl.RGBA16F,
          gl.RGBA,
          halfFloatTexType
        );
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return {
        internalFormat,
        format,
      };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        4,
        4,
        0,
        format,
        type,
        null
      );
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    class Material {
      constructor(vertexShader, fragmentShaderSource) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
      }
      setKeywords(keywords) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
        let program = this.programs[hash];
        if (program == null) {
          let fragmentShader = compileShader(
            gl.FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords
          );
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }
        if (program === this.activeProgram) return;
        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }
      bind() {
        gl.useProgram(this.activeProgram);
      }
    }

    class Program {
      constructor(vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }
      bind() {
        gl.useProgram(this.program);
      }
    }

    function createProgram(vertexShader, fragmentShader) {
      let program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));
      return program;
    }

    function getUniforms(program) {
      let uniforms = [];
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function compileShader(type, source, keywords) {
      source = addKeywords(source, keywords);
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));
      return shader;
    }

    function addKeywords(source, keywords) {
      if (!keywords) return source;
      let keywordsString = "";
      keywords.forEach((keyword) => {
        keywordsString += "#define " + keyword + "\n";
      });
      return keywordsString + source;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
     `
    );

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,
      ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float div = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + T + B - div) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    let textureWidth = config.SIM_RESOLUTION;
    let textureHeight = config.SIM_RESOLUTION;
    let densityWidth = config.DYE_RESOLUTION;
    let densityHeight = config.DYE_RESOLUTION;

    let texelSizeX = 1 / textureWidth;
    let texelSizeY = 1 / textureHeight;
    let dyeTexelSizeX = 1 / densityWidth;
    let dyeTexelSizeY = 1 / densityHeight;

    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    gl.disable(gl.BLEND);

    const clearProgram = new Program(baseVertexShader, clearShader);
    const copyProgram = new Program(baseVertexShader, copyShader);

    const density = createDoubleBuffer(
      densityWidth,
      densityHeight,
      rgba.internalFormat,
      rgba.format,
      ext.halfFloatTexType
    );

    const velocity = createDoubleBuffer(
      textureWidth,
      textureHeight,
      rg.internalFormat,
      rg.format,
      ext.halfFloatTexType
    );

    const divergenceTexture = createTexture(
      textureWidth,
      textureHeight,
      r.internalFormat,
      r.format,
      ext.halfFloatTexType
    );

    const curlTexture = createTexture(
      textureWidth,
      textureHeight,
      r.internalFormat,
      r.format,
      ext.halfFloatTexType
    );

    const pressure = createDoubleBuffer(
      textureWidth,
      textureHeight,
      r.internalFormat,
      r.format,
      ext.halfFloatTexType
    );

    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Material(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(
      baseVertexShader,
      gradientSubtractShader
    );

    function createTexture(w, h, internalFormat, format, type) {
      gl.activeTexture(gl.TEXTURE0);
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        format,
        type,
        null
      );
      return texture;
    }

    function createDoubleBuffer(w, h, internalFormat, format, type) {
      let buffer1 = createTexture(w, h, internalFormat, format, type);
      let buffer2 = createTexture(w, h, internalFormat, format, type);
      return {
        get read() {
          return buffer1;
        },
        set read(value) {
          buffer1 = value;
        },
        get write() {
          return buffer2;
        },
        set write(value) {
          buffer2 = value;
        },
        swap() {
          let temp = buffer1;
          buffer1 = buffer2;
          buffer2 = temp;
        },
      };
    }

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    let width = null;
    let height = null;

    function resizeCanvas() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    let lastTime = Date.now();
    let colorUpdateTimer = 0.0;

    function updateColors(dt) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer > 1.0) {
        colorUpdateTimer = 0.0;
        pointers.forEach((p) => {
          p.color = generateColor();
        });
      }
    }

    function render(time) {
      resizeCanvas();

      let dt = Math.min((time - lastTime) / 1000, 0.016);
      lastTime = time;

      updateColors(dt);

      gl.viewport(0, 0, textureWidth, textureHeight);

      if (!config.PAUSED) {
        computeAdvection(dt);
        computeDivergence();
        computeCurl();
        computeVorticity(dt);
        computePressure();
      }

      splatStack.forEach((splat) => {
        splat.ratio = canvas.width / canvas.height;
        splat.radius =
          0.01 * Math.min(canvas.width, canvas.height) / config.DYE_RESOLUTION;
        splat(splatProgram);
      });
      splatStack.length = 0;

      gl.viewport(0, 0, canvas.width, canvas.height);
      displayMaterial.setKeywords(config.SHADING ? ["SHADING"] : null);
      display(displayMaterial);

      animationFrameId.current = requestAnimationFrame(render);
    }

    function computeAdvection(dt) {
      if (config.VELOCITY_DISSIPATION > 0) {
        advectionProgram.setKeywords(["VELOCITY"]);
        gl.uniform1i(
          advectionProgram.uniforms.uVelocity,
          velocity.read
        );
        gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read);
        gl.uniform1f(advectionProgram.uniforms.dt, dt);
        gl.uniform1f(
          advectionProgram.uniforms.dissipation,
          config.VELOCITY_DISSIPATION
        );
        gl.uniform2f(
          advectionProgram.uniforms.texelSize,
          texelSizeX,
          texelSizeY
        );
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          texelSizeX,
          texelSizeY
        );
        blit(velocity.read, velocity.write, advectionProgram);
        velocity.swap();
      }

      if (config.DENSITY_DISSIPATION > 0) {
        advectionProgram.setKeywords(["DENSITY"]);
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read);
        gl.uniform1i(advectionProgram.uniforms.uSource, density.read);
        gl.uniform1f(advectionProgram.uniforms.dt, dt);
        gl.uniform1f(
          advectionProgram.uniforms.dissipation,
          config.DENSITY_DISSIPATION
        );
        gl.uniform2f(
          advectionProgram.uniforms.texelSize,
          texelSizeX,
          texelSizeY
        );
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          dyeTexelSizeX,
          dyeTexelSizeY
        );
        blit(density.read, density.write, advectionProgram);
        density.swap();
      }
    }

    function computeDivergence() {
      gl.viewport(0, 0, textureWidth, textureHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, gl.FRAMEBUFFER);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        divergenceTexture,
        0
      );
      gl.useProgram(divergenceProgram.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read);
      gl.uniform1i(
        divergenceProgram.uniforms.uVelocity,
        velocity.read
      );
      blit(divergenceTexture, null, divergenceProgram);
    }

    function computeCurl() {
      gl.viewport(0, 0, textureWidth, textureHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, gl.FRAMEBUFFER);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        curlTexture,
        0
      );
      gl.useProgram(curlProgram.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read);
      blit(curlTexture, null, curlProgram);
    }

    function computeVorticity(dt) {
      if (config.CURL > 0) {
        gl.viewport(0, 0, textureWidth, textureHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, gl.FRAMEBUFFER);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          velocity.write,
          0
        );
        gl.useProgram(vorticityProgram.program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, velocity.read);
        gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, curlTexture);
        gl.uniform1i(vorticityProgram.uniforms.uCurl, curlTexture);
        gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
        gl.uniform1f(vorticityProgram.uniforms.dt, dt);
        blit(velocity.write, null, vorticityProgram);
        velocity.swap();
      }
    }

    function computePressure() {
      gl.viewport(0, 0, textureWidth, textureHeight);
      gl.useProgram(pressureProgram.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, divergenceTexture);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergenceTexture);
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, gl.FRAMEBUFFER);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          pressure.write,
          0
        );
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, pressure.read);
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read);
        blit(pressure.write, null, pressureProgram);
        pressure.swap();
      }

      gl.useProgram(gradienSubtractProgram.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pressure.read);
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uPressure,
        pressure.read
      );
      gl.bindFramebuffer(gl.FRAMEBUFFER, gl.FRAMEBUFFER);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        velocity.write,
        0
      );
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read);
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uVelocity,
        velocity.read
      );
      blit(velocity.write, null, gradienSubtractProgram);
      velocity.swap();
    }

    function generateColor() {
      let c = HSVtoRGB(Math.random(), 0.5, 1.0);
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return c;
    }

    function HSVtoRGB(h, s, v) {
      let r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }

      return {
        r,
        g,
        b,
      };
    }

    function splat(x, y, dx, dy, color) {
      splatStack.push((program) => {
        gl.viewport(0, 0, textureWidth, textureHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, gl.FRAMEBUFFER);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          density.write,
          0
        );
        gl.useProgram(program.program);
        gl.uniform1i(program.uniforms.uTarget, density.read);
        gl.uniform1f(program.uniforms.aspectRatio, splat.ratio);
        gl.uniform3f(program.uniforms.color, color.r, color.g, color.b);
        gl.uniform2f(program.uniforms.point, x, y);
        gl.uniform1f(program.uniforms.radius, splat.radius);
        blit(density.write, null, program);
        density.swap();

        gl.viewport(0, 0, textureWidth, textureHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, gl.FRAMEBUFFER);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          velocity.write,
          0
        );
        gl.useProgram(program.program);
        gl.uniform1i(program.uniforms.uTarget, velocity.read);
        gl.uniform1f(program.uniforms.aspectRatio, splat.ratio);
        gl.uniform3f(program.uniforms.color, dx, dy, 0.0);
        gl.uniform2f(program.uniforms.point, x, y);
        gl.uniform1f(program.uniforms.radius, splat.radius);
        blit(velocity.write, null, program);
        velocity.swap();
      });
    }

    function display(material) {
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.useProgram(material.activeProgram);
      gl.uniform1i(material.uniforms.uTexture, density.read);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    function blit(destination, source, material) {
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, gl.FRAMEBUFFER);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        destination,
        0
      );
      gl.useProgram(material.activeProgram);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    function hashCode(s) {
      if (s.length == 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }

    canvas.addEventListener("mousedown", (e) => {
      let pointer = pointers[0];
      pointer.down = true;
      pointer.moved = false;
      pointer.color = generateColor();
      pointer.texcoordX = e.offsetX / canvas.clientWidth;
      pointer.texcoordY = 1.0 - e.offsetY / canvas.clientHeight;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
    });

    canvas.addEventListener("mousemove", (e) => {
      let pointer = pointers[0];
      pointer.moved = true;
      pointer.texcoordX = e.offsetX / canvas.clientWidth;
      pointer.texcoordY = 1.0 - e.offsetY / canvas.clientHeight;
    });

    document.addEventListener("mouseup", () => {
      let pointer = pointers[0];
      pointer.down = false;
    });

    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touches = e.targetTouches;
      while (touches.length >= pointers.length)
        pointers.push(new pointerPrototype());
      for (let i = 0; i < touches.length; i++) {
        let pointer = pointers[i];
        pointer.id = i;
        pointer.down = true;
        pointer.texcoordX = touches[i].pageX / canvas.clientWidth;
        pointer.texcoordY = 1.0 - touches[i].pageY / canvas.clientHeight;
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.color = generateColor();
      }
    });

    canvas.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        const touches = e.targetTouches;
        for (let i = 0; i < touches.length; i++) {
          let pointer = pointers[i];
          pointer.moved = true;
          pointer.texcoordX = touches[i].pageX / canvas.clientWidth;
          pointer.texcoordY = 1.0 - touches[i].pageY / canvas.clientHeight;
        }
      },
      false
    );

    document.addEventListener("touchend", (e) => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        let pointer = pointers.find((p) => p.id == touches[i].identifier);
        if (pointer == null) continue;
        pointer.down = false;
      }
    });

    canvas.addEventListener("wheel", (e) => {
      config.SPLAT_RADIUS += e.deltaY * 0.001;
      config.SPLAT_RADIUS = Math.min(Math.max(config.SPLAT_RADIUS, 0.001), 1);
    });

    let update = () => {
      pointers.forEach((pointer) => {
        if (pointer.down) {
          if (pointer.moved) {
            pointer.moved = false;
            let dx = (pointer.texcoordX - pointer.prevTexcoordX) * config.SPLAT_FORCE;
            let dy = (pointer.texcoordY - pointer.prevTexcoordY) * config.SPLAT_FORCE;
            splat(
              pointer.texcoordX,
              pointer.texcoordY,
              dx,
              dy,
              pointer.color
            );
          }
          pointer.prevTexcoordX = pointer.texcoordX;
          pointer.prevTexcoordY = pointer.texcoordY;
        }
      });

      requestAnimationFrame(update);
    };

    update();

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        zIndex: -1,
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default SplashCursor;

    