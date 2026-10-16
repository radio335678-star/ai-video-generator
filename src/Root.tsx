import {Composition} from "remotion";
import {z} from "zod";
import {HelloWorld, helloWorldSchema, helloWorldDefaultProps} from "./compositions/HelloWorld";
import {ProductAd, productAdSchema, productAdDefaultProps} from "./compositions/ProductAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={helloWorldSchema}
        defaultProps={helloWorldDefaultProps}
      />
      <Composition
        id="ProductAd"
        component={ProductAd}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={productAdSchema}
        defaultProps={productAdDefaultProps}
      />
    </>
  );
};

// Re-export schemas so agents/tests can validate props without rendering.
export {helloWorldSchema, productAdSchema};
export type HelloWorldProps = z.infer<typeof helloWorldSchema>;
export type ProductAdProps = z.infer<typeof productAdSchema>;
