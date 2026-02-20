(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();let i="events";const c={selection:document.querySelector("#step-selection"),auth:document.querySelector("#step-1"),otp:document.querySelector("#step-2"),login:document.querySelector("#login")};document.querySelector("#user-name");document.querySelector("#user-phone");document.querySelector("#email");document.querySelector("#otp-code");document.querySelector("#btn-send-otp");document.querySelector("#btn-verify-otp");const m=async()=>{new URLSearchParams(window.location.search);const t=window.location.pathname.replace("/agenda","")||"/";d(),t.includes("/admin")?await b()?v():window.location.href="/agenda/login":t.includes("/login")?c.login.classList.remove("hidden"):(c.selection.classList.remove("hidden"),f())},b=async()=>{try{return(await fetch("http://localhost:8080/api/auth/check",{credentials:"include"})).ok}catch{return!1}},d=()=>{Object.values(c).forEach(e=>e?.classList.add("hidden"))},h=e=>new Date(e).toLocaleDateString("pt-BR",{weekday:"long"}),f=async(e="",t="")=>{const s=document.querySelector("#events-container");if(s){s.innerHTML='<p class="text-center col-span-full text-slate-400">Buscando horários...</p>';try{const o=`http://localhost:8080/api/schedules?slug=${e}&type=${t}`,a=await(await fetch(o)).json();if(!a||a.length===0){s.innerHTML='<p class="text-center col-span-full text-slate-500 py-10">Nenhum horário disponível.</p>';return}s.innerHTML=a.map(l=>`
            <div class="bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-2xl hover:border-fuchsia-600 transition-all duration-300 group">
                
                <div class="flex justify-between items-start mb-4">
                    <span class="bg-violet-600/20 text-violet-400 text-[10px] font-bold px-3 py-1 rounded-full border border-violet-600/30 uppercase tracking-widest">
                        ${l.type_name||"Geral"}
                    </span>
                    <span class="text-[10px] text-slate-600 font-black uppercase tracking-tighter">${l.unit_name}</span>
                </div>

                <h3 class="text-xl font-black text-fuchsia-500 mb-1">
                    ${l.event_name}
                </h3>
                
                <div class="flex items-baseline gap-1 mb-6">
                    <span class="text-xs text-slate-500 font-bold uppercase">R$</span>
                    <span class="text-2xl font-black text-slate-100">${l.event_price}</span>
                </div>
                
                <div class="space-y-2 mb-6 border-l-2 border-violet-600/30 pl-4">
                    <p class="text-sm text-slate-300 flex items-center gap-2">
                        <span class="text-violet-500">📅</span> ${h(l.scheduled_at)}, ${new Date(l.scheduled_at).toLocaleDateString("pt-BR")}
                    </p>
                    <p class="text-sm text-slate-400 flex items-center gap-2 italic">
                        <span class="text-fuchsia-500 text-xs">⏰</span> ${new Date(l.scheduled_at).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}h
                    </p>
                </div>
                
                <button onclick="selectEvent(${l.schedule_id}, '${l.event_name}')" 
                    class="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:from-violet-500 hover:to-fuchsia-500 transition-all transform active:scale-95">
                    Reservar Agora
                </button>
            </div>
        `).join("")}catch{s.innerHTML='<p class="text-center col-span-full text-red-500">Erro ao carregar agenda.</p>'}}},v=async()=>{d(),c.selection.classList.remove("hidden");const e=document.querySelector("#events-container"),t=c.selection.querySelector("header");t&&(t.className="fixed top-0 left-0 w-full bg-white border-b border-slate-100 z-50 shadow-sm",t.innerHTML=`
            <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <nav class="flex items-center gap-8 h-full">
                    <span class="font-black text-slate-900 text-xl tracking-tighter mr-4">ADMIN</span>
                    <button onclick="changeAdminTab('inicio')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Início</button>
                    <button onclick="changeAdminTab('agenda')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Agenda</button>
                    <button onclick="changeAdminTab('inscricoes')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Inscrições</button>
                    <button onclick="changeAdminTab('historico')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Histórico</button>
                </nav>
                <div class="flex items-center gap-4">
                    <span class="text-xs font-bold text-slate-400">Olá Administrador</span>
                    <button onclick="makeLogout()" class="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all">Sair</button>
                </div>
            </div>
        `),e.className="max-w-7xl mx-auto px-6 pt-24 pb-10",window.changeAdminTab("inicio")};window.closeCrudModal=()=>{const e=document.querySelector("#modal-crud");e&&e.classList.add("hidden")};window.changeAdminTab=e=>{const t=document.querySelector("#events-container");switch(document.querySelectorAll("header nav button").forEach(o=>{o.classList.remove("text-blue-600","border-b-2","border-blue-600"),o.classList.add("text-slate-500"),(o.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="inicio"&&o.textContent?.toLowerCase()==="início")&&(o.classList.remove("text-slate-500"),o.classList.add("text-blue-600","border-b-2","border-blue-600")),(o.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="agenda"&&o.textContent?.toLowerCase()==="agenda")&&(o.classList.remove("text-slate-500"),o.classList.add("text-blue-600","border-b-2","border-blue-600")),(o.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="inscricoes"&&o.textContent?.toLowerCase()==="inscrições")&&(o.classList.remove("text-slate-500"),o.classList.add("text-blue-600","border-b-2","border-blue-600")),(o.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="historico"&&o.textContent?.toLowerCase()==="histórico")&&(o.classList.remove("text-slate-500"),o.classList.add("text-blue-600","border-b-2","border-blue-600"))}),e){case"inicio":t.innerHTML=`
                <div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <div class="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mb-6">👋</div>
                    <h1 class="text-4xl font-black text-slate-900 mb-2">Bem-vindo, Administrador!</h1>
                    <p class="text-slate-500 max-w-md">Selecione uma opção no menu superior para começar a gerenciar sua plataforma.</p>
                </div>
            `;break;case"agenda":t.innerHTML=`
                <div class="col-span-full space-y-6">
                    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <form id="formAgendamento" class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-400 mb-1">DATA/HORA</label>
                                <input type="datetime-local" id="datahora" class="w-full border rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" required>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-400 mb-1">EVENTO</label>
                                <div class="flex"><select id="select-evento" class="flex-1 border rounded-l-xl p-2.5 text-sm outline-none" required></select>
                                <button type="button" onclick="openCrudModal('events')" class="bg-slate-50 px-3 border border-l-0 rounded-r-xl">+</button></div>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-400 mb-1">TIPO</label>
                                <div class="flex"><select id="select-tipo" class="flex-1 border rounded-l-xl p-2.5 text-sm outline-none" required></select>
                                <button type="button" onclick="openCrudModal('event-types')" class="bg-slate-50 px-3 border border-l-0 rounded-r-xl">+</button></div>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-400 mb-1">UNIDADE</label>
                                <div class="flex"><select id="select-unidade" class="flex-1 border rounded-l-xl p-2.5 text-sm outline-none" required></select>
                                <button type="button" onclick="openCrudModal('units')" class="bg-slate-50 px-3 border border-l-0 rounded-r-xl">+</button></div>
                            </div>
                            <button type="submit" class="bg-blue-600 text-white p-2.5 rounded-xl font-bold hover:bg-blue-700">Salvar</button>
                        </form>
                    </div>
                    <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                <tr><th class="p-4">Dia</th><th class="p-4">Data</th><th class="p-4">Evento</th><th class="p-4">Tipo</th><th class="p-4 text-center">Preço</th><th class="p-4 text-center">Unidade</th><th class="p-4 text-center">Ações</th></tr>
                            </thead>
                            <tbody id="adminTableBody" class="divide-y divide-slate-50"></tbody>
                        </table>
                    </div>
                </div>
            `,u(),x(),y();break;case"inscricoes":t.innerHTML=`
                <div class="py-10 text-center">
                    <h2 class="text-2xl font-black text-slate-900">Inscrições Ativas</h2>
                    <p class="text-slate-500">Módulo em desenvolvimento...</p>
                </div>
            `;break;case"historico":t.innerHTML=`
                <div class="py-10 text-center">
                    <h2 class="text-2xl font-black text-slate-900">Histórico de Atividades</h2>
                    <p class="text-slate-500">Módulo em desenvolvimento...</p>
                </div>
            `;break}};const u=async()=>{const e=document.querySelector("#adminTableBody");if(e)try{const s=await(await fetch("http://localhost:8080/schedules",{credentials:"include"})).json(),o=new Date;e.innerHTML=s.map(n=>{const a=new Date(n.scheduled_at),l=a<o,r=l?"text-red-600 font-bold":"text-slate-500";return`
                <tr class="hover:bg-slate-50 transition-colors border-b border-slate-50">
                    <td class="p-4 font-medium ${r}">${h(n.scheduled_at)}</td>
                    
                    <td class="p-4">
                        <div class="${r}">${a.toLocaleDateString("pt-BR")} - ${a.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</div>
                        <div class="text-[10px] text-slate-400"></div>
                    </td>
                    
                    <td class="p-4 font-bold ${l?"text-red-600":"text-slate-900"}">${n.event_name}</td>
                    
                    <td class="p-4">
                        <span class="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-bold uppercase">
                            ${n.type_name||"-"}
                        </span>
                    </td>
                    
                    <td class="p-4 font-black ${l?"text-red-600":"text-blue-600"}">R$ ${n.event_price}</td>
                    
                    <td class="p-4 text-slate-600 text-xs font-bold uppercase">${n.unit_name}</td>
                    
                    <td class="p-4 text-center">
                        <button onclick="deleteSchedule(${n.schedule_id})" class="text-red-400 hover:text-red-600 font-bold transition-colors">Excluir</button>
                    </td>
                </tr>
            `}).join("")}catch{e.innerHTML='<tr><td colspan="7" class="p-4 text-center">Erro ao carregar dados.</td></tr>'}},x=async()=>{const e={credentials:"include"};try{const[t,s,o]=await Promise.all([fetch("http://localhost:8080/events",e).then(r=>r.json()),fetch("http://localhost:8080/units",e).then(r=>r.json()),fetch("http://localhost:8080/event-types",e).then(r=>r.json())]),n=document.querySelector("#select-evento"),a=document.querySelector("#select-unidade"),l=document.querySelector("#select-tipo");n&&(n.innerHTML='<option value="" disabled selected>Selecione o Evento</option>'+t.map(r=>`<option value="${r.id}">${r.name}</option>`).join("")),a&&(a.innerHTML='<option value="" disabled selected>Selecione a Unidade</option>'+s.map(r=>`<option value="${r.id}">${r.name}</option>`).join("")),l&&(l.innerHTML='<option value="" disabled selected>Selecione o Tipo</option>'+o.map(r=>`<option value="${r.id}">${r.name}</option>`).join(""))}catch(t){console.error("Erro ao carregar selects",t)}},y=()=>{const e=document.querySelector("#formAgendamento");e?.addEventListener("submit",async t=>{t.preventDefault();const s={scheduled_at:document.querySelector("#datahora").value,event_id:document.querySelector("#select-evento").value,unit_id:document.querySelector("#select-unidade").value,event_type_id:document.querySelector("#select-tipo").value,vacancies:1,status:"available"};console.log("Enviando agendamento:",s);const o=await fetch("http://localhost:8080/schedules",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(s)});if(o.ok)alert("Salvo com sucesso!"),u(),e.reset();else{const n=await o.json();alert("Erro ao salvar: "+(n.error||"Verifique os dados"))}})};window.openCrudModal=async e=>{i=e;const t=document.querySelector("#modal-crud");document.querySelector("#modal-title").innerText=`Gerenciar ${e}`,document.querySelector("#field-price").classList.toggle("hidden",e!=="events"),t.classList.remove("hidden"),p()};async function p(){const t=await(await fetch(`http://localhost:8080/${i}`,{credentials:"include"})).json(),s=document.querySelector("#modal-select-list");s&&(s.innerHTML='<option value="">Selecione para excluir...</option>'+t.map(o=>`<option value="${o.id}">${o.name||o.nome}</option>`).join("")),x()}window.selectEvent=(e,t)=>{d(),c.auth.classList.remove("hidden");const s=c.auth.querySelector("h2");s&&(s.textContent=`Inscrição: ${t}`)};window.makeLogout=async()=>{await fetch("http://localhost:8080/logout",{method:"POST",credentials:"include"}),window.location.href="/agenda/login"};window.makeLogin=async()=>{const e=document.querySelector("#admin-email").value,t=document.querySelector("#admin-password").value;(await fetch("http://localhost:8080/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({email:e,password:t})})).ok?window.location.href="/agenda/admin":alert("Erro no login.")};window.deleteSchedule=async e=>{if(!confirm("Excluir agendamento?"))return;(await fetch(`http://localhost:8080/schedules/${e}`,{method:"DELETE",credentials:"include"})).ok&&u()};window.saveCrudItem=async()=>{const e=document.querySelector("#modal-input-name"),t=document.querySelector("#modal-input-price");if(!e?.value)return alert("Preencha o nome!");const s={name:e.value};i==="events"&&(s.price=t?.value);try{(await fetch(`http://localhost:8080/${i}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(s)})).ok&&(e.value="",t&&(t.value=""),p(),alert("Cadastrado com sucesso!"))}catch(o){console.error("Erro ao salvar item",o)}};window.deleteCrudItem=async()=>{const t=document.querySelector("#modal-select-list")?.value;if(!t)return alert("Selecione um item para excluir");if(confirm("Tem certeza que deseja excluir este item?"))try{(await fetch(`http://localhost:8080/${i}/${t}`,{method:"DELETE",credentials:"include"})).ok&&(p(),alert("Excluído com sucesso!"))}catch(s){console.error("Erro ao excluir",s)}};window.addEventListener("popstate",m);m();
