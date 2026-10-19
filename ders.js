// Ses: tarayıcının Fransızca sesini kullanır
function speak(t){
  if(!('speechSynthesis' in window)){alert('Tarayıcınız sesli okumayı desteklemiyor. Chrome veya Safari deneyin.');return}
  speechSynthesis.cancel();
  var u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';u.rate=.85;
  var v=speechSynthesis.getVoices().filter(function(x){return x.lang.toLowerCase().indexOf('fr')===0});
  if(v.length)u.voice=v[0];
  speechSynthesis.speak(u);
}
if('speechSynthesis' in window)speechSynthesis.getVoices();
document.addEventListener('click',function(e){var el=e.target.closest('[data-say]');if(el)speak(el.getAttribute('data-say'))});

// Etkinlik motoru: ders sayfası önce "Q" dizisini tanımlar
var i=0,score=0,done=false,box=document.getElementById('quiz'),bar=document.querySelector('#bar i');
function show(){
  done=false;bar.style.width=(i/Q.length*100)+'%';
  if(i>=Q.length){
    box.innerHTML='<p class="q">🎉 Bitti! Skorunuz: '+score+' / '+Q.length+'</p><p>'+(score>=5?'Harika, Ders 2\'ye hazırsınız.':'İyi gidiyorsunuz. Kelime kartlarını tekrar dinleyip yeniden deneyin.')+'</p><button class="btn" onclick="restart()">Tekrar dene</button>';return}
  var q=Q[i],h='<p class="q">'+(i+1)+'/'+Q.length+' · '+q.p+'</p>';
  if(q.s)h+='<button class="btn alt" style="margin:0 0 10px" onclick="speak(\''+q.s+'\')">🔊 Dinle</button>';
  h+='<div class="opts">'+q.o.map(function(t,k){return '<button class="opt" onclick="pick('+k+',this)">'+t+'</button>'}).join('')+'</div><div id="fb" aria-live="polite"></div>';
  box.innerHTML=h;
  if(q.s)speak(q.s);
}
function pick(k,b){
  if(done)return;done=true;var q=Q[i],fb=document.getElementById('fb'),bs=box.querySelectorAll('.opt');
  if(k===q.a){score++;b.classList.add('ok');fb.textContent='✅ Doğru!'}
  else{b.classList.add('no');bs[q.a].classList.add('ok');fb.textContent='❌ Doğru cevap: '+q.o[q.a]}
  fb.insertAdjacentHTML('afterend','<button class="btn" onclick="i++;show()">'+(i===Q.length-1?'Sonucu gör':'Sonraki')+'</button>');
}
function restart(){i=0;score=0;show()}
if(typeof Q!=="undefined")show();
