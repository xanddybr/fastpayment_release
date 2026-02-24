(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();let c="events";const i={selection:document.querySelector("#step-selection"),auth:document.querySelector("#step-1"),otp:document.querySelector("#step-2"),login:document.querySelector("#login")};document.querySelector("#user-name");document.querySelector("#user-phone");document.querySelector("#email");document.querySelector("#otp-code");document.querySelector("#btn-send-otp");document.querySelector("#btn-verify-otp");const h=async()=>{const e=window.location.pathname,o=e.includes("/login"),s=e.includes("/admin");u(),s?await f()?v():window.location.href="/agenda/login":o?i.login.classList.remove("hidden"):(i.selection.classList.remove("hidden"),b())},f=async()=>{try{return(await fetch("http://localhost:8080/api/auth/check",{credentials:"include"})).ok}catch{return!1}},u=()=>{Object.values(i).forEach(e=>e?.classList.add("hidden"))},x=e=>new Date(e).toLocaleDateString("pt-BR",{weekday:"long"}),b=async(e="",o="")=>{const s=document.querySelector("#events-container");if(s){s.innerHTML='<p class="text-center col-span-full text-slate-400">Buscando horários...</p>';try{const t=`http://localhost:8080/api/schedules?slug=${e}&type=${o}`,a=await(await fetch(t)).json();if(!a||a.length===0){s.innerHTML='<p class="text-center col-span-full text-slate-500 py-10">Nenhum horário disponível.</p>';return}s.innerHTML=a.map(l=>`
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
                        <span class="text-violet-500">📅</span> ${x(l.scheduled_at)}, ${new Date(l.scheduled_at).toLocaleDateString("pt-BR")}
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
        `).join("")}catch{s.innerHTML='<p class="text-center col-span-full text-red-500">Erro ao carregar agenda.</p>'}}},v=async()=>{u(),i.selection.classList.remove("hidden");const e=document.querySelector("#events-container"),o=i.selection.querySelector("header"),s=localStorage.getItem("admin_full_name")||"Administrador";o&&(o.className="fixed top-0 left-0 w-full bg-white border-b border-slate-100 z-50 shadow-sm",o.innerHTML=`
            <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <nav class="flex items-center gap-8 h-full">
                    <span class="font-black text-slate-900 text-xl tracking-tighter mr-4">ADMIN</span>
                    <button onclick="changeAdminTab('inicio')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Início</button>
                    <button onclick="changeAdminTab('agenda')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Agenda</button>
                    <button onclick="changeAdminTab('inscricoes')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Inscrições</button>
                    <button onclick="changeAdminTab('historico')" class="h-full text-sm font-bold transition-all px-1 border-transparent">Histórico</button>
                </nav>
                <div class="flex items-center gap-4">
                    <span class="text-xs font-bold text-slate-400">Olá, ${s}</span>
                    <button onclick="makeLogout()" class="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all">Sair</button>
                </div>
            </div>
        `),e.className="max-w-7xl mx-auto px-6 pt-24 pb-10",window.changeAdminTab("inicio")};window.closeCrudModal=()=>{const e=document.querySelector("#modal-crud");e&&e.classList.add("hidden")};window.changeAdminTab=e=>{const o=document.querySelector("#events-container");switch(document.querySelectorAll("header nav button").forEach(t=>{t.classList.remove("text-blue-600","border-b-2","border-blue-600"),t.classList.add("text-slate-500"),(t.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="inicio"&&t.textContent?.toLowerCase()==="início")&&(t.classList.remove("text-slate-500"),t.classList.add("text-blue-600","border-b-2","border-blue-600")),(t.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="agenda"&&t.textContent?.toLowerCase()==="agenda")&&(t.classList.remove("text-slate-500"),t.classList.add("text-blue-600","border-b-2","border-blue-600")),(t.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="inscricoes"&&t.textContent?.toLowerCase()==="inscrições")&&(t.classList.remove("text-slate-500"),t.classList.add("text-blue-600","border-b-2","border-blue-600")),(t.textContent?.toLowerCase().trim()===e.toLowerCase().trim()||e==="historico"&&t.textContent?.toLowerCase()==="histórico")&&(t.classList.remove("text-slate-500"),t.classList.add("text-blue-600","border-b-2","border-blue-600"))}),e){case"inicio":const t=localStorage.getItem("admin_full_name")||"Seu nome de usuário não foi carregado!";o.innerHTML=`
                <div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <div class="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mb-6">👋</div>
                    <h1 class="text-4xl font-black text-slate-900 mb-2">Bem-vindo, ${t}!</h1>
                    <p class="text-slate-500 max-w-md">Selecione uma opção no menu superior para começar a gerenciar sua plataforma.</p>
                </div>
            `;break;case"agenda":o.innerHTML=`
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
            `,p(),m(),y();break;case"inscricoes":o.innerHTML=`
                <div class="py-10 text-center">
                    <h2 class="text-2xl font-black text-slate-900">Inscrições Ativas</h2>
                    <p class="text-slate-500">Módulo em desenvolvimento...</p>
                </div>
            `;break;case"historico":o.innerHTML=`
                <div class="py-10 text-center">
                    <h2 class="text-2xl font-black text-slate-900">Histórico de Atividades</h2>
                    <p class="text-slate-500">Módulo em desenvolvimento...</p>
                </div>
            `;break}};const p=async()=>{const e=document.querySelector("#adminTableBody");if(e)try{const s=await(await fetch("http://localhost:8080/schedules",{credentials:"include"})).json(),t=new Date;e.innerHTML=s.map(n=>{const a=new Date(n.scheduled_at),l=a<t,r=l?"text-red-600 font-bold":"text-slate-500";return`
                <tr class="hover:bg-slate-50 transition-colors border-b border-slate-50">
                    <td class="p-4 font-medium ${r}">${x(n.scheduled_at)}</td>
                    
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
            `}).join("")}catch{e.innerHTML='<tr><td colspan="7" class="p-4 text-center">Erro ao carregar dados.</td></tr>'}},m=async()=>{const e={credentials:"include"};try{const[o,s,t]=await Promise.all([fetch("http://localhost:8080/events",e).then(r=>r.json()),fetch("http://localhost:8080/units",e).then(r=>r.json()),fetch("http://localhost:8080/event-types",e).then(r=>r.json())]),n=document.querySelector("#select-evento"),a=document.querySelector("#select-unidade"),l=document.querySelector("#select-tipo");n&&(n.innerHTML='<option value="" disabled selected>Selecione o Evento</option>'+o.map(r=>`<option value="${r.id}">${r.name}</option>`).join("")),a&&(a.innerHTML='<option value="" disabled selected>Selecione a Unidade</option>'+s.map(r=>`<option value="${r.id}">${r.name}</option>`).join("")),l&&(l.innerHTML='<option value="" disabled selected>Selecione o Tipo</option>'+t.map(r=>`<option value="${r.id}">${r.name}</option>`).join(""))}catch(o){console.error("Erro ao carregar selects",o)}},y=()=>{const e=document.querySelector("#formAgendamento");e?.addEventListener("submit",async o=>{o.preventDefault();const s={scheduled_at:document.querySelector("#datahora").value,event_id:document.querySelector("#select-evento").value,unit_id:document.querySelector("#select-unidade").value,event_type_id:document.querySelector("#select-tipo").value,vacancies:1,status:"available"};console.log("Enviando agendamento:",s);const t=await fetch("http://localhost:8080/schedules",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(s)});if(t.ok)alert("Salvo com sucesso!"),p(),e.reset();else{const n=await t.json();alert("Erro ao salvar: "+(n.error||"Verifique os dados"))}})};window.openCrudModal=async e=>{c=e;const o=document.querySelector("#modal-crud"),s=document.querySelector("#modal-title"),t=document.querySelector("#field-price");s.innerText=`Gerenciar ${e==="events"?"Eventos":e==="units"?"Unidades":"Tipos de Evento"}`,t.classList.toggle("hidden",e!=="events");const n=document.querySelector("#modal-select-list");n.innerHTML='<option value="">Carregando...</option>',o.classList.remove("hidden"),await d()};async function d(){const e=`http://localhost:8080/${c}`;try{const s=await(await fetch(e,{credentials:"include"})).json(),t=document.querySelector("#modal-select-list");t&&(t.innerHTML='<option value="">Selecione para excluir...</option>'+s.map(n=>`
                    <option value="${n.id}">${n.name||n.nome}</option>
                `).join(""))}catch(o){console.error("Erro ao carregar lista do modal:",o)}}window.selectEvent=(e,o)=>{u(),i.auth.classList.remove("hidden");const s=i.auth.querySelector("h2");s&&(s.textContent=`Inscrição: ${o}`)};window.makeLogout=async()=>{try{await fetch("http://localhost:8080/logout",{method:"POST",credentials:"include"})}catch(e){console.error("Erro ao comunicar logout com o servidor",e)}localStorage.removeItem("admin_full_name"),window.location.href="/agenda/login"};window.makeLogin=async()=>{const e=document.querySelector("#admin-email").value,o=document.querySelector("#admin-password").value,s=await fetch("http://localhost:8080/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({email:e,password:o})});if(s.ok){const t=await s.json();localStorage.setItem("admin_full_name",t.user.full_name),window.location.href="/agenda/admin"}else alert("Erro no login.")};window.deleteSchedule=async e=>{if(!confirm("Excluir agendamento?"))return;(await fetch(`http://localhost:8080/schedules/${e}`,{method:"DELETE",credentials:"include"})).ok&&p()};window.saveCrudItem=async()=>{const e=document.querySelector("#modal-input-name"),o=document.querySelector("#modal-input-price");if(!e?.value)return alert("Preencha o nome!");const s={name:e.value};c==="events"&&(s.price=o?.value);try{(await fetch(`http://localhost:8080/${c}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(s)})).ok&&(e.value="",o&&(o.value=""),d(),alert("Cadastrado com sucesso!"))}catch(t){console.error("Erro ao salvar item",t)}};window.deleteCrudItem=async()=>{const o=document.querySelector("#modal-select-list").value;if(!o)return alert("Selecione um item para excluir");if(confirm("Tem certeza que deseja excluir este item?"))try{const s=await fetch(`http://localhost:8080/${c}/${o}`,{method:"DELETE",credentials:"include"}),t=await s.text();let n;try{n=JSON.parse(t)}catch{console.error("Servidor retornou algo que não é JSON:",t),alert("Erro inesperado no servidor.");return}s.ok?(alert(n.message||"Excluído com sucesso!"),await d(),await m()):alert(n.error||"Erro ao tentar excluir registro.")}catch(s){console.error("Erro na comunicação:",s),alert("Falha ao processar a exclusão.")}};window.saveCrudItem=async()=>{const e=document.querySelector("#modal-input-name"),o=document.querySelector("#modal-input-price");if(!e?.value)return alert("Preencha o nome!");const s={name:e.value};c==="events"&&(s.price=o?.value);try{(await fetch(`http://localhost:8080/${c}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(s)})).ok&&(e.value="",o&&(o.value=""),await d(),await m(),alert("Cadastrado com sucesso!"))}catch(t){console.error("Erro ao salvar item",t)}};window.addEventListener("popstate",h);h();
