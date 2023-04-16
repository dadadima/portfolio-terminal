import Cors from "cors";
import runMiddleware from "../../utils/runMiddleware";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "GET") {
    const projects = [
      {
        name: "Liberty: Experience the ISS like never before.",
        description:
          "A browser based 3D visualisation of the International Space Station in Realtime which won us second place in the NASA Space Apps Regional Round among 90+ teams.",
        stack: ["Typescript", "NextJS", "Rust", "WASM"],
        link: "https://space-apps-eosin.vercel.app",
        image: "ndss.png",
        largeImage: "liberty-lg.png",
      },
    ];

    return res.json(projects);
  } else {
    return res.status(400).json({ message: "Only GET request allowed" });
  }
}
