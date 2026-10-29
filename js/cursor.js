(() => {
    const cursor = document.querySelector('.cursor');
    const trails = [...document.querySelectorAll('.cursor-trail')];
    if (!cursor || !window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
    const positions = trails.map(() => ({ x: mouseX, y: mouseY }));

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    }, { passive: true });

    function animate() {
        let prevX = mouseX, prevY = mouseY;
        trails.forEach((trail, index) => {
            const point = positions[index];
            const speed = 0.28 - index * 0.025;
            point.x += (prevX - point.x) * speed;
            point.y += (prevY - point.y) * speed;
            trail.style.left = `${point.x}px`;
            trail.style.top = `${point.y}px`;
            prevX = point.x;
            prevY = point.y;
        });
        requestAnimationFrame(animate);
    }
    animate();
})();
