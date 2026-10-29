
// =====================================================
// 4. SCROLL REVEAL ANIMATION
// =====================================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {
        observer.observe(element);
    });

} else {

    // Fallback for older browsers
    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}


// =====================================================
// 5. CUSTOM CURSOR
// =====================================================

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");
const trails = document.querySelectorAll(".cursor-trail");


// Only run cursor effects when all required elements exist
if (cursor && ring) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    // Track mouse
    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

    });


    // Smooth ring movement
    function moveRing() {

        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        requestAnimationFrame(moveRing);
    }

    moveRing();


    // =================================================
    // 6. CURSOR TRAIL
    // =================================================

    if (trails.length > 0) {

        const positions = Array.from(
            trails,
            () => ({
                x: 0,
                y: 0
            })
        );


        function moveTrails() {

            positions[0].x = mouseX;
            positions[0].y = mouseY;


            for (let i = 1; i < positions.length; i++) {

                positions[i].x +=
                    (positions[i - 1].x - positions[i].x) * 0.28;

                positions[i].y +=
                    (positions[i - 1].y - positions[i].y) * 0.28;


                trails[i].style.left =
                    `${positions[i].x}px`;

                trails[i].style.top =
                    `${positions[i].y}px`;
            }


            requestAnimationFrame(moveTrails);
        }


        moveTrails();
    }


    // =================================================
    // 7. CURSOR HOVER EFFECT
    // =================================================

    const hoverElements = document.querySelectorAll(
        "a, button, .purpose-card, .journey-item, .belief-row"
    );


    hoverElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            cursor.style.width = "20px";
            cursor.style.height = "20px";

            ring.style.width = "55px";
            ring.style.height = "55px";

        });


        element.addEventListener("mouseleave", () => {

            cursor.style.width = "11px";
            cursor.style.height = "11px";

            ring.style.width = "38px";
            ring.style.height = "38px";

        });

    });

}


// =====================================================
// END OF NJFON GLOBAL SCRIPT
// =====================================================