export interface EventInput {
  id: number;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  name: string;
  [key: string]: string|number;
}
