// src/volume/loadRaw.ts

export async function loadRawU8(
  url: string,
  width: number,
  height: number,
  depth: number,
): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  const buffer = await res.arrayBuffer();
  const expected = width * height * depth;

  if (buffer.byteLength < expected) {
    throw new Error(
      `RAW too small: expected ${expected}, got ${buffer.byteLength}`,
    );
  }

  if (buffer.byteLength > expected) {
    const headerSize = buffer.byteLength - expected;
    console.warn(
      `[RTVCMv2] RAW larger than expected. Skipping ${headerSize} header bytes.`,
    );
    return new Uint8Array(buffer, headerSize, expected);
  }

  return new Uint8Array(buffer);
}
