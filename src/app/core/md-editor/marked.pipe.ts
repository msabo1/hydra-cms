import { Pipe, PipeTransform, Inject } from "@angular/core";

@Pipe({
  name: "marked"
})
export class MarkedPipe implements PipeTransform {
  constructor(@Inject('marked') private readonly marked){}
  transform(value: string): string {
    if (value && value.length > 0) {
      return this.marked(value);
    }
    return value;
  }
}
