const WebSocket = require('ws');

// Definir uma porta para o servidor WebSocket
const wssPort = process.env.WSS_PORT || 3001;

// Criar o servidor WebSocket
const wss = new WebSocket.Server({ port: wssPort });

// Array para armazenar todas as conexões WebSocket ativas
const clients = [];

// Registrar uma função de callback para o evento de conexão
wss.on('connection', (ws) => {
    console.log('Cliente conectado ao servidor WebSocket');
    
    // Adicionar uma nova conexão à lista de clientes
    clients.push(ws);

    // Registrar uma função de callback para o evento de mensagem
    ws.on('message', (message) => {
        // Verificar se a mensagem é uma string JSON
        try {
            const data = JSON.parse(message);
            console.log(`Mensagem recebida:`, data);
            // Processar os dados como antes
           /*  if ('nome' in data && 'contato' in data) {
                console.log(`Nome: ${data.nome}, Contato: ${data.contato}`);
            } else {
                console.log('Campos nome e/ou contato não estão presentes na mensagem');
            } */
            // Enviar uma mesma mensagem para todos os clientes conectados
            broadcast(message);
        } catch (error) {
            console.log("Erro ao analisar os dados do WebSocket:", error);
        }
    });
});

// Função para enviar uma mensagem para todos os clientes conectados
function broadcast(message) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Registrar uma função de callback para o evento de erro
wss.on('error', (error) => {
    console.error('Erro no servidor WebSocket:', error);
});

// Registrar uma função de callback para o evento de fechamento
wss.on('close', () => {
    console.log('Servidor WebSocket fechado');
});

// Exibir uma mensagem informando que o servidor WebSocket está rodando
console.log(`Servidor WebSocket rodando na porta ${wssPort}`);
