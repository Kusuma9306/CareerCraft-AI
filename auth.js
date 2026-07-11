// ─── CareerCraft Auth (frontend only, localStorage) ───
const USERS_KEY='cc_users';
const SESSION_KEY='cc_session';

function _toast(msg,type=''){
  const el=document.getElementById('toast');if(!el){alert(msg);return}
  el.textContent=msg;el.className='show '+(type==='ok'?'ok':type==='err'?'err':'');
  setTimeout(()=>el.className='',2600);
}
function _hash(s){let h=0;for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return 'h_'+h;}
function _users(){try{return JSON.parse(localStorage.getItem(USERS_KEY)||'{}')}catch(e){return{}}}
function _saveUsers(u){localStorage.setItem(USERS_KEY,JSON.stringify(u))}

function showTab(name){
  document.querySelectorAll('.auth-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  document.querySelectorAll('.auth-form').forEach(f=>f.classList.remove('active'));
  document.getElementById('form-'+name)?.classList.add('active');
}
function showForgot(){
  document.querySelectorAll('.auth-tab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f=>f.classList.remove('active'));
  document.getElementById('form-forgot').classList.add('active');
}
function setIdMode(form,mode){
  const wrap=document.querySelector(`#form-${form} .id-toggle`);
  wrap.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  const inp=document.getElementById(form+'Id');
  const lbl=document.getElementById(form+'IdLabel');
  if(mode==='email'){inp.type='email';inp.placeholder='you@example.com';if(lbl)lbl.textContent='Email address';}
  else{inp.type='tel';inp.placeholder='+91 98765 43210';if(lbl)lbl.textContent='Phone number';}
  inp.value='';
}

function doSignup(e){
  e.preventDefault();
  const first=suFirst.value.trim(),last=suLast.value.trim();
  const email=suEmail.value.trim().toLowerCase(),phone=suPhone.value.trim();
  const pw=suPw.value,pw2=suPw2.value;
  if(pw!==pw2){_toast('Passwords do not match','err');return}
  const users=_users();
  const key=email;
  if(users[key]){_toast('An account with this email already exists','err');return}
  users[key]={first,last,email,phone,password:_hash(pw),createdAt:Date.now()};
  // Also index by phone for forgot-password lookup
  _saveUsers(users);
  localStorage.setItem(SESSION_KEY,JSON.stringify({email,first,last,phone,loginAt:Date.now()}));
  _toast('Account created — welcome!','ok');
  setTimeout(()=>location.href='index.html',700);
}
function doLogin(e){
  e.preventDefault();
  const idRaw=loginId.value.trim();
  const id=idRaw.toLowerCase();
  const pw=loginPw.value;
  const users=_users();
  let user=users[id];
  if(!user){
    // try phone lookup
    user=Object.values(users).find(u=>u.phone&&u.phone.replace(/\s+/g,'')===idRaw.replace(/\s+/g,''));
  }
  if(!user){_toast('No account found with that email/phone','err');return}
  if(user.password!==_hash(pw)){_toast('Incorrect password','err');return}
  localStorage.setItem(SESSION_KEY,JSON.stringify({email:user.email,first:user.first,last:user.last,phone:user.phone,loginAt:Date.now()}));
  _toast('Signed in — redirecting…','ok');
  setTimeout(()=>location.href='index.html',500);
}
function doForgot(e){
  e.preventDefault();
  const idRaw=fgId.value.trim();
  const id=idRaw.toLowerCase();
  const pw=fgPw.value;
  const users=_users();
  let key=Object.keys(users).find(k=>k===id);
  if(!key){
    const u=Object.values(users).find(u=>u.phone&&u.phone.replace(/\s+/g,'')===idRaw.replace(/\s+/g,''));
    if(u)key=u.email;
  }
  if(!key){_toast('No account found — please sign up first','err');return}
  users[key].password=_hash(pw);
  _saveUsers(users);
  _toast('Password reset successfully. Please sign in.','ok');
  setTimeout(()=>showTab('login'),900);
}

// If already signed in, skip login
if(localStorage.getItem(SESSION_KEY)){
  location.href='index.html';
}
