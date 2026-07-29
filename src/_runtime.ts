// Bundler runtime shim.
//
// The bundle calls a helper 124 times to install class fields:
//
//     defineField(this, "structGroup", new Group());
//
// That is esbuild/Vite's `__publicField`, emitted because the original source
// used class-field syntax (`structGroup = new Group()`). It is NOT part of
// three.js and must never become an import from it.
//
// This shim reproduces it exactly so the extracted modules resolve. Once the
// class bodies are rewritten to real field syntax, every call site and this
// file can be deleted.

export const defineField = (obj, key, value) =>
  Object.defineProperty(obj, typeof key !== "symbol" ? key + "" : key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value,
  });
