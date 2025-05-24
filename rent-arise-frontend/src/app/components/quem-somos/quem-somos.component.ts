import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quem-somos',
  imports: [CommonModule],
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.css']
})
export class QuemSomosComponent {

  frontEndDev = {
    nome: 'Jorge Gabriel - Front-end Developer',
    foto: 'assets/dev-jorge-gabriel.png',
    tecnologias: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Figma'],
    sobre: 'Apaixonado por design de interfaces e experiência do usuário. Sempre buscando novas formas de tornar as interfaces mais intuitivas e funcionais.',
    hobbies: ['Games', 'UI/UX Design', 'Estudos de IA']
  };

  backEndDev = {
    nome: 'Pedro Augusto - Back-end Developer',
    foto: 'assets/dev-pedro-augusto.png',
    tecnologias: ['Java', 'Spring Boot', 'TypeScript', 'NestJS','PostgreSQL', 'Docker', 'AWS'],
    sobre: 'Focado em arquitetura robusta e escalável. Gosta de resolver problemas complexos e automatizar processos.',
    hobbies: ['Ciclismo', 'Desenvolvimento de APIs', 'Filmes de ficção científica']
  };
}
