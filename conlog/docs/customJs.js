document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector('[data-isopen]')
  if (sidebar) { sidebar.setAttribute('data-isopen', 'true') }
  
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  const last = today.toUTCString()
  const lastupdate = document.getElementById("lastupdate")
  lastupdate.innerHTML = last
});