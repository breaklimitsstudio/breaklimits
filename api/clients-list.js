export default async () => {
  try {
    const response = await fetch('https://breaklimits.app.n8n.cloud/webhook/breaklimits/clients-list');
    const text = (await response.text()).trim().replace(/^=\s*/, '');
    if (!response.ok) return new Response(JSON.stringify({error:'n8n clients-list error', raw:text.slice(0,1000)}), {status:response.status, headers:{'Content-Type':'application/json'}});
    try { return new Response(JSON.stringify(JSON.parse(text)), {headers:{'Content-Type':'application/json'}}); }
    catch { return new Response(JSON.stringify({error:'Invalid JSON received from n8n', raw:text.slice(0,1000)}), {status:502, headers:{'Content-Type':'application/json'}}); }
  } catch (e) { return new Response(JSON.stringify({error:e.message}), {status:502, headers:{'Content-Type':'application/json'}}); }
};
