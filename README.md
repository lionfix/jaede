<!DOCTYPE html>
<html>
<head>
<title>⚡️ TERA</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 50%,#0f3460 100%);color:#00ffaa;padding:20px;min-height:100vh;}
.container{max-width:520px;margin:0 auto;}
h1{text-align:center;margin-bottom:25px;font-size:34px;background:linear-gradient(45deg,#00ffaa,#00cc88);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-shadow:0 0 30px rgba(0,255,170,0.5);font-weight:700;}
.status{background:linear-gradient(145deg,rgba(0,255,170,0.1),rgba(0,255,170,0.05));backdrop-filter:blur(20px);padding:22px;border-radius:20px;margin-bottom:25px;border:1px solid rgba(0,255,170,0.2);box-shadow:0 10px 40px rgba(0,255,170,0.15);text-align:center;}
.wallet{display:flex;gap:12px;margin-bottom:25px;flex-wrap:wrap;}
input{flex:1;min-width:85px;padding:16px;border:1px solid rgba(0,255,170,0.3);border-radius:16px;background:rgba(0,0,0,0.6);color:#00ffaa;font-size:16px;font-weight:500;box-shadow:0 6px 20px rgba(0,0,0,0.4);transition:all 0.3s;}
input:focus{outline:none;box-shadow:0 0 0 3px rgba(0,255,170,0.2);}
button{background:linear-gradient(45deg,#00ffaa,#00cc88);border:none;padding:20px 35px;border-radius:20px;color:#0a0a0a;font-size:18px;font-weight:700;cursor:pointer;transition:all 0.3s;box-shadow:0 8px 30px rgba(0,255,170,0.4);}
button:hover{transform:translateY(-4px);box-shadow:0 15px 45px rgba(0,255,170,0.6);}
button:disabled{opacity:0.5;cursor:not-allowed;}
.log{background:rgba(0,0,0,0.8);backdrop-filter:blur(15px);padding:22px;border-radius:20px;height:340px;overflow-y:auto;font-family:'Courier New',monospace;font-size:14px;line-height:1.6;border:1px solid rgba(0,255,170,0.15);}
</style>
</head>
<body>
<div class="container">
<h1>⚡️ TERA v2.0</h1>
<div class="status" id="status">🔄 Carregando saldos da rede...</div>
<div class="wallet">
<input id="from" placeholder="De:" value="claudio">
<input id="to" placeholder="Para:" value="padaria">
<input id="amount" placeholder="100" type="number" min="1" value="100">
<button id="transferBtn" onclick="sendTera()">⚡️ Transferir TB</button>
</div>
<div class="log" id="log">⚡️ TERA Blockchain BH<br>⏳ Conectando rede comunitária...</div>
</div>
<script>
let ledger=JSON.parse(localStorage.getItem('tera-ledger'))||{claudio:20000,padaria:8000,mercado:12000,ze:5000,maria:7000,joao:4000,farmacia:3000};
function saveLedger(){localStorage.setItem('tera-ledger',JSON.stringify(ledger));}
function updateStatus(){const total=Object.values(ledger).reduce((a,b)=>a+b,0);document.getElementById('status').innerHTML=`⚡️ Total Rede: ${total.toLocaleString()} TB | Claudio: ${ledger.claudio?.toLocaleString()||0}TB | Padaria: ${ledger.padaria?.toLocaleString()||0}TB`;}
function sendTera(){const btn=document.getElementById('transferBtn');const from=document.getElementById('from').value.trim();const to=document.getElementById('to').value.trim();const amount=parseInt(document.getElementById('amount').value)||0;if(amount<=0){log('❌ Valor inválido');return;}if(!ledger[from]||ledger[from]<amount){log('❌ Saldo insuficiente');return;}btn.disabled=true;btn.textContent='⏳ Confirmando bloco...';setTimeout(()=>{ledger[from]-=amount;ledger[to]=(ledger[to]||0)+amount;saveLedger();log(`✅ ${amount.toLocaleString()}TB ${from}→${to}`);updateStatus();btn.disabled=false;btn.textContent='⚡️ Transferir TB';},1200);}
function log(msg){const logEl=document.getElementById('log');logEl.innerHTML+=`<div>${new Date().toLocaleTimeString()}: ${msg}</div>`;logEl.scrollTop=logEl.scrollHeight;}
updateStatus();setInterval(updateStatus,1000);
</script>
</body>
</html>
