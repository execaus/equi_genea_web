import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import IHorse from "../../../entities/horse/model/horse.ts";

interface HorseTreeCanvasProps {
    horse: IHorse;
    relatives: IHorse[];
}

const HorseTreeCanvas = ({ horse, relatives }: HorseTreeCanvasProps) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const radius = 1.5

    useEffect(() => {
        if (!mountRef.current) return;

        const mount = mountRef.current;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // ensure proper resolution
        mount.appendChild(renderer.domElement);

        const materialMain = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
        const materialRelative = new THREE.MeshBasicMaterial({ color: 0xffffff });

        const createLabel = (text: string) => {
            const canvas = document.createElement('canvas');
            const scaleFactor = 4; // high resolution for clarity
            const size = 128;
            canvas.width = size * scaleFactor;
            canvas.height = size * scaleFactor;
            const context = canvas.getContext('2d')!;
            context.fillStyle = 'white';
            context.font = `${32 * scaleFactor}px Inter`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(text, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
            const sprite = new THREE.Sprite(spriteMaterial);
            const aspect = canvas.width / canvas.height;
            sprite.scale.set(1.2 * aspect, 1.2, 1); // adjust scale
            return sprite;
        };

        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const clickableMeshes: THREE.Mesh[] = [];

        const collectMeshes = (currentHorse: any, mesh: THREE.Mesh) => {
            clickableMeshes.push(mesh);
        };

        const renderHorseNode = (currentHorse: any, x: number, y: number, visited = new Set()) => {
            if (!currentHorse || visited.has(currentHorse.id)) return;
            visited.add(currentHorse.id);

            // Draw the current horse
            const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), currentHorse.id === horse.id ? materialMain : materialRelative);
            mesh.position.set(x, y, 0);
            mesh.userData.horseId = currentHorse.id;
            scene.add(mesh);
            collectMeshes(currentHorse, mesh);

            const label = createLabel(currentHorse.name ?? `#${currentHorse.id}`);
            label.position.set(x, y - 0.5, 0);
            scene.add(label);

            // Draw parents above
            const parents: any[] = [];
            if (currentHorse.sire && currentHorse.sire.id) {
                parents.push(currentHorse.sire);
            }
            if (currentHorse.dam && currentHorse.dam.id) {
                parents.push(currentHorse.dam);
            }
            parents.forEach((p, index) => {
                const px = x + (index - (parents.length - 1) / 2) * 1.5;
                const py = y + 1.5;
                const lineStart = new THREE.Vector3(px, py - 0.2, 0); // slightly below parent sphere
                const lineEnd = new THREE.Vector3(x, y, 0);   // changed to top of current node sphere
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([lineStart, lineEnd]);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(line);
                renderHorseNode(p, px, py, visited);
            });

            // Draw children below
            const children = relatives.filter(r => r.sire?.id === currentHorse.id || r.dam?.id === currentHorse.id);
            children.forEach((c, index) => {
                const cx = x + (index - (children.length - 1) / 2) * 1.5;
                const cy = y - 1.5;
                const lineStart = new THREE.Vector3(x, y, 0);  // changed to bottom of current node sphere
                const lineEnd = new THREE.Vector3(cx, cy + 0.2, 0); // slightly above child sphere
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([lineStart, lineEnd]);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(line);
                renderHorseNode(c, cx, cy, visited);
            });
        };

        renderHorseNode(horse, 0, 0);

        renderer.render(scene, camera);

        const onClick = (event: MouseEvent) => {
            const rect = mount.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(clickableMeshes);
            if (intersects.length > 0) {
                const clickedMesh = intersects[0].object as THREE.Mesh & { horseId?: string };
                if (clickedMesh.userData.horseId) {
                    navigate(`/horse/${clickedMesh.userData.horseId}`);
                }
            }
        };
        mount.addEventListener("click", onClick);

        // Responsive resize
        const resizeObserver = new ResizeObserver(() => {
            if (mount.clientWidth && mount.clientHeight) {
                renderer.setSize(mount.clientWidth, mount.clientHeight);
                renderer.setPixelRatio(window.devicePixelRatio);
                camera.aspect = mount.clientWidth / mount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.render(scene, camera);
            }
        });

        resizeObserver.observe(mount);

        return () => {
            resizeObserver.disconnect();
            renderer.dispose();
            mount.removeChild(renderer.domElement);
            mount.removeEventListener("click", onClick);
        };
    }, [horse, relatives, radius, navigate]);

    return <div ref={mountRef} className="w-full h-full" />;
};

export default HorseTreeCanvas;