import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'code';

  activeIndex: number = 0;

  constructor(public router: Router,){}

  handleClick(event) {
    console.log(event);
  }

  irProducto(){  
    this.router.navigate(['/producto']);
  }

  irProveedor(){
    this.router.navigate(['/proveedor']);
  }

  irCalculador(){
    this.router.navigate(['/calculador']);
  }

}
