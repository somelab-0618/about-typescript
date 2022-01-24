// クラス
class Department {
  // プロパティ
  // static プロパティ
  static fiscalYear = 2020;
  // private readonly id: string // readonlyは初期化後は変更できない
  // name: string;
  // employees: string[] = [];
  // private employees: string[] = []; // このクラス内からのみアクセス可能
  protected employees: string[] = []; // このクラスを継承したクラスからはアクセス可能

  // staticメソッド
  static createEmployee(name: string) {
    return { name: name };
  }
  // constructor(n: string) {
  //   this.name = n;
  // }
  // ↓ プロパティの定義と、コンストラクターでの初期化をまとめて実行する方法
  // ↓ constructorの引数と同じ名前のプロパティが自動的に設定される。publicを明示的に記述する必要あり。
  constructor(protected readonly id: string, public name: string) {
    // staticでないところからstaticメソッドやプロパティにアクセスする場合は
    // クラス名を指定する
    console.log(Department.fiscalYear);
  }

  // ダミーパラメータ（thisの型を指定する）
  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const baseDepartment = new Department('d1', 'baseDepartment');

baseDepartment.addEmployee('taro');
baseDepartment.addEmployee('jiro');

// employeesプロパティがpublicなので、外部から直接追加できてしまう
// addEmployeeを使わなくても、追加できてしまう。
// employeesをprivateにすることでエラーとなり、代入できなくなる。
// accounting.employees[2] = 'hanako';

baseDepartment.describe();
baseDepartment.printEmployeeInformation();

// この場合、baseDepartmentCopyのobjectはnameプロパティを持っていないのでエラーになる。
// const baseDepartmentCopy = { describe: accounting.describe };
// baseDepartmentCopy.describe();
//  ↓
// nameを追加して、型の構造を正しくすることで正常に動作する
// const baseDepartmentCopy = { name: 'Dummy', describe: accounting.describe };
// baseDepartmentCopy.describe();

// 継承
// Departmentクラスを継承.(クラスの継承は一つだけ)
class ITDepartment extends Department {
  // admin: string[]; constructor内で手動で初期化する場合
  constructor(id: string, private admin: string[]) {
    // 親クラスのconstructorへ渡す
    super(id, 'IT');
    // ↑↓thisを使う前にsuperが呼ばれていなくてはならない
    // this.admin. admins; // constructorの引数で設定しない場合
  }
}

const it = new ITDepartment('d2', ['max']);
it.addEmployee('takashi');
it.addEmployee('satoru');

it.describe();
it.printEmployeeInformation();

console.log(it);

class AccountingDepartment extends Department {
  private lastReport: string;
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  // ゲッター
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('レポートが見つかりません。');
  }

  // セッター
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('正しい値を設定してください。');
    }
    this.addReport(value);
  }

  describe() {
    console.log('会計部門 - ID:' + this.id);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  addEmployee(employee: string) {
    if (employee === 'takashi') {
      return;
    }
    // protectedにしたことで、親のDepartmentクラスのプロパティにアクセスできる
    this.employees.push(employee);
  }
}

const accounting = new AccountingDepartment('d2', []);

accounting.addReport('something');
// セッターの利用
accounting.mostRecentReport = 'report by setter';
// falsyなのでエラーになる場合
// accounting.mostRecentReport = '';

// ゲッターの利用
// console.log('lastReport: ', accounting.mostRecentReport);
// accounting.printReports();
accounting.addEmployee('takashi');
accounting.addEmployee('taro');
accounting.addEmployee('hanako');
// accounting.printEmployeeInformation();
accounting.describe();

console.log(accounting);
