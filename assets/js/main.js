document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".button");
    const boxes = document.querySelectorAll(".box");

    gsap.fromTo(
        boxes,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
    );

    boxes.forEach((box) => box.classList.add("float"));

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");

            buttons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const visible = [];
            boxes.forEach((box) => {
                if (filter === "all" || box.classList.contains(filter)) {
                    box.classList.add("show");
                    box.classList.remove("hide");
                    visible.push(box);
                } else {
                    box.classList.remove("show");
                    box.classList.add("hide");
                }
            });

            const indices = visible.map((_, i) => i);
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }

            visible.forEach((box, i) => {
                box.style.order = indices[i];
            });

            gsap.fromTo(
                visible,
                { opacity: 0, scale: 0.6, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.18, ease: "power3.out" }
            );
        });
    });

    function createBackgroundLetters(count = 50) {
        const container = document.getElementById("bg-letters");
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

        for (let i = 0; i < count; i++) {
            const el = document.createElement("div");
            el.classList.add("bg-letter");
            el.textContent = chars[Math.floor(Math.random() * chars.length)];

            const size = gsap.utils.random(18, 120);
            el.style.fontSize = `${size}px`;

            el.style.left = `${gsap.utils.random(0, 100)}vw`;
            el.style.top = `${gsap.utils.random(0, 100)}vh`;

            gsap.set(el, {
                z: gsap.utils.random(-600, 600),
            });

            container.appendChild(el);

            animateLetter(el);
        }
    }

    function animateLetter(letter) {
        const duration = gsap.utils.random(6, 18);

        gsap.to(letter, {
            x: `+=${gsap.utils.random(-200, 200)}`,
            y: `+=${gsap.utils.random(-200, 200)}`,
            rotationX: gsap.utils.random(-180, 180),
            rotationY: gsap.utils.random(-180, 180),
            rotationZ: gsap.utils.random(-180, 180),
            scale: gsap.utils.random(0.6, 2.2),
            opacity: gsap.utils.random(0.05, 0.25),
            ease: "sine.inOut",
            duration: duration,
            repeat: -1,
            yoyo: true,
        });
    }

    createBackgroundLetters(70);
});
