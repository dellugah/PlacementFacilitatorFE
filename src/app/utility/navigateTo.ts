export const navigateTo = (path: string | undefined) => {
  if (!path) {
    return;
  }
  window.open(`mailto:${path}`, '_blank');
}
