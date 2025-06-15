// .cz-config.js
module.exports = {
  types: [
    { value: '✨ feat',     name: '✨ feat:     Nova funcionalidade' },
    { value: '🐛 fix',      name: '🐛 fix:      Correção de bug' },
    { value: '💄 style',    name: '💄 style:    Alterações de estilo (CSS)' },
    { value: '📄 docs',     name: '📄 docs:     Apenas documentação' },
    { value: '♻️ refactor', name: '♻️ refactor: Refatoração de código' },
    { value: '🚀 perf',     name: '🚀 perf:     Melhoria de performance' },
    { value: '🧪 test',     name: '🧪 test:     Adição ou ajuste de testes' },
    { value: '🔧 chore',    name: '🔧 chore:    Configuração ou tarefa técnica' },
    { value: '🔥 remove',   name: '🔥 remove:   Remoção de código ou arquivos' },
  ],
  messages: {
    type: "Qual o tipo de mudança que você está fazendo?",
    scope: "Escopo desta mudança (opcional):",
    customScope: "Defina o escopo:",
    subject: "Escreva uma descrição breve e imperativa:",
    body: 'Descrição longa (opcional). Use "|" para quebras de linha:',
    breaking: 'Mudanças incompatíveis (BREAKING CHANGE):',
    footer: 'Issues relacionadas (ex: #123):',
    confirmCommit: 'Deseja prosseguir com esse commit?',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  subjectLimit: 100,
}
