import "./style.css";
import { initWebGPU } from "./gpu/init";
import { loadRawU8 } from "./volume/loadRaw";
import { createMipRenderer } from "./gpu/pipeline";
import { createCamera } from "./camera/camera";
import { attachOrbitControls } from "./camera/controls";

const SIZE = 256;

async function main() {
  const canvas = document.querySelector<HTMLCanvasElement>("#c")!;
  const { device, context, format } = await initWebGPU(canvas);

  const raw = await loadRawU8("/data/sample.raw", SIZE, SIZE, SIZE);
  const volume = device.createTexture({
    size: { width: SIZE, height: SIZE, depthOrArrayLayers: SIZE },
    dimension: "3d",
    format: "r8unorm",
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
  });

  device.queue.writeTexture(
    { texture: volume },
    raw.buffer,
    { bytesPerRow: SIZE, rowsPerImage: SIZE },
    { width: SIZE, height: SIZE, depthOrArrayLayers: SIZE },
  );

  const camera = createCamera(canvas.clientWidth / canvas.clientHeight);
  attachOrbitControls(canvas, camera);

  const renderer = createMipRenderer(device, context, format, volume);

  function frame() {
    renderer.render(camera);
    requestAnimationFrame(frame);
  }

  frame();
}

main();
