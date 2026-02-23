document.addEventListener('DOMContentLoaded', function () {
    M.Tabs.init(document.querySelectorAll('.tabs'));
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.ScrollSpy.init(document.querySelectorAll('.scrollspy'));
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Parallax.init(document.querySelectorAll('.parallax'));
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
  
    setTimeout(function () {
      const loader = document.getElementById('loader');
      if (loader) loader.style.display = "none";
    }, 800);
  });