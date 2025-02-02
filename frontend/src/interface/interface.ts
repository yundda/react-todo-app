export interface Payload {
  // { id: 4, text : Str, done: false }
  id: number;
  text: string;
  done: Boolean;
}
// export interface Action {
//   type: string;
//   id?: number;
//   payload?: Payload;
//   data?: Payload;
// }

export interface State {
  list: Payload[];
}

export interface ReducerInterface {
  todo: State;
}
