exports.handler = async (event, context) => {
  // Ledger inicial BH
  let ledger = {
    claudio: 20000,
    padaria: 8000, 
    mercado: 12000,
    ze: 5000,
    maria: 7000,
    joao: 4000,
    farmacia: 3000
  };

  // Carrega ledger salvo (ou usa inicial)
  try {
    const saved = await localStorage.getItem('tera-ledger');
    if (saved) ledger = JSON.parse(saved);
  } catch(e) {}

  // GET = retorna ledger
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ledger)
    };
  }

  // POST = salva transferências
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      localStorage.setItem('tera-ledger', JSON.stringify(body));
      return { statusCode: 200, body: 'OK' };
    } catch(e) {
      return { statusCode: 400, body: 'Erro' };
    }
  }

  return { statusCode: 405, body: 'Método não permitido' };
};
