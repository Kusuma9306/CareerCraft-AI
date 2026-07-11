// ═══════════════════════════════════════════════
// CareerCraft — frontend-only app (localStorage)
// Includes fixes for: dashboard sync, profile photo,
// change password, notifications, delete account,
// real-data PDF report, no default placeholder text.
// ═══════════════════════════════════════════════

// ── AUTH GATE ─────────────────────────────────
const SESSION_KEY='cc_session',USERS_KEY='cc_users';
function getSession(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch(e){return null}}
function getUsers(){try{return JSON.parse(localStorage.getItem(USERS_KEY)||'{}')}catch(e){return{}}}
function saveUsers(u){localStorage.setItem(USERS_KEY,JSON.stringify(u))}
function hashPw(s){let h=0;for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return 'h_'+h;}
const session=getSession();
if(!session){location.href='login.html';}

function logout(){
  localStorage.removeItem(SESSION_KEY);
  location.href='login.html';
}

// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════
const CAREERS=[
  {id:'frontend',name:'Frontend Developer',cat:'Technology',emoji:'🖥️',salary:'₹4–12 LPA',demand:'High',time:'6–8 mo',color:'#9B7BFF',
   desc:'Build responsive, interactive web interfaces using modern HTML, CSS, and JavaScript frameworks.',
   skills:['HTML','CSS','JavaScript','React','TypeScript','Tailwind CSS','Git','Figma','REST APIs','Webpack'],
   roadmap:[{l:1,t:'Web Fundamentals',s:['HTML','CSS']},{l:2,t:'JavaScript Core',s:['JavaScript','Git']},{l:3,t:'React Framework',s:['React','Tailwind CSS']},{l:4,t:'Advanced Frontend',s:['TypeScript','Webpack']},{l:5,t:'APIs & Tools',s:['REST APIs','Figma']}],
   projects:['Portfolio Website','Interactive Calculator','Weather Dashboard','Movie Search App','E-commerce UI']},
  {id:'backend',name:'Backend Developer',cat:'Technology',emoji:'⚙️',salary:'₹5–15 LPA',demand:'High',time:'8–10 mo',color:'#22E0A0',
   desc:'Design server-side logic, databases and APIs that power scalable web applications.',
   skills:['Node.js','Express.js','Python','SQL','MongoDB','REST APIs','JWT','Docker','Redis','AWS'],
   roadmap:[{l:1,t:'Python & Node.js',s:['Python','Node.js']},{l:2,t:'Databases',s:['SQL','MongoDB']},{l:3,t:'API Dev',s:['Express.js','REST APIs','JWT']},{l:4,t:'DevOps Basics',s:['Docker','Redis']},{l:5,t:'Cloud',s:['AWS']}],
   projects:['Blog REST API','Auth System','Task Manager API','E-commerce Backend','Real-time Chat']},
  {id:'fullstack',name:'Full Stack Developer',cat:'Technology',emoji:'🔧',salary:'₹6–20 LPA',demand:'Very High',time:'10–14 mo',color:'#9B7BFF',
   desc:'Master both frontend and backend to build complete web applications end-to-end.',
   skills:['HTML','CSS','JavaScript','React','Node.js','Express.js','MongoDB','Git','Docker','AWS'],
   roadmap:[{l:1,t:'HTML & CSS',s:['HTML','CSS']},{l:2,t:'JavaScript',s:['JavaScript','Git']},{l:3,t:'React',s:['React']},{l:4,t:'Node & Express',s:['Node.js','Express.js']},{l:5,t:'DB & Deploy',s:['MongoDB','Docker','AWS']}],
   projects:['Portfolio Site','Expense Tracker','Blog Platform','E-commerce App','Social Media App']},
  {id:'data-analyst',name:'Data Analyst',cat:'Data',emoji:'📊',salary:'₹4–14 LPA',demand:'High',time:'6–9 mo',color:'#22D3EE',
   desc:'Transform raw data into actionable insights using statistical tools and visualisation.',
   skills:['Excel','SQL','Python','Pandas','Power BI','Tableau','Statistics','NumPy','Data Cleaning','Storytelling'],
   roadmap:[{l:1,t:'Excel & SQL',s:['Excel','SQL']},{l:2,t:'Python for Data',s:['Python','Pandas','NumPy']},{l:3,t:'Statistics',s:['Statistics','Data Cleaning']},{l:4,t:'Visualisation',s:['Power BI','Tableau']},{l:5,t:'Communication',s:['Storytelling']}],
   projects:['Sales Dashboard','Customer Segments','Survey Report','Sports Stats','COVID Visualisation']},
  {id:'data-scientist',name:'Data Scientist',cat:'Data',emoji:'🔬',salary:'₹8–25 LPA',demand:'Very High',time:'12–18 mo',color:'#FF5C9B',
   desc:'Apply machine learning and statistical modelling to solve complex business problems.',
   skills:['Python','Statistics','Machine Learning','Pandas','NumPy','Scikit-learn','TensorFlow','SQL','Deep Learning','Feature Engineering'],
   roadmap:[{l:1,t:'Python & Math',s:['Python','Statistics','NumPy']},{l:2,t:'Data Wrangling',s:['Pandas','SQL']},{l:3,t:'ML',s:['Machine Learning','Scikit-learn']},{l:4,t:'Deep Learning',s:['TensorFlow','Deep Learning']},{l:5,t:'Advanced',s:['Feature Engineering']}],
   projects:['Titanic Survival','House Price Pred','Sentiment Analysis','Image Classifier','Recommender System']},
  {id:'ai-engineer',name:'AI Engineer',cat:'Data',emoji:'🤖',salary:'₹12–35 LPA',demand:'Explosive',time:'14–20 mo',color:'#9B7BFF',
   desc:'Build production AI systems including LLMs, computer vision, and intelligent automation.',
   skills:['Python','Machine Learning','Deep Learning','TensorFlow','PyTorch','NLP','LLM APIs','MLOps','Docker','Cloud AI'],
   roadmap:[{l:1,t:'Python & ML',s:['Python','Machine Learning']},{l:2,t:'Deep Learning',s:['Deep Learning','TensorFlow','PyTorch']},{l:3,t:'NLP & LLMs',s:['NLP','LLM APIs']},{l:4,t:'MLOps',s:['MLOps','Docker']},{l:5,t:'Production AI',s:['Cloud AI']}],
   projects:['RAG Chatbot','Text Classifier','Image Recognition','Resume Parser','AI Content Generator']},
  {id:'cybersec',name:'Cyber Security Analyst',cat:'Security',emoji:'🛡️',salary:'₹5–18 LPA',demand:'High',time:'10–14 mo',color:'#FF5C9B',
   desc:'Protect organisations from digital threats through monitoring, ethical hacking, and incident response.',
   skills:['Networking','Linux','Python','Ethical Hacking','OWASP','SIEM','Wireshark','Cryptography','Incident Response','Cloud Security'],
   roadmap:[{l:1,t:'Networking & Linux',s:['Networking','Linux']},{l:2,t:'Security Basics',s:['Cryptography','OWASP']},{l:3,t:'Ethical Hacking',s:['Ethical Hacking','Wireshark']},{l:4,t:'Monitoring',s:['SIEM','Incident Response']},{l:5,t:'Advanced',s:['Python','Cloud Security']}],
   projects:['Home Lab Setup','CTF Challenges','Vuln Scanner','Password Auditor','Network Monitor']},
  {id:'uiux',name:'UI/UX Designer',cat:'Design',emoji:'🎨',salary:'₹4–15 LPA',demand:'High',time:'6–9 mo',color:'#FFB547',
   desc:'Design intuitive, beautiful digital products through research, prototyping, and visual craft.',
   skills:['Figma','Adobe XD','User Research','Wireframing','Prototyping','Usability Testing','Typography','Color Theory','CSS','Design Systems'],
   roadmap:[{l:1,t:'Design Fundamentals',s:['Typography','Color Theory']},{l:2,t:'Tools',s:['Figma','Adobe XD']},{l:3,t:'UX Process',s:['User Research','Wireframing','Usability Testing']},{l:4,t:'Interaction Design',s:['Prototyping','Design Systems']},{l:5,t:'Dev Handoff',s:['CSS']}],
   projects:['App Redesign','UX Audit','Design System','Dashboard UI','Onboarding Flow']},
  {id:'cloud',name:'Cloud Engineer',cat:'Technology',emoji:'☁️',salary:'₹7–22 LPA',demand:'Very High',time:'10–14 mo',color:'#22D3EE',
   desc:'Design, deploy, and manage scalable cloud infrastructure on AWS, Azure, or GCP.',
   skills:['AWS','Azure','Linux','Docker','Kubernetes','Terraform','CI/CD','Networking','Python','Monitoring'],
   roadmap:[{l:1,t:'Linux & Networking',s:['Linux','Networking']},{l:2,t:'Cloud Platforms',s:['AWS','Azure']},{l:3,t:'Containers',s:['Docker','Kubernetes']},{l:4,t:'IaC',s:['Terraform','CI/CD']},{l:5,t:'Automation',s:['Python','Monitoring']}],
   projects:['Deploy Web App on AWS','K8s Cluster Setup','CI/CD Pipeline','Serverless Function','Multi-cloud Arch']},
  {id:'devops',name:'DevOps Engineer',cat:'Technology',emoji:'🔁',salary:'₹8–25 LPA',demand:'Very High',time:'10–14 mo',color:'#22E0A0',
   desc:'Bridge dev and ops through automated deployment pipelines, infrastructure, and observability.',
   skills:['Linux','Git','Docker','Kubernetes','Jenkins','Terraform','AWS','Python','Ansible','Monitoring'],
   roadmap:[{l:1,t:'Linux & Git',s:['Linux','Git']},{l:2,t:'Containers',s:['Docker','Kubernetes']},{l:3,t:'CI/CD',s:['Jenkins','Python']},{l:4,t:'Infrastructure',s:['Terraform','Ansible']},{l:5,t:'Cloud',s:['AWS','Monitoring']}],
   projects:['Automated Pipeline','Dockerised App','IaC Setup','Blue-Green Deploy','Monitoring Dashboard']},
  {id:'product',name:'Product Manager',cat:'Business',emoji:'📋',salary:'₹8–30 LPA',demand:'High',time:'8–12 mo',color:'#FFB547',
   desc:'Lead cross-functional teams to build products that solve user problems and hit business goals.',
   skills:['Product Strategy','User Research','Agile','Roadmapping','Data Analysis','SQL','Communication','JIRA','A/B Testing','Stakeholder Management'],
   roadmap:[{l:1,t:'PM Basics',s:['Product Strategy','Agile']},{l:2,t:'User Insight',s:['User Research','A/B Testing']},{l:3,t:'Data',s:['Data Analysis','SQL']},{l:4,t:'Execution',s:['JIRA','Roadmapping']},{l:5,t:'Leadership',s:['Communication','Stakeholder Management']}],
   projects:['PRD Document','Competitive Analysis','User Interview Study','Prioritisation Framework','Metrics Dashboard']},
  {id:'marketing',name:'Digital Marketer',cat:'Business',emoji:'📣',salary:'₹3–12 LPA',demand:'High',time:'4–6 mo',color:'#FF5C9B',
   desc:'Drive brand awareness and revenue through SEO, social media, content and paid advertising.',
   skills:['SEO','Google Ads','Social Media','Content Marketing','Email Marketing','Analytics','Copywriting','Meta Ads','CRM','Marketing Automation'],
   roadmap:[{l:1,t:'Marketing Basics',s:['Content Marketing','Copywriting']},{l:2,t:'SEO & Search',s:['SEO','Google Ads']},{l:3,t:'Social & Paid',s:['Social Media','Meta Ads']},{l:4,t:'Email & CRM',s:['Email Marketing','CRM']},{l:5,t:'Analytics',s:['Analytics','Marketing Automation']}],
   projects:['SEO Audit','Ad Campaign Setup','Content Calendar','Email Drip Sequence','Social Media Strategy']},
];

