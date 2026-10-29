


/* =========================================================
   SCROLL REVEAL
========================================================= */

const reveal =
    document.querySelectorAll(
        ".reveal"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


reveal.forEach(
    element => {
        observer.observe(element);
    }
);


/* =========================================================
   HERO 3D PARALLAX
========================================================= */

const hero10 =
    document.querySelector(
        ".hero-10"
    );


document.addEventListener(
    "mousemove",
    e => {

        if (
            window.innerWidth < 800
        ) return;


        const x =
            e.clientX /
            window.innerWidth -
            .5;


        const y =
            e.clientY /
            window.innerHeight -
            .5;


        hero10.style.transform =

            `translateY(-50%)
             translate(${x * 12}px,${y * 8}px)`;

    }
);
