var pow = Math.pow,
  sqrt = Math.sqrt,
  sin = Math.sin,
  cos = Math.cos,
  PI = Math.PI,
  c1 = 1.70158,
  c2 = c1 * 1.525,
  c3 = c1 + 1,
  c4 = (2 * PI) / 3,
  c5 = (2 * PI) / 4.5;

// x is the fraction of animation progress, in the range 0..1
function bounceOut(x) {
  var n1 = 7.5625,
    d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

const easing = {
  linear: function (x) {
    return x;
  },
  swing: function (x) {
    return $.easing[$.easing.def](x);
  },
  easeInQuad: function (x) {
    return x * x;
  },
  easeOutQuad: function (x) {
    return 1 - (1 - x) * (1 - x);
  },
  easeInOutQuad: function (x) {
    return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
  },
  easeInCubic: function (x) {
    return x * x * x;
  },
  easeOutCubic: function (x) {
    return 1 - pow(1 - x, 3);
  },
  easeInOutCubic: function (x) {
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
  },
  easeInQuart: function (x) {
    return x * x * x * x;
  },
  easeOutQuart: function (x) {
    return 1 - pow(1 - x, 4);
  },
  easeInOutQuart: function (x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
  },
  easeInQuint: function (x) {
    return x * x * x * x * x;
  },
  easeOutQuint: function (x) {
    return 1 - pow(1 - x, 5);
  },
  easeInOutQuint: function (x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
  },
  easeInSine: function (x) {
    return 1 - cos((x * PI) / 2);
  },
  easeOutSine: function (x) {
    return sin((x * PI) / 2);
  },
  easeInOutSine: function (x) {
    return -(cos(PI * x) - 1) / 2;
  },
  easeInExpo: function (x) {
    return x === 0 ? 0 : pow(2, 10 * x - 10);
  },
  easeOutExpo: function (x) {
    return x === 1 ? 1 : 1 - pow(2, -10 * x);
  },
  easeInOutExpo: function (x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? pow(2, 20 * x - 10) / 2
      : (2 - pow(2, -20 * x + 10)) / 2;
  },
  easeInCirc: function (x) {
    return 1 - sqrt(1 - pow(x, 2));
  },
  easeOutCirc: function (x) {
    return sqrt(1 - pow(x - 1, 2));
  },
  easeInOutCirc: function (x) {
    return x < 0.5
      ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
      : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
  },
  easeInElastic: function (x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
  },
  easeOutElastic: function (x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  easeInOutElastic: function (x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
      : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
  },
  easeInBack: function (x) {
    return c3 * x * x * x - c1 * x * x;
  },
  easeOutBack: function (x) {
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  },
  easeInOutBack: function (x) {
    return x < 0.5
      ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  easeInBounce: function (x) {
    return 1 - bounceOut(1 - x);
  },
  easeOutBounce: bounceOut,
  easeInOutBounce: function (x) {
    return x < 0.5
      ? (1 - bounceOut(1 - 2 * x)) / 2
      : (1 + bounceOut(2 * x - 1)) / 2;
  },
};

const VERTEX_SHADER = `

    vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
    }

    vec3 fade(vec3 t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
    }

    float cn(vec3 P) {
        vec3 Pi0 = floor(P);
        vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P);
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
    }
    attribute float opacity;
    
    uniform float time;
    varying vec3 v_normal;
    // varying float v_addLength;
    varying float v_color;
    varying float v_opacity;
    
    void main() {


      v_normal = normal;
      v_opacity = opacity;
      
      float maxLength = 7.7;
      float addLength = maxLength * cn(normalize(position) * 2.9 + time * 0.9);
      v_color = maxLength * cn(normalize(position) * 0.6 + (time) * 0.6) * 0.82;
      // v_addLength = addLength;
      vec3 newPosition = position + normal * addLength;

      vec4 mPosition = modelViewMatrix * vec4(newPosition, 1.0);
      if (mPosition.z < 0.0) {
        // mPosition.x = 1000.0;
        gl_PointSize = 0.0;
      }
      gl_PointSize = opacity * 3.0;
      gl_Position = projectionMatrix * mPosition;
    }
`;
const FRAGMENT_SHADER = `
    varying float v_opacity;
    varying vec3 v_normal;
    varying float v_color;
    
    void main() {
      // vec3 color = normalize(v_color * 0.5 + 0.5 * v_normal + 0.1) * (v_color + 0.1) * 2.0;
      vec3 color = (v_color * 0.05) + v_normal + 0.5;
      color.x += v_color * 0.2;
      color.z += v_color * 0.2;
      gl_FragColor = vec4(normalize(color) , v_opacity);
        // gl_FragColor = vec4(v_opacity,v_opacity,v_opacity,v_opacity);
    }
`;

const radius = 173;
const smallRadius = radius * 0.9;
const smallHeight = radius * 0.3;

let canvas = document.querySelector("#cloudWave");
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  50,
  canvas.width / canvas.height,
  0.1,
  10000
);
camera.fov = 50; // 既定の値は 50 です。視野角を広げるためには、大きな値を使用します。
camera.updateProjectionMatrix(); // カメラの設定を更新します。
camera.position.z = 600;
camera.lookAt(new THREE.Vector3());
renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(canvas.width, canvas.height);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(1);
let material = new THREE.ShaderMaterial({
  vertexShader: VERTEX_SHADER,
  fragmentShader: FRAGMENT_SHADER,
  uniforms: {
    time: { type: "1f", value: 0 },
  },
  transparent: true,
  blending: THREE.AdditiveBlending,
});

function createPoints(
  radius,
  position,
  opacityStart = 0.5,
  opacityEnd = -0.2,
  opacityMax = 1
) {
  let initGeom = new THREE.IcosahedronGeometry(radius, 5);
  let geom = new THREE.Geometry();
  let bufferGeom = new THREE.BufferGeometry();
  let opacities = [];
  let normals = [];
  let vertices = [];

  let opacityStartVal = -1 * opacityStart * radius;
  let opacityEndVal = -1 * opacityEnd * radius;

  initGeom.lookAt(
    new THREE.Vector3(Math.random(), Math.random(), Math.random())
  );
  geom.vertices = initGeom.vertices;
  geom.vertices = geom.vertices.filter((v) => {
    let opacity = 1;
    if (v.z > opacityStartVal && v.z < opacityEndVal) {
      opacity = easing.easeOutCubic(
        (v.z - opacityEndVal) / (opacityStartVal - opacityEndVal)
      );
    }

    opacities.push(opacity);
    v.opacity = opacity * opacityMax;
    return v.z < opacityEndVal;
  });
  geom.lookAt(position.clone().negate());
  geom.translate(position.x, position.y, position.z);
  vertices = geom.vertices;

  let length = vertices.length;
  let bufferVertices = new Float32Array(length * 3);
  let bufferNormals = new Float32Array(length * 3);
  let bufferOpacity = new Float32Array(length);

  vertices.forEach((v, i) => {
    bufferVertices[i * 3] = v.x;
    bufferVertices[i * 3 + 1] = v.y;
    bufferVertices[i * 3 + 2] = v.z;
    v.normalize();
    bufferNormals[i * 3] = v.x;
    bufferNormals[i * 3 + 1] = v.y;
    bufferNormals[i * 3 + 2] = v.z;
    bufferOpacity[i] = v.opacity;
  });
  // console.log(vertices)
  bufferGeom.addAttribute(
    "position",
    new THREE.BufferAttribute(bufferVertices, 3)
  );
  bufferGeom.addAttribute(
    "normal",
    new THREE.BufferAttribute(bufferNormals, 3)
  );
  bufferGeom.addAttribute(
    "opacity",
    new THREE.BufferAttribute(bufferOpacity, 1)
  );

  let points = new THREE.Points(bufferGeom, material);
  return points;
}
function addScene(cloudPositions) {
  cloudPositions.forEach((position) => {
    scene.add(
      createPoints(
        position.radius,
        new THREE.Vector3(position.x, position.y, position.z),
        position.opacityStart,
        position.opacityEnd,
        position.opacityMax
      )
    );
  });
}

// 使用例
const cloudPositions = [
  {
    radius: radius * 0.9,
    x: 0,
    y: radius * 0.18,
    z: 0,
    opacityStart: 0.9,
    opacityEnd: 0.0,
    opacityMax: 0.9,
  },
  {
    radius: radius * 0.92,
    x: radius * -0.1,
    y: radius * 0.13,
    z: -radius * 0.1,
    opacityStart: 0.6,
    opacityEnd: 0.2,
    opacityMax: 0.6,
  },
  {
    radius: radius * 1.21,
    x: radius * 0.06,
    y: radius * -0.02,
    z: radius * -0.13,
    opacityStart: 0.98,
    opacityEnd: 0.5,
    opacityMax: 0.8,
  },
  {
    radius: radius * 0.7,
    x: radius * -0.5,
    y: radius * -0.2,
    z: radius * 0.0,
    opacityStart: 0.4,
    opacityEnd: -0.2,
    opacityMax: 0.3,
  },
  {
    radius: radius * 0.99,
    x: radius * 0.0,
    y: radius * -0.001,
    z: -radius * 0.0,
    opacityStart: 0.9,
    opacityEnd: 0.8,
    opacityMax: 0.6,
  },
  {
    radius: radius * 0.65,
    x: radius * 0.5,
    y: radius * -0.26,
    z: radius * 0.2,
    opacityStart: 0.4,
    opacityEnd: -0.2,
    opacityMax: 0.3,
  },
  {
    radius: radius * 0.69,
    x: radius * 0.7,
    y: radius * -0.26,
    z: radius * 0.0,
    opacityStart: 0.9,
    opacityEnd: 0.0,
    opacityMax: 0.8,
  },
  {
    radius: radius * 0.69,
    x: radius * -0.7,
    y: radius * -0.26,
    z: radius * 0.0,
    opacityStart: 0.9,
    opacityEnd: -0.3,
    opacityMax: 0.9,
  },
  1,
];

addScene(cloudPositions);

let now = new Date();
let pre = now;
let cameraOffsetStep = 6;
(function tick() {
  now = new Date();
  material.uniforms.time.value += (now - pre) * 0.0008;
  pre = now;
  if (camera.position.x > 200) {
    cameraOffsetStep = -2;
  } else if (camera.position.x < -200) {
    cameraOffsetStep = 2;
  }

  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
})();