const PROJECTS=[
  {name:'Portfolio Website',diff:'Beginner',cat:'Frontend',desc:'Build a personal portfolio showcasing your skills and projects with HTML, CSS and JavaScript.',tags:['HTML','CSS','JavaScript']},
  {name:'Interactive Calculator',diff:'Beginner',cat:'Frontend',desc:'A fully functional calculator with keyboard support and operation history.',tags:['HTML','CSS','JavaScript']},
  {name:'Weather Dashboard',diff:'Beginner',cat:'Frontend',desc:'Fetch real-time weather from an API and display it with clean charts.',tags:['JavaScript','API','CSS']},
  {name:'Expense Tracker',diff:'Intermediate',cat:'Frontend',desc:'A budget tracking app with categories, charts, and localStorage persistence.',tags:['React','Chart.js']},
  {name:'Movie Search App',diff:'Intermediate',cat:'Frontend',desc:'Search and filter movies using TMDB API with infinite scroll and favourites.',tags:['React','API']},
  {name:'E-commerce UI',diff:'Intermediate',cat:'Frontend',desc:'A complete shopping UI with cart, filters, and checkout flow.',tags:['React','Tailwind']},
  {name:'Blog REST API',diff:'Beginner',cat:'Backend',desc:'CRUD API for a blog platform with user auth and comments.',tags:['Node.js','Express','MongoDB']},
  {name:'Auth System',diff:'Intermediate',cat:'Backend',desc:'JWT-based authentication with refresh tokens and role-based access.',tags:['Node.js','JWT','SQL']},
  {name:'Real-time Chat',diff:'Advanced',cat:'Backend',desc:'WebSocket-powered group chat with rooms, presence, and message history.',tags:['Node.js','Socket.io','Redis']},
  {name:'Titanic Survival',diff:'Beginner',cat:'Data',desc:'Classic ML project: predict survival on Titanic with feature engineering.',tags:['Python','Pandas','Scikit-learn']},
  {name:'House Price Prediction',diff:'Intermediate',cat:'Data',desc:'Regression model for predicting housing prices with cross-validation.',tags:['Python','ML','NumPy']},
  {name:'Sentiment Analyser',diff:'Intermediate',cat:'Data',desc:'Classify Twitter data sentiment using NLP and a fine-tuned model.',tags:['Python','NLP','BERT']},
  {name:'Sales Dashboard',diff:'Beginner',cat:'Data',desc:'Interactive Power BI / Tableau dashboard from a real sales dataset.',tags:['Power BI','SQL','Excel']},
  {name:'RAG Chatbot',diff:'Advanced',cat:'Data',desc:'Build a retrieval-augmented chatbot that answers questions from your documents.',tags:['Python','LLM','LangChain']},
  {name:'App Redesign',diff:'Beginner',cat:'Frontend',desc:'Pick a poorly designed mobile app and redesign its full UX in Figma.',tags:['Figma','UX','Research']},
  {name:'CI/CD Pipeline',diff:'Advanced',cat:'Backend',desc:'Automate build, test, and deploy using GitHub Actions and Docker.',tags:['Docker','GitHub Actions','AWS']},
  {name:'K8s Cluster Setup',diff:'Advanced',cat:'Backend',desc:'Deploy a multi-service app on a Kubernetes cluster with autoscaling.',tags:['Kubernetes','Docker','Terraform']},
];

