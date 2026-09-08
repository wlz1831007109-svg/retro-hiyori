(function(){
  const form=document.getElementById('contact-form');
  if(!form) return;
  const btn=form.querySelector('button[type="submit"]');
  const status=document.getElementById('contact-status');
  const original=btn?.textContent || 'お問い合わせを送信する';

  function setState(message,type){
    if(!status) return;
    status.textContent=message||'';
    status.dataset.state=type||'';
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    if(!form.reportValidity()) return;
    if(btn){ btn.disabled=true; btn.textContent='送信中…'; }
    setState('お問い合わせを送信しています。','sending');

    const payload={};
    new FormData(form).forEach((value,key)=>{ payload[key]=value; });
    payload['_url']='https://retro-hiyori.com/contact.html';
    payload['送信日時']=new Date().toLocaleString('ja-JP',{timeZone:'Asia/Tokyo'});

    try{
      const res=await fetch('https://formsubmit.co/ajax/1831007109@qq.com',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload)
      });
      let data={};
      try{ data=await res.json(); }catch(_e){}
      if(!res.ok || data.success===false){
        throw new Error(data.message || '送信に失敗しました');
      }
      setState('送信を受け付けました。完了ページへ移動します。','success');
      window.location.href='contact-thanks.html';
    }catch(err){
      console.error('Retro日和 contact form:',err);
      setState('送信できませんでした。通信状況をご確認のうえ、もう一度お試しください。改善しない場合はInstagram @retro_hiyori からご連絡ください。','error');
      if(btn){ btn.disabled=false; btn.textContent=original; }
    }
  });
})();
