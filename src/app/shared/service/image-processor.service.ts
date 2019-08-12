export class ImageProcessor {
  static reader = new FileReader();

  static readBlob(blob: Blob, type: string): any {
    const photo = new File([blob], '', { type });
    let image: ArrayBuffer;

    this.reader.readAsDataURL(photo);
    this.reader.onload = (event: any) => {
      image = event.target.result;
    };

    return image;
  }
}
