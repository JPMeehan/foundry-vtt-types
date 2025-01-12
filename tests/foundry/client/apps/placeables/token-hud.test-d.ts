import { expectTypeOf } from "vitest";

declare const token: Token;

const hud = new TokenHUD();
expectTypeOf(hud.layer).toEqualTypeOf<PlaceablesLayer<any> | undefined>();
expectTypeOf(hud.object).toEqualTypeOf<Token | undefined>();
hud.bind(token);

expectTypeOf(hud.getData()).toEqualTypeOf<MaybePromise<object>>();
expectTypeOf(hud.setPosition()).toEqualTypeOf<void>();
