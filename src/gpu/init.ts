// src/gpu/init.ts

export type GPUContext = {
    adapter: GPUAdapter;
    device: GPUDevice;
    canvas: HTMLCanvasElement;
    format: GPUTextureFormat;
    context: GPUCanvasContext;
};

export async function initWebGPU(canvas: HTMLCanvasElement): Promise<GPUContext> {
    if (!navigator.gpu) throw new Error("WebGPU not supported in this browser.");

    const adapter = await navigator.gpu.requestAdapter({
        powerPreference: "high-performance",
    });
    if (!adapter) throw new Error("No GPUAdapter available.");

    const device = await adapter.requestDevice();

    const context = canvas.getContext("webgpu");
    if (!context) throw new Error("Could not get WebGPU canvas context.");

    const format = navigator.gpu.getPreferredCanvasFormat();

    context.configure({
        device,
        format,
        alphaMode: "opaque",
    });

    return { adapter, device, canvas, format, context };
}
