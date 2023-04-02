const axios = require("axios");

export default async function handler(req, res) {
  if (req.method == "GET") {
    res.status(200).json({ name: "John Doe" });
  } else if (req.method == "POST") {
    try {
      const { namespace_id, data, server, port } = req.body;

      console.log(req.body);

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
      );

      const response = await axios.post(
        `http://${server}:${port}/submit_pfb`,
        `{"namespace_id": "${namespace_id}", "data": "${data}", "gas_limit": 80000, "fee": 2000}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": null,
            "X-Requested-With": null,
            Accept: "",
          },
        }
      );

      // const response = await axios.post(
      //   process.env.HTTP_URL,
      //   {
      //     event: `“user”:${user}, “type”: ${process.env.TYPE},“Answer”:${answer}`,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Splunk ${process.env.TOKEN}`,
      //       "Content-Type": "application/x-www-form-urlencoded",
      //       "Cache-Control": null,
      //       "X-Requested-With": null,
      //       Accept: "",
      //     },
      //   }
      // );

      // 69c2cfd8-697e-4f2e-bf28-861d90961a4b

      console.log(response.data, "data");

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        data: "issue",
      });
    }
  }
}
