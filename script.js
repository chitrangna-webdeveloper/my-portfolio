const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){
        topBtn.style.display = "block";
    }
    else{
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

// ---- Preloader: tree growth animation before site reveals ----
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.classList.add("hide");
        document.body.classList.remove("loading");
    }, 3600); // naye slow animation ki total duration ke barabar (3.6s)
});

// ---- Mobile navbar toggle logic ----
const logoLink = document.getElementById("logoLink");
const navLinksMobile = document.getElementById("navLinksMobile");
const menuToggle = document.getElementById("menuToggle");
const buttonsMenu = document.getElementById("buttonsMenu");

function isMobile(){
    return window.innerWidth <= 768;
}

// logo tap -> toggle links dropdown (sirf mobile pe; desktop pe normal home link rahega)
logoLink.addEventListener("click", (e) => {
    if(isMobile()){
        e.preventDefault();
        navLinksMobile.classList.toggle("show");
        buttonsMenu.classList.remove("show");
    }
});

// right side icon tap -> toggle buttons dropdown
menuToggle.addEventListener("click", () => {
    buttonsMenu.classList.toggle("show");
    navLinksMobile.classList.remove("show");
});

// bahar tap karne pe dono dropdown band ho jaye
document.addEventListener("click", (e) => {
    if(isMobile() && !e.target.closest(".header-ul")){
        navLinksMobile.classList.remove("show");
        buttonsMenu.classList.remove("show");
    }
});

// ---- Navbar: scroll blur + shadow ----
const mainHeader = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
    if(window.scrollY > 40){
        mainHeader.classList.add("scrolled");
    } else {
        mainHeader.classList.remove("scrolled");
    }
});

// ---- Navbar: active section highlight (scrollspy) ----
// Sirf un pages pe kaam karega jinme matching id-wale sections maujood hain
// (e.g. index.html). Doosre pages (jaise projects.html) pe ye array khaali
// rahega aur observer kuch nahi karega — koi error nahi aayega.
const navLinks = document.querySelectorAll(".nav-link");
const sections = Array.from(navLinks)
    .map(link => link.dataset.section ? document.getElementById(link.dataset.section) : null)
    .filter(Boolean);

function setActiveLink(id){
    navLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.section === id);
    });
}

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            setActiveLink(entry.target.id);
        }
    });
}, {
    root: null,
    rootMargin: "-45% 0px -45% 0px", // section counts as "active" once it crosses the middle of the screen
    threshold: 0
});

sections.forEach(section => sectionObserver.observe(section));

// ---- Scroll reveal: fade/rise elements ([data-reveal]) into view ----
const revealEls = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

revealEls.forEach(el => revealObserver.observe(el));
