document.addEventListener('DOMContentLoaded', function() {

    M.Tabs.init(document.querySelectorAll('.tabs'));
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.ScrollSpy.init(document.querySelectorAll('.scrollspy'));

    setTimeout(function() {
        document.getElementById('loader').style.display = "none";
    }, 800);
});