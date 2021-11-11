import { createCanvas, loadImage } from "canvas";
import { Arg, Mutation, Resolver } from "type-graphql";
import { v2 } from "cloudinary";
// import { QuoteEntity } from "../entities/Quote";

@Resolver()
export class QuoteResolver {
  @Mutation(() => String)
  async quote(@Arg("quote") quote: string) {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext("2d");

    ctx.font = "30px Impact";
    ctx.rotate(0.1);
    ctx.fillText(quote, 50, 100);

    let text = ctx.measureText(quote);
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + text.width, 102);
    ctx.stroke();

    try {
      loadImage("./download.png").then((image) => {
        ctx.drawImage(image, 50, 0, 70, 70);
      });
      const dataUri = canvas.toDataURL();
      const result = await v2.uploader.upload(dataUri, {
        public_id: "",
      });

      return `Uri: ${result.url}`;
    } catch (err) {
      console.log(err);
      return `Err ${err.message}`;
    }
  }
}
