const btnMenu = document.querySelector(".btn-menu");
const header = document.querySelector("header");

// UPDATE STICKY HEADER
let rafId;

const updateStickyHeader = () => {
    if (window.scrollY > 0) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
    rafId = requestAnimationFrame(updateStickyHeader);
};
window.addEventListener("scroll", () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateStickyHeader);
});

// TOGGLE SHOW MENU
const toggleShowMenu = () => {
    window.innerWidth < 768 ? header.classList.toggle("show-menu") : null;
};
btnMenu.addEventListener("click", toggleShowMenu);

// FEATURES
const changeFeature = (id, e) => {
    document.querySelector(".features .btn.active").classList.remove("active");
    document.querySelector(".features__item.show").classList.remove("show");
    e.target.classList.add("active");
    const featureItem = document.querySelector(`#tab-${id}`);
    featureItem.classList.add("show");
};

// REMOVE ATTRIBUTE OPEN
const details = document.querySelectorAll(".questions details");
details.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.hasAttribute("open")) {
            element.removeAttribute("open");
            return;
        }

        document.querySelector("details[open]")
            ? document.querySelector("details[open]").removeAttribute("open")
            : null;
    });
});

window.onload = () => {
    updateStickyHeader();

    const form = document.querySelector(".newsletter form");
    const emailContainer = document.getElementById("email");

    // Valida que el email tenga un formato válido
    const isValidEmail = (input) => {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(input);
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const input = document.getElementById("txtEmail");

        if (!isValidEmail(input.value)) {
            emailContainer.classList.add("error");
            return;
        }

        if (emailContainer.classList.contains("error")) {
            emailContainer.classList.remove("error");
        }
    });

    // ANIMACIONES SECCION HERO
    const heroTitle = document.querySelector(".hero h1");
    const heroImg = document.querySelector(".hero img");
    const heroBtnPrimary = document.querySelector(".hero .btn-primary");

    const descriptions = document.querySelectorAll("p");
    const titlesH2 = document.querySelectorAll("h2");
    const subTitles = document.querySelectorAll("h3");
    const details = document.querySelectorAll("details");
    const mainImg = document.querySelectorAll("main img");
    const mainSpan = document.querySelectorAll("main span");
    const buttons = document.querySelectorAll("main .btn");
    const inputGroup = document.querySelectorAll("main .input-group");

    const footerImg = document.querySelectorAll("footer .logo");
    const footerLi = document.querySelectorAll("footer li");
    const footerP = document.querySelectorAll("footer p");

    const startAnimation = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(startAnimation, {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    });

    const props = [
        heroTitle,
        heroImg,
        heroBtnPrimary,
        ...descriptions,
        ...buttons,
        ...titlesH2,
        ...subTitles,
        ...details,
        ...mainImg,
        ...mainSpan,
        ...inputGroup,
        ...footerImg,
        ...footerLi,
        ...footerP,
    ];

    props.forEach((prop) => {
        observer.observe(prop);
    });
};
