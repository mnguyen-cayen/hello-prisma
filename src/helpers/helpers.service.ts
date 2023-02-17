import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  // constructor() {}

  getBoolean(value: boolean | string | number) {
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
      case 'on':
      case 'yes':
        return true;
      default:
        return false;
    }
  }
}
