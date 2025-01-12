import { expectTypeOf } from "vitest";
import "../../index";

declare const lock: Semaphore;

expectTypeOf(lock.add(async (s: string) => !s, "test")).toEqualTypeOf<Promise<boolean>>();
expectTypeOf(lock.add(async () => false)).toEqualTypeOf<Promise<boolean>>();

// @ts-expect-error - The callback needs one argument.
lock.add(async (s: string) => !s);

// @ts-expect-error - The callback doesn't need any arguments.
lock.add(async () => false, "");
