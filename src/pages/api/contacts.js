import Cors from "cors";
import runMiddleware from "../../utils/runMiddleware";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "GET") {
    const contactMediums = [
      {
        medium: "github",
        username: "dadadima94",
        link: "https://github.com/dadadima94",
      },
      {
        medium: "email",
        username: "davidee.dima@gmail.com",
        link: "mailto:davidee.dima@gmail.com",
      },
      {
        medium: "linkedin",
        username: "davide-dimatteo",
        link: "https://www.linkedin.com/in/davide-dimatteo/",
      },
      {
        medium: "telegram",
        username: "diomatteo",
        link: "https://t.me/diomatteo",
      }
    ];

    res.json(contactMediums);
  } else {
    return res.status(400).json({ message: "Only GET request allowed" });
  }
}
