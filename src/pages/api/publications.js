import Cors from 'cors';
import runMiddleware from '../../utils/runMiddleware';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === 'GET') {
    const publications = [
      {
        title:
          'Energy-Efficient Privacy-Preserving Time-Series Forecasting on User Health Data Streams',
        link: 'https://ieeexplore.ieee.org/abstract/document/10063379',
        authors: ["Muhammad Arsalan", "Davide Di Matteo", "Sana Imtiaz", "Zainab Abbas", "Vladimir Vlassov", "Vadim Issakov"],
        abstract: 'Health monitoring devices are gaining popularity both as wellness tools and as a source of information for healthcare decisions. In this work, we use Spiking Neural Networks (SNNs) for time-series forecasting due to their proven energy-saving capabilities. Thanks to their design that closely mimics the natural nervous system, SNNs are energy-efficient in contrast to classic Artificial Neural Networks (ANNs). We design and implement an energy-efficient privacy-preserving forecasting system on real-world health data streams using SNNs and compare it to a state-of-the-art system with Long short-term memory (LSTM) based prediction model. Our evaluation shows that SNNs tradeoff accuracy (2.2× greater error), to grant a smaller model (19% fewer parameters and 77% less memory consumption) and a 43% less training time. Our model is estimated to consume 3.36μJ energy, which is significantly less than the traditional ANNs. Finally, we apply ε-differential privacy for enhanced privacy guarantees on our federated learning-based models. With differential privacy of ε = 0.1, our experiments report an increase in the measured average error (RMSE) of only 25%.',
        year: '2022',
        Conference:
          'IEEE International Conference on Trust, Security and Privacy in Computing and Communications (TrustCom)',
      },
    ];

    return res.json(publications);
  } else {
    return res.status(400).json({ message: 'Only GET request allowed' });
  }
}
