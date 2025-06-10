import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule,  ReactiveFormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})
export class CadastroProdutoComponent {
  produtoForm: FormGroup;
  submitted = false;
  imagemPrincipal: File | null = null;
  imagemPreviewUrl: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private authService: AuthService
  ) {
    this.produtoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      pricePerDay: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  get f() {
    return this.produtoForm.controls;
  }

  onFileChangePrincipal(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imagemPrincipal = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagemPreviewUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.produtoForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.produtoForm.get('name')?.value);
    formData.append('description', this.produtoForm.get('description')?.value);
    formData.append('pricePerDay', this.produtoForm.get('pricePerDay')?.value);

    if (this.imagemPrincipal) {
      formData.append('file', this.imagemPrincipal);
    }

    this.produtoService.criarProduto(formData).subscribe({
      next: (response) => {
        console.log('Produto cadastrado com sucesso:', response);
        this.router.navigate(['/produtos']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar produto:', error);
      }
    });
  }
}