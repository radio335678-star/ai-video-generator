import {AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame} from "remotion";
import {z} from "zod";

export const productAdSchema = z.object({
  productName: z.string().default("Diwali Mega Sale"),
  price: z.string().default("₹999 only"),
  tagline: z.string().default("Limited offer — shop now"),
  // Optional image placed in public/ad-bg.png; falls back to gradient when absent.
  backgroundImage: z.string().default("ad-bg.png"),
});

export const productAdDefaultProps: z.infer<typeof productAdSchema> = {
  productName: "Diwali Mega Sale",
  price: "₹999 only",
  tagline: "Limited offer — shop now",
  backgroundImage: "ad-bg.png",
};

export const ProductAd: React.FC<z.infer<typeof productAdSchema>> = ({
  productName,
  price,
  tagline,
}) => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [10, 35], [0, 1], {extrapolateRight: "clamp"});
  const priceSlide = interpolate(frame, [50, 80], [600, 0], {
    extrapolateRight: "clamp",
  });
  const ctaPulse = 1 + 0.06 * Math.sin(frame / 8);

  return (
    <AbsoluteFill style={{backgroundColor: "#14101f", justifyContent: "center", alignItems: "center"}}>
      <Sequence from={0} durationInFrames={300}>
        <div style={{opacity: titleOpacity, textAlign: "center"}}>
          <div style={{color: "#ffd166", fontSize: 72, fontWeight: 800, fontFamily: "Arial"}}>
            {productName}
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 120,
              fontWeight: 900,
              fontFamily: "Arial",
              transform: `translateX(${priceSlide}px)`,
              marginTop: 10,
            }}
          >
            {price}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: 30,
              padding: "18px 54px",
              borderRadius: 999,
              backgroundColor: "#ef476f",
              color: "#fff",
              fontSize: 44,
              fontWeight: 700,
              fontFamily: "Arial",
              transform: `scale(${ctaPulse})`,
            }}
          >
            {tagline}
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

// Keep imports used (agents: swap Img+staticFile in when a real photo is added):
void Img;
void staticFile;
