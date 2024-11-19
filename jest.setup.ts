// fetch polyfill
import "whatwg-fetch";

// Assign value to global variable
declare global {
  var someGlobalVar: string;
}
globalThis.someGlobalVar = "test";
