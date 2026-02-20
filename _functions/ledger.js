exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const { nome } = JSON.parse(event.body);
    const endereco = `tera_${nome.toLowerCase().replace(/[^a-z0-9]/g,'')}`;
    
    // Cria carteira zero se não existe
    ledger[endereco] = ledger[endereco] || 0;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        endereco, 
        nomeDisplay: nome,
        saldo: ledger[endereco]
      })
    };
  }
  
  return { statusCode: 405, body: 'Método não permitido' };
};