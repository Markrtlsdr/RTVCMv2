// src/camera/controls.ts

import type { Camera } from "./camera";

export function attachOrbitControls(
  canvas: HTMLCanvasElement,
  camera: Camera,
) {
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  let yaw = 0;
  let pitch = 0;
  const radius = 2.5;

  canvas.addEventListener("mousedown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    yaw += dx * 0.005;
    pitch += dy * 0.005;
    pitch = Math.max(-1.5, Math.min(1.5, pitch));

    camera.eye[0] = radius * Math.sin(yaw) * Math.cos(pitch);
    camera.eye[1] = radius * Math.sin(pitch);
    camera.eye[2] = radius * Math.cos(yaw) * Math.cos(pitch);
  });
}
