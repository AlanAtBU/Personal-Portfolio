"use strict";
// Drag & Drop
function initGalleryDragAndDrop() {
    const grid = document.getElementById("galleryGrid");
    if (!grid)
        return;
    let draggedEl = null;
    grid.addEventListener("dragstart", (event) => {
        var _a, _b;
        const target = event.target;
        const card = target === null || target === void 0 ? void 0 : target.closest(".gallery-item");
        if (!card)
            return;
        draggedEl = card;
        (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", "dragging");
        (_b = event.dataTransfer) === null || _b === void 0 ? void 0 : _b.setDragImage(card, 50, 50);
    });
    grid.addEventListener("dragover", (event) => {
        event.preventDefault();
        const target = event.target;
        if (!draggedEl || !target)
            return;
        const card = target.closest(".gallery-item");
        if (!card || card === draggedEl)
            return;
        const rect = card.getBoundingClientRect();
        const before = (event.clientY - rect.top) < rect.height / 2;
        if (before) {
            grid.insertBefore(draggedEl, card);
        }
        else {
            grid.insertBefore(draggedEl, card.nextSibling);
        }
    });
    grid.addEventListener("drop", (event) => {
        event.preventDefault();
        draggedEl = null;
    });
    grid.addEventListener("dragend", () => {
        draggedEl = null;
    });
}
// Bootstrapping
document.addEventListener("DOMContentLoaded", () => {
    initGalleryDragAndDrop();
});
