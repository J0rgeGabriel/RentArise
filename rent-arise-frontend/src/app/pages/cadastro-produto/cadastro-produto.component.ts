import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SharedProductService } from '../../services/shared-product.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent]
})
export class CadastroProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  submitted = false;
  imagemPrincipal: File | null = null;
  imagemPreviewUrl: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private authService: AuthService,
    private sharedProductService: SharedProductService
  ) {
    console.log('Inicializando CadastroProdutoComponent');
    this.produtoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });

    // Adicionar listeners para logar mudanças nos campos
    this.produtoForm.get('name')?.valueChanges.subscribe(value => {
      console.log('Nome do produto mudou:', value);
    });
    this.produtoForm.get('description')?.valueChanges.subscribe(value => {
      console.log('Descrição do produto mudou:', value);
    });

    console.log('Formulário inicializado:', this.produtoForm.value);
  }

  ngOnInit(): void {
    console.log('ngOnInit executado');
    // Verifica se o usuário está autenticado
    const token = this.authService.getToken();
    if (!token) {
      console.log('Usuário não autenticado, redirecionando para login.');
      this.router.navigate(['/login']);
    } else {
      console.log('Usuário autenticado.');
    }
  }

  // Conveniência para acessar os campos do formulário
  get f() { return this.produtoForm.controls; }

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

    // Para aqui se o formulário for inválido
    if (this.produtoForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.produtoForm.get('name')?.value);
    formData.append('description', this.produtoForm.get('description')?.value);

    if (this.imagemPrincipal) {
      formData.append('file', this.imagemPrincipal);
    }

    this.produtoService.criarProduto(formData).subscribe({
      next: (response) => {
        console.log('Produto cadastrado com sucesso:', response);
        console.log('Tentando navegar para o catálogo...');

        // Salvar o produto na lista de produtos salvos
        this.sharedProductService.addProduct(response);

        // Navegar para o catálogo
        this.router.navigate(['/produtos']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar produto:', error);
      }
    });
  }
}
