Alma Literária 📚

Alma Literária é uma livraria online moderna construída com React, oferecendo uma experiência fluida e intuitiva para compra de livros. Com design responsivo estilizado via Tailwind CSS, suporta dark mode, autenticação, carrinho de compras e integração simulada com APIs. O estado é gerenciado por Redux, com persistência via localStorage.
📖 Visão Geral
O projeto foi desenvolvido para proporcionar uma interface amigável e acessível, com foco em usabilidade e estética. Inclui funcionalidades essenciais para uma livraria online, como catálogo de livros, carrinho dinâmico e alternância de temas, tudo otimizado para diferentes dispositivos.
🚀 Funcionalidades

Autenticação de Usuários: Login e cadastro com validação segura.
Catálogo Interativo: Exibição de livros em grade responsiva com detalhes e imagens.
Carrinho de Compras: Adição, remoção e ajuste de quantidades, com persistência no localStorage.
Dark Mode: Alternância entre temas claro e escuro via React Context.
Gerenciamento de Estado: Uso de Redux para carrinho e autenticação.
Integração com APIs: Simulação de chamadas para dados de livros.

🛠 Tecnologias Utilizadas

React 18.2.0: Biblioteca para construção da interface.
Redux 4.2.0: Gerenciamento de estado global.
Tailwind CSS 3.4.1: Estilização responsiva e moderna.
React Context: Gerenciamento de temas (dark/light mode).
localStorage: Persistência de dados do carrinho e preferências.
JavaScript (ES6+): Lógica da aplicação.

📦 Pré-requisitos

Node.js (v16 ou superior)
npm (v8 ou superior)
Navegador moderno (Chrome, Firefox, Edge)

🏃 Como Rodar o Projeto

Clone o repositório:git clone https://github.com/Gustavo-2027/alma_literaria.git


Entre na pasta do projeto:cd alma_literaria


Instale as dependências:npm install


Inicie a aplicação:npm start


Acesse em http://localhost:3000 no navegador.

📂 Estrutura do Projeto
alma_literaria/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── store/         # Configuração do Redux
│   ├── styles/        # Estilização com Tailwind CSS
│   ├── context/       # Gerenciamento do tema (dark/light)
│   ├── assets/        # Imagens e outros recursos
├── public/            # Arquivos públicos
├── package.json       # Dependências e scripts
└── README.md          # Documentação do projeto

🖼 Capturas de Tela

Nota: Adicione capturas de tela na pasta screenshots/ e atualize os links abaixo.


Página Inicial 
Carrinho de Compras 
Dark Mode 

🤝 Contribuição
Contribuições são bem-vindas! Para contribuir:

Faça um fork do repositório.
Crie uma branch para sua feature: git checkout -b minha-feature.
Commit suas alterações: git commit -m "Adiciona minha feature".
Envie para o repositório: git push origin minha-feature.
Abra um pull request no GitHub.

Por favor, reporte bugs ou sugestões via issues.
📜 Licença
Este projeto está licenciado sob a MIT License.