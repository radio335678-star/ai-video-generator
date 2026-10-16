import {Config} from "@remotion/cli/config";

// Production defaults tuned for low-RAM machines + GitHub free runners.
// Override per-render via CLI flags (--concurrency, --scale).
Config.setConcurrency(2);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