const QUIZ=[
  {q:'What type of work excites you most?',opts:[{t:'Building visual things people interact with',c:['frontend','uiux','fullstack']},{t:'Digging into data to find patterns',c:['data-analyst','data-scientist','ai-engineer']},{t:'Keeping systems secure and protected',c:['cybersec']},{t:'Coordinating teams and shipping products',c:['product','marketing']}]},
  {q:'Which subject do you enjoy the most?',opts:[{t:'Maths, statistics, algorithms',c:['data-scientist','ai-engineer','data-analyst']},{t:'Design, art, visual communication',c:['uiux']},{t:'Programming and problem-solving',c:['fullstack','backend','frontend','devops']},{t:'Business, strategy, people',c:['product','marketing']}]},
  {q:'How do you prefer to solve problems?',opts:[{t:'Write code and build systems',c:['backend','fullstack','devops','cloud']},{t:'Analyse data and build dashboards',c:['data-analyst','data-scientist']},{t:'Design and user experience',c:['uiux','frontend']},{t:'Strategy, roadmaps and frameworks',c:['product']}]},
  {q:'Which salary range motivates you most?',opts:[{t:'₹3–8 LPA, with steady growth',c:['marketing','uiux','data-analyst']},{t:'₹6–15 LPA mid-term focus',c:['frontend','fullstack','backend']},{t:'₹12–35 LPA, ready to invest time',c:['ai-engineer','data-scientist','devops','cloud']},{t:'Passion first, money follows',c:['uiux','product','marketing']}]},
  {q:'Which tools have you explored?',opts:[{t:'Figma, Canva, Adobe Suite',c:['uiux','marketing']},{t:'Python, Jupyter, Excel',c:['data-analyst','data-scientist','ai-engineer']},{t:'HTML, CSS, JavaScript',c:['frontend','fullstack']},{t:'Linux terminal, networking tools',c:['cybersec','devops','cloud']}]},
  {q:'What impact do you want to make?',opts:[{t:'Make the internet safer',c:['cybersec']},{t:'Power intelligent AI applications',c:['ai-engineer','data-scientist']},{t:'Build apps millions of people use',c:['fullstack','frontend','backend']},{t:'Help brands grow and connect',c:['marketing']}]},
  {q:'What sounds like your ideal day?',opts:[{t:'Coding a feature and seeing it live',c:['frontend','fullstack','backend']},{t:'Training a model, improving accuracy',c:['data-scientist','ai-engineer']},{t:'Designing wireframes, testing with users',c:['uiux']},{t:'Analysing campaign data, optimising ads',c:['marketing','data-analyst']}]},
  {q:'How much time can you learn daily?',opts:[{t:'1–2 hours casual learning',c:['marketing','uiux']},{t:'3–4 hours consistent effort',c:['frontend','data-analyst','product']},{t:'5+ hours full focus mode',c:['fullstack','backend','ai-engineer','data-scientist']},{t:'Flexible — I learn in sprints',c:['cybersec','devops','cloud']}]},
];

const AI_KB={
  'data scientist':'To become a Data Scientist you need Python, Statistics, Pandas, NumPy, Scikit-learn and eventually TensorFlow or PyTorch. Build 3–5 Kaggle projects. Expect 12–18 months of focused learning.',
  'data analyst':'Data Analysts need Excel, SQL, Python (Pandas), and a visualisation tool like Power BI or Tableau. Timeline: 6–9 months.',
  'full stack':'Full Stack path: HTML → CSS → JavaScript → React → Node.js → Express → MongoDB. Most focused learners reach job readiness in 10–14 months.',
  'frontend':'Frontend needs HTML, CSS, JavaScript, then React. Tailwind and TypeScript are highly valued. Timeline: 6–8 months.',
  'backend':'Backend focuses on server-side logic, databases and APIs. Node.js + Express + MongoDB or Python + Django. Timeline: 8–10 months.',
  'ai engineer':'AI Engineering is one of the most in-demand tracks. You need Python, Deep Learning (TensorFlow/PyTorch), NLP, and LLM APIs. Timeline: 14–20 months.',
  'cybersec':'Cybersecurity requires Networking fundamentals, Linux, Ethical Hacking, Wireshark and SIEM. Timeline: 10–14 months.',
  'uiux':'UI/UX starts with design fundamentals, then Figma, then the UX process. Timeline: 6–9 months.',
  'cloud':'Cloud Engineering needs Linux, networking, AWS/Azure, Docker, Kubernetes, Terraform. Timeline: 10–14 months.',
  'devops':'DevOps bridges development and operations: Linux, Git, Docker, Kubernetes, CI/CD, IaC. Timeline: 10–14 months.',
  'project':'For a strong portfolio: 1) a polished frontend project, 2) a full-stack CRUD app, 3) a data/ML project. Quality beats quantity.',
  'salary':'India: Frontend ₹4–12 LPA, Full Stack ₹6–20 LPA, Data Scientist ₹8–25 LPA, AI Engineer ₹12–35 LPA, Cloud ₹7–22 LPA, Cybersec ₹5–18 LPA.',
  'time':'Frontend 6–8 mo, Full Stack 10–14 mo, Data Analyst 6–9 mo, Data Scientist 12–18 mo, AI Engineer 14–20 mo, Cybersec 10–14 mo.',
  'best career':'Love visuals → Frontend / UI-UX. Love data → Data Analyst / Scientist. Love systems → Backend / Cloud / DevOps. Love AI → AI Engineer. Love business → Product / Marketing. Take our Quiz! 🎯',
  'career':'Career planning starts with self-awareness. Take the Career Quiz inside Explore — it analyses your strengths and returns your top 3 matches.',
  'hello':'Hello! I\'m Aria, your AI career mentor 👋 Ask me anything about careers, skills, timelines, salaries or projects.',
  'hi':'Hi there! 👋 What career questions can I help you with today?',
  'default':'I can help with career paths, skill requirements, learning timelines, project ideas, and salary insights. Try asking about a specific career.',
};

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
let savedCareers=new Set();
let careerFilter='All';
let projFilter='all';
let saCareer=null,saCheckedSkills=new Set();
let recPrefs=new Set();
let quizIdx=0,quizScores={};

let profile={
  first:session?.first||'',last:session?.last||'',
  email:session?.email||'',phone:session?.phone||'',
  college:'',course:'',bio:'',
  target:'',exp:'Beginner',time:'1–2 hours',goal:'Get a job',
  photo:'', // data URL
  notifs:{weekly:true,activity:true,tips:false,email:true},
};
let lastGapResult=null;
let lastQuizTop=null;
let activityLog=[];

// ═══════════════════════════════════════════════
// PERSISTENCE
// ═══════════════════════════════════════════════
function stateKey(){return 'cc_state_'+(session?.email||'guest');}
function saveState(){
  try{localStorage.setItem(stateKey(),JSON.stringify({
    profile,savedCareers:[...savedCareers],lastGapResult,lastQuizTop,activityLog
  }));}catch(e){}
}
function loadState(){
  try{
    const raw=localStorage.getItem(stateKey());if(!raw)return;
    const s=JSON.parse(raw);
    if(s.profile)profile=Object.assign(profile,s.profile);
    if(Array.isArray(s.savedCareers))savedCareers=new Set(s.savedCareers);
    if(s.lastGapResult)lastGapResult=s.lastGapResult;
    if(s.lastQuizTop)lastQuizTop=s.lastQuizTop;
    if(Array.isArray(s.activityLog))activityLog=s.activityLog;
  }catch(e){}
}

