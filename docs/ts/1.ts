const a = () => {}

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
