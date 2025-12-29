# RTVCMv2

**RTVCMv2** is a real-time WebGPU application for volumetric rendering
and simulation of cellular cytosol data.

It visualizes 3D uint8 volume datasets (e.g. 256×256×256 RAW files)
using GPU-accelerated projection and simulates cytosolic motion through
custom WGSL shaders with live, interactive parameter editing.

## Features

### Current
- 🚀 WebGPU-based volumetric MIP rendering
- 🧊 Supports uint8 RAW volumetric datasets
- 🎥 Interactive orbit camera

### Planned
- 🧬 Cytosol simulation via WGSL shaders
- 🎛 Transfer functions (opacity, threshold)
- ✂️ Volume slicing and clipping

## Tech Stack

- **WebGPU**
- **TypeScript**
- **WGSL**
- **gl-matrix**
- **Vite** (depending on version)

## Getting Started

```bash
npm install
npm run dev
```
