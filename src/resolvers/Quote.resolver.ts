import { createCanvas, loadImage } from "canvas";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class QuoteResolver {
  @Mutation(() => Boolean)
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
      loadImage(
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Blank_button.svg/1200px-Blank_button.svg.png"
      ).then((image) => {
        ctx.drawImage(image, 50, 0, 70, 70);

        console.log('<img src="' + canvas.toDataURL() + '" />');
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
