// Autobind Decorator
export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // デコレーターが設定された元のメソッドを取得
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    // 元の関数にアクセスしたときに実行される
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
