// src/camera/matrices.ts

import { mat4, vec3 } from "gl-matrix";
import type { Camera } from "./camera";

export function computeInvViewProj(
  camera: Camera,
): { invViewProj: Float32Array; eye: Float32Array } {
  const view = mat4.create();
  const proj = mat4.create();
  const viewProj = mat4.create();
  const invViewProj = mat4.create();

  mat4.lookAt(
    view,
    camera.eye,
    camera.target,
    camera.up,
  );

  mat4.perspective(
    proj,
    camera.fovY,
    camera.aspect,
    camera.near,
    camera.far,
  );

  mat4.multiply(viewProj, proj, view);
  mat4.invert(invViewProj, viewProj);

  return {
    invViewProj: new Float32Array(invViewProj),
    eye: new Float32Array([
      camera.eye[0],
      camera.eye[1],
      camera.eye[2],
      1.0,
    ]),
  };  
}
