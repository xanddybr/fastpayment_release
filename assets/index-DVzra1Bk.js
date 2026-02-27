(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const c=window.location.hostname==="localhost"?"http://localhost:8080":"https://misturadeluz.com/agenda/api/public",y="v1.0.0",u=()=>{document.querySelectorAll(".app-version").forEach(t=>{t.textContent=y})};let d="events";const i={selection:document.querySelector("#step-selection"),auth:document.querySelector("#step-1"),otp:document.querySelector("#step-2"),login:document.querySelector("#login")};document.querySelector("#user-name");document.querySelector("#user-phone");document.querySelector("#email");document.querySelector("#otp-code");document.querySelector("#btn-send-otp");document.querySelector("#btn-verify-otp");const f=async()=>{const e=window.location.pathname,t=window.location.hash;p(),e.includes("login.html")||t==="#login"||t==="#admin"?(document.body.classList.remove("bg-reiki"),t==="#admin"?await g()?L():window.location.href="login.html":i.login&&i.login.classList.remove("hidden")):(document.body.classList.add("bg-reiki"),i.selection&&i.selection.classList.remove("hidden"),w()),u()},g=async()=>{try{return(await fetch(`${c}/api/auth/check`,{credentials:"include"})).ok}catch{return!1}},p=()=>{Object.values(i).forEach(e=>e?.classList.add("hidden"))},b=e=>{const t=s=>s&&s[0].toUpperCase()+s.slice(1),n=new Date(e).toLocaleDateString("pt-BR",{weekday:"long"});return t(n)},w=async(e="",t="")=>{const n=document.querySelector("#events-container");if(n){n.innerHTML='<p class="text-center col-span-full text-slate-400">Buscando horários...</p>';try{const o=`${c}/api/schedules?slug=${e}&type=${t}`,a=await(await fetch(o,{credentials:"include"})).json();if(!a||a.length===0){n.innerHTML='<p class="text-center col-span-full text-slate-500 py-10">Nenhum horário disponível.</p>';return}n.innerHTML=a.map(l=>`
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
                        <span class="text-violet-500">📅</span> ${b(l.scheduled_at)}, ${new Date(l.scheduled_at).toLocaleDateString("pt-BR")}
                    </p>
                    <p class="text-sm text-slate-400 flex items-center gap-2 italic">
                        <span class="text-fuchsia-500 text-xs">⏰</span> ${new Date(l.scheduled_at).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}h
                    </p>
                </div>
                
                <button onclick="selectEvent(${l.schedule_id}, '${l.event_name}')" 
                    class="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:from-violet-500 hover:to-fuchsia-500 transition-all transform active:scale-95">
                    Comprar Agora!
                </button>
            </div>
        `).join("")}catch{n.innerHTML='<p class="text-center col-span-full text-red-500">Erro ao carregar agenda.</p>'}}},L=async()=>{p(),i.selection.classList.remove("hidden");const e=document.querySelector("#events-container"),t=i.selection.querySelector("header"),n=localStorage.getItem("admin_full_name")||"Administrador";t&&(t.className="fixed top-0 left-0 w-full bg-white border-b border-slate-100 z-50 shadow-sm",t.innerHTML=`
            <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <nav class="flex items-center gap-8 h-full">
                    <span class="font-black text-slate-900 text-xl tracking-tighter mr-4">fastPayment <span class="app-version text-[13px] text-gray-400"></span></span>
                    <button onclick="changeAdminTab('inicio')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Início</button>
                    <button onclick="changeAdminTab('agenda')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Agenda</button>
                    <button onclick="changeAdminTab('inscricoes')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Inscrições</button>
                    <button onclick="changeAdminTab('historico')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Histórico</button>
                </nav>
                <div class="flex items-center gap-4">
                    <span class="text-xs font-bold text-slate-400">Olá, ${n}</span>
                    <button onclick="makeLogout()" class="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all">Sair</button>
                </div>
            </div>
        `),u(),e.className="max-w-7xl mx-auto px-6 pt-24 pb-10",window.changeAdminTab("inicio")};window.closeCrudModal=()=>{const e=document.querySelector("#modal-crud");e&&e.classList.add("hidden")};window.changeAdminTab=e=>{const t=document.querySelector("#events-container");switch(document.querySelectorAll("header nav button").forEach(o=>{o.classList.remove("text-blue-600","border-b-2","border-blue-600"),o.classList.add("text-slate-500"),(o.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="inicio"&&o.textContent?.toLowerCase()==="início")&&(o.classList.remove("text-slate-500"),o.classList.add("text-blue-600","border-b-2","border-blue-600")),(o.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="agenda"&&o.textContent?.toLowerCase()==="agenda")&&(o.classList.remove("text-slate-500"),o.classList.add("text-blue-600","border-b-2","border-blue-600")),(o.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="inscricoes"&&o.textContent?.toLowerCase()==="inscrições")&&(o.classList.remove("text-slate-500"),o.classList.add("text-blue-600","border-b-2","border-blue-600")),(o.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="historico"&&o.textContent?.toLowerCase()==="histórico")&&(o.classList.remove("text-slate-500"),o.classList.add("text-blue-600","border-b-2","border-blue-600"))}),e){case"inicio":const o=localStorage.getItem("admin_full_name")||"Administrador";t.innerHTML=`
                <div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <div class="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mb-6">👋</div>
                    <h1 class="text-4xl font-black text-slate-900 mb-2">Bem-vindo, ${o}!</h1>
                    <p class="text-slate-500 max-w-md">Selecione uma opção no menu superior para começar a gerenciar sua plataforma.</p> 
                    <div class="mt-4 text-center">
                        <span class="app-version text-[10px] text-gray-400"></span>
                    </div>
                </div>
            `,u();break;case"agenda":t.innerHTML=`
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
            `,m(),x(),S();break;case"inscricoes":t.innerHTML=`
                <div class="py-10 text-center">
                    <h2 class="text-2xl font-black text-slate-900">Inscrições Ativas</h2>
                    <p class="text-slate-500">Módulo em desenvolvimento...</p>
                </div>
            `;break;case"historico":t.innerHTML=`
                <div class="py-10 text-center">
                    <h2 class="text-2xl font-black text-slate-900">Histórico de Atividades</h2>
                    <p class="text-slate-500">Módulo em desenvolvimento...</p>
                </div>
            `;break}};const m=async()=>{const e=document.querySelector("#adminTableBody");if(e)try{const n=await(await fetch(`${c}/schedules`,{credentials:"include"})).json(),o=new Date;e.innerHTML=n.map(s=>{const a=new Date(s.scheduled_at),l=a<o,r=l?"text-red-600 font-bold":"text-slate-500";return`
                <tr class="hover:bg-slate-50 transition-colors border-b border-slate-50">
                    <td class="p-4 font-medium ${r}">${b(s.scheduled_at)}</td>
                    <td class="p-4">
                        <div class="${r}">${a.toLocaleDateString("pt-BR")} - ${a.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</div>
                    </td>
                    <td class="p-4 font-bold ${l?"text-red-600":"text-slate-900"}">${s.event_name}</td>
                    <td class="p-4">
                        <span class="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-bold uppercase">
                            ${s.type_name||"-"}
                        </span>
                    </td>
                    <td class="p-4 font-black ${l?"text-red-600":"text-blue-600"}">R$ ${s.event_price}</td>
                    <td class="p-4 text-slate-600 text-xs font-bold uppercase">${s.unit_name}</td>
                    <td class="p-4 text-center">
                        <button onclick="deleteSchedule(${s.schedule_id})" class="text-red-400 hover:text-red-600 font-bold transition-colors">Excluir</button>
                    </td>
                </tr>
            `}).join("")}catch{e.innerHTML='<tr><td colspan="7" class="p-4 text-center">Erro ao carregar dados.</td></tr>'}},x=async()=>{const e={credentials:"include"};try{const[t,n,o]=await Promise.all([fetch(`${c}/events`,e).then(r=>r.json()),fetch(`${c}/units`,e).then(r=>r.json()),fetch(`${c}/event-types`,e).then(r=>r.json())]),s=document.querySelector("#select-evento"),a=document.querySelector("#select-unidade"),l=document.querySelector("#select-tipo");s&&(s.innerHTML='<option value="" disabled selected>Selecione o Evento</option>'+t.map(r=>`<option value="${r.id}">${r.name}</option>`).join("")),a&&(a.innerHTML='<option value="" disabled selected>Selecione a Unidade</option>'+n.map(r=>`<option value="${r.id}">${r.name}</option>`).join("")),l&&(l.innerHTML='<option value="" disabled selected>Selecione o Tipo</option>'+o.map(r=>`<option value="${r.id}">${r.name}</option>`).join(""))}catch(t){console.error("Erro ao carregar selects",t)}},S=()=>{const e=document.querySelector("#formAgendamento");e?.addEventListener("submit",async t=>{t.preventDefault();const n={scheduled_at:document.querySelector("#datahora").value,event_id:document.querySelector("#select-evento").value,unit_id:document.querySelector("#select-unidade").value,event_type_id:document.querySelector("#select-tipo").value,vacancies:1,status:"available"},o=await fetch(`${c}/schedules`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(n)});if(o.ok)alert("Salvo com sucesso!"),m(),e.reset();else{const s=await o.json();alert("Erro ao salvar: "+(s.error||"Verifique os dados"))}})};window.openCrudModal=async e=>{d=e;const t=document.querySelector("#modal-crud"),n=document.querySelector("#modal-title"),o=document.querySelector("#field-price");n.innerText=`Gerenciar ${e==="events"?"Eventos":e==="units"?"Unidades":"Tipos de Evento"}`,o.classList.toggle("hidden",e!=="events");const s=document.querySelector("#modal-select-list");s.innerHTML='<option value="">Carregando...</option>',t.classList.remove("hidden"),await h()};async function h(){const e=`${c}/${d}`;try{const n=await(await fetch(e,{credentials:"include"})).json(),o=document.querySelector("#modal-select-list");o&&(o.innerHTML='<option value="">Selecione para excluir...</option>'+n.map(s=>`
                    <option value="${s.id}">${s.name||s.nome}</option>
                `).join(""))}catch(t){console.error("Erro ao carregar lista do modal:",t)}}const v=document.createElement("div");v.className="col-span-full text-center mt-12 mb-8 flex flex-col items-center gap-2";v.innerHTML=`
    <span class="opacity-30 text-[9px] text-white font-mono uppercase tracking-widest">
        MISTURA DE LUZ <span class="app-version"></span>
    </span>
    <a href="login.html" class="text-[10px] text-slate-500 hover:text-fuchsia-400 transition-colors font-bold uppercase tracking-tighter decoration-dotted underline underline-offset-4">
        Acesso Restrito
    </a>
`;u();window.selectEvent=(e,t)=>{p(),i.auth.classList.remove("hidden");const n=i.auth.querySelector("h2");n&&(n.textContent=`Inscrição: ${t}`)};window.makeLogout=async()=>{try{await fetch(`${c}/logout`,{method:"POST",credentials:"include"})}catch(e){console.error("Erro ao comunicar logout",e)}localStorage.removeItem("admin_full_name"),window.location.href="/agenda/login.html"};window.makeLogin=async()=>{const e=document.querySelector("#admin-email").value,t=document.querySelector("#admin-password").value,n=await fetch(`${c}/login`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({email:e,password:t})});if(n.ok){const o=await n.json();localStorage.setItem("admin_full_name",o.user.full_name),window.location.href="index.html#admin"}else alert("Erro no login: Verifique usuário e senha.")};window.deleteSchedule=async e=>{if(!confirm("Excluir agendamento?"))return;(await fetch(`${c}/schedules/${e}`,{method:"DELETE",credentials:"include"})).ok&&m()};window.saveCrudItem=async()=>{const e=document.querySelector("#modal-input-name"),t=document.querySelector("#modal-input-price");if(!e?.value)return alert("Preencha o nome!");const n={name:e.value};d==="events"&&(n.price=t?.value);try{(await fetch(`${c}/${d}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(n)})).ok&&(e&&(e.value=""),t&&(t.value=""),await h(),await x(),alert("Cadastrado com sucesso!"))}catch(o){console.error("Erro ao salvar item",o)}};window.deleteCrudItem=async()=>{const t=document.querySelector("#modal-select-list").value;if(!t)return alert("Selecione um item para excluir");if(confirm("Tem certeza que deseja excluir este item?"))try{const n=await fetch(`${c}/${d}/${t}`,{method:"DELETE",credentials:"include"});if(n.ok)alert("Excluído com sucesso!"),await h(),await x();else{const o=await n.json();alert(o.error||"Erro ao tentar excluir registro.")}}catch(n){console.error("Erro na comunicação:",n),alert("Falha ao processar a exclusão.")}};window.addEventListener("popstate",f);f();
