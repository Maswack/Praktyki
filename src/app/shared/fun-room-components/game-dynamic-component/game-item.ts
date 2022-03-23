import { Type } from '@angular/core';

export class GameItem {
  constructor(public component: Type<any>, public data: any) {}
}