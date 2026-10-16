import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {z} from "zod";

export const helloWorldSchema = z.object({
  title: z.string().default("AI Video Generator"),
  subtitle: z.string().default("Edit code. Render video. Ship it."),
});

export const helloWorldDefaultProps: z.infer<typeof helloWorldSchema> = {
  title: "AI Video Generator",
  subtitle: "Edit code. Render video. Ship it.",
};

export const HelloWorld: React.FC<z.infer<typeof helloWorldSchema>> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame, fps, config: {damping: 100}});
  const opacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0b12",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{transform: `scale(${scale})`, textAlign: "center"}}>
        <div style={{color: "#fff", fontSize: 110, fontWeight: 800, fontFamily: "Arial"}}>{title}</div>
        <div style={{color: "#9aa0ff", fontSize: 44, marginTop: 20, fontFamily: "Arial"}}>{subtitle}</div>
      </div>
    </AbsoluteFill>
  );
};
