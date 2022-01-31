// Project Type 型をクラスを使って定義する
export enum ProjectStatus {
  Active,
  Finished,
}
export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public manday: number,
    public status: ProjectStatus
  ) {}
}
