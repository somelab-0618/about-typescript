// ## いろいろなデコレータ
// targetにはプロパティがインスタンスプロパティならクラスのプロトタイプが渡され、
// プロパティがstaticならconstructor関数)が渡される
// ※インスタンスプロパティはクラスのコンストラクタなどのメソッド内で定義される
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property デコレータ');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor デコレータ');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method デコレータ');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter デコレータ');
  console.log(target);
  console.log(name);
  console.log(position);
}

// クラスが定義されたときに実行され、初期設定のようなことを行う
class Product {
  // プロパティにデコレータ
  @Log
  title: string;
  private _price: number;

  // アクセサのデコレータ
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('不正な価格です - 0以下は設定できません。');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  // 税込価格を返すメソッド
  // メソッドデコレータ
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    // パラメータデコレータ↑
    return this._price * (1 + tax);
  }
}