// ═══════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════
function goPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  const pg=document.getElementById('page-'+id);if(pg)pg.classList.add('active');
  const nl=document.querySelector(`.nav-link[onclick*="'${id}'"]`);if(nl)nl.classList.add('active');
  window.scrollTo(0,0);
  if(id==='explore')renderSaved();
  if(id==='dashboard')renderDashboard();
  if(id==='profile')hydrateProfileForm();
}
function switchTool(id){
  document.querySelectorAll('.tool-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(b=>b.classList.remove('active'));
  const panel=document.getElementById('tool-'+id);if(panel)panel.classList.add('active');
  const btn=document.querySelector(`.sidebar-item[data-tool="${id}"]`);if(btn)btn.classList.add('active');
  if(id==='saved')renderSaved();
  if(id==='compare')setupCompare();
  if(id==='quiz'){quizIdx=0;quizScores={};renderQuiz();}
}

// ═══════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════
function initials(f,l){
  const a=(f||'').trim()[0]||'';const b=(l||'').trim()[0]||'';
  return (a+b).toUpperCase()||(profile.email||'?')[0].toUpperCase();
}
function applyProfile(){
  const full=`${profile.first} ${profile.last}`.trim();
  const ini=initials(profile.first,profile.last);
  document.querySelectorAll('.p-name').forEach(e=>e.textContent=full||'Your profile');
  document.querySelectorAll('.p-email').forEach(e=>e.textContent=profile.email||'—');
  document.querySelectorAll('.p-avatar,.nav-avatar').forEach(e=>{
    if(profile.photo){e.style.backgroundImage=`url("${profile.photo}")`;e.textContent='';}
    else{e.style.backgroundImage='';e.textContent=ini;}
    e.title=full||profile.email;
  });
  const greet=document.getElementById('dashGreetName');
  if(greet)greet.textContent=profile.first||'there';
  const track=document.getElementById('dashTrackCareer');
  if(track){
    if(lastGapResult)track.textContent=lastGapResult.careerName;
    else if(lastQuizTop)track.textContent=lastQuizTop.name;
    else track.textContent=profile.target||'your target career';
  }
  // Profile hero badges
  const bt=document.getElementById('pBadgeTarget');
  if(bt)bt.innerHTML=`<i class="ti ti-map-2"></i> ${profile.target?profile.target+' track':'No target career set'}`;
  const br=document.getElementById('pBadgeReady');
  if(br)br.textContent=(lastGapResult?lastGapResult.pct+'% readiness':'— readiness');
}
function hydrateProfileForm(){
  pfFirst.value=profile.first||'';pfLast.value=profile.last||'';
  pfEmail.value=profile.email||'';pfPhone.value=profile.phone||'';
  pfCollege.value=profile.college||'';pfCourse.value=profile.course||'';
  pfBio.value=profile.bio||'';
  // Build target select from CAREERS list (so user picks a real one)
  const sel=document.getElementById('prefCareer');
  if(sel && sel.children.length===0){
    sel.innerHTML='<option value="">— Choose target career —</option>'+
      CAREERS.map(c=>`<option value="${c.name}">${c.emoji} ${c.name}</option>`).join('');
  }
  if(sel)sel.value=profile.target||'';
  document.getElementById('prefExp').value=profile.exp;
  document.getElementById('prefTime').value=profile.time;
  document.getElementById('prefGoal').value=profile.goal;
}
function saveProfile(){
  profile.first=pfFirst.value.trim();
  profile.last=pfLast.value.trim();
  profile.email=pfEmail.value.trim();
  profile.phone=pfPhone.value.trim();
  profile.college=pfCollege.value.trim();
  profile.course=pfCourse.value.trim();
  profile.bio=pfBio.value.trim();
  applyProfile();saveState();
  toast('Profile saved!','ok');
  renderDashboard();
}
function savePreferences(){
  profile.target=document.getElementById('prefCareer').value;
  profile.exp=document.getElementById('prefExp').value;
  profile.time=document.getElementById('prefTime').value;
  profile.goal=document.getElementById('prefGoal').value;
  if(profile.target)logActivity(`Set target career to <strong>${profile.target}</strong>`,'teal');
  applyProfile();saveState();renderDashboard();
  toast('Preferences updated!','ok');
}
function changePhoto(e){
  const f=e.target.files?.[0];if(!f)return;
  if(f.size>2*1024*1024){toast('Image too large (max 2 MB)','err');return;}
  const r=new FileReader();
  r.onload=ev=>{profile.photo=ev.target.result;applyProfile();saveState();toast('Photo updated','ok');};
  r.readAsDataURL(f);
}

// ═══════════════════════════════════════════════
// CHANGE PASSWORD modal
// ═══════════════════════════════════════════════
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
function openChangePw(){
  cpCurrent.value='';cpNew.value='';cpNew2.value='';
  openModal('modalChangePw');
}
function submitChangePw(){
  const users=getUsers();const u=users[profile.email];
  if(!u){toast('Account not found','err');return}
  if(u.password!==hashPw(cpCurrent.value)){toast('Current password is incorrect','err');return}
  if(cpNew.value.length<6){toast('New password must be at least 6 characters','err');return}
  if(cpNew.value!==cpNew2.value){toast('Passwords do not match','err');return}
  u.password=hashPw(cpNew.value);saveUsers(users);
  closeModal('modalChangePw');
  toast('Password changed successfully','ok');
  logActivity('Changed account password','violet');
  renderDashboard();
}

// ═══════════════════════════════════════════════
// NOTIFICATIONS modal
// ═══════════════════════════════════════════════
const NOTIF_DEFS=[
  {key:'weekly',label:'Weekly progress digest',sub:'A summary of your skills and activity every Sunday'},
  {key:'activity',label:'Activity reminders',sub:'Nudges if you haven\'t logged in for a few days'},
  {key:'tips',label:'Career tips & guides',sub:'Hand-picked articles based on your target career'},
  {key:'email',label:'Email notifications',sub:'Master toggle for all email delivery'},
];
function openNotifs(){
  const wrap=document.getElementById('notifList');
  wrap.innerHTML=NOTIF_DEFS.map(n=>`
    <div class="toggle-row">
      <div><div class="tr-label">${n.label}</div><div class="tr-sub">${n.sub}</div></div>
      <div class="toggle ${profile.notifs[n.key]?'on':''}" data-key="${n.key}" onclick="this.classList.toggle('on')"></div>
    </div>`).join('');
  openModal('modalNotifs');
}
function saveNotifs(){
  document.querySelectorAll('#notifList .toggle').forEach(t=>{
    profile.notifs[t.dataset.key]=t.classList.contains('on');
  });
  saveState();closeModal('modalNotifs');
  toast('Notification preferences saved','ok');
  logActivity('Updated notification preferences','amber');
  renderDashboard();
}

// ═══════════════════════════════════════════════
// DELETE ACCOUNT modal
// ═══════════════════════════════════════════════
function openDelete(){delConfirm.value='';openModal('modalDelete');}
function confirmDelete(){
  if(delConfirm.value!=='DELETE'){toast('Type DELETE to confirm','err');return}
  const users=getUsers();
  delete users[profile.email];saveUsers(users);
  localStorage.removeItem(stateKey());
  localStorage.removeItem(SESSION_KEY);
  toast('Account deleted','ok');
  setTimeout(()=>location.href='login.html',700);
}

// ═══════════════════════════════════════════════
// ACTIVITY + DASHBOARD
// ═══════════════════════════════════════════════
function logActivity(text,color){
  activityLog.unshift({text,color,time:'Just now',ts:Date.now()});
  activityLog=activityLog.slice(0,10);
  saveState();
  renderDashboard();
}
function fmtTime(ts){
  const d=Date.now()-ts;
  if(d<60000)return'Just now';
  if(d<3600000)return Math.floor(d/60000)+' min ago';
  if(d<86400000)return Math.floor(d/3600000)+' hr ago';
  return Math.floor(d/86400000)+' day(s) ago';
}
function renderActivity(){
  const el=document.getElementById('dashActivity');if(!el)return;
  if(!activityLog.length){el.innerHTML='<div style="text-align:center;padding:1.5rem;color:var(--muted);font-size:.88rem">Your actions will appear here.</div>';return}
  el.innerHTML=activityLog.map(a=>`<div class="activity-item"><div class="a-dot" style="background:var(--${a.color||'violet'});color:var(--${a.color||'violet'})"></div><div style="flex:1"><div class="a-text">${a.text}</div><div class="a-time">${a.ts?fmtTime(a.ts):a.time}</div></div></div>`).join('');
}
function renderDashboard(){
  const dsav=document.getElementById('dashSaved');if(dsav)dsav.textContent=savedCareers.size;
  const dq=document.getElementById('dashQuizCount');if(dq)dq.textContent=lastQuizTop?1:0;
  const dqs=document.getElementById('dashQuizSub');if(dqs)dqs.textContent=lastQuizTop?'Top: '+lastQuizTop.name:'Take the discovery quiz';
  const dac=document.getElementById('dashActCount');if(dac)dac.textContent=activityLog.length;
  const dsh=document.getElementById('dashSkillsHave');
  const dss=document.getElementById('dashSkillsSub');
  if(dsh){
    if(lastGapResult){dsh.textContent=lastGapResult.have.length;dss.textContent=`of ${lastGapResult.skills.length} skills for ${lastGapResult.careerName}`;}
    else{dsh.textContent='0';dss.textContent='Run the gap analyser';}
  }

  // Skill progress
  const prog=document.getElementById('dashSkillProgress');
  if(prog){
    if(lastGapResult){
      prog.innerHTML=lastGapResult.skills.map(s=>{
        const pct=s.have?100:15;const color=s.have?'var(--green)':'var(--coral)';
        return `<div class="progress-row"><div class="pr-top"><span>${s.name}</span><span style="color:${color}">${pct}%</span></div><div class="pr-bar"><div class="pr-fill" style="width:${pct}%;background:${color};color:${color}"></div></div></div>`;
      }).join('');
    }else{
      prog.innerHTML='<div style="text-align:center;padding:2rem;color:var(--muted);font-size:.88rem">Run the Skill Gap Analyser to see your progress here.</div>';
    }
  }

  // Saved careers list on dashboard
  const dsl=document.getElementById('dashSavedList');
  if(dsl){
    if(savedCareers.size===0){
      dsl.innerHTML='<div style="text-align:center;padding:1.5rem;color:var(--muted);font-size:.88rem">No saved careers yet. Bookmark some from the Careers tab.</div>';
    }else{
      dsl.innerHTML=Array.from(savedCareers).map(id=>{
        const c=CAREERS.find(x=>x.id===id);if(!c)return'';
        return `<div class="next-step" onclick="goPage('explore');switchTool('careers');setTimeout(()=>openCd('${c.id}'),100)"><div class="ns-icon" style="background:${c.color}22;color:${c.color}">${c.emoji}</div><div style="flex:1"><div class="ns-title">${c.name}</div><div class="ns-sub">${c.cat} · ${c.salary}</div></div></div>`;
      }).join('');
    }
  }

  // Readiness
  const num=document.getElementById('dashReadinessNum');
  const msg=document.getElementById('dashReadinessMsg');
  const circle=document.getElementById('dashScoreCircle');
  if(lastGapResult){
    if(num)num.textContent=lastGapResult.pct+'%';
    if(circle)circle.style.setProperty('--p',lastGapResult.pct+'%');
    if(msg)msg.textContent=lastGapResult.miss.length?`Almost there! Focus on: ${lastGapResult.miss.slice(0,3).join(', ')}`:`🎉 You're fully ready for ${lastGapResult.careerName}!`;
  }else{
    if(num)num.textContent='—';
    if(circle)circle.style.setProperty('--p','0%');
    if(msg)msg.textContent='Run an analysis to see your readiness score.';
  }

  applyProfile();
  renderActivity();
}

// ═══════════════════════════════════════════════
// CAREERS
// ═══════════════════════════════════════════════
function renderCareers(){
  const q=(document.getElementById('careerSearch')?.value||'').toLowerCase();
  const list=CAREERS.filter(c=>{
    const matchCat=careerFilter==='All'||c.cat===careerFilter;
    const matchQ=!q||c.name.toLowerCase().includes(q)||c.skills.some(s=>s.toLowerCase().includes(q))||c.cat.toLowerCase().includes(q);
    return matchCat&&matchQ;
  });
  const grid=document.getElementById('careersGrid');if(!grid)return;
  grid.innerHTML=list.map(c=>`
    <div class="career-card" onclick="openCd('${c.id}')">
      <div class="career-card-stripe" style="background:${c.color}66"></div>
      <span class="career-emoji">${c.emoji}</span>
      <div class="career-cat">${c.cat}</div>
      <div class="career-name">${c.name}</div>
      <div class="skill-chips">${c.skills.slice(0,4).map(s=>`<span class="skill-chip">${s}</span>`).join('')}${c.skills.length>4?`<span class="skill-chip">+${c.skills.length-4}</span>`:''}</div>
      <div class="career-footer">
        <span class="salary-badge">${c.salary}</span>
        <button class="bookmark-btn ${savedCareers.has(c.id)?'saved':''}" onclick="event.stopPropagation();toggleSave('${c.id}')" title="Save"><i class="ti ti-${savedCareers.has(c.id)?'bookmark-filled':'bookmark'}"></i></button>
      </div>
    </div>`).join('');
}
function filterCareers(){renderCareers()}
function setFilter(cat,btn){
  careerFilter=cat;
  document.querySelectorAll('#tool-careers .filter-pill').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');renderCareers();
}
function toggleSave(id){
  const c=CAREERS.find(x=>x.id===id);
  if(savedCareers.has(id)){savedCareers.delete(id);toast('Removed from saved','');if(c)logActivity(`Removed <strong>${c.name}</strong> from saved`,'coral')}
  else{savedCareers.add(id);toast('Career saved ✓','ok');if(c)logActivity(`Saved <strong>${c.name}</strong> career`,'amber')}
  saveState();renderCareers();renderSaved();renderDashboard();
}

// ═══════════════════════════════════════════════
// CAREER DETAIL
// ═══════════════════════════════════════════════
function openCd(id){
  const c=CAREERS.find(x=>x.id===id);if(!c)return;
  const saved=savedCareers.has(id);
  document.getElementById('cdModalInner').innerHTML=`
    <button class="cd-close" onclick="closeCd()"><i class="ti ti-x"></i></button>
    <div class="cd-modal-header">
      <div class="cd-emoji">${c.emoji}</div>
      <div style="flex:1">
        <div class="cd-modal-name">${c.name}</div>
        <div class="cd-modal-desc">${c.desc}</div>
        <div class="cd-meta-row">
          <div class="cd-meta-tag"><i class="ti ti-currency-rupee"></i><strong>${c.salary}</strong></div>
          <div class="cd-meta-tag"><i class="ti ti-trending-up"></i><strong>${c.demand}</strong> demand</div>
          <div class="cd-meta-tag"><i class="ti ti-clock"></i><strong>${c.time}</strong></div>
        </div>
      </div>
    </div>
    <div class="cd-modal-body">
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:1.5rem">
        <button class="btn btn-primary btn-sm" onclick="closeCd();switchTool('analyser');setTimeout(()=>selectSaCar('${id}'),100)"><i class="ti ti-chart-dots"></i> Analyse my skills</button>
        <button class="btn btn-outline btn-sm" onclick="toggleSave('${id}');closeCd()"><i class="ti ti-${saved?'bookmark-filled':'bookmark'}"></i> ${saved?'Remove':'Save'}</button>
        <button class="btn btn-outline btn-sm" onclick="exportPDF()"><i class="ti ti-download"></i> Export PDF</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        <div>
          <div class="cd-section-title">Required skills</div>
          <div class="cd-skill-grid">${c.skills.map(s=>`<span class="cd-skill" style="background:${c.color}22;border-color:${c.color}55;color:${c.color}">${s}</span>`).join('')}</div>
          <div class="cd-section-title" style="margin-top:1.25rem">Recommended projects</div>
          ${c.projects.map((p,i)=>`<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);font-size:.85rem"><span style="width:22px;height:22px;border-radius:50%;background:${c.color}33;color:${c.color};font-size:.72rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i+1}</span>${p}</div>`).join('')}
        </div>
        <div>
          <div class="cd-section-title">Learning roadmap</div>
          <div class="roadmap-steps">${c.roadmap.map(r=>`<div class="roadmap-step"><div class="rs-num" style="background:${c.color}22;color:${c.color}">${r.l}</div><div class="rs-body"><div class="rs-level">Level ${r.l}</div><div class="rs-title">${r.t}</div><div class="rs-skills">${r.s.map(s=>`<span class="rs-skill">${s}</span>`).join('')}</div></div></div>`).join('')}</div>
        </div>
      </div>
    </div>`;
  document.getElementById('cdModal').classList.add('open');
}
function closeCd(){document.getElementById('cdModal').classList.remove('open')}

