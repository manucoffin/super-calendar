export interface ICurrentInput {
  id: number,
  isValid: boolean,
}

export class CurrentInput implements ICurrentInput {
  id: number = 0;
  isValid: boolean = false;
}