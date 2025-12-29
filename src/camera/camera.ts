// src/camera/camera.ts

export type Camera = {
    eye: Float32Array;
    target: Float32Array;
    up: Float32Array;
  
    fovY: number;
    aspect: number;
    near: number;
    far: number;
  };
  
  export function createCamera(aspect: number): Camera {
    return {
      eye: new Float32Array([0, 0, -2.5]),
      target: new Float32Array([0, 0, 0]),
      up: new Float32Array([0, 1, 0]),
  
      fovY: Math.PI / 4,
      aspect,
      near: 0.1,
      far: 100,
    };
  }
  