// ═══════════════════════════════════════════════
// SKILL ANALYSER
// ═══════════════════════════════════════════════
function initSaPicker(){
  const el=document.getElementById('saPicker');if(!el)return;
  el.innerHTML=CAREERS.map(c=>`<button class="cs-btn" id="saBtn-${c.id}" onclick="selectSaCar('${c.id}')">${c.emoji} ${c.name}</button>`).join('');
}
function selectSaCar(id){
  saCareer=id;saCheckedSkills=new Set();
  document.querySelectorAll('.cs-btn').forEach(b=>b.classList.remove('selected'));
  const btn=document.getElementById('saBtn-'+id);if(btn)btn.classList.add('selected');
  const c=CAREERS.find(x=>x.id===id);if(!c)return;
  document.getElementById('saStep2').style.display='block';
  document.getElementById('saStep3').style.display='none';
  document.getElementById('saChecks').innerHTML=c.skills.map(s=>{
    const sid=s.replace(/[^a-z0-9]/gi,'_');
    return`<div class="skill-toggle" id="st-${sid}" onclick="toggleSk('${sid}','${s}')"><div class="st-check"><i class="ti ti-check" style="font-size:.65rem"></i></div>${s}</div>`;
  }).join('');
}
function toggleSk(sid,name){
  const el=document.getElementById('st-'+sid);
  if(saCheckedSkills.has(name)){saCheckedSkills.delete(name);el.classList.remove('on')}
  else{saCheckedSkills.add(name);el.classList.add('on')}
}
function runGap(){
  if(!saCareer)return;
  const c=CAREERS.find(x=>x.id===saCareer);
  const have=c.skills.filter(s=>saCheckedSkills.has(s));
  const miss=c.skills.filter(s=>!saCheckedSkills.has(s));
  const pct=Math.round(have.length/c.skills.length*100);
  lastGapResult={careerId:c.id,careerName:c.name,have,miss,pct,skills:c.skills.map(s=>({name:s,have:saCheckedSkills.has(s)}))};
  saveState();
  logActivity(`Skill gap analysis for <strong>${c.name}</strong>: ${pct}% ready`,'violet');
  document.getElementById('saStep3').style.display='block';
  document.getElementById('saResults').innerHTML=`
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:1.25rem">
      <div class="card-sm" style="flex:1;min-width:100px;text-align:center"><div style="font-size:1.85rem;font-weight:700;color:var(--green);font-family:'Space Grotesk',sans-serif">${have.length}</div><div style="font-size:.75rem;color:var(--muted);margin-top:2px">Skills you have</div></div>
      <div class="card-sm" style="flex:1;min-width:100px;text-align:center"><div style="font-size:1.85rem;font-weight:700;color:var(--coral);font-family:'Space Grotesk',sans-serif">${miss.length}</div><div style="font-size:.75rem;color:var(--muted);margin-top:2px">Skills missing</div></div>
      <div class="card-sm" style="flex:1;min-width:100px;text-align:center"><div style="font-size:1.85rem;font-weight:700;color:var(--violet);font-family:'Space Grotesk',sans-serif">${pct}%</div><div style="font-size:.75rem;color:var(--muted);margin-top:2px">Readiness</div></div>
    </div>
    <div style="background:rgba(155,123,255,0.1);border-radius:99px;height:10px;overflow:hidden;margin-bottom:1.25rem"><div style="height:100%;border-radius:99px;background:linear-gradient(90deg,var(--violet),var(--teal));width:${pct}%;transition:width .6s;box-shadow:0 0 12px var(--violet)"></div></div>
    <div>${c.skills.map(s=>{const h=saCheckedSkills.has(s);return`<div class="gap-result-row"><div class="gap-name">${s}</div><div class="gap-track"><div class="gap-fill" style="width:${h?100:0}%;background:${h?'var(--green)':'var(--coral)'}"></div></div><span class="gap-tag ${h?'gap-have':'gap-miss'}">${h?'✓ Have':'✗ Missing'}</span></div>`}).join('')}</div>
    ${miss.length>0?`<div style="background:var(--amber-soft);border:1px solid rgba(255,181,71,0.35);border-radius:var(--r);padding:1rem;font-size:.85rem;color:var(--amber);margin-top:1rem"><strong>📌 Start with:</strong> ${miss.slice(0,4).join(', ')}</div>`:`<div style="background:var(--green-soft);border:1px solid rgba(34,224,160,0.35);border-radius:var(--r);padding:1rem;font-size:.85rem;color:var(--green);margin-top:1rem;font-weight:600">🎉 You already have all skills for ${c.name}!</div>`}
    <button class="btn btn-primary mt2" onclick="exportPDF()"><i class="ti ti-download"></i> Export gap report</button>
  `;
}

