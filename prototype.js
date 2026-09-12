
(function(){
  const page=document.body.dataset.prototypePage||'';
  function toast(msg){let t=document.querySelector('.ie-toast');if(!t){t=document.createElement('div');t.className='ie-toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(window.__ieToast);window.__ieToast=setTimeout(()=>t.classList.remove('show'),2600)}
  function modal(title,body){let b=document.querySelector('.ie-modal-backdrop');if(!b){b=document.createElement('div');b.className='ie-modal-backdrop';b.innerHTML='<section class="ie-modal" role="dialog" aria-modal="true"><header class="ie-modal-head"><div class="ie-modal-title"></div><button class="ie-modal-close" aria-label="Fechar">×</button></header><div class="ie-modal-body"></div></section>';document.body.appendChild(b);b.querySelector('.ie-modal-close').addEventListener('click',()=>b.classList.remove('open'));b.addEventListener('click',e=>{if(e.target===b)b.classList.remove('open')})}b.querySelector('.ie-modal-title').textContent=title;b.querySelector('.ie-modal-body').innerHTML=body;b.classList.add('open')}
  function byText(selector,txt){return [...document.querySelectorAll(selector)].filter(el=>el.textContent.replace(/\s+/g,' ').trim().includes(txt))}
  function go(url){location.href=url}
  const query=new URLSearchParams(location.search);
  const contextProcess=query.get('processo');
  const contextOrigin=query.get('origem')||'mesa';
  function withContext(path,process=contextProcess,origin=contextOrigin){const q=new URLSearchParams();if(process)q.set('processo',process);if(origin)q.set('origem',origin);return path+(q.size?'?'+q.toString():'')}
  function openProjudi(process){go(withContext('projudi-processo.html',process,contextOrigin))}
  function makeProcessLink(el,process){if(!el||el.dataset.ieProcessBound)return;el.dataset.ieProcessBound='1';el.classList.add('ie-proto-link');el.setAttribute('role','link');el.setAttribute('tabindex','0');el.setAttribute('title','Abrir processo fictício no PROJUDI');const fn=()=>openProjudi(process);el.addEventListener('click',fn);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}})}
  function bindDisplayedProcesses(){const partial={"0800001-00":"0800001-00.2026.8.23.0010","0800102-00":"0800102-00.2026.8.23.0010","0800103-00":"0800103-00.2026.8.23.0010","1000101-00":"1000101-00.2026.8.26.0100","1000102-00":"1000102-00.2026.8.26.0100","0700101-00":"0700101-00.2026.8.07.0001","0600101-00":"0600101-00.2026.8.04.0001","5000101-00":"5000101-00.2026.8.13.0024"};document.querySelectorAll('main p, main span').forEach(el=>{if(el.children.length)return;const text=el.textContent.trim();const full=text.match(/\b\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}\b/)?.[0];const short=text.match(/\b\d{7}-\d{2}\b/)?.[0];const process=full||(short&&partial[short]);if(process)makeProcessLink(el,process)})}
  document.querySelectorAll('a').forEach(a=>{const t=a.textContent.replace(/\s+/g,' ').trim();const href=a.getAttribute('href')||'';if(t.includes('Explorador de Similaridades')||href==='clusters.html'){a.href=withContext('clusters.html')}else if(t.includes('Avaliação de Processo')||href==='avaliacao.html'){a.href=withContext('avaliacao.html')}else if(t.includes('Oportunidades Nacionais')||href==='nacional.html'){a.href=withContext('nacional.html')}else if(t.includes('Sair')){a.href=contextOrigin==='processo'&&contextProcess?withContext('projudi-processo.html',contextProcess,'processo'):'index.html'}});

  if(page==='mesa'){
    byText('button','Ver Processos').forEach(b=>b.addEventListener('click',()=>go('sso.html?dest=clusters.html&context=acervo')));
  }
  if(page==='projudi'){
    const proc=contextProcess||'0800001-00.2026.8.23.0010';
    const heading=document.querySelector('[data-purpose="process-header"] h1');if(heading)heading.textContent='Processo fictício '+proc;
    document.title='PROJUDI - Processo fictício '+proc;
    const badge=[...document.querySelectorAll('div,span')].find(el=>el.textContent.includes('Cluster de Acordo (88.4%)') && (el.title||'').includes('InsightErr')) || [...document.querySelectorAll('div')].find(el=>el.textContent.includes('InsightErr')&&el.textContent.includes('Cluster de Acordo'));
    if(badge){badge.classList.add('ie-proto-link');badge.setAttribute('role','link');badge.setAttribute('tabindex','0');const fn=()=>go('sso.html?dest=avaliacao.html&context=processo&processo='+encodeURIComponent(proc));badge.addEventListener('click',fn);badge.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')fn()})}
    byText('button','Voltar').forEach(b=>b.addEventListener('click',()=>go('index.html')));
  }
  if(page==='clusters'){
    bindDisplayedProcesses();
    byText('button','Nova Análise').forEach(b=>b.addEventListener('click',()=>go('avaliacao.html')));
    byText('button','Analisar Cluster').forEach(b=>b.addEventListener('click',()=>{toast('Cluster selecionado. Exibindo processos com maior potencial de acordo.');document.querySelector('table')?.scrollIntoView({behavior:'smooth',block:'start'})}));
    document.querySelectorAll('button[title="Visualizar Detalhes"], button[title="Ver Rede de Similaridade"]').forEach((b,i)=>{b.dataset.ieBound='1';b.addEventListener('click',()=>go('avaliacao.html?processo='+(i?'0800002-00.2026.8.23.0010':'0800001-00.2026.8.23.0010')))});
    // Any remaining visibility buttons in process rows
    byText('button','visibility').forEach(b=>{if(!b.dataset.ieBound){b.dataset.ieBound='1';b.addEventListener('click',()=>go('avaliacao.html'))}});
    const filter=document.querySelector('input[placeholder="Filtrar clusters..."]');if(filter){filter.addEventListener('input',()=>{const q=filter.value.toLowerCase().trim();document.querySelectorAll('main [class*="rounded-xl"]').forEach(card=>{if(card.textContent.includes('Cluster')&&card.textContent.length<3000)card.style.display=!q||card.textContent.toLowerCase().includes(q)?'':'none'})})}
  }
  if(page==='avaliacao'){
    const proc=contextProcess;
    const search=document.querySelector('input[placeholder^="Pesquisar outro processo"]');
    if(proc){if(search)search.value=proc;const candidates=[...document.querySelectorAll('h3,span,p')].filter(el=>/Nº\s*0\d{6}/.test(el.textContent));if(candidates[0]){candidates[0].textContent='Nº '+proc;candidates[0].classList.add('ie-process-highlight')}}
    bindDisplayedProcesses();
    const national=document.querySelector('[data-action="national-opportunity"]');if(national)national.addEventListener('click',()=>go(withContext('nacional.html',proc||'0800001-00.2026.8.23.0010',contextOrigin)));
    const analyze=byText('button','Analisar Processo')[0];if(analyze){analyze.addEventListener('click',()=>{const val=(search?.value||'').trim();if(!val){toast('Informe o número CNJ ou o nome de uma parte para pesquisar.');search?.focus();return}toast('Processo localizado. Similaridades e acordos atualizados para '+val+'.');const candidates=[...document.querySelectorAll('h3,span,p')].filter(el=>/Nº\s*0\d{6}/.test(el.textContent));if(candidates[0]){candidates[0].textContent='Nº '+val;candidates[0].classList.remove('ie-process-highlight');void candidates[0].offsetWidth;candidates[0].classList.add('ie-process-highlight')}})}
    byText('button','Ver Petição Inicial').forEach((b,i)=>b.addEventListener('click',()=>modal('Petição Inicial — processo similar fictício',`<div class="ie-doc"><h3>Petição inicial fictícia • processo similar ${i+1}</h3><p><strong>Partes:</strong> Passageiro Fictício ${i+1} contra AeroNorte Linhas Aéreas S.A. (companhia fictícia).</p><p><strong>Objeto:</strong> indenização por danos materiais e morais decorrentes do cancelamento do voo fictício AN 4172, no trecho Brasília → Boa Vista.</p><p><strong>Fatos relevantes:</strong> falha operacional em 18/08/2026, reacomodação tardia e ausência de assistência material adequada aos passageiros afetados.</p><p><strong>Uso no protótipo:</strong> esta visualização permite comparar o processo atual com casos fictícios equivalentes que terminaram em acordo.</p></div>`)));
    byText('button','Ver Acordo Homologado').forEach((b,i)=>b.addEventListener('click',()=>modal('Acordo Homologado — referência fictícia',`<div class="ie-doc"><h3>Termo de acordo fictício • referência ${i+1}</h3><p><strong>Partes:</strong> Passageiro Fictício ${i+1} e AeroNorte Linhas Aéreas S.A. (companhia fictícia).</p><p><strong>Resultado:</strong> composição simulada homologada para encerrar demanda decorrente do voo fictício AN 4172.</p><p><strong>Faixa:</strong> R$ ${['4.200,00','4.000,00','3.900,00','4.500,00','3.800,00'][i%5]}.</p><p><strong>Estratégia identificada:</strong> ressarcimento material e compensação moral orientados por acordos em casos equivalentes.</p><p style="color:#006c49;font-weight:700">Finalidade: apoiar uma solução consensual no processo atual, sem substituir a análise judicial.</p></div>`)));
  }
  if(page==='nacional'){
    if(contextProcess){document.querySelectorAll('main p, main span').forEach(el=>{if(!el.children.length&&el.textContent.includes('0800001-00.2026.8.23.0010'))el.textContent=el.textContent.replace('0800001-00.2026.8.23.0010',contextProcess)})}
    bindDisplayedProcesses();
    const reference=document.querySelector('[data-national-reference]');if(reference&&contextProcess){reference.classList.remove('hidden');reference.classList.add('flex');const number=reference.querySelector('[data-reference-process]');if(number){number.textContent=contextProcess;makeProcessLink(number,contextProcess)}}
    const tabs=[...document.querySelectorAll('button')].filter(b=>/TJRR|TJSP|TJAM|TJDF|TJMG/.test(b.textContent));tabs.forEach(b=>b.addEventListener('click',()=>{tabs.forEach(x=>{x.style.outline='';x.style.transform=''});b.style.outline='3px solid rgba(0,35,111,.18)';b.style.transform='translateY(-1px)';toast('Visualização filtrada por '+b.textContent.replace(/\s+/g,' ').trim()+'.')}));
    byText('button','Acessar Processo').forEach(b=>b.addEventListener('click',()=>openProjudi(contextProcess||'0800001-00.2026.8.23.0010')));
    byText('button','Ver Acordo').forEach((b,i)=>b.addEventListener('click',()=>modal('Acordo nacional — caso fictício similar',`<div class="ie-doc"><h3>Precedente nacional fictício ${i+1}</h3><p><strong>Evento comum:</strong> cancelamento por falha operacional do voo fictício AN 4172 da AeroNorte Linhas Aéreas S.A., Brasília → Boa Vista.</p><p><strong>Similaridade:</strong> passageiros submetidos à mesma reacomodação tardia e assistência material insuficiente.</p><p><strong>Desfecho:</strong> acordo simulado homologado, utilizado como sinal para identificar oportunidade de composição no processo atual do TJRR.</p><p>O protótipo demonstra como casos fictícios equivalentes em diferentes tribunais podem apoiar uma solução consensual.</p></div>`)));
    const ex=document.querySelector('button[title="Exportar Relatório"]');if(ex)ex.addEventListener('click',()=>toast('Relatório demonstrativo preparado para exportação.'));
    const nationalSearch=document.querySelector('[data-national-process-search]');if(nationalSearch)nationalSearch.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const value=nationalSearch.value.trim();if(value==='0800001-00.2026.8.23.0010'){go(withContext('nacional.html',value,contextOrigin))}else{toast('Processo não disponível nesta versão demonstrativa.')}});
  }
})();
