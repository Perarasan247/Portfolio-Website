const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'];

export function getFileKind(path: string): { isImage: boolean; isPdf: boolean } {
  const ext = (path.split('.').pop() ?? '').toLowerCase();
  return { isImage: IMAGE_EXTENSIONS.includes(ext), isPdf: ext === 'pdf' };
}
