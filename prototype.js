
(function(){
  const page=document.body.dataset.prototypePage||'';
  function toast(msg){let t=document.querySelector('.ie-toast');if(!t){t=document.createElement('div');t.className='ie-toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(window.__ieToast);window.__ieToast=setTimeout(()=>t.classList.remove('show'),2600)}
  function modal(title,body){let b=document.querySelector('.ie-modal-backdrop');if(!b){b=document.createElement('div');b.className='ie-modal-backdrop';b.innerHTML='<section class="ie-modal" role="dialog" aria-modal="true"><header class="ie-modal-head"><div class="ie-modal-title"></div><button class="ie-modal-close" aria-label="Fechar">×</button></header><div class="ie-modal-body"></div></section>';document.body.appendChild(b);b.querySelector('.ie-modal-close').addEventListener('click',()=>b.classList.remove('open'));b.addEventListener('click',e=>{if(e.target===b)b.classList.remove('open')})}b.querySelector('.ie-modal-title').textContent=title;b.querySelector('.ie-modal-body').innerHTML=body;b.classList.add('open')}
  function byText(selector,txt){return [...document.querySelectorAll(selector)].filter(el=>el.textContent.replace(/\s+/g,' ').trim().includes(txt))}
  function go(url){location.href=url}
  document.querySelectorAll('a').forEach(a=>{const t=a.textContent.replace(/\s+/g,' ').trim();if(t.includes('Explorador de Similaridades')){a.href='clusters.html'}else if(t.includes('Avaliação de Processo')){a.href='avaliacao.html'}else if(t.includes('Oportunidades Nacionais')){a.href='nacional.html'}else if(t.includes('Sair')){a.href='index.html'}});

  if(page==='mesa'){
    byText('button','Ver Processos').forEach(b=>b.addEventListener('click',()=>go('sso.html?dest=clusters.html&context=acervo')));
  }
  if(page==='projudi'){
    const badge=[...document.querySelectorAll('div,span')].find(el=>el.textContent.includes('Cluster de Acordo (88.4%)') && (el.title||'').includes('InsightErr')) || [...document.querySelectorAll('div')].find(el=>el.textContent.includes('InsightErr')&&el.textContent.includes('Cluster de Acordo'));
    if(badge){badge.classList.add('ie-proto-link');badge.setAttribute('role','link');badge.setAttribute('tabindex','0');const fn=()=>go('sso.html?dest=avaliacao.html&context=processo&processo=0855663-66.2025.7.27.6010');badge.addEventListener('click',fn);badge.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')fn()})}
    byText('button','Voltar').forEach(b=>b.addEventListener('click',()=>go('index.html')));
  }
  if(page==='clusters'){
    byText('button','Nova Análise').forEach(b=>b.addEventListener('click',()=>go('avaliacao.html')));
    byText('button','Analisar Cluster').forEach(b=>b.addEventListener('click',()=>{toast('Cluster selecionado. Exibindo processos com maior potencial de acordo.');document.querySelector('table')?.scrollIntoView({behavior:'smooth',block:'start'})}));
    document.querySelectorAll('button[title="Visualizar Detalhes"], button[title="Ver Rede de Similaridade"]').forEach((b,i)=>{b.dataset.ieBound='1';b.addEventListener('click',()=>go('avaliacao.html?processo='+(i?'0815632-91.2025.8.23.0010':'0812345-67.2023.8.23.0010')))});
    // Any remaining visibility buttons in process rows
    byText('button','visibility').forEach(b=>{if(!b.dataset.ieBound){b.dataset.ieBound='1';b.addEventListener('click',()=>go('avaliacao.html'))}});
    const filter=document.querySelector('input[placeholder="Filtrar clusters..."]');if(filter){filter.addEventListener('input',()=>{const q=filter.value.toLowerCase().trim();document.querySelectorAll('main [class*="rounded-xl"]').forEach(card=>{if(card.textContent.includes('Cluster')&&card.textContent.length<3000)card.style.display=!q||card.textContent.toLowerCase().includes(q)?'':'none'})})}
  }
  if(page==='avaliacao'){
    const q=new URLSearchParams(location.search);const proc=q.get('processo');
    const search=document.querySelector('input[placeholder^="Pesquisar outro processo"]');
    if(proc){if(search)search.value=proc;const candidates=[...document.querySelectorAll('h3,span,p')].filter(el=>/Nº\s*0\d{6}/.test(el.textContent));if(candidates[0]){candidates[0].textContent='Nº '+proc;candidates[0].classList.add('ie-process-highlight')}}
    const analyze=byText('button','Analisar Processo')[0];if(analyze){analyze.addEventListener('click',()=>{const val=(search?.value||'').trim();if(!val){toast('Informe o número CNJ ou o nome de uma parte para pesquisar.');search?.focus();return}toast('Processo localizado. Similaridades e acordos atualizados para '+val+'.');const candidates=[...document.querySelectorAll('h3,span,p')].filter(el=>/Nº\s*0\d{6}/.test(el.textContent));if(candidates[0]){candidates[0].textContent='Nº '+val;candidates[0].classList.remove('ie-process-highlight');void candidates[0].offsetWidth;candidates[0].classList.add('ie-process-highlight')}})}
    byText('button','Ver Petição Inicial').forEach((b,i)=>b.addEventListener('click',()=>modal('Petição Inicial — processo similar',`<div class="ie-doc"><h3>Petição inicial • processo similar ${i+1}</h3><p><strong>Objeto:</strong> indenização por atraso/cancelamento de voo e falha na prestação do serviço.</p><p><strong>Fatos relevantes:</strong> itinerário afetado, atraso significativo e alegação de prejuízos ao passageiro.</p><p><strong>Uso no protótipo:</strong> esta visualização permite ao usuário comparar os fatos do processo paradigma com um processo semelhante que terminou em acordo.</p></div>`)));
    byText('button','Ver Acordo Homologado').forEach((b,i)=>b.addEventListener('click',()=>modal('Acordo Homologado — referência',`<div class="ie-doc"><h3>Termo de acordo • referência ${i+1}</h3><p><strong>Resultado:</strong> composição homologada judicialmente.</p><p><strong>Faixa:</strong> R$ ${['4.200,00','4.000,00','3.900,00','4.500,00','3.800,00'][i%5]}.</p><p><strong>Estratégia identificada:</strong> proposta objetiva baseada em fatos recorrentes, faixa histórica de acordo e encerramento antecipado do litígio.</p><p style="color:#006c49;font-weight:700">Finalidade: apoiar a replicação de uma estratégia conciliatória já bem-sucedida em casos altamente similares.</p></div>`)));
  }
  if(page==='nacional'){
    const tabs=[...document.querySelectorAll('button')].filter(b=>/TJRR|TJSP|TJAM|TJDF|TJMG/.test(b.textContent));tabs.forEach(b=>b.addEventListener('click',()=>{tabs.forEach(x=>{x.style.outline='';x.style.transform=''});b.style.outline='3px solid rgba(0,35,111,.18)';b.style.transform='translateY(-1px)';toast('Visualização filtrada por '+b.textContent.replace(/\s+/g,' ').trim()+'.')}));
    byText('button','Acessar Processo').forEach(b=>b.addEventListener('click',()=>go('projudi-processo.html')));
    byText('button','Ver Acordo').forEach((b,i)=>b.addEventListener('click',()=>modal('Acordo nacional — caso similar',`<div class="ie-doc"><h3>Precedente nacional ${i+1}</h3><p><strong>Similaridade:</strong> alta correlação fática com o incidente raiz.</p><p><strong>Desfecho:</strong> acordo homologado, utilizado como sinal para identificar oportunidade de composição no TJRR.</p><p>O protótipo demonstra a dispersão federativa de casos muito semelhantes e permite inspecionar acordos celebrados em outros tribunais.</p></div>`)));
    const ex=document.querySelector('button[title="Exportar Relatório"]');if(ex)ex.addEventListener('click',()=>toast('Relatório demonstrativo preparado para exportação.'));
  }
})();
