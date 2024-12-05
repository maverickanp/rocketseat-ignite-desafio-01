# Usar imagem base oficial do Node.js
FROM node:18

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código-fonte da aplicação
COPY . .

# Instalar dependências de desenvolvimento (nodemon)
RUN npm install -g nodemon

# Expor a porta do servidor
EXPOSE 3000

# Comando para iniciar o servidor em desenvolvimento
CMD ["nodemon", "src/index.ts"]
