const form=document.getElementById("form");
const url=document.getElementById("url");
const status=document.getElementById("status");
const result=document.getElementById("result");
const paste=document.getElementById("paste");

paste.onclick=async()=>{
  try{
    url.value=await navigator.clipboard.readText();
    status.textContent="បាន Paste Link រួចរាល់។";
  }catch(e){
    status.textContent="សូម Paste Link ដោយដៃ។";
  }
};

form.onsubmit=async(e)=>{
  e.preventDefault();
  result.style.display="none";
  status.textContent="⏳ កំពុងដំណើរការ...";
  const btn=form.querySelector(".download");
  btn.disabled=true;
  try{
    const body=new URLSearchParams({url:url.value});
    const r=await fetch("/download",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body});
    const data=await r.json();
    if(!r.ok) throw new Error(data.detail||"Download failed");
    result.href=data.download_url;
    result.style.display="block";
    status.textContent="✅ រួចរាល់! ចុច Save Video ដើម្បីរក្សាទុក។";
  }catch(err){
    status.textContent="❌ "+err.message;
  }finally{btn.disabled=false;}
};
