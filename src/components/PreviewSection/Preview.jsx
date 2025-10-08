import { useEffect, useRef } from 'react';

export default function Preview(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const devicePixelRatio = window.devicePixelRatio || 1;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            const width = parent ? parent.clientWidth : 600;
            const height = Math.max(200, Math.floor(width * 0.5));

            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            canvas.width = Math.floor(width * devicePixelRatio);
            canvas.height = Math.floor(height * devicePixelRatio);

            context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
            drawPreview(context, width, height);
        };

        const drawPreview = (ctx, width, height) => {
            ctx.clearRect(0, 0, width, height);

            // background
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#eef2ff');
            gradient.addColorStop(1, '#e0f7fa');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // header bar
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, width, 40);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px system-ui, Arial';
            ctx.textBaseline = 'middle';
            ctx.fillText('CareerCanvas Preview', 16, 20);

            // sample card
            const cardX = 16;
            const cardY = 60;
            const cardW = Math.min(520, width - 32);
            const cardH = Math.max(100, height - cardY - 16);
            roundedRect(ctx, cardX, cardY, cardW, cardH, 10);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.stroke();

            // placeholder text
            ctx.fillStyle = '#333';
            ctx.font = 'bold 18px system-ui, Arial';
            ctx.fillText('Resume Preview', cardX + 16, cardY + 32);
            ctx.font = '14px system-ui, Arial';
            ctx.fillStyle = '#555';
            ctx.fillText('Use the builder to populate this area.', cardX + 16, cardY + 60);
        };

        const roundedRect = (ctx, x, y, w, h, r) => {
            const radius = Math.min(r, w / 2, h / 2);
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + w, y, x + w, y + h, radius);
            ctx.arcTo(x + w, y + h, x, y + h, radius);
            ctx.arcTo(x, y + h, x, y, radius);
            ctx.arcTo(x, y, x + w, y, radius);
            ctx.closePath();
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return (
        <section>
            <canvas ref={canvasRef} aria-label="Preview canvas" />
        </section>
    );
}
