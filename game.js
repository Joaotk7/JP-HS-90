// === Estados do painel ===
let selectedCode = "";
let activeCode = "";
let lastUpdate = new Date();
let generatedCode = generateCode();

// Funções extras
let perfectSensitivity = true;
let extraIntensity = true;
let betterHudSpeed = true;
let precisionAbsolute = true;
let precisionDistance = true;

// === Função para gerar código HS ===
function generateCode() {
  return 'HS_' + Math.random().toString(36).substring(2,8).toUpperCase();
}

// === Atualiza código a cada 24h ===
setInterval(() => {
  const hoursDiff = (new Date() - lastUpdate) / (1000*60*60);
  if(hoursDiff >= 24) {
    generatedCode = generateCode();
    lastUpdate = new Date();
    alert("Novo código gerado: " + generatedCode);
    updateUI();
  }
}, 60000);

// === Escolher e ativar código ===
function chooseCode(code) {
  selectedCode = code;
  alert("Código selecionado: " + code + "\nAgora você pode ativar quando quiser.");
  updateUI();
}

function activateCode() {
  if(!selectedCode) return alert("Nenhum código selecionado!");
  activeCode = selectedCode;
  alert("Código ativado: " + activeCode);
  updateUI();
}

// === Mudar modo de precisão ===
let precisionMode = "Rápido";
function changePrecisionMode(mode) {
  precisionMode = mode;
  updateUI();
}

// === Funções Ativas ===
const functionsList = [
  { name: 'Precision Full', active: true },
  { name: 'Mira Chiclete', active: true },
  { name: 'Headtrick HS', active: true },
  { name: 'Sensibilidade Perfeita', active: perfectSensitivity },
  { name: 'Intensidade Extra', active: extraIntensity },
  { name: 'Velocidade do HUD', active: betterHudSpeed },
  { name: 'Precisão Absoluta', active: precisionAbsolute },
  { name: 'Precisão a Qualquer Distância', active: precisionDistance }
];

// === Atualiza UI ===
function updateUI() {
  document.getElementById("generatedCode").innerText = generatedCode;
  document.getElementById("lastUpdate").innerText = lastUpdate.toLocaleString();
  document.getElementById("activeCode").innerText = activeCode ? "Código Ativo: " + activeCode : "Nenhum código ativo";

  // Modos de precisão
  document.querySelectorAll(".precision-btn").forEach(btn => {
    if(btn.dataset.mode === precisionMode) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  // Funções ativas
  const funcContainer = document.getElementById("functionList");
  funcContainer.innerHTML = "";
  functionsList.forEach(f => {
    if(f.active){
      const span = document.createElement("span");
      span.innerText = "• " + f.name;
      funcContainer.appendChild(span);
    }
  });
}

// === Inicializa ===
window.onload = updateUI;