// ═══════════════════════════════════════════════
// AI RECOMMENDATION
// ═══════════════════════════════════════════════
function togglePref(btn,key){
  btn.classList.toggle('on');
  if(recPrefs.has(key))recPrefs.delete(key);else recPrefs.add(key);
}
function generateRec(){
  if(recPrefs.size===0){toast('Select at least one preference first','err');return}
  const scores={};
  const map={math:['data-scientist','ai-engineer','data-analyst','backend'],visual:['uiux','frontend','marketing'],build:['fullstack','backend','devops','cloud'],data:['data-analyst','data-scientist','ai-engineer'],people:['product','marketing'],security:['cybersec'],automate:['ai-engineer','devops','cloud'],marketing:['marketing','product']};
  recPrefs.forEach(p=>{(map[p]||[]).forEach(id=>{scores[id]=(scores[id]||0)+1})});
  const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,4);
  const reasons={math:'Strong match for your analytical strengths.',visual:'Perfect for your creative preferences.',build:'Great fit for builders.',data:'Aligns with your love of data.',people:'Ideal for people work.',security:'Tailored to security interest.',automate:'Excellent for automation lovers.',marketing:'Well-suited for marketing minds.'};
  const reason=Array.from(recPrefs).slice(0,2).map(p=>reasons[p]).join(' ');
  document.getElementById('recResults').innerHTML=`
    <div style="font-size:.95rem;font-weight:600;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem;color:#fff">Recommended for you</div>
    <div class="rec-grid">${sorted.map(([id],i)=>{
      const c=CAREERS.find(x=>x.id===id);if(!c)return'';
      const matchPct=Math.round((100-i*12));
      return`<div class="rec-card" onclick="openCd('${id}')">
        <div class="rec-match"><i class="ti ti-sparkles" style="font-size:.75rem"></i> ${matchPct}% match</div>
        <div style="font-size:1.5rem;margin-bottom:.4rem">${c.emoji}</div>
        <div class="rec-name">${c.name}</div>
        <div class="rec-why">${i===0?reason:'Also aligns with your selected preferences.'}</div>
        <div class="rec-tags">${c.skills.slice(0,3).map(s=>`<span class="skill-chip">${s}</span>`).join('')}</div>
        <div style="margin-top:.75rem;font-size:.78rem;font-weight:600;color:var(--green)">${c.salary}</div>
      </div>`;
    }).join('')}</div>`;
  logActivity('Generated AI career recommendations','teal');
}

// ═══════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════
function renderProjects(){
  const grid=document.getElementById('projectsGrid');if(!grid)return;
  const list=PROJECTS.filter(p=>projFilter==='all'||p.diff===projFilter||p.cat===projFilter);
  const diffClass={Beginner:'d-beg',Intermediate:'d-int',Advanced:'d-adv'};
  grid.innerHTML=list.map(p=>`
    <div class="proj-card">
      <div class="proj-diff ${diffClass[p.diff]||'d-beg'}"><i class="ti ti-${p.diff==='Beginner'?'seedling':p.diff==='Intermediate'?'plant-2':'rocket'}" style="font-size:.75rem"></i>${p.diff}</div>
      <div class="proj-name">${p.name}</div>
      <div class="proj-desc">${p.desc}</div>
      <div class="proj-tags">${p.tags.map(t=>`<span class="skill-chip">${t}</span>`).join('')}</div>
    </div>`).join('');
}
function filterProj(f,btn){
  projFilter=f;
  document.querySelectorAll('#tool-projects .filter-pill').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');renderProjects();
}

