import { expectTypeOf } from "vitest";
import "../../../../index";

Hooks.on("canvasInit", (canvas) => {
  expectTypeOf(canvas).toEqualTypeOf<Canvas>();
});
Hooks.on("fooBar", (baz, bar) => {
  expectTypeOf(baz).toEqualTypeOf<string>();
  expectTypeOf(bar).toEqualTypeOf<number>();
  return true;
});
Hooks.on<Hooks.CloseApplication<FormApplication>>("closeFormApplication", (app, jq) => {
  expectTypeOf(app).toEqualTypeOf<FormApplication>();
  expectTypeOf(jq).toEqualTypeOf<JQuery>();
});

Hooks.on("error", (...args) => {
  if (args[0] === "Canvas#draw") expectTypeOf(args[2].layer).toEqualTypeOf<CanvasLayer>();
});
Hooks.on("error", (...args) => {
  if (args[0] === "Game#initializeCanvas") expectTypeOf(args[2].foo).toEqualTypeOf<never>();
});
Hooks.on("error", (...args) => {
  if (args[0] === "MyClass#myMethod") expectTypeOf(args[2].foo).toEqualTypeOf<number>();
});
