import { Component } from '@angular/core';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})

export class EnterComponent {
  
  public dataSubmit: string = '';
  public dataStatus: boolean = false;

  contactForm: any = {
    email: '',
    password: '',
  };

  public visibility: boolean = false;

  onSubmit(): void {
    if (
      !this.contactForm.email ||
      !this.contactForm.password
    ) {
      this.dataSubmit = 'Поля формы заполнены некорректно!';
      this.visibility = true;
      this.dataStatus = false;
    } else {
      this.dataStatus = true;
      this.visibility = true;
      this.dataSubmit = 'Вы успешно зарегистрированы!';
      Object.keys(this.contactForm).forEach(
        (key) => (this.contactForm[key] = '')
      );
    }
  }
}
