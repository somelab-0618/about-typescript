//クラスデコレータやメソッドデコレータは値を返すことができる
function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE ファクトリ');
  // 渡されるパラメータがクラスあることを型定義する
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // デコレータ関数のreturn
    // クラスデコレータはclass(コンストラクター関数)をreturnできる
    return class extends originalConstructor {
      constructor(...args: any[]) {
        // この中はクラスがインスタンス化されたときに実行される
        super(); // originalのコンストラクター関数が呼び出される
        console.log('テンプレートを表示');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

@WithTemplate('<h1>Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Personオブジェクトを作成中...');
  }
}

new Person();

// メソッドデコレータの返却値の利用
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method デコレータ');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  console.log(descriptor);
  // 対象となるもとの関数を取り出す
  const originalMethod = descriptor.value;
  // 調整されたdescriptorを返す
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); // thisはgetメソッドが属しているオブジェクトを指す
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = 'クリックしました';

  @Autobind
  showMessage() {
    console.log('show');
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

// デコレーターでバリデーション;
interface ValidatorConfig {
  [prop: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name]?.[propName],
      'required',
    ],
  };
}
function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name]?.[propName],
      'positive',
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
    return isValid;
  }
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;
  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('正しく入力してください。');
    return;
  }
  console.log(createdCourse);
});
