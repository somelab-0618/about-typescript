// ## 交差型 ##
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// AdminとEmployeeの型をもった型（オブジェクトの型の場合は結合される）
// interfaceでも可能
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'taro',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
//↓ Union型だと共通部分が型になる
type Universal = Combinable & Numeric; // number型となる

// ## Type Guard ##

function add(a: Combinable, b: Combinable) {
  // 型を判定
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toLocaleString();
  }
  return a + b;
}

type UnknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(emp.name);
  // if文でtypeofだとJavascript上の型判定しかできない
  // typeof emp === 'object' となってしまうし、
  // typefo emp === 'Employee'などと型も使えない（ただの文字列）
  // ↓
  // objectにプロパティが存在するかをチェックする
  if ('privileges' in emp) {
    console.log('privileges: ' + emp.privileges);
  }

  if ('startDate' in emp) {
    console.log('startDate: ' + emp.startDate);
  }
}

printEmployeeInformation({ name: 'jiro', privileges: ['start - server'] });
printEmployeeInformation({ name: 'jiro', startDate: new Date() });

class Car {
  drive() {
    console.log('運転中...');
  }
}

class Truck {
  drive() {
    console.log('トラックを運転中...');
  }

  loadCargo(amount: number) {
    console.log('荷物を載せています... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // プロパティ名で判断
  // if ('loadCargo' in vehicle) {
  //   vehicle.loadCargo(1000);
  // }
  // Truckクラスのインスタンスかを判断
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// ## discriminate union type 判別可能なUnion型 ##
interface Bird {
  type: 'bird'; // リテラル型でtypeプロパティを判別のために追加
  flyingSpeed: number;
}

interface Horse {
  type: 'horse'; // リテラル型でtypeプロパティを判別のために追加
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // プロパティを確認するやり方だと、プロパティが増えたときの対応や、
  // プロパティ名間違いなどが発生するかもしれない...
  // if ('flyingSpeed' in animal) {
  //   console.log(animal.flyingSpeed);
  // }
  // ↓ interfaceにtypeプロパティを追加したことで
  let speed;
  switch (animal.type) {
    case 'bird':
      console.log(animal.flyingSpeed);
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      console.log(animal.runningSpeed);
      speed = animal.runningSpeed;
      break;
  }
  console.log('移動速度: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 100 });

// ## 型キャスト ##
const paragraph1 = document.querySelector('p');
// => HTMLParagraphElement | null

const paragraph2 = document.getElementById('message-output');
// => HTMLElement | null  (pタグかどうかまではわかっていない)

// const userInputElement = document.getElementById('user-input');
// // => HTMLElement | null (inputタグだとはわからない)

// userInputElement.value = 'こんにちは';
// // ↓               └ プロパティ 'value' は型 'HTMLElement' に存在しません。
// // ↓                  inputだとわからなのでエラー
// // ↓
// // const userInputElement: HTMLElement | null
// // オブジェクトは 'null' である可能性があります。

// Inputタグだと伝える方法1
// const userInputElement
//      = <HTMLInputElement>document.getElementById('user-input')!; // <= ! でnullでないとする。
// Inputタグだと伝える方法2 as
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

userInputElement.value = 'こんにちは';

// type guardを使う
const userInputElement2 = document.getElementById('user-input');

if (userInputElement2) {
  (userInputElement2 as HTMLInputElement).value = 'こんにちは';
}

// ## index型 ##
interface ErrorContainer {
  // id: string; OK
  // id: number; index型で定義している組み合わせと異なるのでNG
  [key: string]: string;
}

const errorBag: ErrorContainer = {
  email: '正しいメールアドレスではありません',
  // 1: '正しいメールアドレスではありません', keyは数値でもOK
  username: 'ユーザー名に記号は使えません',
};

// ## 関数オーバーロード ##
// 一つの関数に異なるパラメーターでの呼び出し方を定義できる

// 通常の例 返り値がnumberかstringになる関数
function add_v2(a: Combinable, b: Combinable) {
  // 型を判定
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toLocaleString();
  }
  return a + b;
}

const result = add_v2('Hello', ' Typescript');
// result.split(' '); // <= stringが返ってくると確定していないのでエラーになる

// 関数オーバーロードの例
// 引数の組み合わせて返る型をと明示する
function add_v3(a: number, b: number): number;
function add_v3(a: string, b: string): string;
function add_v3(a: number, b: string): string;
function add_v3(a: string, b: number): string;
function add_v3(a: Combinable, b: Combinable) {
  // 型を判定
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toLocaleString();
  }
  return a + b;
}

const addResult = add_v3('Hello', ' Typescript');
addResult.split(' '); // stringとわかるのでエラーにならない

const fetchedUserData = {
  id: 'u1',
  name: 'user1',
  job: {
    title: 'Developer',
    description: 'Typescript',
  },
};

console.log(fetchedUserData?.job?.title);

// ## Null合体演算子 ##

const userInput = 0;
// falsyな場合は'DEFAULT'が代入される. 空文字や0もfalsyになる
const storedData = userInput || 'DEFAULT';

console.log(storedData); // DEFAULT

// ↓ null合体演算子を使う
const userInput2 = 0;
// Nullかundefinedの時だけ'DEFAULT'が代入される. 空文字や0はtrueになる
const storedData2 = userInput2 && 'DEFAULT';

console.log(storedData2); // 0