// ═══════════════════════════════════════════════
// CHAT
// ═══════════════════════════════════════════════
function getAIReply(msg){
  const m=msg.toLowerCase();
  for(const[k,v]of Object.entries(AI_KB)){if(m.includes(k))return v}
  if(m.includes('recommend')||m.includes('best'))return AI_KB['best career'];
  if(m.includes('skill')||m.includes('learn'))return'Building skills effectively: 1) Choose ONE career path, 2) Learn foundational skills first, 3) Build a mini-project with each new skill, 4) Gradually move to advanced topics. Use the Skill Gap Analyser to see exactly where you stand! 💪';
  return AI_KB.default;
}
function addMsg(text,role){
  const msgs=document.getElementById('chatMsgs');
  const div=document.createElement('div');div.className='cmsg '+role;
  const now=new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  div.innerHTML=`<div class="cbubble">${text}</div><div class="ctime">${now}</div>`;
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
}
function addTyping(){
  const msgs=document.getElementById('chatMsgs');
  const div=document.createElement('div');div.className='cmsg ai';div.id='typingEl';
  div.innerHTML='<div class="typing-wrap"><div class="tdot"></div><div class="tdot"></div><div class="tdot"></div></div>';
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
}
function sendChat(){
  const inp=document.getElementById('chatInp');
  const msg=inp.value.trim();if(!msg)return;
  inp.value='';document.getElementById('chatSugs').style.display='none';
  addMsg(msg,'user');addTyping();
  setTimeout(()=>{document.getElementById('typingEl')?.remove();addMsg(getAIReply(msg),'ai');},900+Math.random()*700);
}
function sendSug(btn){document.getElementById('chatInp').value=btn.textContent;sendChat();}

// ═══════════════════════════════════════════════
// QUIZ
// ═══════════════════════════════════════════════
function renderQuiz(){
  const wrap=document.getElementById('quizWrap');if(!wrap)return;
  if(quizIdx>=QUIZ.length){showQuizResult();return;}
  const q=QUIZ[quizIdx];
  const pct=Math.round(quizIdx/QUIZ.length*100);
  wrap.innerHTML=`
    <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--muted);margin-bottom:.6rem"><span>Question ${quizIdx+1} of ${QUIZ.length}</span><span>${pct}%</span></div>
    <div class="quiz-progress-bar"><div class="quiz-pfill" style="width:${pct}%"></div></div>
    <div class="card">
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-options">${q.opts.map((o,i)=>`<button class="quiz-opt" onclick="pickOpt(${i})">${o.t}</button>`).join('')}</div>
    </div>`;
}
function pickOpt(i){
  QUIZ[quizIdx].opts[i].c.forEach(id=>{quizScores[id]=(quizScores[id]||0)+1});
  quizIdx++;renderQuiz();
}
function showQuizResult(){
  const sorted=Object.entries(quizScores).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const tops=sorted.map(([id])=>id);
  const topCs=tops.map(id=>CAREERS.find(c=>c.id===id)).filter(Boolean);
  if(topCs[0]){lastQuizTop=topCs[0];saveState();logActivity(`Quiz result: <strong>${topCs[0].name}</strong>`,'coral');}
  document.getElementById('quizWrap').innerHTML=`
    <div class="quiz-result-banner">
      <div class="qr-emoji">🎯</div>
      <div class="qr-title">Your top career matches</div>
      <div class="qr-sub">Based on your answers, these careers align best with your interests and goals.</div>
      <div class="qr-chips">${topCs.map((c,i)=>`<button class="qr-chip" onclick="openCd('${c.id}')">${c.emoji} ${c.name}${i===0?' ✨':''}</button>`).join('')}</div>
    </div>
    ${topCs[0]?`<div class="card" style="margin-bottom:1rem"><div style="display:flex;align-items:center;gap:10px;margin-bottom:.75rem"><span style="font-size:1.85rem">${topCs[0].emoji}</span><div><div style="font-size:1.05rem;font-weight:700;font-family:'Space Grotesk',sans-serif;color:#fff">Top pick: ${topCs[0].name}</div><div style="font-size:.8rem;color:var(--muted)">Salary ${topCs[0].salary} · Time to ready: ${topCs[0].time}</div></div></div><div style="display:flex;gap:8px"><button class="btn btn-primary btn-sm" onclick="openCd('${topCs[0].id}')"><i class="ti ti-info-circle"></i> View details</button><button class="btn btn-outline btn-sm" onclick="switchTool('analyser');setTimeout(()=>selectSaCar('${topCs[0].id}'),100)"><i class="ti ti-chart-dots"></i> Analyse gap</button></div></div>`:''}
    <button class="btn btn-outline btn-sm" onclick="quizIdx=0;quizScores={};renderQuiz()"><i class="ti ti-refresh"></i> Retake quiz</button>`;
}

// ═══════════════════════════════════════════════
// SAVED
// ═══════════════════════════════════════════════
function renderSaved(){
  const grid=document.getElementById('savedGrid');if(!grid)return;
  if(savedCareers.size===0){
    grid.innerHTML=`<div class="empty-state"><i class="ti ti-bookmark"></i><div style="font-size:1rem;font-weight:600;margin-bottom:.3rem;color:#fff">No saved careers</div><p>Browse Careers and click the bookmark to save them here.</p><button class="btn btn-primary btn-sm mt2" onclick="switchTool('careers')">Browse careers</button></div>`;
    return;
  }
  grid.innerHTML=`<div class="saved-grid">${Array.from(savedCareers).map(id=>{
    const c=CAREERS.find(x=>x.id===id);if(!c)return'';
    return`<div class="saved-card">
      <button class="saved-rm" onclick="toggleSave('${id}')"><i class="ti ti-x"></i></button>
      <div style="font-size:1.6rem;margin-bottom:.4rem">${c.emoji}</div>
      <div style="font-size:.95rem;font-weight:700;font-family:'Space Grotesk',sans-serif;margin-bottom:.2rem;color:#fff">${c.name}</div>
      <div style="font-size:.75rem;color:var(--muted);margin-bottom:.6rem">${c.cat} · ${c.salary}</div>
      <div class="skill-chips" style="margin-bottom:.8rem">${c.skills.slice(0,4).map(s=>`<span class="skill-chip">${s}</span>`).join('')}</div>
      <div style="display:flex;gap:7px"><button class="btn btn-primary btn-sm" onclick="openCd('${id}')">View</button><button class="btn btn-outline btn-sm" onclick="switchTool('analyser');setTimeout(()=>selectSaCar('${id}'),100)">Analyse</button></div>
    </div>`;
  }).join('')}</div>`;
}

