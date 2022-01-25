import { isConstructorDeclaration } from 'typescript';

// 抽象クラス (インスタンス化できない)
abstract class AbDepartment {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  static createEmployee(name: string) {
    return { name: name };
  }

  constructor(protected readonly id: string, public name: string) {}

  // 実装内容は空でないといけない
  abstract describe(this: AbDepartment): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// 継承
// Departmentクラスを継承.(クラスの継承は一つだけ)
class AbITDepartment extends AbDepartment {
  constructor(id: string, private admin: string[]) {
    super(id, 'IT');
  }

  // abstractクラスを継承したら、abstractメソッドは実装しなければならない
  describe() {
    console.log('IT部門 - ID: ' + this.id);
  }
}

const abITDepartment = new AbITDepartment('d2', ['']);

abITDepartment.describe();

//シングルトンクラス
class AccountingDepartment2 extends AbITDepartment {
  private lastReport: string;
  private static instance: AccountingDepartment2;

  // constructorをprivateにすると、外部からnewできなくなる
  private constructor(id: string, private reports: string[]) {
    super(id, ['test']);
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment2.instance) {
      return this.instance;
    }

    this.instance = new AccountingDepartment2('d2', []);
    return this.instance;
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

// constructorがprivateなのでnewできない。
// const accounting2 = new AccountingDepartment2('d2', []);
// ↓
const accounting2 = AccountingDepartment2.getInstance;
