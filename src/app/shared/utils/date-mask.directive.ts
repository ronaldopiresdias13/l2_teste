import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDateMask]',
  standalone: true
})
export class DateMaskDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    console.log(input.value)
    let value = input.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    if (value.length > 5) {
      value = `${value.slice(0, 5)}/${value.slice(5, 9)}`;
    }

    input.value = value;

    // Converta o valor formatado para um objeto Date
    const date = this.parseDate(value);
    console.log(date)
    if (value.length === 10) {
        // Atualize o valor do FormControl
     this.control.control?.setValue(date);
    }
    
  }

  private parseDate(value: string) {
    if (value.length === 10) { // Checa se o valor tem o formato DD/MM/YYYY
      const day = parseInt(value.slice(0, 2), 10);
      const month = parseInt(value.slice(3, 5), 10) - 1; // Mês é 0-indexado
      const year = parseInt(value.slice(6, 10), 10);

      const date = new Date(year, month, day);
      
      // Valida se a data é válida
      if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
        return date;
      }
    }
    return value; // Retorna null se a data não for válida
  }
}