// ═══════════════════════════════════════════════
// COMPARE
// ═══════════════════════════════════════════════
function setupCompare(){
  ['cmp1','cmp2'].forEach(id=>{
    const sel=document.getElementById(id);if(!sel||sel.children.length>1)return;
    CAREERS.forEach(c=>{const o=document.createElement('option');o.value=c.id;o.textContent=c.emoji+' '+c.name;sel.appendChild(o)});
  });
}
function renderCompare(){
  const id1=document.getElementById('cmp1')?.value,id2=document.getElementById('cmp2')?.value;
  const box=document.getElementById('cmpResult');if(!box)return;
  if(!id1||!id2){box.innerHTML='';return}
  if(id1===id2){box.innerHTML='<p style="color:var(--coral);font-size:.875rem;padding:.5rem 0">Select two different careers to compare.</p>';return}
  const c1=CAREERS.find(x=>x.id===id1),c2=CAREERS.find(x=>x.id===id2);
  const rows=[
    ['Category',c1.cat,c2.cat,null],
    ['Salary',c1.salary,c2.salary,null],
    ['Job demand',c1.demand,c2.demand,(a,b)=>{const order=['Explosive','Very High','High','Medium'];return order.indexOf(a)<order.indexOf(b)?'a':'b'}],
    ['Time to job-ready',c1.time,c2.time,null],
    ['Skills required',c1.skills.length+' skills',c2.skills.length+' skills',(a,b)=>parseInt(a)<parseInt(b)?'a':'b'],
    ['Projects to build',c1.projects.length+' projects',c2.projects.length+' projects',null],
    ['Top 3 skills',c1.skills.slice(0,3).join(', '),c2.skills.slice(0,3).join(', '),null],
  ];
  box.innerHTML=`<table class="compare-table">
    <thead><tr><th>Criteria</th><th>${c1.emoji} ${c1.name}</th><th>${c2.emoji} ${c2.name}</th></tr></thead>
    <tbody>${rows.map(([label,v1,v2,wfn])=>{const w=wfn?wfn(v1,v2):null;return`<tr><td class="row-label">${label}</td><td class="${w==='a'?'winner':''}">${v1}</td><td class="${w==='b'?'winner':''}">${v2}</td></tr>`}).join('')}</tbody>
  </table>
  <div style="display:flex;gap:10px;margin-top:1.1rem;flex-wrap:wrap">
    <button class="btn btn-primary btn-sm" onclick="openCd('${id1}')">View ${c1.name}</button>
    <button class="btn btn-outline btn-sm" onclick="openCd('${id2}')">View ${c2.name}</button>
  </div>`;
}

// ═══════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════
function buildMarquee(){
  const el=document.getElementById('marquee');if(!el)return;
  const chips=CAREERS.map(c=>`<div class="marquee-chip">${c.emoji} ${c.name} <span>${c.salary}</span></div>`).join('');
  el.innerHTML=chips+chips;
}

// ═══════════════════════════════════════════════
// EXPORT PDF — uses REAL user data
// ═══════════════════════════════════════════════
function exportPDF(){
  toast('Generating PDF report…','');
  setTimeout(()=>{
    try{
      const{jsPDF}=window.jspdf;
      const doc=new jsPDF();
      const VI=[108,92,231];
      doc.setFillColor(...VI);doc.rect(0,0,210,18,'F');
      doc.setFont('helvetica','bold');doc.setFontSize(13);doc.setTextColor(255,255,255);
      doc.text('CareerCraft — Career Progress Report',14,12);
      doc.setFontSize(9);doc.setFont('helvetica','normal');
      doc.text('Generated: '+new Date().toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'}),140,12);
      doc.setTextColor(30,30,50);
      let y=30;
      const h2=(t,cy)=>{doc.setFont('helvetica','bold');doc.setFontSize(12);doc.setTextColor(...VI);doc.text(t,14,cy);doc.setDrawColor(...VI);doc.line(14,cy+2,196,cy+2);doc.setTextColor(30,30,50);return cy+10};
      const row=(l,v,cy,bold=false)=>{doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(10);doc.text(l,16,cy);doc.setFont('helvetica','normal');const lines=doc.splitTextToSize(v||'—',110);doc.text(lines,80,cy);return cy+7*Math.max(1,lines.length)};

      // Student profile (real)
      y=h2('Student Profile',y);
      const fullName=`${profile.first} ${profile.last}`.trim()||'(name not set)';
      y=row('Name:',fullName,y,true);
      y=row('Email:',profile.email||'—',y);
      y=row('Phone:',profile.phone||'—',y);
      y=row('Course:',profile.course||'—',y);
      y=row('Institution:',profile.college||'—',y);
      y=row('Target Career:',profile.target||'(not set)',y);
      y=row('Goal:',profile.goal||'—',y);
      y=row('Experience:',profile.exp||'—',y);
      y=row('Daily learning:',profile.time||'—',y);

      // Readiness
      y+=4;y=h2('Career Readiness',y);
      if(lastGapResult){
        y=row('Target career:',lastGapResult.careerName,y,true);
        y=row('Readiness score:',lastGapResult.pct+'%',y,true);
        y=row('Skills mastered:',`${lastGapResult.have.length} of ${lastGapResult.skills.length}`,y);
        y=row('Skills missing:',lastGapResult.miss.length+'',y);
      }else{
        doc.setFontSize(10);doc.text('Run the Skill Gap Analyser to populate this section.',16,y);y+=8;
      }

      // Skill gap (real)
      if(lastGapResult){
        y+=4;y=h2('Skill Gap Analysis — '+lastGapResult.careerName,y);
        doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(0,120,90);doc.text('Skills Acquired:',16,y);y+=6;
        doc.setFont('helvetica','normal');doc.setTextColor(30,30,50);
        const have=lastGapResult.have.length?lastGapResult.have.join('   ·   '):'(none yet)';
        const haveLines=doc.splitTextToSize(have,180);doc.text(haveLines,16,y);y+=6*haveLines.length+3;
        doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(176,32,112);doc.text('Skills to Learn:',16,y);y+=6;
        doc.setFont('helvetica','normal');doc.setTextColor(30,30,50);
        const miss=lastGapResult.miss.length?lastGapResult.miss.join('   ·   '):'(complete!)';
        const missLines=doc.splitTextToSize(miss,180);doc.text(missLines,16,y);y+=6*missLines.length+6;
      }

      // Quiz top
      if(lastQuizTop){
        y+=2;y=h2('Quiz Result',y);
        y=row('Top match:',lastQuizTop.name,y,true);
        y=row('Category:',lastQuizTop.cat,y);
        y=row('Salary range:',lastQuizTop.salary,y);
      }

      // Saved careers — plain names only
      y+=4;y=h2('Saved Careers',y);
      doc.setFontSize(10);
      if(savedCareers.size===0){
        doc.text('No careers saved.',16,y);y+=8;
      }else{
        const names=Array.from(savedCareers).map(id=>CAREERS.find(c=>c.id===id)?.name).filter(Boolean);
        const txt=names.join(', ');
        const lines=doc.splitTextToSize(txt,180);
        doc.text(lines,16,y);y+=6*lines.length+4;
      }

      // Activity (real)
      if(activityLog.length){
        if(y>250){doc.addPage();y=20;}
        y=h2('Recent Activity',y);
        doc.setFontSize(10);
        activityLog.slice(0,8).forEach(a=>{
          const txt='• '+a.text.replace(/<[^>]+>/g,'');
          const lines=doc.splitTextToSize(txt,180);
          doc.text(lines,16,y);y+=6*lines.length;
        });
      }

      // Footer
      doc.setFillColor(...VI);doc.rect(0,283,210,14,'F');
      doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(255,255,255);
      doc.text('CareerCraft · Intelligent Career Guidance for Students',14,292);

      doc.save(`CareerCraft_Report_${(profile.first||'user').replace(/\s+/g,'_')}.pdf`);
      toast('PDF downloaded!','ok');
      logActivity('Exported career progress PDF','teal');
    }catch(e){console.error(e);toast('PDF export failed','err');}
  },400);
}

// ═══════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════
function toast(msg,type=''){
  const el=document.getElementById('toast');if(!el)return;
  el.textContent=msg;el.className='show '+(type==='ok'?'ok':type==='err'?'err':'');
  setTimeout(()=>el.className='',2600);
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded',()=>{
  loadState();
  // First load — pull initial profile from session if missing
  if(!profile.email&&session){
    profile.first=session.first||'';profile.last=session.last||'';
    profile.email=session.email||'';profile.phone=session.phone||'';
    saveState();
  }
  buildMarquee();
  renderCareers();
  renderProjects();
  initSaPicker();
  renderQuiz();
  setupCompare();
  hydrateProfileForm();
  applyProfile();
  renderDashboard();
});
