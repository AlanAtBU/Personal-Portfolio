function initGalleryDragAndDrop() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  let draggedEl: HTMLElement | null = null;

  grid.addEventListener("dragstart", (event: DragEvent) => {
    const target = event.target as HTMLElement | null;
    const card = target?.closest(".gallery-item") as HTMLElement | null;
    if (!card) return;

    draggedEl = card;
    event.dataTransfer?.setData("text/plain", "dragging");
    event.dataTransfer?.setDragImage(card, 50, 50);
  });

  grid.addEventListener("dragover", (event: DragEvent) => {
    event.preventDefault();
    const target = event.target as HTMLElement | null;
    if (!draggedEl || !target) return;

    const card = target.closest(".gallery-item") as HTMLElement | null;
    if (!card || card === draggedEl) return;

    const rect = card.getBoundingClientRect();
    const before = (event.clientY - rect.top) < rect.height / 2;

    if (before) {
      grid.insertBefore(draggedEl, card);
    } else {
      grid.insertBefore(draggedEl, card.nextSibling);
    }
  });

  grid.addEventListener("drop", (event: DragEvent) => {
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
