# Estrutura de Imagens - Sistema de Agendamento de Barbearia

## 📁 Organização das Pastas

### `barbers/`

Imagens dos barbeiros da barbearia

- **Formato recomendado**: JPG ou PNG
- **Tamanho recomendado**: 400x400px (quadrado)
- **Nomenclatura**: `nome-sobrenome.jpg`
- **Exemplos**:
  - `joao-silva.jpg`
  - `maria-santos.jpg`
  - `carlos-oliveira.jpg`

### `services/`

Imagens dos serviços oferecidos

- **Formato recomendado**: JPG ou PNG
- **Tamanho recomendado**: 600x400px (retangular)
- **Nomenclatura**: `nome-servico.jpg`
- **Exemplos**:
  - `corte-masculino.jpg`
  - `barba.jpg`
  - `combo-corte-barba.jpg`

### `gallery/`

Galeria de fotos da barbearia

- **Formato recomendado**: JPG ou PNG
- **Tamanho recomendado**: 1200x800px
- **Nomenclatura**: `galeria-01.jpg`, `galeria-02.jpg`
- **Exemplos**:
  - `interior-01.jpg`
  - `equipamentos.jpg`
  - `ambiente.jpg`

### `hero/`

Imagem principal da landing page

- **Formato recomendado**: JPG ou PNG
- **Tamanho recomendado**: 1920x1080px (Full HD)
- **Nomenclatura**: `hero-barber.jpg`
- **Exemplos**:
  - `barber-hero.jpg`
  - `landing-main.jpg`

## 🖼️ Como Usar no Código

### Imagem da Landing Page

```tsx
<Image
  src="/images/hero/barber-hero.jpg"
  alt="Barbeiro profissional"
  fill
  className="object-cover"
  priority
/>
```

### Imagem do Barbeiro

```tsx
<Image
  src="/images/barbers/joao-silva.jpg"
  alt="João Silva"
  width={200}
  height={200}
  className="w-full h-48 rounded-lg object-cover"
/>
```

### Imagem do Serviço

```tsx
<Image
  src="/images/services/corte-masculino.jpg"
  alt="Corte Masculino"
  width={300}
  height={200}
  className="w-full h-32 rounded-lg object-cover"
/>
```

## 📏 Especificações Técnicas

### Otimização

- **Qualidade**: 80-90% para JPG
- **Compressão**: Use ferramentas como TinyPNG ou ImageOptim
- **Formato WebP**: Considere converter para WebP para melhor performance

### Responsividade

- **Mobile**: Imagens devem funcionar bem em telas pequenas
- **Tablet**: Adaptar para telas médias
- **Desktop**: Otimizar para telas grandes

### Acessibilidade

- **Alt text**: Sempre incluir descrição alternativa
- **Contraste**: Garantir boa legibilidade
- **Tamanho**: Texto legível em diferentes tamanhos

## 🚀 Próximos Passos

1. Adicionar imagens reais da barbearia
2. Otimizar imagens para web
3. Implementar lazy loading
4. Adicionar fallbacks para imagens quebradas
5. Configurar CDN se necessário
