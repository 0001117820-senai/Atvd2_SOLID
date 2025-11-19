// Classes de baixo nível (SRP: Responsabilidade Única)
class PedidoCalculadora {
  calcularTotal(itens) {
    return itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }
}

class PedidoRepository {
  constructor() {
    this.database = []; 
  }
  salvar(pedido) {
    this.database.push(pedido);
  }
}

class NotificadorPedido {
  enviar(pedido) {
    // Lógica real de envio de notificação
  }
}

// Processador de alto nível (DIP: Inversão de Dependência)
class PedidoProcessorSolid {
  constructor(calculadora, repository, notificador) {
    // Injeção de Dependência
    this.calculadora = calculadora;
    this.repository = repository;
    this.notificador = notificador;
  }

  processarPedido(pedido) {
    if (!pedido || pedido.itens.length === 0) return false;

    // Orquestração das operações
    pedido.total = this.calculadora.calcularTotal(pedido.itens);
    pedido.status = 'PROCESSADO';
    pedido.data = new Date().toISOString();

    this.repository.salvar(pedido);
    this.notificador.enviar(pedido);

    return true;
  }
}

// --- Composição (Uso) ---
const calculadora = new PedidoCalculadora();
const repository = new PedidoRepository();
const notificador = new NotificadorPedido();

const processorSolid = new PedidoProcessorSolid(calculadora, repository, notificador);

// Exemplo de execução
const novoPedido = { id: 'P005', itens: [{ nome: 'Item A', preco: 100, quantidade: 1 }] };
processorSolid.processarPedido(novoPedido);